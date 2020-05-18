import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {
	Form,
	Icon,
	Message,
	Transition,
} from 'semantic-ui-react'

import { encode, process, withoutProps } from '../utils'

const paddingMap = {
	compact: '0.5em',
	tight: '1em',
	base: '2em',
	relaxed: '4em',
	loose: '6em',
}

const S = {} // styled-components namespace

const FilteredForm = withoutProps(Form, ['padded'])
S.Form = styled(FilteredForm)`
	${({ padded, padding }) => (
		(padded === 'top' && `padding-top: ${paddingMap[padding]}`) ||
		(padded === 'bottom' && `padding-bottom: ${paddingMap[padding]}`) ||
		(padded && `padding: ${paddingMap[padding]} 0`)
	)};
`

S.Message = styled(Message)`
	/* use "!important" to override Transition */
	display: flex !important;
	margin-bottom: 1em;
`

/**
 * Complex form component that can just handle fields and 1 textarea.
 * Can be most effectively used as a contact form. Also provides feedback
 * for successful and failed submissions.
 */

export const ContactForm = ({
	name = '',
	fields = [],
	textArea = true,
	button = 'Submit',
	padded = false,
	padding = 'base',
	...rest
}) => {
	const [success, setSuccess] = useState(false)
	const [error, setError] = useState(false)

	/** @type {Record<string, string>} process and push raw fields into state */
	const fieldsInit = {}
	fields.forEach((field) => {
		if (!field.includes(';')) {
			fieldsInit[process(field)] = ''
		} else {
			fieldsInit[process(field.slice(0, field.indexOf('(')))] = ''
		}
	})
	if (textArea) fieldsInit['text-area'] = ''

	const [fieldsObj, setFieldsObj] = useState(fieldsInit)

	const removeSuccessMessage = (ms = 6000) => {
		setTimeout(() => {
			setSuccess(false)
		}, ms)
	}

	const handleSubmit = (evt) => {
		if (Object.values(fieldsObj).some((val) => val === '')) {
			setSuccess(false)
			setError(true)
		} else {
			fetch('/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: encode({ 'form-name': 'contact', ...fieldsObj }),
			})
				.catch((err) => console.error(err))

			// reset state of fields
			const newFieldsObj = Object.fromEntries(Object.keys(fieldsObj).map((key) => [key, '']))

			setSuccess(true)
			setError(false)
			setFieldsObj(newFieldsObj)

			removeSuccessMessage()
		}

		evt.preventDefault()
	}

	const handleChange = (_, { id, value }) => {
		setFieldsObj({ ...fieldsObj, [id]: value })
	}

	return (
		<S.Form
			name={name}
			onSubmit={handleSubmit}
			data-netlify='true'
			data-netlify-honeypot='bot-field'
			success={success}
			error={error}
			padded={padded}
			padding={padding}
			{...rest}
		>
			{/* limit bot responses with Netlify */}
			<input type='hidden' name='bot-field' />
			{fields
				.map((_, i) => (i % 2 === 0 && fields.slice(i, i + 2))) // group fields by twos
				.filter(Boolean) // remove falsy (null) entries
				.map((fieldGroup) => (
					<Form.Group key={`group-${process(fieldGroup.toString())}`} widths='equal'>
						{fieldGroup.map((field) => {
							if (field.includes(';')) { // custom syntax due to Contentful limitations
								const title = field.slice(0, field.indexOf('('))
								let options = field.slice(field.indexOf('(') + 1, field.indexOf(')')) // remove title
								options = options.split('; ')
								options = options.map((op) => ({
									text: op,
									value: op,
								}))

								const processedTitle = process(title)

								return (
									<Form.Select
										error={error && fieldsObj[processedTitle] === ''}
										id={processedTitle}
										key={processedTitle}
										fluid
										placeholder={title}
										label={title}
										onChange={handleChange}
										value={fieldsObj[processedTitle]}
										options={options}
									/>
								)
							}

							const processedField = process(field)

							return (
								<Form.Input
									error={error && fieldsObj[processedField] === ''}
									id={processedField}
									key={processedField}
									fluid
									placeholder={field}
									label={field}
									onChange={handleChange}
									value={fieldsObj[processedField]}
								/>
							)
						})}
					</Form.Group>
				))}
			{textArea && (
				<Form.TextArea
					id='text-area'
					error={error && fieldsObj['text-area'] === ''}
					placeholder='Message'
					label={textArea === true ? 'Enter message below:' : textArea}
					style={{ minHeight: 125 }}
					onChange={handleChange}
					value={fieldsObj['text-area']}
				/>
			)}

			<Transition.Group animation='fade down' duration={500}>
				{success && (
					<S.Message icon success>
						<Icon name='check' aria-label='success' />
						<Message.Content>
							<Message.Header>Form Submitted</Message.Header>
							You'll hear back from us shortly!
						</Message.Content>
					</S.Message>
				)}
				{error && (
					<S.Message icon error>
						<Icon name='exclamation' aria-label='failure' />
						<Message.Content>
							<Message.Header>Error</Message.Header>
							Please fill out all fields!
						</Message.Content>
					</S.Message>
				)}
			</Transition.Group>

			<Form.Button type='submit'>{button}</Form.Button>
		</S.Form>
	)
}

ContactForm.propTypes = {
	/** enhances semantics */
	name: PropTypes.string,

	/** labels for fields */
	fields: PropTypes.arrayOf(PropTypes.string),

	// REVIEW: whether better to pass false option to disable or just use empty string
	/** label or pass false to disable, defaults to "Enter Message Below:" */
	textArea: PropTypes.oneOfType([
		PropTypes.string, PropTypes.bool,
	]),

	/** button text content */
	button: PropTypes.string,

	/** if/where spacing around element exists */
	padded: PropTypes.oneOf([false, true, 'top', 'bottom', 'both']),

	/** amount of spacing around element */
	padding: PropTypes.oneOf(['compact', 'tight', 'base', 'relaxed', 'loose']),
}
