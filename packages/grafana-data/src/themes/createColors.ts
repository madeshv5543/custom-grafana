import { merge } from 'lodash';

import { alpha, darken, emphasize, getContrastRatio, lighten } from './colorManipulator';
import { palette } from './palette';
import { DeepPartial, ThemeRichColor } from './types';

/** @internal */
export type ThemeColorsMode = 'light' | 'dark';

/** @internal */
export interface ThemeColorsBase<TColor> {
  mode: ThemeColorsMode;

  primary: TColor;
  secondary: TColor;
  info: TColor;
  error: TColor;
  success: TColor;
  warning: TColor;

  text: {
    primary: string;
    secondary: string;
    disabled: string;
    link: string;
    /** Used for auto white or dark text on colored backgrounds */
    maxContrast: string;
    panelPrimary: string;
    panelSecondary: string;
  };

  background: {
    /** Dashboard and body background */
    canvas: string;
    /** Primary content pane background (panels etc) */
    primary: string;
    /** Cards and elements that need to stand out on the primary background */
    secondary: string;
    header: string;
    panelPrimary: string;
    panelSecondary: string;

  };

  jdsColors: {
    menu1: string,
    menu2: string,
    menu3: string,
    menuText: string,
    menuActivetext: string,
    menuhovertext: string,
    blogbackground: string,
    blogDate: string,
    blogtitlt: string,
    blogText: string,
    linkText: string,
    linkHover: string,
    inputBackground: string,
    inputTextColor: string,
    breadcrumText: string,
    iconPrimary: string,
    iconDefault: string,
    iconHoverColor: string,
    iconHoverBackground: string,
    iconPressedColor: string,
    iconPressedBackground: string,
    moreMenuBackground: string,
    moreMenuTextColor: string,
    moreMenuItemHoverBg: string,
    moreMenuItemHoverText: string,
    tableHeaderBackgroundColor: string,
    tableHeaderTextColor: string,
    tableHeaderRowBg: string,
    tableHeaderRowTextColor: string,
    tableHeaderRowBgHover: string,
    checkboxBorderColor: string,
    modelBackgroundColor: string,
    modelBackdropColor: string,
    tooltipBackgroundColor: string,
    tooltipTextColor: string,
    widgetMoreOptionBackgroundColor: string,
    widgetMoreOptionTextColor: string,
    widgetMoreOptionHoverBackground: string,
    widgetMoreOptionHoverTextColor: string,
    buttonBorderColor: string,
    headerSearchbarBackgroundColor: string,
    headerSearchbarTextColor: string,
    cardBackGroundColor: string,
    callToActionCardBackground: string,
  }

  border: {
    weak: string;
    medium: string;
    strong: string;
  };

  gradients: {
    brandVertical: string;
    brandHorizontal: string;
  };

  action: {
    /** Used for selected menu item / select option */
    selected: string;
    /**
     * @alpha (Do not use from plugins)
     * Used for selected items when background only change is not enough (Currently only used for FilterPill)
     **/
    selectedBorder: string;
    /** Used for hovered menu item / select option */
    hover: string;
    /** Used for button/colored background hover opacity */
    hoverOpacity: number;
    /** Used focused menu item / select option */
    focus: string;
    /** Used for disabled buttons and inputs */
    disabledBackground: string;
    /** Disabled text */
    disabledText: string;
    /** Disablerd opacity */
    disabledOpacity: number;
  };

  hoverFactor: number;
  contrastThreshold: number;
  tonalOffset: number;
}

export interface ThemeHoverStrengh {}

/** @beta */
export interface ThemeColors extends ThemeColorsBase<ThemeRichColor> {
  /** Returns a text color for the background */
  getContrastText(background: string, threshold?: number): string;
  /* Brighten or darken a color by specified factor (0-1) */
  emphasize(color: string, amount?: number): string;
}

/** @internal */
export type ThemeColorsInput = DeepPartial<ThemeColorsBase<ThemeRichColor>>;

// class DarkColors implements ThemeColorsBase<Partial<ThemeRichColor>> {
//   mode: ThemeColorsMode = 'dark';

//   // Used to get more white opacity colors
//   whiteBase = '204, 204, 220';

//   border = {
//     weak: `rgba(${this.whiteBase}, 0.12)`,
//     medium: `rgba(${this.whiteBase}, 0.20)`,
//     strong: `rgba(${this.whiteBase}, 0.30)`,
//   };

//   text = {
//     primary: `rgb(${this.whiteBase})`,
//     secondary: `rgba(${this.whiteBase}, 0.65)`,
//     disabled: `rgba(${this.whiteBase}, 0.6)`,
//     link: palette.blueDarkText,
//     maxContrast: palette.white,
//     panelPrimary: '',
//     panelSecondary: ''
//   };

//   primary = {
//     main: palette.lightMidnightSky50,
//     text: palette.lightMidnightSkyInverse,
//     border: palette.lightMidnightSky50,
//   };

//   secondary = {
//     main: palette.lightMidnightSky30,
//     shade: `rgba(${this.whiteBase}, 0.14)`,
//     transparent: `rgba(${this.whiteBase}, 0.08)`,
//     text: palette.lightMidnightSky70,
//     contrastText: `rgb(${this.whiteBase})`,
//     border: `rgba(${this.whiteBase}, 0.08)`,
//   };

//   info = this.primary;

//   error = {
//     main: palette.redDarkMain,
//     text: palette.redDarkText,
//   };

//   success = {
//     main: palette.greenDarkMain,
//     text: palette.greenDarkText,
//   };

//   warning = {
//     main: palette.orangeDarkMain,
//     text: palette.orangeDarkText,
//   };

//   // background = {
//   //   canvas: palette.gray05,
//   //   primary: palette.gray10,
//   //   secondary: palette.gray15,
//   //   header: palette.jdsbackgroundPrimary,
//   //   panelPrimary: palette.jdsPanelPrimaryBackground,
//   //   panelSecondary: palette.jdsPanelPrimaryBackground
//   // };

//   background = {
//     canvas: palette.jdsbackgroundSecondary,
//     primary: palette.gray10,
//     secondary: palette.gray15,
//     header: palette.jdsbackgroundPrimary,
//     panelPrimary: palette.jdsPanelPrimaryBackground,
//     panelSecondary: palette.jdsPanelPrimaryBackground
//   };

//   jdsColors={
//     menu1:'',
//     menu2:'',
//     menu3:'',
//     menuText:'',
//     blogbackground:'',
//     menuActivetext:'',
//     menuhovertext:'',
//     blogDate:'',
//     blogtitlt:'',
//     blogText:'',
//     linkText:'',
//     linkHover:'',
//     inputBackground:'',
//     inputTextColor:palette.lightMidnightBackground,
//     breadcrumText:'',
//     iconPrimary:'',
//     iconDefault: '',
//     iconHoverColor: '',
//     iconHoverBackground: '',
//     iconPressedColor: '',
//     iconPressedBackground: '',
//     moreMenuBackground: '',
//     moreMenuTextColor: '',
//     moreMenuItemHoverBg: '',
//     moreMenuItemHoverText: '',
//     tableHeaderBackgroundColor: '',
//     tableHeaderTextColor: '',
//     tableHeaderRowBg: '',
//     tableHeaderRowTextColor: '',
//     tableHeaderRowBgHover: '',
//     checkboxBorderColor: '',
//     modelBackgroundColor: '',
//     modelBackdropColor: '',
//     tooltipBackgroundColor: '',
//     tooltipTextColor: '',
//     widgetMoreOptionBackgroundColor: '',
//     widgetMoreOptionTextColor: '',
//     widgetMoreOptionHoverBackground: '',
//     widgetMoreOptionHoverTextColor:'',
//     buttonBorderColor:'',
//     headerSearchbarBackgroundColor: '',
//     headerSearchbarTextColor: ''
//   }


//   action = {
//     hover: `rgba(${this.whiteBase}, 0.16)`,
//     selected: `rgba(${this.whiteBase}, 0.12)`,
//     selectedBorder: palette.orangeDarkMain,
//     focus: `rgba(${this.whiteBase}, 0.16)`,
//     hoverOpacity: 0.08,
//     disabledText: this.text.disabled,
//     disabledBackground: `rgba(${this.whiteBase}, 0.04)`,
//     disabledOpacity: 0.38,
//   };

//   gradients = {
//     brandHorizontal: 'linear-gradient(270deg, #0078AD 0%, #0078AD 100%)',
//     brandVertical: 'linear-gradient(0.01deg, #0078AD 0.01%, #0078AD 99.99%)',
//   };

//   contrastThreshold = 3;
//   hoverFactor = 0.03;
//   tonalOffset = 0.15;
// }

class LightColors implements ThemeColorsBase<Partial<ThemeRichColor>> {
  mode: ThemeColorsMode = 'light';

  blackBase = '36, 41, 46';

  primary = {
    main: palette.blueLightMain,
    border: palette.blueLightText,
    text: palette.blueLightText,
  };

  text = {
    primary: `rgba(${this.blackBase}, 1)`,
    secondary: `rgba(${this.blackBase}, 0.75)`,
    disabled: `rgba(${this.blackBase}, 0.50)`,
    link: this.primary.text,
    maxContrast: palette.black,
    panelPrimary: '',
    panelSecondary: ''
  };

  border = {
    weak: `rgba(${this.blackBase}, 0.12)`,
    medium: `rgba(${this.blackBase}, 0.30)`,
    strong: `rgba(${this.blackBase}, 0.40)`,
  };

  secondary = {
    main: `rgba(${this.blackBase}, 0.08)`,
    shade: `rgba(${this.blackBase}, 0.15)`,
    transparent: `rgba(${this.blackBase}, 0.08)`,
    contrastText: `rgba(${this.blackBase},  1)`,
    text: this.text.primary,
    border: this.border.weak,
  };

  info = {
    main: palette.blueLightMain,
    text: palette.blueLightText,
  };

  error = {
    main: palette.redLightMain,
    text: palette.redLightText,
    border: palette.redLightText,
  };

  success = {
    main: palette.greenLightMain,
    text: palette.greenLightText,
  };

  warning = {
    main: palette.orangeLightMain,
    text: palette.orangeLightText,
  };

  background = {
    canvas: palette.gray90,
    primary: palette.white,
    secondary: palette.gray100,
    header: palette.jdsbackgroundPrimary,
    panelPrimary: palette.jdsPanelPrimaryBackground,
    panelSecondary: palette.jdsPanelPrimaryBackground
  };

  jdsColors={
    menu1:'',
    menu2:'',
    menu3:'',
    menuText:'',
    menuActivetext:'',
    menuhovertext:'',
    blogbackground:'',
    blogDate:'',
    blogtitlt:'',
    blogText:'',
    linkText:'',
    linkHover:'',
    inputBackground:'',
    inputTextColor:palette.lightMidnightBackground,
    breadcrumText:'',
    iconPrimary:'',
    iconDefault: '',
    iconHoverColor: '',
    iconHoverBackground: '',
    iconPressedColor: '',
    iconPressedBackground: '',
    moreMenuBackground: '',
    moreMenuTextColor: '',
    moreMenuItemHoverBg: '',
    moreMenuItemHoverText: '',
    tableHeaderBackgroundColor: '',
    tableHeaderTextColor: '',
    tableHeaderRowBg: '',
    tableHeaderRowTextColor: '',
    tableHeaderRowBgHover: '',
    checkboxBorderColor: '',
    modelBackgroundColor: '',
    modelBackdropColor: '',
    tooltipBackgroundColor:  palette.lightMidnightSky50,
    tooltipTextColor: palette.lightMidnightSkyInverse,
    widgetMoreOptionBackgroundColor: '',
    widgetMoreOptionTextColor: '',
    widgetMoreOptionHoverBackground: '',
    widgetMoreOptionHoverTextColor:'',
    buttonBorderColor: '',
    headerSearchbarBackgroundColor: '',
    headerSearchbarTextColor: '',
    cardBackGroundColor:'',
    callToActionCardBackground:'',
  }

  action = {
    hover: `rgba(${this.blackBase}, 0.12)`,
    selected: `rgba(${this.blackBase}, 0.08)`,
    selectedBorder: palette.orangeLightMain,
    hoverOpacity: 0.08,
    focus: `rgba(${this.blackBase}, 0.12)`,
    disabledBackground: `rgba(${this.blackBase}, 0.04)`,
    disabledText: this.text.disabled,
    disabledOpacity: 0.38,
  };

  gradients = {
    brandHorizontal: 'linear-gradient(270deg, #0078AD 0%, #0078AD 100%)',
    brandVertical: 'linear-gradient(0.01deg, #0078AD 0.01%, #0078AD 99.99%)',
  };

  contrastThreshold = 3;
  hoverFactor = 0.03;
  tonalOffset = 0.2;
}

class JdsDarkColors implements ThemeColorsBase<Partial<ThemeRichColor>> {
  mode: ThemeColorsMode = 'dark';

  // Used to get more white opacity colors
  whiteBase = '204, 204, 220';

  border = {
    weak: `rgba(${this.whiteBase}, 0.12)`,
    medium: `rgba(${this.whiteBase}, 0.20)`,
    strong: `rgba(${this.whiteBase}, 0.30)`,
  };

  text = {
    primary: palette.lightMidnightSkyGrey100,
    secondary: palette.lightMidnightSkyGrey80,
    disabled: `rgba(${this.whiteBase}, 0.6)`,
    link: palette.lightMidnightSkyGrey100,
    maxContrast: palette.white,
    panelPrimary: palette.jdsPanelPrimaryText,
    panelSecondary: palette.jdsPanelSecondaryBackground
  };

  jdsColors={
    menu1:palette.lightMidnightBackground,
    menu2:palette.lightMidnightSky20,
    menu3:palette.lightMidnightSky50,
    menuText: palette.lightMidnightSkyGrey100,
    menuActivetext:palette.lightMidnightSky60,
    menuhovertext:'',
    blogbackground:palette.lightMidnightSkyGrey20,
    blogDate:palette.lightMidnightSkyGrey60,
    blogtitlt:palette.lightMidnightSky50,
    blogText:palette.lightMidnightBackground,
    linkText:palette.lightMidnightSkyGrey100,
    linkHover:palette.lightMidnightSky50,
    inputBackground:palette.lightMidnightSkyGrey20,
    inputTextColor:palette.lightMidnightSkyGrey80,
    breadcrumText: palette.lightMidnightBackground,
    iconPrimary:palette.lightMidnightBackground,
    iconDefault: palette.lightMidnightBackground,
    iconHoverColor: palette.lightMidnightSkyInverse,
    iconHoverBackground: palette.lightMidnightSky60,
    iconPressedColor: palette.lightMidnightSky30,
    iconPressedBackground: palette.lightMidnightSky60,
    moreMenuBackground: palette.lightMidnightBackground,
    moreMenuTextColor: palette.lightMidnightSkyGrey80,
    moreMenuItemHoverBg: palette.lightMidnightSky20,
    moreMenuItemHoverText: palette.lightMidnightSky50,
    tableHeaderBackgroundColor: palette.lightMidnightSkyGrey20,
    tableHeaderTextColor: palette.lightMidnightSkyGrey100,
    tableHeaderRowBg: palette.lightMidnightBackground,
    tableHeaderRowTextColor: palette.lightMidnightSkyGrey100,
    tableHeaderRowBgHover: palette.lightMidnightSky20,
    checkboxBorderColor: palette.lightMidnightSkyGrey100,
    modelBackgroundColor: palette.lightMidnightSkyGrey20,
    modelBackdropColor: palette.lightMidnightSkyGrey20,
    tooltipBackgroundColor: palette.lightMidnightSky50,
    tooltipTextColor: palette.lightMidnightSkyInverse,
    widgetMoreOptionBackgroundColor:palette.lightMidnightSky50 ,
    widgetMoreOptionTextColor: palette.lightMidnightSkyInverse,
    widgetMoreOptionHoverBackground:  palette.lightMidnightSky60,
    widgetMoreOptionHoverTextColor:palette.lightMidnightSkyInverse,
    buttonBorderColor: palette.lightMidnightSkyGrey60,
    headerSearchbarBackgroundColor: palette.lightMidnightSky60,
    headerSearchbarTextColor: palette.lightMidnightBackground,
    cardBackGroundColor: palette.lightMidnightBackground,
    callToActionCardBackground: palette.lightMidnightBackground,
  }

  primary = {
    main: palette.lightMidnightSky50,
    text: palette.lightMidnightSkyInverse,
    border: palette.lightMidnightSky50,
  }

  secondary = {
    main: palette.lightMidnightSky30,
    shade: `rgba(${this.whiteBase}, 0.14)`,
    transparent: `rgba(${this.whiteBase}, 0.08)`,
    text: palette.lightMidnightSky60,
    contrastText: `rgb(${this.whiteBase})`,
    border: `rgba(${this.whiteBase}, 0.08)`,
  };


  info = this.primary;

  error = {
    main: palette.redDarkMain,
    text: palette.redDarkText,
  };

  success = {
    main: palette.greenDarkMain,
    text: palette.greenDarkText,
  };

  warning = {
    main: palette.orangeDarkMain,
    text: palette.orangeDarkText,
  };

  background = {
    canvas: palette.jdsbackgroundSecondary,
    primary: palette.gray10,
    secondary: palette.gray15,
    header: palette.jdsbackgroundPrimary,
    panelPrimary: palette.jdsPanelPrimaryBackground,
    panelSecondary: palette.jdsPanelPrimaryBackground
  };



  action = {
    hover: `rgba(${this.whiteBase}, 0.16)`,
    selected: `rgba(${this.whiteBase}, 0.12)`,
    selectedBorder: palette.orangeDarkMain,
    focus: `rgba(${this.whiteBase}, 0.16)`,
    hoverOpacity: 0.08,
    disabledText: this.text.disabled,
    disabledBackground: `rgba(${this.whiteBase}, 0.04)`,
    disabledOpacity: 0.38,
  };

  gradients = {
    brandHorizontal: 'linear-gradient(270deg, #0078AD 0%, #0078AD 100%)',
    brandVertical: 'linear-gradient(0.01deg, #0078AD 0.01%, #0078AD 99.99%)',
  };

  contrastThreshold = 3;
  hoverFactor = 0.03;
  tonalOffset = 0.15;
}


class JdsLightColors implements ThemeColorsBase<Partial<ThemeRichColor>> {
  mode: ThemeColorsMode = 'light';

  blackBase = '36, 41, 46';

  // primary = {
  //   main: palette.blueLightMain,
  //   border: palette.blueLightText,
  //   text: palette.blueLightText,
  // };

  primary = {
    main: palette.lightMidnightSky50,
    text: palette.lightMidnightSkyInverse,
    border: palette.lightMidnightSky50,
  }


  text = {
    primary: `rgba(${this.blackBase}, 1)`,
    secondary: `rgba(${this.blackBase}, 0.75)`,
    disabled: `rgba(${this.blackBase}, 0.50)`,
    link: this.primary.text,
    maxContrast: palette.black,
    panelPrimary: '',
    panelSecondary: ''
  };


 

  secondary = {
    main: palette.lightMidnightSky30,
    shade: `rgba(${this.blackBase}, 0.14)`,
    transparent: `rgba(${this.blackBase}, 0.08)`,
    text: palette.lightMidnightSky60,
    contrastText: `rgb(${this.blackBase})`,
    border: `rgba(${this.blackBase}, 0.08)`,
  };


  border = {
    weak: `rgba(${this.blackBase}, 0.12)`,
    medium: `rgba(${this.blackBase}, 0.30)`,
    strong: `rgba(${this.blackBase}, 0.40)`,
  };

  // secondary = {
  //   main: `rgba(${this.blackBase}, 0.08)`,
  //   shade: `rgba(${this.blackBase}, 0.15)`,
  //   transparent: `rgba(${this.blackBase}, 0.08)`,
  //   contrastText: `rgba(${this.blackBase},  1)`,
  //   text: this.text.primary,
  //   border: this.border.weak,
  // };

  info = {
    main: palette.blueLightMain,
    text: palette.blueLightText,
  };

  error = {
    main: palette.redLightMain,
    text: palette.redLightText,
    border: palette.redLightText,
  };

  success = {
    main: palette.greenLightMain,
    text: palette.greenLightText,
  };

  warning = {
    main: palette.orangeLightMain,
    text: palette.orangeLightText,
  };

  background = {
    canvas: palette.gray90,
    primary: palette.white,
    secondary: palette.gray100,
    header: palette.jdsbackgroundPrimary,
    panelPrimary: palette.jdsPanelPrimaryBackground,
    panelSecondary: palette.jdsPanelPrimaryBackground
  };


  jdsColors={
    menu1:palette.lightMidnightBackground,
    menu2:palette.lightMidnightSky20,
    menu3:palette.lightMidnightSky50,
    menuText: palette.lightMidnightSkyGrey100,
    menuActivetext:palette.lightMidnightSky60,
    menuhovertext:'',
    blogbackground:palette.lightMidnightSkyGrey20,
    blogDate:palette.lightMidnightSkyGrey60,
    blogtitlt:palette.lightMidnightSky50,
    blogText:palette.lightMidnightBackground,
    linkText:palette.lightMidnightSkyGrey100,
    linkHover:palette.lightMidnightSky50,
    inputBackground:palette.lightMidnightSkyGrey20,
    inputTextColor:palette.lightMidnightSkyGrey80,
    breadcrumText: palette.lightMidnightBackground,
    iconPrimary:palette.lightMidnightBackground,
    iconDefault: palette.lightMidnightBackground,
    iconHoverColor: palette.lightMidnightSkyInverse,
    iconHoverBackground: palette.lightMidnightSky60,
    iconPressedColor: palette.lightMidnightSky30,
    iconPressedBackground: palette.lightMidnightSky60,
    moreMenuBackground: palette.lightMidnightBackground,
    moreMenuTextColor: palette.lightMidnightSkyGrey80,
    moreMenuItemHoverBg: palette.lightMidnightSky20,
    moreMenuItemHoverText: palette.lightMidnightSky50,
    tableHeaderBackgroundColor: palette.lightMidnightSkyGrey20,
    tableHeaderTextColor: palette.lightMidnightSkyGrey100,
    tableHeaderRowBg: palette.lightMidnightBackground,
    tableHeaderRowTextColor: palette.lightMidnightSkyGrey100,
    tableHeaderRowBgHover: palette.lightMidnightSky20,
    checkboxBorderColor: palette.lightMidnightSkyGrey100,
    modelBackgroundColor: palette.lightMidnightSkyGrey20,
    modelBackdropColor: palette.lightMidnightSkyGrey20,
    tooltipBackgroundColor: palette.lightMidnightSky50,
    tooltipTextColor: palette.lightMidnightSkyInverse,
    widgetMoreOptionBackgroundColor:palette.lightMidnightSky50 ,
    widgetMoreOptionTextColor: palette.lightMidnightSkyInverse,
    widgetMoreOptionHoverBackground:  palette.lightMidnightSky60,
    widgetMoreOptionHoverTextColor:palette.lightMidnightSkyInverse,
    buttonBorderColor: palette.lightMidnightSkyGrey60,
    headerSearchbarBackgroundColor: palette.lightMidnightSky60,
    headerSearchbarTextColor: palette.lightMidnightBackground,
    cardBackGroundColor: palette.lightMidnightBackground,
    callToActionCardBackground: palette.lightMidnightBackground,
  }

  action = {
    hover: `rgba(${this.blackBase}, 0.12)`,
    selected: `rgba(${this.blackBase}, 0.08)`,
    selectedBorder: palette.orangeLightMain,
    hoverOpacity: 0.08,
    focus: `rgba(${this.blackBase}, 0.12)`,
    disabledBackground: `rgba(${this.blackBase}, 0.04)`,
    disabledText: this.text.disabled,
    disabledOpacity: 0.38,
  };

  gradients = {
    brandHorizontal: 'linear-gradient(270deg, #0078AD 0%, #0078AD 100%)',
    brandVertical: 'linear-gradient(0.01deg, #0078AD 0.01%, #0078AD 99.99%)',
  };

  contrastThreshold = 3;
  hoverFactor = 0.03;
  tonalOffset = 0.2;
}


export function createColors(colors: ThemeColorsInput): ThemeColors {
  const dark = new JdsDarkColors();
  const light = new JdsLightColors();
  const base = (colors.mode ?? 'dark') === 'dark' ? dark : light;
  const {
    primary = base.primary,
    secondary = base.secondary,
    info = base.info,
    warning = base.warning,
    success = base.success,
    error = base.error,
    tonalOffset = base.tonalOffset,
    hoverFactor = base.hoverFactor,
    contrastThreshold = base.contrastThreshold,
    ...other
  } = colors;

  function getContrastText(background: string, threshold: number = contrastThreshold) {
    const contrastText =
      getContrastRatio(dark.text.maxContrast, background, base.background.primary) >= threshold
        ? dark.text.maxContrast
        : light.text.maxContrast;
    // todo, need color framework
    return contrastText;
  }

  const getRichColor = ({ color, name }: GetRichColorProps): ThemeRichColor => {
    color = { ...color, name };
    if (!color.main) {
      throw new Error(`Missing main color for ${name}`);
    }
    if (!color.text) {
      color.text = color.main;
    }
    if (!color.border) {
      color.border = color.text;
    }
    if (!color.shade) {
      color.shade = base.mode === 'light' ? darken(color.main, tonalOffset) : lighten(color.main, tonalOffset);
    }
    if (!color.transparent) {
      color.transparent = alpha(color.main, 0.15);
    }
    if (!color.contrastText) {
      color.contrastText = getContrastText(color.main);
    }
    if (!color.borderTransparent) {
      color.borderTransparent = alpha(color.border, 0.25);
    }
    return color as ThemeRichColor;
  };

  return merge(
    {
      ...base,
      primary: getRichColor({ color: primary, name: 'primary' }),
      secondary: getRichColor({ color: secondary, name: 'secondary' }),
      info: getRichColor({ color: info, name: 'info' }),
      error: getRichColor({ color: error, name: 'error' }),
      success: getRichColor({ color: success, name: 'success' }),
      warning: getRichColor({ color: warning, name: 'warning' }),
      getContrastText,
      emphasize: (color: string, factor?: number) => {
        return emphasize(color, factor ?? hoverFactor);
      },
    },
    other
  );
}

interface GetRichColorProps {
  color: Partial<ThemeRichColor>;
  name: string;
}
