import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { Icon as SUIIcon } from 'semantic-ui-react'
import { Link } from './Link'

import { defaultColors, iconMap } from '../utils'

const S = {} // styled-components namespace

S.Icon = styled(SUIIcon)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ $size }) => iconMap[$size]};
  padding: ${({ $group }) => ($group ? '0 0.5em' : '0')};
  margin: 0;
  opacity: 1;

  color: ${({
    $color,
    $light,
    $inverted,
    theme,
  }) => (
    // if color not provided
    // if light, try light theme then default
    // if inverted, try secondary theme then default
    // else use primary color
    $color ||
    ($light && (theme.light || defaultColors.light)) ||
    ($inverted && (theme.secondary || defaultColors.secondary)) ||
    (theme.primary || defaultColors.primary)
  )};

  ${({ $link }) => $link && css`
    ${S.Wrapper}:hover & {
      /* cursor: pointer; */
      opacity: 1;
      color: ${({
        /* eslint-disable indent */
        $colorHover,
        $light,
        $inverted,
        theme,
      }) => (
          // if colorHover not provided
          // if light, try white theme then default
          // if inverted, try secondary theme then default
          // else use primary color
        $colorHover ||
        ($light && (theme.white || defaultColors.white)) ||
        ($inverted && (theme.primary || defaultColors.primary)) ||
        (theme.secondary || defaultColors.secondary)
      )};
    }
  `};
`

S.Label = styled.span`
  color: ${({
    $color,
    $light,
    $inverted,
    theme,
  }) => (
    $color ||
    ($light && (theme.light || defaultColors.light)) ||
    ($inverted && (theme.secondary || defaultColors.secondary)) ||
    (theme.primary || defaultColors.primary)
  )};

  ${({ $link }) => $link && css`
    ${S.Wrapper}:hover & {
      color: ${({
        $colorHover,
        $light,
        $inverted,
        theme,
      }) => (
        $colorHover ||
        ($light && (theme.white || defaultColors.white)) ||
        ($inverted && (theme.primary || defaultColors.primary)) ||
        (theme.secondary || defaultColors.secondary)
      )};
    }
  `};
`

/* eslint-enable indent */

S.Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ $align }) => ($align === 'center' ? $align : `flex-${$align}`)};
  justify-content: ${({ $align }) => ($align === 'center' ? $align : `flex-${$align}`)};
`

export const Icon = ({
  as,
  name = '',
  label = '',
  link = '',
  align = 'center',
  size = 'medium',
  light = false,
  inverted = false,
  color = '',
  colorHover = '',
  ...rest
}) => (
  <S.Wrapper $align={align}>
    {link ? (
      <Link
        wrap
        as={as}
        link={link}
        {...rest}
      >
        <S.Icon
          name={name.toLowerCase()}
          $link
          size={size}
          $inverted={inverted}
          $light={light}
          $color={color}
          $colorHover={colorHover}
        />
        {label && (
          <S.Label
            link
            $inverted={inverted}
            $light={light}
            $color={color}
            $colorHover={colorHover}
          >
            {label === true ? name : label}
          </S.Label>
        )}
      </Link>
    ) : (
      <>
        <S.Icon
          // forwardedAs={as}
          name={name.toLowerCase()}
          $size={size}
          $inverted={inverted}
          $light={light}
          $color={color}
          $colorHover={colorHover}
          {...rest}
        />
        {label && (
          <S.Label
            $inverted={inverted}
            $light={light}
            $color={color}
            $colorHover={colorHover}
          >
            {label === true ? name : label}
          </S.Label>
        )}
      </>
    )}
  </S.Wrapper>
)

Icon.propTypes = {
  /**
   * icon name as supported by Font Awesome 5.0.8
   *
   * @see - [Icon Name Reference Sheet](https://react.semantic-ui.com/elements/icon/)
   */
  name: PropTypes.string.isRequired,

  /** display a text string with the icon */
  label: PropTypes.oneOfType([
    PropTypes.string, PropTypes.bool,
  ]),

  /**
   * element type to render as (string or function)
   * supports HTML tag as a string or React component definition
   *
   * @example
   *
   * 'div'
   * 'section'
   * ReactComponent
   * Card
   */
  as: PropTypes.oneOfType([
    PropTypes.string, PropTypes.elementType,
  ]),

  /** anchor link (prefixed with "#") or standard href */
  link: PropTypes.string,

  /** position / justification of all content */
  align: PropTypes.oneOf(['start', 'center', 'end']),

  /** size based on "em" units */
  size: PropTypes.oneOf([
    'mini',
    'tiny',
    'small',
    'medium',
    'large',
    'big',
    'bigger',
    'huge',
    'massive',
  ]),

  /** apply css supported color string to Icon and text, overrides theme / default */
  color: PropTypes.string,

  /** apply css supported color string to Icon and text on hover, overrides theme / default */
  colorHover: PropTypes.string,

  /** set color to grey, colorHover to white */
  light: PropTypes.bool,

  /** set color to secondary, colorHover to primary */
  inverted: PropTypes.bool,
}
