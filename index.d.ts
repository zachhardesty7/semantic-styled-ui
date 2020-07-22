// NOTE: valid typings below
/** property name of an object backup theme or any of defaultColors */
export type DefaultColor = keyof typeof import("./src/utils/colors").defaultColors

export type FlattenSimpleInterpolation = import("styled-components").FlattenSimpleInterpolation

/** define styled components supported theme props */
export interface DefaultTheme {
  white: string
  primary: string
  secondary: string
  accent: string
}

// JSDoc helpers
export type Merge<T1, T2> = Omit<T2, keyof T1> & T1

export type Nullable<T> = { [P in keyof T]: T[P] | null }

export type Writeable<T> = { -readonly [P in keyof T]: T[P] }

export type Intersect<T1, T2> = T1 & T2

// interfaces

/** HTMLElement that casts HTML node attributes into HTMLElement */
export interface HTMLNode extends HTMLElement {
  children: HTMLCollectionOf<HTMLNode>
  parentNode: HTMLNode
}

export * from "./src/components"
export * from "./src/utils"

export {
  Image,
  Input,
  Label,
  Loader,
  List,
  Rail,
  Placeholder,
  Reveal,
  Segment,
  Step,
  Button,
  Container,
  Divider,
  Flag,
  Header,
  Breadcrumb,
  Grid,
  Menu,
  Message,
  Table,
  Advertisement,
  Card,
  Comment,
  Statistic,
  Item,
  Accordion,
  Checkbox,
  Dimmer,
  Dropdown,
  Embed,
  Modal,
  Popup,
  Progress,
  Rating,
  Search,
  Sidebar,
  Sticky,
  Transition,
  Tab,
  Visibility,
  Confirm,
  Pagination,
  Portal,
  Radio,
  Ref,
  Responsive,
  Select,
  TextArea,
  TransitionablePortal,
  MountNode,
  Form,
  Icon as SUIIcon,
} from "semantic-ui-react"
