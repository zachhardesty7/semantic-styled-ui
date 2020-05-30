import React from 'react'
import PropTypes from 'prop-types'
import { Link as LinkAnchor } from 'react-scroll'

import {
  calcDuration,
  withNewProps,
} from '../utils'

export const Link = ({
  as = 'a',
  link = '',
  wrap = false,
  forwarded = false,
  external = false,
  children,
  ...rest
}) => (
  React.Children.map(children, (Child) => {
    if (!Child) return false // prevent wrapping empty elements
    const anchored = link.includes('#')

    const anchorProps = {
      spy: true,
      smooth: true,
      duration: calcDuration,
    }

    const externalProps = {
      rel: 'noopener noreferrer',
      target: '_blank',
    }

    const props = {
      href: !anchored && !external ? link : undefined,

      // remove "#" for internal anchor or use `/` wrapped `link`
      to: !external && (anchored ? link.slice(link.indexOf('#') + 1) : `/${link}/`),

      ...(anchored && anchorProps),
      ...(external && externalProps),

      ...rest, // does not include `as`
    }

    // use `react-scroll` for smooth scrolling when anchor
    const Tag = anchored ? LinkAnchor : as

    if (wrap) return <Tag {...props}>{Child}</Tag>
    if (forwarded) return withNewProps(Child, { ...props, forwardedAs: Tag })
    return withNewProps(Child, { ...props, as: Tag })
  })
)

Link.propTypes = {
  /**
   * element type to render as (string or function) supports HTML tag as a string or
   * React component definition
   *
   * NOTE: ignored if `link` contains a "#"
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

  /**
   * anchor link (prefixed with "#") or internal link via a new `to` field or can be
   * used as a standard href if `external` tag is set
   */
  link: PropTypes.string,

  /** applies props directly to newly created & rendered `as` component */
  wrap: PropTypes.bool,

  /**
   * when not wrapping, convert `as` tag to `forwardedAs` for passing the prop thru a
   * `styled-components`
   */
  forwarded: PropTypes.bool,

  /** treats as standard href, usually `a` tagged element */
  external: PropTypes.bool,

  /** primary content, usually a string, but handles multiple items */
  children: PropTypes.node.isRequired,
}
