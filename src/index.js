import * as SSUI from "./components"
import { getComponentName } from "./utils"

// add dev tools tag to each SSUI component
Object.values(SSUI).forEach((component) => {
  // @ts-ignore
  // eslint-disable-next-line no-param-reassign
  component.displayName = `SSUI(${getComponentName(component)})`
})

export * from "./components"
export * from "./utils"

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
} from "semantic-ui-react"
