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
	},
	duration: {
		type: 'duration',
		vars: ['duration'],
		defaultVal: 'var(--xyz-duration-default)',
		utilityMap: xyzUtilityTimes,
	},
	delay: {
		type: 'delay',
		vars: ['delay'],
		defaultVal: 'var(--xyz-delay-default)',
		utilityMap: xyzUtilityTimes,
	},
	stagger: {
		type: 'stagger',
		vars: ['stagger'],
		defaultVal: 'var(--xyz-stagger-default)',
		utilityMap: xyzUtilityTimes,
	},
	'stagger-rev': {
		type: 'stagger',
		vars: ['stagger-rev'],
		defaultVal: 'var(--xyz-stagger-default)',
		utilityMap: xyzUtilityTimes,
	},
	iterate: {
		type: 'iterate',
		vars: ['iterate'],
		defaultVal: 'var(--xyz-iterate-default)',
		utilityMap: xyzUtilityIterations,
	},

	// Origins
	origin: {
		type: 'origin',
		vars: ['origin'],
		defaultVal: 'var(--xyz-origin-default)',
		utilityMap: xyzUtilityOrigins,
	},

	// Fades
	fade: {
		type: 'fade',
		vars: ['fade'],
		defaultVal: 'calc(1 - var(--xyz-fade-default))',
		utilityMap: xyzUtilityFades,
	},

	// Translations
	right: {
		type: 'translate',
		axis: 'x',
		vars: ['translate-x'],
		defaultVal: 'var(--xyz-translate-default)',
		utilityMap: xyzUtilityTranslations,
	},
	left: {
		type: 'translate',
		axis: 'x',
		vars: ['translate-x'],
		defaultVal: 'calc(var(--xyz-translate-default) * -1)',
		utilityMap: xyzUtilityTranslations,
	},
	down: {
		type: 'translate',
		axis: 'y',
		vars: ['translate-y'],
		defaultVal: 'var(--xyz-translate-default)',
		utilityMap: xyzUtilityTranslations,
	},
	up: {
		type: 'translate',
		axis: 'y',
		vars: ['translate-y'],
		defaultVal: 'calc(var(--xyz-translate-default) * -1)',
		utilityMap: xyzUtilityTranslations,
	},
	front: {
		type: 'translate',
		axis: 'z',
		vars: ['translate-z'],
		defaultVal: 'var(--xyz-translate-default)',
		utilityMap: xyzUtilityTranslationsZ,
	},
	back: {
		type: 'translate',
		axis: 'z',
		vars: ['translate-z'],
		defaultVal: 'calc(var(--xyz-translate-default) * -1)',
		utilityMap: xyzUtilityTranslationsZ,
	},

	// Rotations
	'flip-up': {
		type: 'rotate',
		axis: 'x',
		vars: ['rotate-x'],
		defaultVal: 'var(--xyz-rotate-default)',
		utilityMap: utilityRotations,
	},
	'flip-down': {
		type: 'rotate',
		axis: 'x',
		vars: ['rotate-x'],
		defaultVal: 'calc(var(--xyz-rotate-default) * -1)',
		utilityMap: utilityRotations,
	},
	'flip-left': {
		type: 'rotate',
		axis: 'y',
		vars: ['rotate-y'],
		defaultVal: 'var(--xyz-rotate-default)',
		utilityMap: utilityRotations,
	},
	'flip-right': {
		type: 'rotate',
		axis: 'y',
		vars: ['rotate-y'],
		defaultVal: 'calc(var(--xyz-rotate-default) * -1)',
		utilityMap: utilityRotations,
	},
	'turn-cw': {
		type: 'rotate',
		axis: 'z',
		vars: ['rotate-z'],
		defaultVal: 'var(--xyz-rotate-default)',
		utilityMap: utilityRotations,
	},
	'turn-ccw': {
		type: 'rotate',
		axis: 'z',
		vars: ['rotate-z'],
		defaultVal: 'calc(var(--xyz-rotate-default) * -1)',
		utilityMap: utilityRotations,
	},

	// Scales
	small: {
		type: 'scale',
		axis: 'all',
		vars: ['scale-x', 'scale-y', 'scale-z'],
		defaultVal: 'calc(1 - var(--xyz-scale-default))',
		utilityMap: xyzUtilityScales,
	},
	big: {
		type: 'scale',
		axis: 'all',
		vars: ['scale-x', 'scale-y', 'scale-z'],
		defaultVal: 'calc(1 + var(--xyz-scale-default))',
		utilityMap: xyzUtilityScales,
	},
	narrow: {
		type: 'scale',
		axis: 'x',
		vars: ['scale-x'],
		defaultVal: 'calc(1 - var(--xyz-scale-default))',
		utilityMap: xyzUtilityScales,
	},
	wide: {
		type: 'scale',
		axis: 'x',
		vars: ['scale-x'],
		defaultVal: 'calc(1 + var(--xyz-scale-default))',
		utilityMap: xyzUtilityScales,
	},
	short: {
		type: 'scale',
		axis: 'y',
		vars: ['scale-y'],
		defaultVal: 'calc(1 - var(--xyz-scale-default))',
		utilityMap: xyzUtilityScales,
	},
	tall: {
		type: 'scale',
		axis: 'y',
		vars: ['scale-y'],
		defaultVal: 'calc(1 + var(--xyz-scale-default))',
		utilityMap: xyzUtilityScales,
	},
	thin: {
		type: 'scale',
		axis: 'z',
		vars: ['scale-z'],
		defaultVal: 'calc(1 - var(--xyz-scale-default))',
		utilityMap: xyzUtilityScales,
	},
	thick: {
		type: 'scale',
		axis: 'z',
		vars: ['scale-z'],
		defaultVal: 'calc(1 + var(--xyz-scale-default))',
		utilityMap: xyzUtilityScales,
	},
}

export const xyzUtilities = Object.entries(xyzUtilitiesMap).map(([name, mode]) => {
	return {
		name: name,
		...mode,
	}
})

export function getXyzUtility(name) {
	return {
		name: name,
		...xyzUtilitiesMap[name],
	}
}

export function getXyzUtilityLevel(name, level = 'default') {
	const classObj = getXyzUtility(name)

	return {
		...classObj,
		level,
		valid: level === 'default' || classObj.utilityMap[level],
		string: level === 'default' ? name : `${name}-${level}`,
	}
}
