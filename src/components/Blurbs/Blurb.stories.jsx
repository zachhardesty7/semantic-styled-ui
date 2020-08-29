import React from "react"

import { Blurb } from "./Blurb"

// This default export determines where you story goes in the story list
export default {
  title: "Blurb",
  component: Blurb,
}

const Template = (args) => <Blurb {...args} />

export const FirstStory = Template.bind({})

FirstStory.args = {
  /* the args you need here will depend on your component */
}
