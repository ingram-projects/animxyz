module.exports = {
	content: [
		{ content: 'asdsad appear-up-1 in-up out-up-4 up-25%' },
		{ content: 'asdsad appear-up-1 in-up out-up-4 up-25%' },
	],
	captures: {
		mode: {
			levels: {
				appear: 'appear',
				in: 'in',
				out: 'out',
			},
		},
	},
	genes: {
		translate: {
			matches: /(<mode>-)?<type>(-<value>)?/,
			captures: {
				type: {
					levels: {
						down: { axis: 'y', multiplier: '1' },
						up: { axis: 'y', multiplier: '-1' },
						right: { axis: 'x', multiplier: '1' },
						left: { axis: 'x', multiplier: '-1' },
						front: { axis: 'z', multiplier: '1' },
						back: { axis: 'z', multiplier: '-1' },
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
			generates(match, { mode, type: { axis, multiplier }, value }) {
				return `
				[xyz~=${match}] {
					--xyz-${mode && mode + '-'}translate-${axis}: calc(${value || 'var(--xyz-translate-default)'} * ${multiplier});
				}
				`
			},
		},
		rotate: {
			matches: /(<mode>-)?<type>(-<value>)?/,
			captures: {
				type: {
					levels: {
						'flip-up': { axis: 'x', multiplier: '1' },
						'flip-down': { axis: 'x', multiplier: '-1' },
						'flip-right': { axis: 'y', multiplier: '1' },
						'flip-left': { axis: 'y', multiplier: '-1' },
						'rotate-right': { axis: 'z', multiplier: '1' },
						'rotate-left': { axis: 'z', multiplier: '-1' },
					},
				},
				value: {
					matches: /@number|@length|@percentage/,
					levels: {
						0: '0deg',
						1: '10deg',
						2: '20deg',
						3: '30deg',
						4: '40deg',
						5: '50deg',
						'25%': '0.25turn',
						'50%': '0.50turn',
						'75%': '0.75turn',
						'100%': '1turn',
					},
				},
			},
			generates(match, { mode, type: { axis, multiplier }, value }) {
				return `
				[xyz~=${match}] {
					--xyz-${mode && mode + '-'}rotate-${axis}: calc(${value || 'var(--xyz-rotate-default)'} * ${multiplier});
				}
				`
			},
		},
	},
}
