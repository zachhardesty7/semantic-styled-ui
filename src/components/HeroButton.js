import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Button } from 'semantic-ui-react'

import Icon from './Icon'

import {
  applyTag,
  calcDuration,
  getBackgroundColor,
  getColor,
  getHoverBackgroundColor,
  process,
  withoutProps
} from '../utils'

const FilteredStyledButton = applyTag(withoutProps(Button, ['color', 'backgroundColor', 'backgroundColorHover']))
const StyledButton = styled(FilteredStyledButton)`
  && {
    ${getColor('white')}
    ${getBackgroundColor('secondary')}
    transition: ease-in-out 50ms;

    ${getHoverBackgroundColor('primary')}
    &:hover {
      transition: ease-in-out 100ms;
    }
  }
`

const HeroIcon = styled(Icon)`
  && {
    ${getColor('white')};
    ${({ pointing }) => (pointing === 'left' ? 'margin-right: .75em !important' : 'margin-left: .75em !important')} ;
    vertical-align: bottom;
    width: 1em;
    height: 1em;
  }
`

const HeroButton = ({
  to,
  tag,
  anchor,
  pointing,
  compact,
  color,
  colorHover,
  className,
  children
}) => (
  <Button
    as={StyledButton}
    tag={tag}
    to={to || `/${process(children.toString())}/`}
    size='huge'
    tabIndex='0'
    spy={anchor || undefined}
    smooth={anchor || undefined}
    duration={anchor ? calcDuration : undefined}
    primary
    compact={compact}
    backgroundColor={color}
    backgroundColorHover={colorHover}
    className={className}
  >
    {pointing === 'left' && (
      <HeroIcon pointing={pointing} name='angle left' />
    )}
    {children}
    {pointing && pointing !== 'left' && (
      <HeroIcon pointing={pointing} name='angle right' />
    )}
  </Button>
)

HeroButton.propTypes = {
  to: PropTypes.string,
  tag: PropTypes.oneOfType([
    PropTypes.string, PropTypes.element
  ]),
  anchor: PropTypes.bool,
  pointing: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['left', 'right'])
  ]),
  compact: PropTypes.bool,
  color: PropTypes.string,
  colorHover: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node
}

HeroButton.defaultProps = {
  to: '',
  tag: 'a',
  anchor: false,
  pointing: 'right',
  compact: false,
  color: '',
  colorHover: '',
  className: '',
  children: null
}

export default React.memo(HeroButton)
