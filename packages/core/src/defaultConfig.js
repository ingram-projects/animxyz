module.exports = {
	content: [
		{ content: 'asdsad appear-up-1 in-up out-up-4 up-25%' },
		{ content: 'asdasdas ds appear-rotate-right asd asd asd asd out-up as' },
	],
	captures: {
		mode: {
			values: {
				appear: 'appear',
				in: 'in',
				out: 'out',
			},
		},
	},
	genes: {
		translate: {
			layers: ['utilities', 'transforms'],
			matches: /(<mode>-)?<type>(-<value>)?/,
			captures: {
				type: {
					values: {
						down: { axes: 'y', multiplier: '1' },
						up: { axes: 'y', multiplier: '-1' },
						right: { axes: 'x', multiplier: '1' },
						left: { axes: 'x', multiplier: '-1' },
						front: { axes: 'z', multiplier: '1' },
						back: { axes: 'z', multiplier: '-1' },
					},
				},
				value: {
					matches: /@length|@percentage|@integer/,
					values: {
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
			generates(match, { mode, type: { axes, multiplier }, value }) {
				return `
				[xyz~=${match}] {
					${axes
						.split('')
						.map((axis) => {
							return `--xyz-${mode && mode + '-'}translate-${axis}: calc(${
								value || 'var(--xyz-translate-default)'
							} * ${multiplier});`
						})
						.join('\n')}
				}
				`
			},
		},
		rotate: {
			layers: ['utilities', 'transforms'],
			matches: /(<mode>-)?<type>(-<value>)?/,
			captures: {
				type: {
					values: {
						'flip-up': { axes: 'x', multiplier: '1' },
						'flip-down': { axes: 'x', multiplier: '-1' },
						'flip-right': { axes: 'y', multiplier: '1' },
						'flip-left': { axes: 'y', multiplier: '-1' },
						'rotate-right': { axes: 'z', multiplier: '1' },
						'rotate-left': { axes: 'z', multiplier: '-1' },
					},
				},
				value: {
					matches: /@angle|@percentage|@integer/,
					values: {
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
			generates(match, { mode, type: { axes, multiplier }, value }) {
				return `
				[xyz~=${match}] {
					${axes
						.split('')
						.map((axis) => {
							return `--xyz-${mode && mode + '-'}rotate-${axis}: calc(${
								value || 'var(--xyz-rotate-default)'
							} * ${multiplier});`
						})
						.join('\n')}
				}
				`
			},
		},
		scale: {
			layers: ['utilities', 'transforms'],
			matches: /(<mode>-)?<type>(-<value>)?/,
			captures: {
				type: {
					values: {
						small: { axes: 'xyz', multiplier: '-1' },
						big: { axes: 'xyz', multiplier: '1' },
						narrow: { axes: 'x', multiplier: '-1' },
						wide: { axes: 'x', multiplier: '1' },
						short: { axes: 'y', multiplier: '-1' },
						tall: { axes: 'y', multiplier: '1' },
						thin: { axes: 'z', multiplier: '-1' },
						thick: { axes: 'z', multiplier: '1' },
					},
				},
				value: {
					matches: /@percentage|@number/,
					values: {
						0: '0',
						1: '0.025',
						2: '0.05',
						3: '0.075',
						4: '0.1',
						5: '0.125',
						'25%': '0.25',
						'50%': '0.5',
						'75%': '0.75',
						'100%': '1',
					},
				},
			},
			generates(match, { mode, type: { axes, multiplier }, value }) {
				return `
				[xyz~=${match}] {
					${axes
						.split('')
						.map((axis) => {
							return `--xyz-${mode && mode + '-'}scale-${axis}: calc(1 + ${
								value || 'var(--xyz-scale-default)'
							} * ${multiplier});`
						})
						.join('\n')}
				}
				`
			},
		},
	},
}
