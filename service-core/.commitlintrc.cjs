module.exports = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'subject-empty': [1, 'never'],
		'scope-empty': [1, 'never'],
	},
	parserPreset: {
		parserOpts: {
			issuePrefixes: ['mf'],
		},
	},
}
