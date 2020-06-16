import * as React from 'react';

export type HeroOverlay = "dark" | "darker";

export type HeroBaseline = "top" | "bottom";

export type HeroUnderline = string | boolean;

export type HeroSize = "compact" | "base" | "relaxed";

export type HeroLogo = React.ReactElement<any> | Object;

export interface HeroProps {
  /**
   * darken background image to improve readability
   */
  overlay?: HeroOverlay;
  /**
   * align content to top or bottom
   */
  baseline?: HeroBaseline;
  /**
   * apply css supported color string or use default if true
   */
  underline?: HeroUnderline;
  /**
   * size using "em" units
   */
  size?: HeroSize;
  /**
   * image of logo
   */
  logo?: HeroLogo;
  /**
   * format logo left of content
   */
  inlineLogo?: boolean;
  /**
   * apply css supported color string to Icon and text, overrides theme / default
   */
  color?: string;
  /**
   * primary content
   */
  title?: React.ReactNode;
  /**
   * secondary content
   */
  subtitle?: React.ReactNode;
  /**
   * call-to-action @see [`HeaderButton`](#headerbutton)
   */
  button?: React.ReactNode;
  /**
   * background images
   */
  children?: React.ReactNode;
}

export const Hero: React.FC<HeroProps>;
