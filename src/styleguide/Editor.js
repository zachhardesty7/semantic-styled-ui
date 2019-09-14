import React from 'react'
import styled from 'styled-components'

import EditorComponent from '../../node_modules/react-styleguidist/lib/client/rsg-components/Editor/Editor'

const Wrapper = styled.div`
	& pre[style] {
		tab-size: 2 !important;
		text-indent: 20px !important;
	}
`

const Editor = props => (
	<Wrapper>
		{React.cloneElement(<EditorComponent {...props} />, { tabSize: 2 })}
	</Wrapper>
)

export default Editor
