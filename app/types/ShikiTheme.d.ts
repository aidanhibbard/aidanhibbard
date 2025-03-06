import type { ThemeRegistrationAny, StringLiteralUnion, BundledTheme } from 'shiki'

type ShikiTheme = ThemeRegistrationAny | StringLiteralUnion<BundledTheme, string>
