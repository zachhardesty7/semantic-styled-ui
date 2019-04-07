import Blurb from './components/Blurb'
import Form from './components/Form'
import Icon from './components/Icon'
import IconGroup from './components/IconGroup'
import NavigationItem from './components/NavigationItem'
import NavigationLogo from './components/NavigationLogo'
import PortfolioItem from './components/PortfolioItem'

import Blurbs from './components/sections/Blurbs'
import Footer from './components/sections/Footer'
import Hero from './components/sections/Hero'
import Navigation from './components/sections/Navigation'

import defaultColors from './utils/colors'
import media from './utils/media'
import {
  asTag,
  calcDuration,
  camelToKebab,
  encode,
  process,
  toJoinedTitleCase,
  withNewProps,
  withoutProps
} from './utils/helpers'
import {
  getBackgroundColor,
  getColor,
  getHoverBackgroundColor,
  getHoverColor
} from './utils/styled'

export {
  Blurb,
  Blurbs,
  Footer,
  Form,
  Hero,
  Icon,
  IconGroup,
  Navigation,
  NavigationItem,
  NavigationLogo,
  PortfolioItem
}

export {
  defaultColors,
  media,
  asTag,
  calcDuration,
  camelToKebab,
  encode,
  process,
  toJoinedTitleCase,
  withNewProps,
  withoutProps,
  getBackgroundColor,
  getColor,
  getHoverBackgroundColor,
  getHoverColor
}
