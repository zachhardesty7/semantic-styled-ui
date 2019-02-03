import React, { useState } from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import {
  Form as SUIForm,
  Message,
  Transition
} from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faExclamation, faCheck } from '@fortawesome/free-solid-svg-icons'

import { utils } from '../utils'

const MessageContainer = styled(Message)`
  display: flex !important;
  margin-bottom: 1em;
`

const FAIcon = styled(FontAwesomeIcon)`
  margin-right: 0.6em;
`

const Form = ({
  name,
  fields,
  textArea,
  button
}) => {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  // process and push raw fields into state
  const fieldsInit = {}
  fields.forEach((field) => {
    if (!field.includes(';')) { fieldsInit[`${name}-${utils.process(field)}`] = '' } else { fieldsInit[`${name}-${utils.process(field.slice(0, field.indexOf('(')))}`] = '' }
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
        body: utils.encode({ 'form-name': 'contact', ...fieldsObj })
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
    <SUIForm
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
          <SUIForm.Group key={`group-${fieldGroup.join('-').toLowerCase().replace(/\W/g, '-')}`} widths='equal'>
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
                  <SUIForm.Select
                    error={error && fieldsObj[`${name}-${utils.process(title)}`] === ''}
                    id={`${name}-${utils.process(title)}`}
                    key={`${name}-${utils.process(title)}`}
                    fluid
                    placeholder={title}
                    label={title}
                    onChange={handleChange}
                    value={fieldsObj[`${name}-${utils.process(title)}`]}
                    options={options}
                    icon={<FontAwesomeIcon icon={faCaretDown} pull='right' title='Instagram' />}
                  />
                )
              }
              return (
                <SUIForm.Input
                  error={error && fieldsObj[`${name}-${utils.process(field)}`] === ''}
                  id={`${name}-${utils.process(field)}`}
                  key={`${name}-${utils.process(field)}`}
                  fluid
                  placeholder={field}
                  label={field}
                  onChange={handleChange}
                  value={fieldsObj[`${name}-${utils.process(field)}`]}
                />
              )
            })}
          </SUIForm.Group>
        ))
      }
      {textArea && (
        <SUIForm.TextArea
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

      <SUIForm.Button type='submit'>{button}</SUIForm.Button>
    </SUIForm>
  )
}

Form.propTypes = {
  name: PropTypes.string,
  fields: PropTypes.arrayOf(PropTypes.string),
  textArea: PropTypes.oneOfType([
    PropTypes.string, PropTypes.bool
  ]),
  button: PropTypes.string
}

Form.defaultProps = {
  name: '',
  fields: [],
  textArea: true,
  button: 'Submit'
}

export default React.memo(Form)
