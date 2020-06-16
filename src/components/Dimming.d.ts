import * as React from 'react';

export interface DimmingProps {
  /**
   * hovering over this activates dimmer
   */
  trigger?: React.ReactElement<any>;
  /**
   * nodes displayed within dimmer
   */
  children?: React.ReactNode;
}

export const Dimming: React.FC<DimmingProps>;
