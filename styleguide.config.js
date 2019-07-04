module.exports = {
	title: 'Semantic Styled UI',
	sections: [{
		name: 'Semantic Styled UI', content: 'docs/heading.md',
	}, {
		//   name: 'Installation', content: 'docs/installation.md'
		// }, {
		//   name: 'Introduction', content: 'docs/introduction.md', components: 'src/Icon.js'
		// }, {
		name: 'UI Components',
		// content: 'docs/ui.md',
		description: 'The description for the components',
		components: 'src/components/**/*.js',
		usageMode: 'expand', // 'hide' | 'collapse' | 'expand'
	}],
	getExampleFilename(componentPath) {
		return componentPath
			.replace(/src\\components(\\sections)?/, 'docs')
			.replace(/\.jsx?$/, '.md')
	},
	template: {
		head: {
			links: [
				{
					rel: 'stylesheet',
					href: 'https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css',
				},
			],
		},
	},
	// https://github.com/styleguidist/react-styleguidist/blob/master/src/client/styles/theme.js
	// showUsage: true,
	theme: {
	},
}
