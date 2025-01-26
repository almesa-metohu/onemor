import { createInterFont } from '@tamagui/font-inter'
import { shorthands } from '@tamagui/shorthands'
import { createTamagui, createTokens } from 'tamagui'

const tokens = createTokens({
  color: {
    primary100: '#E6F7FF',
    primary200: '#BAE7FF',
    primary300: '#91D5FF',
    primary400: '#69C0FF',
    primary500: '#40A9FF',
    primary600: '#1890FF',
    primary700: '#096DD9',
    primary800: '#0050B3',
    primary900: '#003A8C',
    
    gray100: '#FAFAFA',
    gray200: '#F5F5F5',
    gray300: '#E8E8E8',
    gray400: '#D9D9D9',
    gray500: '#BFBFBF',
    gray600: '#8C8C8C',
    gray700: '#595959',
    gray800: '#262626',
    gray900: '#141414',
  },
  space: {
    0: 0,
    1: 4,
    2: 8,
    3: 16,
    4: 24,
    5: 32,
    6: 40,
    7: 48,
    8: 64,
    9: 80,
    true: 10,
  },
  size: {
    0: 0,
    1: 4,
    2: 8,
    3: 16,
    4: 24,
    5: 32,
    6: 40,
    7: 48,
    8: 64,
    9: 80,
    true: 10,
  },
  radius: {
    0: 0,
    1: 4,
    2: 8,
    3: 16,
    4: 24,
    5: 32,
  },
  zIndex: {
    0: 0,
    1: 100,
    2: 200,
    3: 300,
    4: 400,
    5: 500,
  },
})

const headingFont = createInterFont({
  size: {
    6: 13,
    7: 15,
    8: 16,
    9: 18,
    10: 22,
    12: 36,
    14: 48,
    15: 60,
    16: 72,
    true: 10,
  },
  transform: {
    6: 'uppercase',
    7: 'none',
  },
  weight: {
    6: '400',
    7: '600',
    8: '700',
  },
  color: {
    6: '$colorFocus',
    7: '$color',
  },
  letterSpacing: {
    5: 2,
    6: 1,
    7: 0,
    8: -1,
    9: -2,
    10: -3,
    12: -4,
    14: -5,
    15: -6,
    16: -7,
  },
  face: {
    700: { normal: 'InterBold' },
    800: { normal: 'InterBold' },
    900: { normal: 'InterBold' },
  },
})

const bodyFont = createInterFont()

const lightTheme = {
  background: tokens.color.gray100,
  backgroundHover: tokens.color.gray200,
  backgroundPress: tokens.color.gray300,
  backgroundFocus: tokens.color.primary100,
  color: tokens.color.gray900,
  colorHover: tokens.color.gray800,
  colorPress: tokens.color.gray700,
  colorFocus: tokens.color.primary700,
  borderColor: tokens.color.gray300,
  borderColorHover: tokens.color.gray400,
  borderColorFocus: tokens.color.primary500,
  borderColorPress: tokens.color.gray500,
  shadowColor: tokens.color.gray400,
  shadowColorHover: tokens.color.gray500,
  shadowColorPress: tokens.color.gray600,
  shadowColorFocus: tokens.color.primary400,
}

const darkTheme = {
  background: tokens.color.gray900,
  backgroundHover: tokens.color.gray800,
  backgroundPress: tokens.color.gray700,
  backgroundFocus: tokens.color.gray800,
  color: tokens.color.gray100,
  colorHover: tokens.color.gray200,
  colorPress: tokens.color.gray300,
  colorFocus: tokens.color.primary300,
  borderColor: tokens.color.gray700,
  borderColorHover: tokens.color.gray600,
  borderColorFocus: tokens.color.primary600,
  borderColorPress: tokens.color.gray500,
  shadowColor: tokens.color.gray900,
  shadowColorHover: tokens.color.gray800,
  shadowColorPress: tokens.color.gray700,
  shadowColorFocus: tokens.color.primary900,
}

const buttonTheme = {
  background: tokens.color.primary600,
  backgroundHover: tokens.color.primary500,
  backgroundPress: tokens.color.primary700,
  color: '#FFFFFF',
  borderRadius: tokens.radius[2],
}

const inputTheme = {
  background: '#FFFFFF',
  backgroundFocus: tokens.color.primary100,
  borderColor: tokens.color.gray400,
  borderColorFocus: tokens.color.primary500,
  borderRadius: tokens.radius[1],
}

const config = createTamagui({
  defaultFont: 'body',
  shouldAddPrefersColorThemes: true,
  themeClassNameOnRoot: true,
  shorthands,
  fonts: {
    heading: headingFont,
    body: bodyFont,
  },
  themes: {
    light: lightTheme,
    dark: darkTheme,
    button_light: buttonTheme,
    button_dark: {
      ...buttonTheme,
      background: tokens.color.primary700,
    },
    input_light: inputTheme,
    input_dark: {
      ...inputTheme,
      background: tokens.color.gray800,
    },
  },
  tokens,
})

export type AppConfig = typeof config

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config