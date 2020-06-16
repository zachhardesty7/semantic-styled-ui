import * as React from 'react';

export type NavigationAs = string | any;

export type NavigationSize = "small" | "tiny" | "mini" | "large" | "huge" | "massive";

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
   * reduce whitespace
   */
  compact?: boolean;
  /**
   * reduce prominence
   */
  secondary?: boolean;
  /**
   * indicate active page
   */
  pointing?: boolean;
  /**
   * horizontal position
   */
  centered?: boolean;
  /**
   * collection of items to render as menu
   */
  children?: React.ReactNode;
}

export const Navigation: React.FC<NavigationProps>;
