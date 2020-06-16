import * as React from 'react';

export type Section404TextAlign = "left" | "center" | "right" | "justify";

export interface Section404Props {
  /**
   * main message of the error section
   */
  title?: React.ReactNode;
  /**
   * subtitle of main message
   */
  content?: React.ReactNode;
  /**
   * format body content
   */
  textAlign?: Section404TextAlign;
}

export const Section404: React.FC<Section404Props>;