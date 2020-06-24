import * as React from 'react';

export type BlurbsFullWidth = boolean | "gutter";

export type BlurbsTextAlign = "left" | "center" | "right" | "justify";

export type BlurbsPadded = boolean | "top" | "bottom" | "both";

export type BlurbsPadding = "compact" | "tight" | "base" | "relaxed" | "loose";

export interface BlurbsProps {
  /**
   * header
   */
  title?: React.ReactNode;
  /**
   * body content proceeding blurbs
   */
  content?: React.ReactNode;
  /**
   * do not restrict width of blurbs container
   */
  fullWidth?: BlurbsFullWidth;
  /**
   * center title and justify body content
   */
  centered?: BlurbsTextAlign;
  /**
   * apply css supported color string to all children, overrides theme / default
   */
  color?: string;
  /**
   * format to appear less prominent (grey background)
   */
  secondary?: boolean;
  /**
   * if/where spacing around element exists
   */
  padded?: BlurbsPadded;
  /**
   * control amount of spacing around element
   */
  padding?: BlurbsPadding;
  /**
   * primary content of Blurbs.Item
   */
  children?: React.ReactNode;
}

export function Blurbs(props: BlurbsProps): JSX.Element;
