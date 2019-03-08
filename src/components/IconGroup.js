import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { withNewProps } from '../utils'

const Groups = styled.div`
  ${({ compact }) => !compact && 'padding: 1em 0'};
  display: flex;
  justify-content: ${({ justify }) => justify};
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
  justify,
  compact,
  className,
  children,
  ...rest
}) => (
  <Groups
    justify={justify}
    compact={compact}
    className={className}
  >
    {React.Children.map(children, Child => (
      <Group>
        {withNewProps(Child, rest)}
      </Group>
    ))}
  </Groups>
)

IconGroup.propTypes = {
  justify: PropTypes.oneOf(['flex-start', 'center', 'flex-end']),
  compact: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}

IconGroup.defaultProps = {
  justify: 'initial',
  compact: false,
  className: ''
}

export default React.memo(IconGroup)
