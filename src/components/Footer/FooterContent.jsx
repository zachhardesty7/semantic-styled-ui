import React from "react"
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

export const FooterContent = ({
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
