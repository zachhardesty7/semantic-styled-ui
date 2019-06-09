first box is slightly larger than the second box as it overfills available space

```jsx
import { Grid } from 'semantic-ui-react';

<Grid
  textAlign='center'
  columns={3}
  stackable
  doubling
>
  <PortfolioItem
    title = 'Title'
    subtitle = 'Subtitle'
  >
    <img width="200px" src="http://hdimages.org/wp-content/uploads/2017/03/placeholder-image4.jpg" />
  </PortfolioItem>
</Grid>
```

```jsx
import { Grid } from 'semantic-ui-react';

<Grid
  textAlign='center'
  columns={3}
  stackable
  doubling
>
  <PortfolioItem
    title = 'Title'
    subtitle = 'Subtitle'
    fill = {false}
  >
    <img width="200px" src="http://hdimages.org/wp-content/uploads/2017/03/placeholder-image4.jpg" />
  </PortfolioItem>
</Grid>
