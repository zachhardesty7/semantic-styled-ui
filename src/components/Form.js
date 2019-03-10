import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {
  Form,
  Icon,
  Message,
  Transition
} from 'semantic-ui-react'

import { encode, process } from '../utils'

const MessageContainer = styled(Message)`
  && {
    display: flex !important;
    margin-bottom: 1em;
  }
`

const SSUIForm = ({
  name,
  fields,
  textArea,
  button,
  className
}) => {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  // process and push raw fields into state
  const fieldsInit = {}
  fields.forEach((field) => {
    if (!field.includes(';')) {
      fieldsInit[`${process(field)}`] = ''
    } else {
      fieldsInit[`${process(field.slice(0, field.indexOf('(')))}`] = ''
    }
  })
  if (textArea) fieldsInit[`text-area`] = ''

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
    <Form
      name={name}
      onSubmit={handleSubmit}
      data-netlify='true'
      data-netlify-honeypot='bot-field'
      success={success}
      error={error}
      className={className}
    >
      {/* limit bot responses with Netlify */}
      <input type='hidden' name='bot-field' />
      {fields
        .map((item, i) => (i % 2 === 0 && fields.slice(i, i + 2))) // group fields by twos
        .filter(item => item) // remove false (null) entries
        .map(fieldGroup => (
          <Form.Group key={`group-${process(fieldGroup.toString())}`} widths='equal'>
            {fieldGroup.map((field) => {
              if (field.includes(';')) { // custom syntax due to Contentful limitations
                const title = field.slice(0, field.indexOf('('))
                let options = field.slice(field.indexOf('(') + 1, field.indexOf(')')) // remove title
                options = options.split('; ')
                options = options.map(op => ({
                  text: op,
                  value: op
                }))

                return (
                  <Form.Select
                    error={error && fieldsObj[`${process(title)}`] === ''}
                    id={`${process(title)}`}
                    key={`${process(title)}`}
                    fluid
                    placeholder={title}
                    label={title}
                    onChange={handleChange}
                    value={fieldsObj[`${process(title)}`]}
                    options={options}
                  />
                )
              }
              return (
                <Form.Input
                  error={error && fieldsObj[`${process(field)}`] === ''}
                  id={`${process(field)}`}
                  key={`${process(field)}`}
                  fluid
                  placeholder={field}
                  label={field}
                  onChange={handleChange}
                  value={fieldsObj[`${process(field)}`]}
                />
              )
            })}
          </Form.Group>
        ))
      }
      {textArea && (
        <Form.TextArea
          id='text-area'
          error={error && fieldsObj[`text-area`] === ''}
          autoHeight
          placeholder='Message'
          label={textArea === true ? 'Enter Message Below:' : textArea}
          style={{ minHeight: 125 }}
          onChange={handleChange}
          value={fieldsObj[`text-area`]}
        />
      )}

      <Transition.Group animation='fade down' duration={500}>
        {success && (
          <MessageContainer icon success>
            <Icon name='check' aria-label='success' />
            <Message.Content>
              <Message.Header>Form Submitted</Message.Header>
              You&#39;ll hear back from our team shortly!
            </Message.Content>
          </MessageContainer>
        )}
        {error && (
          <MessageContainer icon error>
            <Icon name='exclamation' aria-label='fail' />
            <Message.Content>
              <Message.Header>Error</Message.Header>
              Please fill out all fields!
            </Message.Content>
          </MessageContainer>
        )}
      </Transition.Group>

      <Form.Button type='submit'>{button}</Form.Button>
    </Form>
  )
}

SSUIForm.propTypes = {
  name: PropTypes.string,
  fields: PropTypes.arrayOf(PropTypes.string),
  textArea: PropTypes.oneOfType([
    PropTypes.string, PropTypes.bool
  ]),
  button: PropTypes.string,
  className: PropTypes.string
}

SSUIForm.defaultProps = {
  name: '',
  fields: [],
  textArea: true,
  button: 'Submit',
  className: ''
}

export default React.memo(SSUIForm)
