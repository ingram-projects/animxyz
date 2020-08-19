// MODES

export const xyzModes = ['in', 'out', 'appear']
export const xyzModesAll = ['all', ...xyzModes]
export const xyzModeMove = 'move'

// LEVELS

export const xyzIndexLevels = 20

export const xyzEaseLevels = {
	ease: 'ease',
	linear: 'linear',
	in: 'ease-in',
	'in-back': 'cubic-bezier(0.600, -0.280, 0.735, 0.045)',
	out: 'ease-out',
	'out-back': 'cubic-bezier(0.175, 0.885, 0.320, 1.275)',
	'in-out': 'ease-in-out',
	'in-out-back': 'cubic-bezier(0.680, -0.550, 0.265, 1.550)',
}

export const xyzTimeLevels = {
	'0': '0s',
	'1': '.1s',
	'2': '.2s',
	'3': '.3s',
	'4': '.4s',
	'5': '.5s',
	'10': '1s',
	'15': '1.5s',
	'20': '2s',
	'25': '2.5s',
	'30': '3s',
}

export const xyzIterateLevels = {
	'0': '0',
	'1': '1',
	'2': '2',
	'3': '3',
	'4': '4',
	'5': '5',
	infinite: 'infinite',
}

export const xyzOriginLevels = {
	center: 'center',
	top: 'top',
	bottom: 'bottom',
	left: 'left',
	right: 'right',
	'top-left': 'top left',
	'top-right': 'top right',
	'bottom-left': 'bottom left',
	'bottom-right': 'bottom right',
}

export const xyzOpacityLevels = {
	'0': '0',
	'25': '.25',
	'50': '.5',
	'75': '.75',
	'100': '1',
}

export const xyzTranslateLevels = {
	'0': '0px',
	'1': '10px',
	'2': '20px',
	'3': '30px',
	'4': '40px',
	'5': '50px',
	'25': '25%',
	'50': '50%',
	'75': '75%',
	'100': '100%',
}

export const xyzTranslateZLevels = {
	'0': '0px',
	'1': '10px',
	'2': '20px',
	'3': '30px',
	'4': '40px',
	'5': '50px',
}

export const xyzRotateLevels = {
	'0': '0deg',
	'1': '10deg',
	'2': '20deg',
	'3': '30deg',
	'4': '40deg',
	'5': '50deg',
	'25': '.25turn',
	'50': '.50turn',
	'75': '.75turn',
	'100': '1turn',
}

export const xyzScaleLevels = {
	'0': '0',
	'1': '0.025',
	'2': '0.05',
	'3': '0.075',
	'4': '0.1',
	'5': '0.125',
	'25': '.25',
	'50': '.5',
	'75': '.75',
	'100': '1',
}

// VARIABLES

export const xyzVariablesMap = {
	keyframes: {
		type: 'keyframes',
		syntax: '<time>',
		modes: xyzModesAll,
	},
	ease: {
		type: 'ease',
		syntax: '<timing-function>',
		modes: [...xyzModesAll, xyzModeMove],
	},
	duration: {
		type: 'duration',
		syntax: '<time>',
		modes: [...xyzModesAll, xyzModeMove],
	},
	delay: {
		type: 'delay',
		syntax: '<time>',
		modes: [...xyzModesAll, xyzModeMove],
	},
	stagger: {
		type: 'stagger',
		syntax: '<time>',
		modes: xyzModesAll,
	},
	'stagger-rev': {
		type: 'stagger',
		syntax: '<time>',
		modes: xyzModesAll,
	},
	iterate: {
		type: 'iterate',
		syntax: '<single-animation-iteration-count>',
		modes: xyzModesAll,
	},
	origin: {
		type: 'origin',
		syntax: '<transform-origin>',
		modes: xyzModesAll,
	},
	opacity: {
		type: 'opacity',
		syntax: '<number>',
		modes: xyzModesAll,
	},
	transform: {
		type: 'transform',
		syntax: '<transform-list>',
		modes: xyzModesAll,
	},
	'translate-x': {
		type: 'translate',
		syntax: '<length-percentage>',
		axis: 'x',
		modes: xyzModesAll,
	},
	'translate-y': {
		type: 'translate',
		syntax: '<length-percentage>',
		axis: 'y',
		modes: xyzModesAll,
	},
	'translate-z': {
		type: 'translate',
		syntax: '<length>',
		axis: 'z',
		modes: xyzModesAll,
	},
	'rotate-x': {
		type: 'rotate',
		syntax: '<angle>',
		axis: 'x',
		modes: xyzModesAll,
	},
	'rotate-y': {
		type: 'rotate',
		syntax: '<angle>',
		axis: 'y',
		modes: xyzModesAll,
	},
	'rotate-z': {
		type: 'rotate',
		syntax: '<angle>',
		axis: 'z',
		modes: xyzModesAll,
	},
	'scale-x': {
		type: 'scale',
		syntax: '<number>',
		axis: 'x',
		modes: xyzModesAll,
	},
	'scale-y': {
		type: 'scale',
		syntax: '<number>',
		axis: 'y',
		modes: xyzModesAll,
	},
	'scale-z': {
		type: 'scale',
		syntax: '<number>',
		axis: 'z',
		modes: xyzModesAll,
	},
}

export const xyzVariables = Object.entries(xyzVariablesMap).map(([name, variable]) => {
	return {
		name: name,
		...variable,
	}
})

export function getXyzVariable(name, value = 'initial', mode = 'all') {
	const variableObj = xyzVariablesMap[name]

	const components = ['--xyz']
	if (mode !== 'all') components.push(mode)
	components.push(name)
	const string = components.join('-')

	const valid = variableObj.modes.includes(mode)

	return {
		name,
		value,
		mode,
		string,
		valid,
		...variableObj,
	}
}

export const xyzVariableRegex = new RegExp(
	`^--xyz-(?:(in|out|appear|move)-)?(${Object.keys(xyzVariablesMap).join('|')})(?::\\s*(.+))?$`
)

export function getXyzVariableRegex(string) {
	const match = string.match(xyzVariableRegex)
	if (!match) {
		return null
	}

	const mode = match[1]
	const name = match[2]
	const value = match[3]
	if (!name) {
		return null
	}

	return getXyzVariable(name, value, mode)
}

// UTILITIES

export const xyzUtilitiesMap = {
	// Timings
	ease: {
		type: 'ease',
		vars: ['ease'],
		default: 'var(--xyz-ease-default)',
		levels: xyzEaseLevels,
		modes: [...xyzModesAll, xyzModeMove],
	},
	duration: {
		type: 'duration',
		vars: ['duration'],
		default: 'var(--xyz-duration-default)',
		levels: xyzTimeLevels,
		modes: [...xyzModesAll, xyzModeMove],
	},
	delay: {
		type: 'delay',
		vars: ['delay'],
		default: 'var(--xyz-delay-default)',
		levels: xyzTimeLevels,
		modes: [...xyzModesAll, xyzModeMove],
	},
	stagger: {
		type: 'stagger',
		vars: ['stagger'],
		default: 'var(--xyz-stagger-default)',
		levels: xyzTimeLevels,
		modes: xyzModesAll,
	},
	'stagger-rev': {
		type: 'stagger',
		vars: ['stagger-rev'],
		default: 'var(--xyz-stagger-default)',
		levels: xyzTimeLevels,
		modes: xyzModesAll,
	},
	iterate: {
		type: 'iterate',
		vars: ['iterate'],
		default: 'var(--xyz-iterate-default)',
		levels: xyzIterateLevels,
		modes: xyzModesAll,
	},

	// Origins
	origin: {
		type: 'origin',
		vars: ['origin'],
		default: 'var(--xyz-origin-default)',
		levels: xyzOriginLevels,
		modes: xyzModesAll,
	},

	// Fades
	fade: {
		type: 'opacity',
		vars: ['opacity'],
		default: 'calc(1 - var(--xyz-opacity-default))',
		levels: xyzOpacityLevels,
		transformer: 'xyz-one-minus-val',
		modes: xyzModesAll,
	},

	// Translations
	right: {
		type: 'translate',
		axis: 'x',
		vars: ['translate-x'],
		default: 'var(--xyz-translate-default)',
		levels: xyzTranslateLevels,
		modes: xyzModesAll,
	},
	left: {
		type: 'translate',
		axis: 'x',
		vars: ['translate-x'],
		default: 'calc(var(--xyz-translate-default) * -1)',
		levels: xyzTranslateLevels,
		transformer: 'xyz-negative-val',
		modes: xyzModesAll,
	},
	down: {
		type: 'translate',
		axis: 'y',
		vars: ['translate-y'],
		default: 'var(--xyz-translate-default)',
		levels: xyzTranslateLevels,
		modes: xyzModesAll,
	},
	up: {
		type: 'translate',
		axis: 'y',
		vars: ['translate-y'],
		default: 'calc(var(--xyz-translate-default) * -1)',
		levels: xyzTranslateLevels,
		transformer: 'xyz-negative-val',
		modes: xyzModesAll,
	},
	front: {
		type: 'translate',
		axis: 'z',
		vars: ['translate-z'],
		default: 'var(--xyz-translate-default)',
		levels: xyzTranslateZLevels,
		modes: xyzModesAll,
	},
	back: {
		type: 'translate',
		axis: 'z',
		vars: ['translate-z'],
		default: 'calc(var(--xyz-translate-default) * -1)',
		levels: xyzTranslateZLevels,
		transformer: 'xyz-negative-val',
		modes: xyzModesAll,
	},

	// Rotations
	'flip-up': {
		type: 'rotate',
		axis: 'x',
		vars: ['rotate-x'],
		default: 'var(--xyz-rotate-default)',
		levels: xyzRotateLevels,
		modes: xyzModesAll,
	},
	'flip-down': {
		type: 'rotate',
		axis: 'x',
		vars: ['rotate-x'],
		default: 'calc(var(--xyz-rotate-default) * -1)',
		levels: xyzRotateLevels,
		transformer: 'xyz-negative-val',
		modes: xyzModesAll,
	},
	'flip-left': {
		type: 'rotate',
		axis: 'y',
		vars: ['rotate-y'],
		default: 'var(--xyz-rotate-default)',
		levels: xyzRotateLevels,
		modes: xyzModesAll,
	},
	'flip-right': {
		type: 'rotate',
		axis: 'y',
		vars: ['rotate-y'],
		default: 'calc(var(--xyz-rotate-default) * -1)',
		levels: xyzRotateLevels,
		transformer: 'xyz-negative-val',
		modes: xyzModesAll,
	},
	'turn-cw': {
		type: 'rotate',
		axis: 'z',
		vars: ['rotate-z'],
		default: 'var(--xyz-rotate-default)',
		levels: xyzRotateLevels,
		modes: xyzModesAll,
	},
	'turn-ccw': {
		type: 'rotate',
		axis: 'z',
		vars: ['rotate-z'],
		default: 'calc(var(--xyz-rotate-default) * -1)',
		levels: xyzRotateLevels,
		transformer: 'xyz-negative-val',
		modes: xyzModesAll,
	},

	// Scales
	small: {
		type: 'scale',
		axis: 'all',
		vars: ['scale-x', 'scale-y', 'scale-z'],
		default: 'calc(1 - var(--xyz-scale-default))',
		levels: xyzScaleLevels,
		transformer: 'xyz-one-minus-val',
		modes: xyzModesAll,
	},
	big: {
		type: 'scale',
		axis: 'all',
		vars: ['scale-x', 'scale-y', 'scale-z'],
		default: 'calc(1 + var(--xyz-scale-default))',
		levels: xyzScaleLevels,
		transformer: 'xyz-one-plus-val',
		modes: xyzModesAll,
	},
	narrow: {
		type: 'scale',
		axis: 'x',
		vars: ['scale-x'],
		default: 'calc(1 - var(--xyz-scale-default))',
		levels: xyzScaleLevels,
		transformer: 'xyz-one-minus-val',
		modes: xyzModesAll,
	},
	wide: {
		type: 'scale',
		axis: 'x',
		vars: ['scale-x'],
		default: 'calc(1 + var(--xyz-scale-default))',
		levels: xyzScaleLevels,
		transformer: 'xyz-one-plus-val',
		modes: xyzModesAll,
	},
	short: {
		type: 'scale',
		axis: 'y',
		vars: ['scale-y'],
		default: 'calc(1 - var(--xyz-scale-default))',
		levels: xyzScaleLevels,
		transformer: 'xyz-one-minus-val',
		modes: xyzModesAll,
	},
	tall: {
		type: 'scale',
		axis: 'y',
		vars: ['scale-y'],
		default: 'calc(1 + var(--xyz-scale-default))',
		levels: xyzScaleLevels,
		transformer: 'xyz-one-plus-val',
		modes: xyzModesAll,
	},
	thin: {
		type: 'scale',
		axis: 'z',
		vars: ['scale-z'],
		default: 'calc(1 - var(--xyz-scale-default))',
		levels: xyzScaleLevels,
		transformer: 'xyz-one-minus-val',
		modes: xyzModesAll,
	},
	thick: {
		type: 'scale',
		axis: 'z',
		vars: ['scale-z'],
		default: 'calc(1 + var(--xyz-scale-default))',
		levels: xyzScaleLevels,
		transformer: 'xyz-one-plus-val',
		modes: xyzModesAll,
	},
}

export const xyzUtilities = Object.entries(xyzUtilitiesMap).map(([name, utility]) => {
	return {
		name: name,
		...utility,
	}
})

export function getXyzUtility(name, level = 'default', mode = 'all') {
	const utilityObj = xyzUtilitiesMap[name]

	const components = []
	if (mode !== 'all') components.push(mode)
	components.push(name)
	if (level !== 'default') components.push(level)
	const string = components.join('-')

	const valid = utilityObj.modes.includes(mode) && (level === 'default' || utilityObj.levels[level])

	return {
		name,
		level,
		mode,
		string,
		valid,
		...utilityObj,
	}
}

export const xyzUtilityRegex = new RegExp(
	`^(?:(in|out|appear|move)-)?(${Object.keys(xyzUtilitiesMap).join('|')})(?:-([\\w-]+))?$`
)

export function getXyzUtilityRegex(string) {
	const match = string.match(xyzUtilityRegex)
	if (!match) {
		return null
	}

	const mode = match[1]
	const name = match[2]
	const level = match[3]
	if (!name) {
		return null
	}

	return getXyzUtility(name, level, mode)
}
