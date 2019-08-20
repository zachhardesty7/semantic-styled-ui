import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {
	Container,
	Grid,
	Header,
	Segment,
} from 'semantic-ui-react'
import Blurb from '../Blurb'

import {
	media,
	paddingMap,
	withNewProps,
	withoutProps,
} from '../../utils'

const S = {} // styled-components namespace

/* set default to relaxed vertical padding */
/* fix absurdly wide blurb segments on tablet size */
/* use "!important" to override .ui.text.container */
S.Blurbs = styled(Segment)`
  ${({ padded, padding }) => (
		(padded === 'top' && `padding-top: ${paddingMap[padding]}`) ||
		(padded === 'bottom' && `padding-bottom: ${paddingMap[padding]}`) ||
		(padded && `padding: ${paddingMap[padding]} 0`)
	)};

  @media ${media.tablet} {
    .container {
      max-width: 397px !important;
      padding: 0 1.5em;
      margin: 0 auto !important;
    }
  }

  @media ${media.phone} {
    .container {
      margin: 0 2em !important;
    }
  }
`

S.Header = styled(Container)`
  /* pad between title/content and items */
  padding-bottom: 2.75em;
`

S.Title = styled(Header)`
  font-size: 3em;
`

const HeaderContentFiltered = withoutProps(Header.Content, ['textAlign'])
S.Content = styled(HeaderContentFiltered)`
  text-align: ${({ textAlign }) => textAlign};
`

const Blurbs = ({
	title,
	content,
	textAlign = 'left',
	color = '',
	secondary = false,
	padded = 'both',
	padding = 'relaxed',
	children,
	...rest
}) => (
	<S.Blurbs
		forwardedAs='section'
		vertical
		basic
		secondary={secondary}
		{...rest}
	>
		{(title || content) && (
			<S.Header text>
				{title && (
					<S.Title forwardedAs='h3' textAlign='center'>{title}</S.Title>
				)}
				{content && (
					<S.Content textAlign={textAlign}>{content}</S.Content>
				)}
			</S.Header>
		)}
		<Container textAlign='center'>
			<Grid
				columns={Math.min(React.Children.count(children), 8)}
				relaxed
				stackable
				divided
				padded
			>
				{React.Children.map(children, blurb => (
					<Grid.Column>
						{withNewProps(blurb, { color })}
					</Grid.Column>
				))}
			</Grid>
		</Container>
	</S.Blurbs>
)

Blurbs.propTypes = {
	/** header */
	title: PropTypes.node,

	/** body content proceeding blurbs */
	content: PropTypes.node,

	/** format body content */
	textAlign: PropTypes.oneOf(['left', 'center', 'right', 'justify']),

	/** apply css supported color string to all children, overrides theme / default */
	color: PropTypes.string,

	/** format to appear less prominent (grey background) */
	secondary: PropTypes.bool,

	/** if/where spacing around element exists */
	padded: PropTypes.oneOf([false, true, 'top', 'bottom', 'both']),

	/** control amount of spacing around element */
	padding: PropTypes.oneOf(['compact', 'tight', 'base', 'relaxed', 'loose']),

	/** primary content of Blurbs.Item */
	children: PropTypes.node,
}

// prevent error of accidentally double memoizing components
const BlurbsMemo = React.memo(Blurbs)
BlurbsMemo.Item = Blurb

export default BlurbsMemo
