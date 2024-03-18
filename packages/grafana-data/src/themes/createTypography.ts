// Code based on Material UI
// The MIT License (MIT)
// Copyright (c) 2014 Call-Em-All

import { ThemeColors } from './createColors';

/** @beta */
export interface ThemeTypography extends ThemeTypographyVariantTypes {
  fontFamily: string;
  fontFamilyMonospace: string;
  fontSize: number;
  fontWeightLight: number;
  fontWeightRegular: number;
  fontWeightMedium: number;
  fontWeightBold: number;
  fontWeightBlack: number;
  b1: ThemeTypographyVariant;
  // The font-size on the html element.
  htmlFontSize?: number;

  /**
   * @deprecated
   * from legacy old theme
   * */
  size: {
    base: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
  };

  pxToRem: (px: number) => string;
}

export interface ThemeTypographyVariant {
  fontSize: string;
  fontWeight: number;
  lineHeight: number;
  fontFamily: string;
  letterSpacing?: string;
}

export interface ThemeTypographyInput {
  fontFamily?: string;
  fontFamilyMonospace?: string;
  fontSize?: number;
  fontWeightLight?: number;
  fontWeightRegular?: number;
  fontWeightMedium?: number;
  fontWeightBold?: number;
  fontWeightBlack?: number;
  // hat's the font-size on the html element.
  // 16px is the default font-size used by browsers.
  htmlFontSize?: number;
}

const defaultFontFamily = '"Jio","Inter", "Helvetica", "Arial", sans-serif';
const defaultFontFamilyMonospace = "'Roboto Mono', monospace";

export function createTypography(colors: ThemeColors, typographyInput: ThemeTypographyInput = {}): ThemeTypography {
  const {
    fontFamily = defaultFontFamily,
    fontFamilyMonospace = defaultFontFamilyMonospace,
    // The default font size of the Material Specification.
    fontSize = 14, // px
    fontWeightLight = 200,
    fontWeightRegular = 400,
    fontWeightMedium = 500,
    fontWeightBold = 700,
    fontWeightBlack = 900,
    // Tell Grafana-UI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize = 14,
  } = typographyInput;

  if (process.env.NODE_ENV !== 'production') {
    if (typeof fontSize !== 'number') {
      console.error('Grafana-UI: `fontSize` is required to be a number.');
    }

    if (typeof htmlFontSize !== 'number') {
      console.error('Grafana-UI: `htmlFontSize` is required to be a number.');
    }
  }

  const coef = fontSize / 14;
  const pxToRem = (size: number) => `${(size / htmlFontSize) * coef}rem`;
  const buildVariant = (
    fontWeight: number,
    size: number,
    lineHeight: number,
    letterSpacing: number,
    casing?: object
  ): ThemeTypographyVariant => {
    if (lineHeight % 2 !== 0 || size % 2 !== 0) {
      throw new Error('Font size and line height should be integer multiples of 2 to prevent issues with alignment');
    }

    return {
      fontFamily,
      fontWeight,
      fontSize: pxToRem(size),
      lineHeight: lineHeight / size,
      ...(fontFamily === defaultFontFamily ? { letterSpacing: `${round(letterSpacing / size)}em` } : {}),
      ...casing,
    };
  };

  // All our fonts/line heights should be integer multiples of 2 to prevent issues with alignment
  const variants = {
    h1: buildVariant(fontWeightBlack, 88, 88, -0.03),
    h2: buildVariant(fontWeightBlack, 64, 64, -0.03),
    h3: buildVariant(fontWeightBlack, 40, 40, -0.03),
    h4: buildVariant(fontWeightBlack, 32, 32, -0.03),
    h5: buildVariant(fontWeightBlack, 24, 28, -0.03),
    h6: buildVariant(fontWeightBlack, 16, 20, -0.03),
    body: buildVariant(fontWeightMedium, 14, 22, 0.15),
    b1: buildVariant(fontWeightMedium, 24, 32, -0.5),
    b1Bold: buildVariant(fontWeightBold, 24, 32, 0.15),
    b1Link: buildVariant(fontWeightMedium, fontSize, 22, 0.15),

    b2: buildVariant(fontWeightMedium, fontSize, 22, 0.15),
    b2Bold: buildVariant(fontWeightMedium, fontSize, 22, 0.15),
    b2Link: buildVariant(fontWeightMedium, fontSize, 22, 0.15),

    b3: buildVariant(fontWeightMedium, fontSize, 22, 0.15),
    b3Bold: buildVariant(fontWeightMedium, fontSize, 22, 0.15),
    b3Link: buildVariant(fontWeightMedium, fontSize, 22, 0.15),

    b4: buildVariant(fontWeightMedium, fontSize, 22, 0.15),
    b4Bold: buildVariant(fontWeightMedium, fontSize, 22, 0.15),
    b4Link: buildVariant(fontWeightMedium, fontSize, 22, 0.15),

    b5: buildVariant(fontWeightMedium, fontSize, 22, 0.15),
    b5Bold: buildVariant(fontWeightMedium, fontSize, 22, 0.15),
    b5Link: buildVariant(fontWeightMedium, fontSize, 22, 0.15),
  };

  const size = {
    base: '14px',
    xs: '10px',
    sm: '12px',
    md: '16px',
    lg: '18px',
  };

  return {
    htmlFontSize,
    pxToRem,
    fontFamily,
    fontFamilyMonospace,
    fontSize,
    fontWeightLight,
    fontWeightRegular,
    fontWeightMedium,
    fontWeightBold,
    fontWeightBlack,
    size,
    ...variants,
  };
}

function round(value: number) {
  return Math.round(value * 1e5) / 1e5;
}

export interface ThemeTypographyVariantTypes {
  h1: ThemeTypographyVariant;
  h2: ThemeTypographyVariant;
  h3: ThemeTypographyVariant;
  h4: ThemeTypographyVariant;
  h5: ThemeTypographyVariant;
  h6: ThemeTypographyVariant;
  body: ThemeTypographyVariant;
  b1: ThemeTypographyVariant;
  bodySmall: ThemeTypographyVariant;
  code: ThemeTypographyVariant;
}
