// constants/theme.ts
export const fonts = {
    light: 'LexendLight',
    regular: 'Lexend',
    medium: 'LexendMedium',
    semiBold: 'LexendSemiBold',
    bold: 'LexendBold',
  } as const;
  
  export const typography = {
    h1: {
      fontFamily: fonts.bold,
      fontSize: 32,
    },
    h2: {
      fontFamily: fonts.semiBold,
      fontSize: 24,
    },
    h3: {
      fontFamily: fonts.medium,
      fontSize: 20,
    },
    body: {
      fontFamily: fonts.regular,
      fontSize: 16,
    },
    bodySmall: {
      fontFamily: fonts.regular,
      fontSize: 14,
    },
    caption: {
      fontFamily: fonts.light,
      fontSize: 12,
    },
  } as const;