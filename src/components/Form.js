import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  Container,
  Form,
  Message,
  Transition,
  Header
} from 'semantic-ui-react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faExclamation, faCheck } from '@fortawesome/free-solid-svg-icons'

import { process, encode } from '../utils'

const FormContainer = styled(Container)`
  & > .container {
    padding-bottom: 1.5em;
  }
`

const MessageContainer = styled(Message)`
  display: flex !important;
  margin-bottom: 1em;
`

const FAIcon = styled(FontAwesomeIcon)`
  margin-right: 0.6em;
`

// TODO: convert to hooks
// TODO: split components -> raw or segment
class CustomForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { success: false, error: false }
    const { name } = this.props

    // process and push fields into state
    props.fields.forEach((field) => {
      if (!field.includes(';')) { this.state[`${name}-${process(field)}`] = '' } else { this.state[`${name}-${process(field.slice(0, field.indexOf('(')))}`] = '' }
    })
    if (props.textArea) this.state[`${name}-field-text-area`] = ''
  }

  removeSuccessMessage = () => {
    setTimeout(() => {
      this.setState({ success: false })
    }, 6000)
  }

  handleSubmit = (evt) => {
    const { state } = this

    if (Object.keys(state).some(key => state[key] === '')) {
      this.setState({ success: false, error: true })
    } else {
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contact', ...state })
      })
        .catch(err => console.log(err))

      const newState = {}

      Object.keys(state).forEach((key) => { newState[key] = '' })

      this.setState({ ...newState, success: true, error: false })

      this.removeSuccessMessage()
    }

    evt.preventDefault()
  }

  handleChange = (e, { id, value }) => { this.setState({ [id]: value }) }

  render() {
    const {
      name,
      header,
      headerAs,
      children,
      fields,
      textArea,
      button
    } = this.props

    const { state } = this

    return (
      <FormContainer text>
        <Container text>
          <Header as={headerAs} textAlign='center'>{header}</Header>
          <Header.Content>{children}</Header.Content>
        </Container>
        <Form
          name={name}
          onSubmit={this.handleSubmit}
          data-netlify='true'
          data-netlify-honeypot='bot-field'
          success={state.success}
          error={state.error}
        >
          {/* limit bot responses */}
          <input type='hidden' name='bot-field' />
          {fields
            .map((item, i) => (i % 2 === 0 && fields.slice(i, i + 2))) // group fields by twos
            .filter(item => item) // remove false (null) entries
            .map(fieldGroup => (
              <Form.Group key={`group-${fieldGroup.join('-').toLowerCase().replace(/\W/g, '-')}`} widths='equal'>
                {fieldGroup.map((field) => {
                  if (field.includes(';')) { // custom syntax due to Contentful limitations
                    const title = field.slice(0, field.indexOf('(')) // get title
                    let options = field.slice(field.indexOf('(') + 1, field.indexOf(')')) // remove title
                    options = options.split('; ') // -> arr
                    options = options.map(op => ({ // --> arr of obj
                      text: op,
                      value: op
                    }))

                    return (
                      <Form.Select
                        error={state.error ? state[`${name}-${process(title)}`] === '' : null}
                        id={`${name}-${process(title)}`}
                        key={`${name}-${process(title)}`}
                        fluid
                        placeholder={title}
                        label={title}
                        onChange={this.handleChange}
                        value={state[`${name}-${process(title)}`]}
                        options={options}
                        icon={<FontAwesomeIcon icon={faCaretDown} pull='right' title='Instagram' />}
                      />
                    )
                  }
                  return (
                    <Form.Input
                      error={state.error ? state[`${name}-${process(field)}`] === '' : null}
                      id={`${name}-${process(field)}`}
                      key={process(field)}
                      fluid
                      placeholder={field}
                      label={field}
                      onChange={this.handleChange}
                      value={state[`${name}-${process(field)}`]}
                    />
                  )
                })}
              </Form.Group>
            ))
          }
          {textArea && (
            <Form.TextArea
              id={`${name}-field-text-area`}
              error={state.error ? state[`${name}-field-text-area`] === '' : null}
              autoHeight
              placeholder='Message'
              label={textArea}
              style={{ minHeight: 125 }}
              onChange={this.handleChange}
              value={state[`${name}-field-text-area`]}
            />
          )}

          <Transition.Group animation='fade down' duration={500}>
            {state.success && (
              <MessageContainer icon success>
                <FAIcon icon={faCheck} size='2x' title='Instagram' />
                <Message.Content>
                  <Message.Header>Form Submitted</Message.Header>
                    You&#39;ll hear back from our team shortly!
                </Message.Content>
              </MessageContainer>
            )}
            {state.error && (
              <MessageContainer icon error>
                <FAIcon icon={faExclamation} size='2x' title='Instagram' />
                <Message.Content>
                  <Message.Header>Error</Message.Header>
                    Please fill out all fields!
                </Message.Content>
              </MessageContainer>
            )}
          </Transition.Group>

          <Form.Button type='submit'>{button}</Form.Button>
        </Form>
      </FormContainer>
    )
  }
}

CustomForm.propTypes = {
  name: PropTypes.string,
  header: PropTypes.string,
  headerAs: PropTypes.string,
  children: PropTypes.node,
  fields: PropTypes.arrayOf(PropTypes.string),
  textArea: PropTypes.oneOfType([
    PropTypes.string, PropTypes.bool
  ]),
  button: PropTypes.string
}

CustomForm.defaultProps = {
  name: '',
  header: '',
  headerAs: 'h3',
  children: [],
  fields: [],
  textArea: false,
  button: 'Submit'
}

export default CustomForm
