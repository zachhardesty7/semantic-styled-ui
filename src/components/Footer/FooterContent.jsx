import React from "react"
import styled from "styled-components"

import { getColor, getHoverColor } from "../../utils"

const S = {} // styled-components namespace

S.Link = styled.a`
  text-decoration: underline;
  ${getColor("light")};
  ${getHoverColor("white")};
`

const maybeLowerCase = (str = "", enabled = false) =>
  enabled ? str.toLowerCase() : str

export const FooterContent = ({
  copyright = "",
  date = new Date(),
  developerName = "",
  developerLink = "",
  stacked = false,
  lowerCased = false,
  ...rest
}) => {
  return (
    <div {...rest}>
      {copyright && (
        <>
          {maybeLowerCase(
            `Copyright © ${copyright} ${date.getFullYear()}`,
            lowerCased
          )}
          {date.getFullYear() !== new Date().getFullYear() &&
            ` - ${new Date().getFullYear()}`}
        </>
      )}

      {copyright && developerName && (stacked ? <br /> : " | ")}

      {developerName && (
        <>
          {maybeLowerCase("Designed and Developed by ", lowerCased)}
          <S.Link href={developerLink}>{developerName}</S.Link>
        </>
      )}
    </div>
  )
}
