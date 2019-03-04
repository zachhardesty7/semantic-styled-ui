import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'

import { withNewProps } from '../utils'

const Groups = styled.div`
  ${({ compact }) => !compact && 'padding: 1em 0'};
  display: flex;
  justify-content: ${({ justify }) => (justify)};
`

const Group = styled.div`
  display: flex;
  margin: 0;
  padding: 0 0.5em;

  &:first-child {
    padding-left: 0;
  }

  &:last-child {
    padding-right: 0;
  }
`

const IconGroup = ({
  children,
  justify,
  compact,
  ...rest
}) => (
  <Groups justify={justify} compact={compact}>
    {React.Children.map(children, Child => (
      <Group>
        {withNewProps(Child, rest)}
      </Group>
    ))}
  </Groups>
)

IconGroup.propTypes = {
  children: PropTypes.node.isRequired,
  justify: PropTypes.oneOf(['flex-start', 'center', 'flex-end']),
  size: PropTypes.oneOf(['mini', 'tiny', 'small', 'large', 'big', 'huge', 'massive']),
  compact: PropTypes.bool,
  hoverColor: PropTypes.string,
  color: PropTypes.string,
  inverted: PropTypes.bool
}

IconGroup.defaultProps = {
  justify: 'initial',
  size: 'large',
  compact: false,
  color: '',
  hoverColor: '',
  inverted: false
}

export default React.memo(IconGroup)
