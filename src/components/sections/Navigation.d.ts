import * as React from 'react';

export type NavigationAs = string | any;

export type NavigationSize = "small" | "tiny" | "mini" | "large" | "huge" | "massive";

export type NavigationTextAlign = "left" | "center" | "right" | "justify";

export interface NavigationProps {
  /**
   * element type to render as (string or function)
   * supports HTML tag as a string or React component definition
   * @example
   * 'div'
   * 'section'
   * ReactComponent
   * Card
   */
  as?: NavigationAs;
  /**
   * size using "em" units
   */
  size?: NavigationSize;
  /**
   * format to be used with text items
   */
  text?: boolean;
  /**
   * increase whitespace
   */
  relaxed?: boolean,
  /**
   * increase prominence
   */
  primary?: boolean,
  /**
   * don't indicate active page
   */
  noPointing?: boolean,
  /**
   * flip the colors for display on a light colored background
   */
  inverted?: boolean,
  /**
   * allow content to reach the edges of the parent
   */
  fullWidth?: boolean,
  /**
   * elevate nav to sit on top of underlying container
   */
  floating?: boolean,
  /**
   * put all space between children
   * 
   * **NOTE:** only works with 2 items
   */
  split?: boolean,
  /**
   * horizontal position
   */
  textAlign?: NavigationTextAlign;
  /**
   * collection of items to render as menu
   */
  children?: React.ReactNode;
}

export function Navigation(props: NavigationProps): JSX.Element;
