// CORE

export const xyzModes = ['in', 'out', 'appear']
export const xyzModesAll = ['all', ...xyzModes]
export const xyzModeMove = 'move'

export const xyzIndexLevels = 20

// UTILITIES

export const xyzUtilityEases = {
	ease: 'ease',
	linear: 'linear',
	in: 'ease-in',
	'in-back': 'cubic-bezier(0.600, -0.280, 0.735, 0.045)',
	out: 'ease-out',
	'out-back': 'cubic-bezier(0.175, 0.885, 0.320, 1.275)',
	'in-out': 'ease-in-out',
	'in-out-back': 'cubic-bezier(0.680, -0.550, 0.265, 1.550)',
}

export const xyzUtilityTimes = {
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

export const xyzUtilityIterations = {
	'0': '0',
	'1': '1',
	'2': '2',
	'3': '3',
	'4': '4',
	'5': '5',
	infinite: 'infinite',
}

export const xyzUtilityFades = {
	'0': '0',
	'25': '.25',
	'50': '.5',
	'75': '.75',
	'100': '1',
}

export const xyzUtilityTranslations = {
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

export const xyzUtilityTranslationsZ = {
	'0': '0px',
	'1': '10px',
	'2': '20px',
	'3': '30px',
	'4': '40px',
	'5': '50px',
}

export const utilityRotations = {
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

export const xyzUtilityScales = {
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

export const xyzUtilityOrigins = {
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

export const xyzUtilitiesMap = {
	// Timings
	ease: {
		type: 'ease',
		vars: ['ease'],
		defaultVal: 'var(--xyz-ease-default)',
		utilityMap: xyzUtilityEases,
		modes: [...xyzModesAll, xyzModeMove],
	},
	duration: {
		type: 'duration',
		vars: ['duration'],
		defaultVal: 'var(--xyz-duration-default)',
		utilityMap: xyzUtilityTimes,
		modes: [...xyzModesAll, xyzModeMove],
	},
	delay: {
		type: 'delay',
		vars: ['delay'],
		defaultVal: 'var(--xyz-delay-default)',
		utilityMap: xyzUtilityTimes,
		modes: [...xyzModesAll, xyzModeMove],
	},
	stagger: {
		type: 'stagger',
		vars: ['stagger'],
		defaultVal: 'var(--xyz-stagger-default)',
		utilityMap: xyzUtilityTimes,
		modes: xyzModesAll,
	},
	'stagger-rev': {
		type: 'stagger',
		vars: ['stagger-rev'],
		defaultVal: 'var(--xyz-stagger-default)',
		utilityMap: xyzUtilityTimes,
		modes: xyzModesAll,
	},
	iterate: {
		type: 'iterate',
		vars: ['iterate'],
		defaultVal: 'var(--xyz-iterate-default)',
		utilityMap: xyzUtilityIterations,
		modes: xyzModesAll,
	},

	// Origins
	origin: {
		type: 'origin',
		vars: ['origin'],
		defaultVal: 'var(--xyz-origin-default)',
		utilityMap: xyzUtilityOrigins,
		modes: xyzModesAll,
	},

	// Fades
	fade: {
		type: 'fade',
		vars: ['fade'],
		defaultVal: 'calc(1 - var(--xyz-fade-default))',
		utilityMap: xyzUtilityFades,
		modes: xyzModesAll,
	},

	// Translations
	right: {
		type: 'translate',
		axis: 'x',
		vars: ['translate-x'],
		defaultVal: 'var(--xyz-translate-default)',
		utilityMap: xyzUtilityTranslations,
		modes: xyzModesAll,
	},
	left: {
		type: 'translate',
		axis: 'x',
		vars: ['translate-x'],
		defaultVal: 'calc(var(--xyz-translate-default) * -1)',
		utilityMap: xyzUtilityTranslations,
		modes: xyzModesAll,
	},
	down: {
		type: 'translate',
		axis: 'y',
		vars: ['translate-y'],
		defaultVal: 'var(--xyz-translate-default)',
		utilityMap: xyzUtilityTranslations,
		modes: xyzModesAll,
	},
	up: {
		type: 'translate',
		axis: 'y',
		vars: ['translate-y'],
		defaultVal: 'calc(var(--xyz-translate-default) * -1)',
		utilityMap: xyzUtilityTranslations,
		modes: xyzModesAll,
	},
	front: {
		type: 'translate',
		axis: 'z',
		vars: ['translate-z'],
		defaultVal: 'var(--xyz-translate-default)',
		utilityMap: xyzUtilityTranslationsZ,
		modes: xyzModesAll,
	},
	back: {
		type: 'translate',
		axis: 'z',
		vars: ['translate-z'],
		defaultVal: 'calc(var(--xyz-translate-default) * -1)',
		utilityMap: xyzUtilityTranslationsZ,
		modes: xyzModesAll,
	},

	// Rotations
	'flip-up': {
		type: 'rotate',
		axis: 'x',
		vars: ['rotate-x'],
		defaultVal: 'var(--xyz-rotate-default)',
		utilityMap: utilityRotations,
		modes: xyzModesAll,
	},
	'flip-down': {
		type: 'rotate',
		axis: 'x',
		vars: ['rotate-x'],
		defaultVal: 'calc(var(--xyz-rotate-default) * -1)',
		utilityMap: utilityRotations,
		modes: xyzModesAll,
	},
	'flip-left': {
		type: 'rotate',
		axis: 'y',
		vars: ['rotate-y'],
		defaultVal: 'var(--xyz-rotate-default)',
		utilityMap: utilityRotations,
		modes: xyzModesAll,
	},
	'flip-right': {
		type: 'rotate',
		axis: 'y',
		vars: ['rotate-y'],
		defaultVal: 'calc(var(--xyz-rotate-default) * -1)',
		utilityMap: utilityRotations,
		modes: xyzModesAll,
	},
	'turn-cw': {
		type: 'rotate',
		axis: 'z',
		vars: ['rotate-z'],
		defaultVal: 'var(--xyz-rotate-default)',
		utilityMap: utilityRotations,
		modes: xyzModesAll,
	},
	'turn-ccw': {
		type: 'rotate',
		axis: 'z',
		vars: ['rotate-z'],
		defaultVal: 'calc(var(--xyz-rotate-default) * -1)',
		utilityMap: utilityRotations,
		modes: xyzModesAll,
	},

	// Scales
	small: {
		type: 'scale',
		axis: 'all',
		vars: ['scale-x', 'scale-y', 'scale-z'],
		defaultVal: 'calc(1 - var(--xyz-scale-default))',
		utilityMap: xyzUtilityScales,
		modes: xyzModesAll,
	},
	big: {
		type: 'scale',
		axis: 'all',
		vars: ['scale-x', 'scale-y', 'scale-z'],
		defaultVal: 'calc(1 + var(--xyz-scale-default))',
		utilityMap: xyzUtilityScales,
		modes: xyzModesAll,
	},
	narrow: {
		type: 'scale',
		axis: 'x',
		vars: ['scale-x'],
		defaultVal: 'calc(1 - var(--xyz-scale-default))',
		utilityMap: xyzUtilityScales,
		modes: xyzModesAll,
	},
	wide: {
		type: 'scale',
		axis: 'x',
		vars: ['scale-x'],
		defaultVal: 'calc(1 + var(--xyz-scale-default))',
		utilityMap: xyzUtilityScales,
		modes: xyzModesAll,
	},
	short: {
		type: 'scale',
		axis: 'y',
		vars: ['scale-y'],
		defaultVal: 'calc(1 - var(--xyz-scale-default))',
		utilityMap: xyzUtilityScales,
		modes: xyzModesAll,
	},
	tall: {
		type: 'scale',
		axis: 'y',
		vars: ['scale-y'],
		defaultVal: 'calc(1 + var(--xyz-scale-default))',
		utilityMap: xyzUtilityScales,
		modes: xyzModesAll,
	},
	thin: {
		type: 'scale',
		axis: 'z',
		vars: ['scale-z'],
		defaultVal: 'calc(1 - var(--xyz-scale-default))',
		utilityMap: xyzUtilityScales,
		modes: xyzModesAll,
	},
	thick: {
		type: 'scale',
		axis: 'z',
		vars: ['scale-z'],
		defaultVal: 'calc(1 + var(--xyz-scale-default))',
		utilityMap: xyzUtilityScales,
		modes: xyzModesAll,
	},
}

export const xyzUtilities = Object.entries(xyzUtilitiesMap).map(([name, utility]) => {
	return {
		name: name,
		...utility,
	}
})

export function getXyzUtility(name) {
	return {
		name: name,
		...xyzUtilitiesMap[name],
	}
}

export function getXyzUtilityLevel(name, level = 'default') {
	const utilityObj = getXyzUtility(name)

	return {
		...utilityObj,
		level,
		valid: level === 'default' || utilityObj.utilityMap[level],
		string: level === 'default' ? name : `${name}-${level}`,
	}
}

// VARIABLES

export const xyzVariablesMap = {
	keyframes: {
		type: 'keyframes',
		modes: xyzModesAll,
	},
	ease: {
		type: 'ease',
		modes: [...xyzModesAll, xyzModeMove],
	},
	duration: {
		type: 'duration',
		modes: [...xyzModesAll, xyzModeMove],
	},
	delay: {
		type: 'delay',
		modes: [...xyzModesAll, xyzModeMove],
	},
	stagger: {
		type: 'stagger',
		modes: xyzModesAll,
	},
	'stagger-rev': {
		type: 'stagger',
		modes: xyzModesAll,
	},
	iterate: {
		type: 'iterate',
		modes: xyzModesAll,
	},
	origin: {
		type: 'origin',
		modes: xyzModesAll,
	},
	fade: {
		type: 'fade',
		modes: xyzModesAll,
	},
	transform: {
		type: 'transform',
		modes: xyzModesAll,
	},
	'translate-x': {
		type: 'translate',
		axis: 'x',
		modes: xyzModesAll,
	},
	'translate-y': {
		type: 'translate',
		axis: 'y',
		modes: xyzModesAll,
	},
	'translate-z': {
		type: 'translate',
		axis: 'z',
		modes: xyzModesAll,
	},
	'rotate-x': {
		type: 'rotate',
		axis: 'x',
		modes: xyzModesAll,
	},
	'rotate-y': {
		type: 'rotate',
		axis: 'y',
		modes: xyzModesAll,
	},
	'rotate-z': {
		type: 'rotate',
		axis: 'z',
		modes: xyzModesAll,
	},
	'scale-x': {
		type: 'scale',
		axis: 'x',
		modes: xyzModesAll,
	},
	'scale-y': {
		type: 'scale',
		axis: 'y',
		modes: xyzModesAll,
	},
	'scale-z': {
		type: 'scale',
		axis: 'z',
		modes: xyzModesAll,
	},
}

export const xyzVariables = Object.entries(xyzVariablesMap).map(([name, variable]) => {
	return {
		name: name,
		...variable,
		string: `--xyz-${name}`,
	}
})

export function getXyzVariable(name) {
	return {
		name: name,
		...xyzVariablesMap[name],
	}
}

export function getXyzVariableMode(name, mode = 'all') {
	const variableObj = getXyzVariable(name)

	return {
		...variableObj,
		mode,
		valid: variableObj.modes.includes(mode),
		string: mode === 'all' ? `--xyz-${name}` : `--xyz-${mode}-${name}`,
	}
}
