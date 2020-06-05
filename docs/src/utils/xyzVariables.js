export const xyzModes = ['in', 'out', 'appear']

export const xyzModesAll = ['all', ...xyzModes]

export const xyzModeMove = 'move'

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
