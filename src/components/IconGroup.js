import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { withNewProps } from '../utils'

const Groups = styled.div`
  display: flex;
  justify-content: ${({ justify }) => justify};
  
  ${({ padded }) => (
    (padded === 'top' && 'padding-top: 1em') ||
    (padded === 'bottom' && 'padding-bottom: 1em') ||
    (padded && 'padding: 1em 0')
  )};
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
  padded,
  className,
  children,
  ...rest
}) => (
  <Groups
    justify={justify}
    padded={padded}
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
  padded: PropTypes.oneOf([false, true, 'top', 'bottom', 'both']),
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}

IconGroup.defaultProps = {
  justify: 'initial',
  padded: false,
  className: ''
}

export default React.memo(IconGroup)
