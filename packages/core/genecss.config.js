module.exports = {
	captures: {
		mode: {
			matches: /appear|in|out/,
			levels: {
				appear: 'appear',
				in: 'in',
				out: 'out',
			},
		},
	},
	genes: {
		translate: {
			matches: /(<mode>-)?<direction>(-<value>)?/,
			captures: {
				direction: {
					matches: /(up|down|left|right)/,
					levels: {
						up: 'up',
						down: 'down',
						left: 'left',
						right: 'right',
					},
				},
				value: {
					matches: /@number|@length|@percentage/,
					levels: {
						0: '0px',
						1: '10px',
						2: '20px',
						3: '30px',
						4: '40px',
						5: '50px',
						'25%': '25%',
						'50%': '50%',
						'75%': '75%',
						'100%': '100%',
					},
				},
			},
			generates(match, { mode, value }) {
				return `
				[xyz~=${match}] {
					--xyz-${mode && mode + '-'}translate-y: ${value};
				}
				`
			},
		},
	},
}
