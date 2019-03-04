import React from 'react'
import PropTypes from 'prop-types'

import {
  Container,
  Header
} from 'semantic-ui-react'
import Form from '../components/Form'

const FormSection = ({
  name,
  header,
  headerAs,
  content,
  fields,
  textArea,
  button,
  className
}) => (
  <Container text className={className}>
    <Container text>
      {header && (
        <Header as={headerAs} textAlign='center'>{header}</Header>
      )}
      {content && (
        <Header.Content>{content}</Header.Content>
      )}
    </Container>
    <Form
      // TODO: convert to children
      name={name}
      fields={fields}
      textArea={textArea}
      button={button}
    />
  </Container>
)

FormSection.propTypes = {
  name: PropTypes.string,
  header: PropTypes.string,
  headerAs: PropTypes.string,
  content: PropTypes.node,
  fields: PropTypes.arrayOf(PropTypes.string),
  textArea: PropTypes.oneOfType([
    PropTypes.string, PropTypes.bool
  ]),
  button: PropTypes.string,
  className: PropTypes.string
}

FormSection.defaultProps = {
  name: '',
  header: '',
  headerAs: 'h3',
  content: [],
  fields: [],
  textArea: true,
  button: 'Submit',
  className: ''
}

export default React.memo(FormSection)
