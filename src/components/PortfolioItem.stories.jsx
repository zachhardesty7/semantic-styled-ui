// first box is slightly larger than the second box as it overfills available space
import * as React from "react"
import { Grid } from "semantic-ui-react"
import { PortfolioItem } from "./PortfolioItem"

export default {
  title: "PortfolioItem",
  component: PortfolioItem,
}

export const Item = (...args) => (
  <Grid textAlign="center" columns={3} stackable doubling>
    <PortfolioItem title="Title" subtitle="Subtitle" {...args}>
      <img
        width="200px"
        alt="placeholder"
        src="http://hdimages.org/wp-content/uploads/2017/03/placeholder-image4.jpg"
      />
    </PortfolioItem>
  </Grid>
)

export const Item2 = (...args) => (
  <Grid textAlign="center" columns={3} stackable doubling>
    <PortfolioItem title="Title" subtitle="Subtitle" fill={false} {...args}>
      <img
        width="200px"
        alt="placeholder"
        src="http://hdimages.org/wp-content/uploads/2017/03/placeholder-image4.jpg"
      />
    </PortfolioItem>
  </Grid>
)
