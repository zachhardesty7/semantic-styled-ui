import * as React from 'react';

export type NavigationLogoAs = string | any;

export type NavigationLogoLogoSize = "small" | "base" | "large";

export interface NavigationLogoProps {
  /**
   * element type to render as (string or function)
   * supports HTML tag as a string or React component definition
   * @example
   * 'div'
   * 'section'
   * ReactComponent
   * Card
   */
  as?: NavigationLogoAs;
  /**
   * anchor link (prefixed with "#") or standard href
   */
  link?: string;
  /**
   * required to support stacking logo
   */
  stacked?: boolean;
  /**
   * simple em based size
   */
  logoSize?: NavigationLogoLogoSize;
  /**
   * additional or pass thru classes for composition
   */
  className?: string;
  /**
   * primary content, usually string, used as link if link not provided
   */
  children: React.ReactElement<any>;
}

export const NavigationLogo: React.FC<NavigationLogoProps>;
