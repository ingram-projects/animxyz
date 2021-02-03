module.exports = {
	content: [
		{ content: 'asdsad lg:appear-up-1:hover in-up:hover out-up-4 up-25%' },
		{ content: 'asdasdas ds md:appear-rotate-right asd asd asd asd out-up as' },
	],
	captures: {
		mode: {
			values: {
				appear: true,
				in: true,
				out: true,
			},
		},
	},
	modifiers: {
		media: {
			type: 'prefix',
			matches: /<query>:/,
			captures: {
				query: {
					values: {
						sm: 'min-width: 640px',
						md: 'min-width: 768px',
						lg: 'min-width: 1024px',
						xl: 'min-width: 1280px',
					},
				},
			},
			modifies(node, { media }) {
				return `
				@media (${media}) {
					${node}
				}
				`
			},
		},
		hover: {
			type: 'postfix',
			matches: /:hover/,
			modifies(node) {
				return node.selector.append(':hover')
			},
		},
	},
	genes: {
		translate: {
			layers: ['utilities', 'transforms'],
			modifiedBy: ['media', 'hover'],
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
						'': 'var(--xyz-translate-default)',
						0: '0px',
						1: '10px',
						2: '20px',
						3: '30px',
						4: '40px',
						5: '50px',
						'25%': true,
						'50%': true,
						'75%': true,
						'100%': true,
					},
				},
			},
			generates(match, { mode, type: { axes, multiplier }, value }) {
				return `
				[xyz~=${match}] {
					${axes
						.split('')
						.map((axis) => {
							return `--xyz-${mode && mode + '-'}translate-${axis}: calc(${value} * ${multiplier});`
						})
						.join('\n')}
				}
				`
			},
		},
		rotate: {
			layers: ['utilities', 'transforms'],
			modifiedBy: ['media', 'hover'],
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
						'': 'var(--xyz-rotate-default)',
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
							return `--xyz-${mode && mode + '-'}rotate-${axis}: calc(${value} * ${multiplier});`
						})
						.join('\n')}
				}
				`
			},
		},
		scale: {
			layers: ['utilities', 'transforms'],
			modifiedBy: ['media', 'hover'],
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
						'': 'var(--xyz-scale-default)',
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
							return `--xyz-${mode && mode + '-'}scale-${axis}: calc(1 + ${value} * ${multiplier});`
						})
						.join('\n')}
				}
				`
			},
		},
	},
}
