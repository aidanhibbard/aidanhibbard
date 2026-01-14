---
title: 'Nuxt and TypeORM'
date: '2026-01-13'
tags: ['nuxt', 'typeorm', 'typescript']
description: 'Absolutely worth the trouble'
---

# Setting Up TypeORM with Nuxt 4: A Complete Guide

Coming from a background in MVC frameworks, I absolutely love TypeORM. Being able to create type-safe models (entities) with a intuitive developer expierence is fantastic. Not to mention they received new sponsorship, are lining up new maintainers, and seem to be making the most robust ORM out there.

Getting it setup with Nuxt though was a bit of a headache...

## The Problem

TypeORM relies heavily on TypeScript decorators:

```typescript
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  email!: string
}
```

When you try to use this in a Nuxt project, you'll encounter two distinct types of errors:

1. **Runtime errors** - Nitro's esbuild compilation doesn't process decorators
2. **Type-checking errors** - `vue-tsc` complains about decorator signatures

These require separate fixes because they happen at different stages of the build process.

So what does this mean?

Well if you though you could just update your nuxt apps server side `tsconfig.json` to support decorators, and emit metadata then I've got bad news for you...

## Step 1: Configure Nitro's esbuild (Runtime Compilation)

Nitro uses esbuild to compile server code. By default, esbuild strips decorators.

So this fix comes from Daniel Roe [on a related GitHub Issue](https://github.com/nuxt/nuxt/issues/21756#issuecomment-1606150617).

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
        tsconfigRaw: {
          compilerOptions: {
            experimentalDecorators: true,
          },
        },
      },
    },
  },
})
```

**Why this works:** The `tsconfigRaw` option passes compiler settings directly to esbuild's TypeScript transform, enabling decorator support during the build.

## Step 2: Configure the server 

Nuxt 4 uses project references with multiple tsconfig files. The root `tsconfig.json` references generated configs in `.nuxt/`. For decorator type-checking to work, we need to:

### 3a. Create a Server-Specific tsconfig

```json
// server/tsconfig.json
{
  "extends": "../.nuxt/tsconfig.server.json",
  "compilerOptions": {
    "composite": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

**Key options explained:**
- `composite: true` - Required for TypeScript project references
- `experimentalDecorators: true` - Enables the `@decorator` syntax
- `emitDecoratorMetadata: true` - Enables runtime type reflection (required by TypeORM)

### 3b. Update the Root tsconfig

Replace the generated server config reference with your custom one:

```json
// tsconfig.json
{
  "files": [],
  "references": [
    { "path": "./.nuxt/tsconfig.app.json" },
    { "path": "./server/tsconfig.json" },  // <-- Custom server config
    { "path": "./.nuxt/tsconfig.shared.json" },
    { "path": "./.nuxt/tsconfig.node.json" }
  ]
}
```

### 3c. Add Decorator Options to Nuxt Config

The `nuxi typecheck` command also needs these settings propagated:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  typescript: {
    strict: true,
    typeCheck: true,
    tsConfig: {
      compilerOptions: {
        experimentalDecorators: true,
        emitDecoratorMetadata: true,
      },
    },
  },
})
```

> **Note:** Yes, this duplicates the settings from `server/tsconfig.json`. Both are needed because `nuxi typecheck` runs vue-tsc in a way that doesn't always pick up the server tsconfig overrides.

## Step 4: Gitignore the Build Cache

The `composite: true` setting generates a build cache file:

```gitignore
# .gitignore
*.tsbuildinfo
```

## Step 5: Create the DataSource

Import `reflect-metadata` at the top of your datasource file:

```typescript
// server/utils/datasource.ts
import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from '../database/entities/user'
import { Company } from '../database/entities/company'

const { database } = useRuntimeConfig()

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: database.host,
  port: parseInt(database.port),
  username: database.username,
  password: database.password,
  database: database.name,
  entities: [User, Company],
  migrations: ['server/database/migrations/**/*.ts'],
})
```

## Step 6: Initialize on Server Start

Use a Nitro plugin to initialize the connection:

```typescript
// server/plugins/typeorm.ts
export default defineNitroPlugin(async () => {
  try {
    await AppDataSource.initialize()
    console.log('Data Source initialized!')
  }
  catch (error) {
    console.error('Error during Data Source initialization', error)
  }
})
```

## Step 7: Define Entities with Explicit Column Types

Always specify explicit column types. TypeORM's type inference relies on `emitDecoratorMetadata`, but explicit types are more reliable and self-documenting:

```typescript
// server/database/entities/user.ts
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm'
import { IsEmail, IsIn, IsString } from 'class-validator'
import type { Company } from './company'

export const AuthProvider = {
  AUTH0: 'auth0',
} as const

export type AuthProvider = typeof AuthProvider[keyof typeof AuthProvider]

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id!: number

  @Column({ type: 'varchar', unique: true })
  @IsEmail()
  email!: string

  @Column({ type: 'varchar', unique: true })
  @IsString()
  externalId!: string

  @Column({
    type: 'enum',
    enum: Object.values(AuthProvider),
    default: AuthProvider.AUTH0,
  })
  @IsIn(Object.values(AuthProvider))
  provider!: AuthProvider

  @ManyToOne('Company', 'users', { nullable: true })
  company!: Company | null
}
```

```typescript
// server/database/entities/company.ts
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm'
import { IsString, IsUrl } from 'class-validator'
import { User } from './user'

@Entity()
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id!: number

  @Column({ type: 'varchar', unique: true })
  @IsString()
  name!: string

  @Column({ type: 'text' })
  @IsString()
  description!: string

  @Column({ type: 'varchar' })
  @IsUrl()
  logoUrl!: string

  @OneToMany(() => User, user => user.company)
  users!: User[]
}
```

## Complete nuxt.config.ts

Here's the full configuration with all TypeORM-related settings:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  // Database credentials via runtime config
  runtimeConfig: {
    database: {
      host: process.env.DATABASE_HOST ?? '',
      port: process.env.DATABASE_PORT ?? '',
      username: process.env.DATABASE_USERNAME ?? '',
      password: process.env.DATABASE_PASSWORD ?? '',
      name: process.env.DATABASE_NAME ?? '',
    },
  },

  // Nitro esbuild config for runtime decorator support
  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
        tsconfigRaw: {
          compilerOptions: {
            experimentalDecorators: true,
          },
        },
      },
    },
  },

  // TypeScript config for type-checking decorator support
  typescript: {
    strict: true,
    typeCheck: true,
    tsConfig: {
      compilerOptions: {
        experimentalDecorators: true,
        emitDecoratorMetadata: true,
      },
    },
  },
})
```

## Summary of Configuration Files

| File | Purpose |
|------|---------|
| `nuxt.config.ts` → `nitro.esbuild` | Runtime decorator compilation |
| `nuxt.config.ts` → `typescript.tsConfig` | Type-checking with `nuxi typecheck` |
| `server/tsconfig.json` | Server-specific type-checking with vue-tsc |
| `tsconfig.json` | Project references (points to server/tsconfig.json) |

## Troubleshooting

### "Unable to resolve signature of property decorator"
This vue-tsc error means `experimentalDecorators` isn't enabled. Check:
1. `server/tsconfig.json` has `experimentalDecorators: true`
2. Root `tsconfig.json` references `./server/tsconfig.json` (not `.nuxt/tsconfig.server.json`)
3. `nuxt.config.ts` has the `typescript.tsConfig.compilerOptions` settings

### Decorators stripped at runtime
If entities work in type-checking but fail at runtime, the Nitro esbuild config is missing. Ensure `nitro.esbuild.options.tsconfigRaw.compilerOptions.experimentalDecorators` is set.

### "Cannot read properties of undefined (reading 'prototype')"
Usually means `reflect-metadata` wasn't imported. Add it at the top of your datasource file.

## Why So Many Config Files?

Nuxt 4's architecture separates concerns:
- **App code** (Vue components) → `.nuxt/tsconfig.app.json`
- **Server code** (Nitro) → `.nuxt/tsconfig.server.json` (or your override)
- **Shared code** → `.nuxt/tsconfig.shared.json`
- **Build tools** → `.nuxt/tsconfig.node.json`

TypeORM entities live in server code, so we override the server config. The duplication in `nuxt.config.ts` exists because `nuxi typecheck` doesn't always use the project reference setup—it has its own vue-tsc invocation that reads the Nuxt typescript config directly.

---

*This guide was written after extensive debugging. The Nuxt + TypeORM combination requires careful configuration across multiple files, but once set up correctly, it works reliably.*
