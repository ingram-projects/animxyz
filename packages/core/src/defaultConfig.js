module.exports = {
	content: [
		{ content: 'asdsad lg:appear-up-1:hover in-up:hover out-up-4 up-25% margin-10px lg:padding-left-5%' },
		{ content: 'asdasdas ds md:appear-rotate-right asd asd asd css-in-js nested-css out-up as' },
	],
	theme: {
		modes: {
			appear: true,
			in: true,
			out: true,
		},
		queries: {
			sm: 'min-width: 640px',
			md: 'min-width: 768px',
			lg: 'min-width: 1024px',
			xl: 'min-width: 1280px',
		},
		translate: {
			multiplier: '10px',
		},
		rotate: {
			multipler: '5deg',
		},
		scale: {
			multiplier: '0.025',
		},
	},
	captures: {
		mode: ({ theme }) => theme('modes'),
	},
	modifiers: {
		media: ({ theme }) => ({
			type: 'prefix',
			matches: /<query>:/,
			captures: {
				query: theme('queries'),
			},
			modifies(node, { query }) {
				return `
				@media (${query}) {
					${node.toString()}
				}
				`
			},
		}),
		hover: {
			type: 'postfix',
			matches: /:hover/,
			modifies(node) {
				node.walkRules((rule) => {
					rule.selector = `${rule.selector}:hover`
				})
				return node
			},
		},
	},
	layers: {
		core: {
			generates(nodes) {
				return `
					/* this is the core layer */
					${nodes.toString()}
				`
			},
		},
		utilities: true,
	},
	genes: {
		translate: ({ theme }) => ({
			layers: ['utilities'],
			modifiers: ['hover', 'media'],
			matches: /(?:<mode>-)?<type>(?:-<value>)?/,
			captures: {
				type: {
					down: { axes: 'y', multiplier: '1' },
					up: { axes: 'y', multiplier: '-1' },
					right: { axes: 'x', multiplier: '1' },
					left: { axes: 'x', multiplier: '-1' },
					front: { axes: 'z', multiplier: '1' },
					back: { axes: 'z', multiplier: '-1' },
				},
				value: {
					'': 'var(--xyz-translate-default)',
					'/@length/': true,
					'/@percentage/': true,
					'/@integer/': (value) => `calc(${value} * ${theme('translate.multiplier')})`,
				},
			},
			generates(match, { mode, type: { axes, multiplier }, value }) {
				return `
				[xyz~='${match}'] {
					${axes
						.split('')
						.map((axis) => {
							return `--xyz-${mode ? `${mode}-` : ''}translate-${axis}: calc(${value} * ${multiplier});`
						})
						.join('\n')}
				}
				`
			},
		}),
		rotate: ({ theme }) => ({
			layers: ['utilities'],
			modifiers: ['hover', 'media'],
			matches: /(?:<mode>-)?<type>(?:-<value>)?/,
			captures: {
				type: {
					'flip-up': { axes: 'x', multiplier: '1' },
					'flip-down': { axes: 'x', multiplier: '-1' },
					'flip-right': { axes: 'y', multiplier: '1' },
					'flip-left': { axes: 'y', multiplier: '-1' },
					'rotate-right': { axes: 'z', multiplier: '1' },
					'rotate-left': { axes: 'z', multiplier: '-1' },
				},
				value: {
					'': 'var(--xyz-rotate-default)',
					'/@angle/': true,
					'/@percentage/': (value) => `${parseFloat(value) / 100}turn`,
					'/@integer/': (value) => `calc(${value} * ${theme('rotate.multiplier')})`,
				},
			},
			generates(match, { mode, type: { axes, multiplier }, value }) {
				return `
				[xyz~='${match}'] {
					${axes
						.split('')
						.map((axis) => {
							return `--xyz-${mode ? `${mode}-` : ''}rotate-${axis}: calc(${value} * ${multiplier});`
						})
						.join('\n')}
				}
				`
			},
		}),
		scale: ({ theme }) => ({
			layers: ['utilities'],
			modifiers: ['hover', 'media'],
			matches: /(?:<mode>-)?<type>(?:-<value>)?/,
			captures: {
				type: {
					small: { axes: 'xyz', multiplier: '-1' },
					big: { axes: 'xyz', multiplier: '1' },
					narrow: { axes: 'x', multiplier: '-1' },
					wide: { axes: 'x', multiplier: '1' },
					short: { axes: 'y', multiplier: '-1' },
					tall: { axes: 'y', multiplier: '1' },
					thin: { axes: 'z', multiplier: '-1' },
					thick: { axes: 'z', multiplier: '1' },
				},
				value: {
					'': 'var(--xyz-scale-default)',
					'/@percentage/': (value) => parseFloat(value) / 100,
					'/@integer/': (value) => `calc(${value} * ${theme('scale.multiplier')})`,
				},
			},
			generates(match, { mode, type: { axes, multiplier }, value }) {
				return `
				[xyz~='${match}'] {
					${axes
						.split('')
						.map((axis) => {
							return `--xyz-${mode ? `${mode}-` : ''}scale-${axis}: calc(1 + ${value} * ${multiplier});`
						})
						.join('\n')}
				}
				`
			},
		}),
		'css-in-js': {
			generates: {
				'.$$~match': {
					color: 'blue',
					marginTop: 5,
				},
			},
		},
		'nested-css': `
			.$$~match {
				.child {
					foo: bar;
				}
			}
		`,
	},
}
