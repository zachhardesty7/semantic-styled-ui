import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import { getColor, getHoverColor } from "../../utils"

const S = {} // styled-components namespace

S.Link = styled.a`
  text-decoration: underline;
  ${getColor("light")};
  ${getHoverColor("white")};
`

S.Div = styled.div`
  text-align: center;
`

const maybeLowerCase = (str = "", enabled = false) =>
  enabled ? str.toLowerCase() : str

const FooterContent = ({
  copyright = "",
  date = "",
  developerName = "",
  developerLink = "",
  stacked = false,
  lowerCased = false,
  ...rest
}) => {
  const dateObj = date ? new Date(date) : new Date()

  return (
    <S.Div {...rest}>
      {copyright && (
        <>
          {maybeLowerCase(
            `Copyright © ${copyright} ${dateObj.getFullYear()}`,
            lowerCased
          )}

          {dateObj.getFullYear() !== new Date().getFullYear() &&
            ` - ${new Date().getFullYear()}`}
        </>
      )}

      {copyright && developerName && (stacked ? <br /> : " | ")}

      {developerName && (
        <>
          {maybeLowerCase("Designed and Developed by", lowerCased)}
          &nbsp;
          <S.Link href={developerLink}>{developerName}</S.Link>
        </>
      )}
    </S.Div>
  )
}

FooterContent.propTypes = {
  // -------------------------------- Warning -----------------------------------
  // |    These PropTypes are generated from the TypeScript type definitions    |
  // | To update them, edit the .d.ts file and run any yarn dev / build command |
  // ----------------------------------------------------------------------------
  children: PropTypes.node,
  /**
   * company that holds copyright
   */
  copyright: PropTypes.string,
  /**
   * date the copyright began, displays as year.
   *
   * expands to include range from provided date to current year when they don't match
   */
  date: PropTypes.string,
  /**
   * your website or blog or whatever
   */
  developerLink: PropTypes.string,
  /**
   * you!
   */
  developerName: PropTypes.node,
  /**
   * stylistically format text as lower case
   */
  lowerCased: PropTypes.bool,
  /**
   * format content as stacked
   */
  stacked: PropTypes.bool,
}

export { FooterContent }
