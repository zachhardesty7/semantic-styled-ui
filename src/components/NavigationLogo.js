import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { NavigationItem } from './NavigationItem'

import { media } from '../utils'

const logoSizes = {
	small: 90,
	base: 155,
	large: 215,
}

const logoSizesSVG = {
	small: 4,
	base: 6,
	large: 8,
}

const S = {} // styled-components namespace

/* if stacked, set stacked logo spacing & remove underline */
S.Wrapper = styled.div`
  align-self: center;
  
  ${({ stacked }) => stacked && css`
    margin-right: 50%;
    margin-left: 50%;

    & > .item {
      border-bottom: none;
    }
  `};
`

/* use "!important" to override Gatsby-Image inline style */
S.Logo = styled.div`
  padding: 0 0.5em;
  height: 100% !important;
  width: 100% !important;

  /* reset weird behavior in gatsby */
  /* will work with regular img child or gatsby-image picture element */
  img:last-child {
    position: relative !important;
    width: ${({ logoSize }) => logoSizes[logoSize]}px !important;

    @media ${media.phone} {
      width: ${({ logoSize }) => logoSizes[logoSize] * 0.8}px !important;
    }
  }

	svg {
		padding: 0.6em;
		vertical-align: middle;
		width: ${({ logoSize }) => logoSizesSVG[logoSize]}em;

    @media ${media.phone} {
      width: ${({ logoSize }) => logoSizesSVG[logoSize] * 0.8}em;
    }
	}
`

export const NavigationLogo = ({
	as = 'a',
	link = '/',
	stacked = false,
	logoSize = 'base',
	className = '',
	children,
	...rest
}) => (
	<S.Wrapper stacked={stacked} className={className}>
		<NavigationItem
			as={as}
			link={link}
			stacked={stacked}
			pointing={false}
			{...rest}
		>
			<S.Logo as={children.type} {...children.props} logoSize={logoSize} />
		</NavigationItem>
	</S.Wrapper>
)

NavigationLogo.propTypes = {
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
		PropTypes.string,
		PropTypes.elementType,
	]),

	/** anchor link (prefixed with "#") or standard href */
	link: PropTypes.string,

	/** required to support stacking logo */
	stacked: PropTypes.bool,

	/** simple em based size */
	logoSize: PropTypes.oneOf(['small', 'base', 'large']),

	/** additional or pass thru classes for composition */
	className: PropTypes.string,

	/** primary content, usually string, used as link if link not provided */
	children: PropTypes.element.isRequired,
}
