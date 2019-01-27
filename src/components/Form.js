import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  Container,
  Form as UIForm,
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

// FIXME: infinite loop on submit
// TODO: split components -> raw or segment
const Form = ({
  name,
  header,
  headerAs,
  children,
  fields,
  textArea,
  button
}) => {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  // process and push raw fields into state
  const fieldsInit = {}
  fields.forEach((field) => {
    if (!field.includes(';')) { fieldsInit[`${name}-${process(field)}`] = '' } else { fieldsInit[`${name}-${process(field.slice(0, field.indexOf('(')))}`] = '' }
  })
  if (textArea) fieldsInit[`${name}-field-text-area`] = ''

  const [fieldsObj, setFieldsObj] = useState(fieldsInit)

  const removeSuccessMessage = () => {
    setTimeout(() => {
      setSuccess(false)
    }, 6000)
  }

  const handleSubmit = (evt) => {
    if (Object.values(fieldsObj).some(val => val === '')) {
      setSuccess(false)
      setError(true)
    } else {
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contact', ...fieldsObj })
      })
        .catch(err => console.log(err))

      const newFieldsObj = {}

      Object.keys(fieldsObj).forEach((key) => { newFieldsObj[key] = '' })

      setSuccess(true)
      setError(false)
      setFieldsObj(newFieldsObj)

      removeSuccessMessage()
    }

    evt.preventDefault()
  }

  const handleChange = (e, { id, value }) => {
    setFieldsObj({ ...fieldsObj, [id]: value })
  }

  return (
    <FormContainer text>
      <Container text>
        <Header as={headerAs} textAlign='center'>{header}</Header>
        <Header.Content>{children}</Header.Content>
      </Container>
      <UIForm
        name={name}
        onSubmit={handleSubmit}
        data-netlify='true'
        data-netlify-honeypot='bot-field'
        success={success}
        error={error}
      >
        {/* limit bot responses */}
        <input type='hidden' name='bot-field' />
        {fields
          .map((item, i) => (i % 2 === 0 && fields.slice(i, i + 2))) // group fields by twos
          .filter(item => item) // remove false (null) entries
          .map(fieldGroup => (
            <UIForm.Group key={`group-${fieldGroup.join('-').toLowerCase().replace(/\W/g, '-')}`} widths='equal'>
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
                    <UIForm.Select
                      error={error && fieldsObj[`${name}-${process(title)}`] === ''}
                      id={`${name}-${process(title)}`}
                      key={`${name}-${process(title)}`}
                      fluid
                      placeholder={title}
                      label={title}
                      onChange={handleChange}
                      value={fieldsObj[`${name}-${process(title)}`]}
                      options={options}
                      icon={<FontAwesomeIcon icon={faCaretDown} pull='right' title='Instagram' />}
                    />
                  )
                }
                return (
                  <UIForm.Input
                    error={error && fieldsObj[`${name}-${process(field)}`] === ''}
                    id={`${name}-${process(field)}`}
                    key={`${name}-${process(field)}`}
                    fluid
                    placeholder={field}
                    label={field}
                    onChange={handleChange}
                    value={fieldsObj[`${name}-${process(field)}`]}
                  />
                )
              })}
            </UIForm.Group>
          ))
        }
        {textArea && (
          <UIForm.TextArea
            id={`${name}-field-text-area`}
            error={error && fieldsObj[`${name}-field-text-area`] === ''}
            autoHeight
            placeholder='Message'
            label={textArea}
            style={{ minHeight: 125 }}
            onChange={handleChange}
            value={fieldsObj[`${name}-field-text-area`]}
          />
        )}

        <Transition.Group animation='fade down' duration={500}>
          {success && (
            <MessageContainer icon success>
              <FAIcon icon={faCheck} size='2x' title='check' />
              <Message.Content>
                <Message.Header>Form Submitted</Message.Header>
                  You&#39;ll hear back from our team shortly!
              </Message.Content>
            </MessageContainer>
          )}
          {error && (
            <MessageContainer icon error>
              <FAIcon icon={faExclamation} size='2x' title='exclamation' />
              <Message.Content>
                <Message.Header>Error</Message.Header>
                  Please fill out all fields!
              </Message.Content>
            </MessageContainer>
          )}
        </Transition.Group>

        <UIForm.Button type='submit'>{button}</UIForm.Button>
      </UIForm>
    </FormContainer>
  )
}

Form.propTypes = {
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

Form.defaultProps = {
  name: '',
  header: '',
  headerAs: 'h3',
  children: [],
  fields: [],
  textArea: false,
  button: 'Submit'
}

export default React.memo(Form)
