---
title: 'Nuxt and TypeORM'
date: '2026-01-13'
tags: ['nuxt', 'typeorm', 'typescript']
description: 'Absolutely worth the trouble'
---

# Setting Up TypeORM with Nuxt 4: A Complete Guide

Coming from a background in MVC frameworks, I absolutely love TypeORM. Being able to create type-safe models (entities) with a intuitive developer expierence is fantastic. Not to mention they received new sponsorship, are lining up new maintainers, and seem to be making the most robust ORM out there.

Getting it setup with Nuxt, _and_ strict type-checking though was a bit of a headache...

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

1. Runtime errors - Nitro's esbuild compilation doesn't process decorators
2. Type-checking errors - vue-tsc complains about decorator signatures

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

The `tsconfigRaw` option passes compiler settings directly to esbuild's TypeScript transform, enabling decorator support during the build.

## Step 2: Configure the server 

Nuxt 4 uses project references with multiple tsconfig files. The root `tsconfig.json` references generated configs in `.nuxt/`. For decorator type-checking to work, we need to create a server-specific tsconfig.

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

**Why're we duplicating the effort here?**

- composite - [Required for TypeScript project references](https://www.typescriptlang.org/tsconfig/composite.html)
- experimentalDecorators - Enables the `@decorator` syntax
- emitDecoratorMetadata - Enables runtime type reflection (required by TypeORM) and isn't supported as a option on the nitro config we updated above

## Step 3: Update the Root tsconfig.json

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

## Step 4: Add Decorator Options to Nuxt Config

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

Yes, this duplicates the settings from server/tsconfig.json. Both are needed because nuxi typecheck runs vue-tsc in a way that doesn't always pick up the server tsconfig overrides.

## Step 4: Gitignore the Build Cache

The `composite: true` setting generates a build cache file in your server directory.

```gitignore
# .gitignore
*.tsbuildinfo
```
