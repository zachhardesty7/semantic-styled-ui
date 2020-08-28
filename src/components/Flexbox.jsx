import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { flexAlignMap } from "../utils"

const S = {} // styled-components namespace

S.Flexbox = styled.div`
  display: flex;
  justify-content: ${({ $justify }) => flexAlignMap[$justify]};
  align-items: ${({ $align }) => flexAlignMap[$align]};
  flex-direction: ${({ $column }) => ($column ? "column" : undefined)};
  flex-wrap: ${({ $wrap }) => ($wrap ? "wrap" : undefined)};
`

S.FlexItem = styled.div`
  /* display: flex; */
`

const Flexbox = ({ justify, align, column, wrap, children, ...rest }) => (
  <S.Flexbox
    $wrap={wrap}
    $justify={justify}
    $align={align}
    $column={column}
    {...rest}
  >
    {React.Children.map(children, (Child) => (
      <S.FlexItem $wrap={wrap} as={Child.type} {...Child.props}>
        {Child.props.children}
      </S.FlexItem>
    ))}
  </S.Flexbox>
)

Flexbox.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them, edit the d.ts file and run any "yarn build"    |
  // ----------------------------------------------------------------------
  /**
   * position / justification of all content
   */
  align: PropTypes.oneOf([
    "center",
    "end",
    "initial",
    "justify",
    "split",
    "start",
  ]),
  /**
   * primary content rendered inside the Flexbox
   */
  children: PropTypes.node,
  /**
   * direction of flex
   */
  column: PropTypes.bool,
  /**
   * position / justification of all content
   */
  justify: PropTypes.oneOf([
    "center",
    "end",
    "initial",
    "justify",
    "split",
    "start",
  ]),
}

export { Flexbox }
