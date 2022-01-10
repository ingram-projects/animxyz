/* eslint-disable prettier/prettier */

// MODES

export const xyzModes = ['in', 'out', 'appear']
export const xyzModesAll = ['all', ...xyzModes]

// LEVELS

export const xyzIndexLevels = 20

export const xyzEaseLevels = {
	'default': 'var(--xyz-ease-default)',
	'ease': 'ease',
	'linear': 'linear',
	'in': 'ease-in',
	'in-back': 'cubic-bezier(0.600, -0.280, 0.735, 0.045)',
	'out': 'ease-out',
	'out-back': 'cubic-bezier(0.175, 0.885, 0.320, 1.275)',
	'in-out': 'ease-in-out',
	'in-out-back': 'cubic-bezier(0.680, -0.550, 0.265, 1.550)',
}

export const xyzDurationLevels = {
	'default': 'var(--xyz-duration-default)',
	'0': '0s',
	'0.5': '0.05s',
	'1': '0.1s',
	'1.5': '0.15s',
	'2': '0.2s',
	'2.5': '0.25s',
	'3': '0.3s',
	'4': '0.4s',
	'5': '0.5s',
	'6': '0.6s',
	'7': '0.7s',
	'8': '0.8s',
	'9': '0.9s',
	'10': '1s',
	'15': '1.5s',
	'20': '2s',
	'25': '2.5s',
	'30': '3s',
}

export const xyzDelayLevels = {
	'default': 'var(--xyz-delay-default)',
	'0': '0s',
	'0.5': '0.05s',
	'1': '0.1s',
	'1.5': '0.15s',
	'2': '0.2s',
	'2.5': '0.25s',
	'3': '0.3s',
	'4': '0.4s',
	'5': '0.5s',
	'6': '0.6s',
	'7': '0.7s',
	'8': '0.8s',
	'9': '0.9s',
	'10': '1s',
	'15': '1.5s',
	'20': '2s',
	'25': '2.5s',
	'30': '3s',
}

export const xyzStaggerLevels = {
	'default': 'var(--xyz-stagger-default)',
	'0': '0s',
	'0.5': '0.05s',
	'1': '0.1s',
	'1.5': '0.15s',
	'2': '0.2s',
	'2.5': '0.25s',
	'3': '0.3s',
	'4': '0.4s',
	'5': '0.5s',
	'6': '0.6s',
	'7': '0.7s',
	'8': '0.8s',
	'9': '0.9s',
	'10': '1s',
	'15': '1.5s',
	'20': '2s',
	'25': '2.5s',
	'30': '3s',
}

export const xyzIterateLevels = {
	'default': 'var(--xyz-iterate-default)',
	'1': '1',
	'2': '2',
	'3': '3',
	'4': '4',
	'5': '5',
	'infinite': 'infinite',
}

export const xyzDirectionLevels = {
	'default': 'var(--xyz-direction-default)',
	'normal': 'normal',
	'reverse': 'reverse',
	'alternate': 'alternate',
	'alternate-reverse': 'alternate-reverse',
}

export const xyzOriginLevels = {
	'default': 'var(--xyz-origin-default)',
	'center': 'center',
	'top': 'top',
	'bottom': 'bottom',
	'left': 'left',
	'right': 'right',
	'top-left': 'top left',
	'top-right': 'top right',
	'bottom-left': 'bottom left',
	'bottom-right': 'bottom right',
}

export const xyzOpacityLevels = {
	'default': 'var(--xyz-opacity-default)',
	'0': '0',
	'25%': '0.25',
	'50%': '0.5',
	'75%': '0.75',
	'100%': '1',
}

export const xyzPerspectiveLevels = {
	'default': 'var(--xyz-perspective-default)',
	'none': 'none',
	'0': '0px',
	'1': '500px',
	'2': '1000px',
	'3': '1500px',
	'4': '2000px',
	'5': '2500px',
}

export const xyzTranslateLevels = {
	'default': 'var(--xyz-translate-default)',
	'0': '0px',
	'1': '10px',
	'2': '20px',
	'3': '30px',
	'4': '40px',
	'5': '50px',
	'25%': '25%',
	'50%': '50%',
	'75%': '75%',
	'100%': '100%',
}

export const xyzTranslateZLevels = {
	'default': 'var(--xyz-translate-z-default)',
	'0': '0px',
	'1': '100px',
	'2': '200px',
	'3': '300px',
	'4': '400px',
	'5': '500px',
}

export const xyzRotateLevels = {
	'default': 'var(--xyz-rotate-default)',
	'0': '0deg',
	'1': '10deg',
	'2': '20deg',
	'3': '30deg',
	'4': '40deg',
	'5': '50deg',
	'25%': '0.25turn',
	'50%': '0.50turn',
	'75%': '0.75turn',
	'100%': '1turn',
}

export const xyzScaleLevels = {
	'default': 'var(--xyz-scale-default)',
	'0': '0',
	'1': '0.025',
	'2': '0.05',
	'3': '0.075',
	'4': '0.1',
	'5': '0.125',
	'25%': '0.25',
	'50%': '0.5',
	'75%': '0.75',
	'100%': '1',
}

export const xyzSkewLevels = {
	'default': 'var(--xyz-skew-default)',
	'0': '0deg',
	'1': '10deg',
	'2': '20deg',
	'3': '30deg',
	'4': '40deg',
	'5': '50deg',
}

// VARIABLES

export const xyzVariablesMap = {
	'keyframes': {
		type: 'keyframes',
		syntax: '<time>',
	},
	'ease': {
		type: 'ease',
		syntax: '<timing-function>',
	},
	'duration': {
		type: 'duration',
		syntax: '<time>',
	},
	'delay': {
		type: 'delay',
		syntax: '<time>',
	},
	'stagger': {
		type: 'stagger',
		syntax: '<time>',
	},
	'stagger-rev': {
		type: 'stagger',
		syntax: '<time>',
	},
	'iterate': {
		type: 'iterate',
		syntax: 'infinite | <number>',
	},
	'direction': {
		type: 'direction',
		syntax: '<animation-direction>',
	},
	'origin': {
		type: 'origin',
		syntax: '<transform-origin>',
	},
	'opacity': {
		type: 'opacity',
		syntax: '<number>',
	},
	'transform': {
		type: 'transform',
		syntax: '<transform-list>',
	},
	'perspective': {
		type: 'perspective',
		syntax: '<length>',
	},
	'translate-x': {
		type: 'translate',
		syntax: '<length> | <percentage>',
		axis: 'x',
	},
	'translate-y': {
		type: 'translate',
		syntax: '<length> | <percentage>',
		axis: 'y',
	},
	'translate-z': {
		type: 'translate',
		syntax: '<length>',
		axis: 'z',
	},
	'rotate-x': {
		type: 'rotate',
		syntax: '<angle>',
		axis: 'x',
	},
	'rotate-y': {
		type: 'rotate',
		syntax: '<angle>',
		axis: 'y',
	},
	'rotate-z': {
		type: 'rotate',
		syntax: '<angle>',
		axis: 'z',
	},
	'scale-x': {
		type: 'scale',
		syntax: '<number>',
		axis: 'x',
	},
	'scale-y': {
		type: 'scale',
		syntax: '<number>',
		axis: 'y',
	},
	'scale-z': {
		type: 'scale',
		syntax: '<number>',
		axis: 'z',
	},
	'skew-x': {
		type: 'skew',
		syntax: '<angle>',
		axis: 'x',
	},
	'skew-y': {
		type: 'skew',
		syntax: '<angle>',
		axis: 'y',
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

	const modes = variableObj.modes || xyzModesAll

	const components = ['--xyz']
	if (mode !== 'all') {
		components.push(mode)
	}
	components.push(name)
	const string = components.join('-')

	const valid = modes.includes(mode)

	return {
		name,
		value,
		modes,
		mode,
		string,
		valid,
		...variableObj,
	}
}

export function createXyzVariableRegex(variables = Object.keys(xyzVariablesMap), modes = xyzModesAll) {
	return new RegExp(`^--xyz-(?:(${modes.join('|')})-)?(${variables.join('|')})(?::\\s*(.+))?$`)
}

export const xyzVariableRegex = createXyzVariableRegex()

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

// DEFAULTS

export const xyzDefaultsMap = {
  'ease': xyzEaseLevels['ease'],
  'duration': xyzDurationLevels['5'],
  'delay': xyzDelayLevels['0'],
  'stagger': xyzStaggerLevels['2.5'],
  'iterate': xyzIterateLevels['1'],
	'direction': xyzDirectionLevels['normal'],
	'out-direction': xyzDirectionLevels['reverse'],
  'origin': xyzOriginLevels['center'],
  'opacity': xyzOpacityLevels['100%'],
  'perspective': xyzPerspectiveLevels['none'],
  'translate': xyzTranslateLevels['25%'],
  'translate-z': xyzTranslateZLevels['3'],
  'rotate': xyzRotateLevels['25%'],
  'scale': xyzScaleLevels['50%'],
  'skew': xyzSkewLevels['3'],
};

// UTILITIES

export const xyzUtilitiesMap = {
	// Timings
	'ease': {
		type: 'ease',
		vars: ['ease'],
		levels: xyzEaseLevels,
	},
	'duration': {
		type: 'duration',
		vars: ['duration'],
		levels: xyzDurationLevels,
	},
	'delay': {
		type: 'delay',
		vars: ['delay'],
		levels: xyzDelayLevels,
	},
	'stagger': {
		type: 'stagger',
		vars: ['stagger'],
		levels: xyzStaggerLevels,
	},
	'stagger-rev': {
		type: 'stagger',
		vars: ['stagger-rev'],
		levels: xyzStaggerLevels,
	},
	'iterate': {
		type: 'iterate',
		vars: ['iterate'],
		levels: xyzIterateLevels,
	},
	'direction': {
		type: 'direction',
		vars: ['direction'],
		levels: xyzDirectionLevels,
	},

	// Origins
	'origin': {
		type: 'origin',
		vars: ['origin'],
		levels: xyzOriginLevels,
	},

	// Fades
	'fade': {
		type: 'opacity',
		vars: ['opacity'],
		levels: xyzOpacityLevels,
		transformer: 'xyz-one-minus-val',
	},

	// Perspectives
	'perspective': {
		type: 'perspective',
		vars: ['perspective'],
		levels: xyzPerspectiveLevels,
	},

	// Translations
	'right': {
		type: 'translate',
		axis: 'x',
		vars: ['translate-x'],
		levels: xyzTranslateLevels,
	},
	'left': {
		type: 'translate',
		axis: 'x',
		vars: ['translate-x'],
		levels: xyzTranslateLevels,
		transformer: 'xyz-negative-val',
	},
	'down': {
		type: 'translate',
		axis: 'y',
		vars: ['translate-y'],
		levels: xyzTranslateLevels,
	},
	'up': {
		type: 'translate',
		axis: 'y',
		vars: ['translate-y'],
		levels: xyzTranslateLevels,
		transformer: 'xyz-negative-val',
	},
	'front': {
		type: 'translate',
		axis: 'z',
		vars: ['translate-z'],
		levels: xyzTranslateZLevels,
	},
	'back': {
		type: 'translate',
		axis: 'z',
		vars: ['translate-z'],
		levels: xyzTranslateZLevels,
		transformer: 'xyz-negative-val',
	},

	// Rotations
	'flip-up': {
		type: 'rotate',
		axis: 'x',
		vars: ['rotate-x'],
		levels: xyzRotateLevels,
	},
	'flip-down': {
		type: 'rotate',
		axis: 'x',
		vars: ['rotate-x'],
		levels: xyzRotateLevels,
		transformer: 'xyz-negative-val',
	},
	'flip-left': {
		type: 'rotate',
		axis: 'y',
		vars: ['rotate-y'],
		levels: xyzRotateLevels,
	},
	'flip-right': {
		type: 'rotate',
		axis: 'y',
		vars: ['rotate-y'],
		levels: xyzRotateLevels,
		transformer: 'xyz-negative-val',
	},
	'rotate-right': {
		type: 'rotate',
		axis: 'z',
		vars: ['rotate-z'],
		levels: xyzRotateLevels,
	},
	'rotate-left': {
		type: 'rotate',
		axis: 'z',
		vars: ['rotate-z'],
		levels: xyzRotateLevels,
		transformer: 'xyz-negative-val',
	},

	// Scales
	'small': {
		type: 'scale',
		axis: 'xyz',
		vars: ['scale-x', 'scale-y', 'scale-z'],
		levels: xyzScaleLevels,
		transformer: 'xyz-one-minus-val',
	},
	'big': {
		type: 'scale',
		axis: 'xyz',
		vars: ['scale-x', 'scale-y', 'scale-z'],
		levels: xyzScaleLevels,
		transformer: 'xyz-one-plus-val',
	},
	'narrow': {
		type: 'scale',
		axis: 'x',
		vars: ['scale-x'],
		levels: xyzScaleLevels,
		transformer: 'xyz-one-minus-val',
	},
	'wide': {
		type: 'scale',
		axis: 'x',
		vars: ['scale-x'],
		levels: xyzScaleLevels,
		transformer: 'xyz-one-plus-val',
	},
	'short': {
		type: 'scale',
		axis: 'y',
		vars: ['scale-y'],
		levels: xyzScaleLevels,
		transformer: 'xyz-one-minus-val',
	},
	'tall': {
		type: 'scale',
		axis: 'y',
		vars: ['scale-y'],
		levels: xyzScaleLevels,
		transformer: 'xyz-one-plus-val',
	},
	'thin': {
		type: 'scale',
		axis: 'z',
		vars: ['scale-z'],
		levels: xyzScaleLevels,
		transformer: 'xyz-one-minus-val',
	},
	'thick': {
		type: 'scale',
		axis: 'z',
		vars: ['scale-z'],
		levels: xyzScaleLevels,
		transformer: 'xyz-one-plus-val',
	},
	'skew-left': {
		type: 'skew',
		axis: 'x',
		vars: ['skew-x'],
		levels: xyzSkewLevels,
	},
	'skew-right': {
		type: 'skew',
		axis: 'x',
		vars: ['skew-x'],
		levels: xyzSkewLevels,
		transformer: 'xyz-negative-val',
	},
	'skew-up': {
		type: 'skew',
		axis: 'y',
		vars: ['skew-y'],
		levels: xyzSkewLevels,
	},
	'skew-down': {
		type: 'skew',
		axis: 'y',
		vars: ['skew-y'],
		levels: xyzSkewLevels,
		transformer: 'xyz-negative-val',
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

	const modes = utilityObj.modes || xyzModesAll

	const components = []
	if (mode !== 'all') components.push(mode)
	components.push(name)
	if (level !== 'default') components.push(level)
	const string = components.join('-')

	const valid = modes.includes(mode) && utilityObj.levels[level]

	return {
		name,
		level,
		modes,
		mode,
		string,
		valid,
		...utilityObj,
	}
}

export function createXyzUtilityRegex(utilities = Object.keys(xyzUtilitiesMap), modes = xyzModesAll) {
	return new RegExp(`^(?:(${modes.join('|')})-)?(${utilities.join('|')})(?:-([\\w.%-]+))?$`)
}

export const xyzUtilityRegex = createXyzUtilityRegex()

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
