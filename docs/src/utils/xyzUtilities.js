export const xyzUtilityEases = {
  'ease': 'ease',
  'linear': 'linear',
  'in': 'ease-in',
  'in-back': 'cubic-bezier(0.600, -0.280, 0.735, 0.045)',
  'out': 'ease-out',
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
  'infinite': 'infinite',
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

export const xyzUtilityClassesMap = {
  // Timings
  'ease': {
    type: 'ease',
    vars: ['ease'],
    default: 'ease',
    utilityMap: xyzUtilityEases,
  },
  'duration': {
    type: 'time',
    vars: ['duration'],
    default: 'duration',
    utilityMap: xyzUtilityTimes,
  },
  'delay': {
    type: 'time',
    vars: ['delay'],
    default: 'delay',
    utilityMap: xyzUtilityTimes,
  },
  'stagger': {
    type: 'time',
    vars: ['stagger'],
    default: 'stagger',
    utilityMap: xyzUtilityTimes,
  },
  'stagger-rev': {
    type: 'time',
    vars: ['stagger-rev'],
    default: 'stagger',
    utilityMap: xyzUtilityTimes,
  },
  'iterate': {
    type: 'iterate',
    vars: ['iterate'],
    default: 'iterate',
    utilityMap: xyzUtilityIterations,
  },

  // Origins
  'origin': {
    type: 'origin',
    vars: ['origin'],
    default: 'origin',
    utilityMap: xyzUtilityOrigins,
  },

  // Fades
  'fade': {
		type: 'fade',
    vars: ['fade'],
    default: 'fade',
		utilityMap: xyzUtilityFades,
	},

  // Translations
  'left': {
		type: 'translate',
    axis: 'x',
    vars: ['translate-x'],
    default: 'translate',
		utilityMap: xyzUtilityTranslations,
	},
	'right': {
		type: 'translate',
    axis: 'x',
    vars: ['translate-x'],
    default: 'translate',
		utilityMap: xyzUtilityTranslations,
	},
	'up': {
		type: 'translate',
    axis: 'y',
    vars: ['translate-y'],
    default: 'translate',
		utilityMap: xyzUtilityTranslations,
	},
	'down': {
		type: 'translate',
    axis: 'y',
    vars: ['translate-y'],
    default: 'translate',
		utilityMap: xyzUtilityTranslations,
	},
	'front': {
		type: 'translate',
    axis: 'z',
    vars: ['translate-z'],
    default: 'translate',
		utilityMap: xyzUtilityTranslationsZ,
	},
	'back': {
		type: 'translate',
    axis: 'z',
    vars: ['translate-z'],
    default: 'translate',
		utilityMap: xyzUtilityTranslationsZ,
	},

  // Scales
  'small': {
    type: 'scale',
    axis: 'all',
    vars: ['scale-x', 'scale-y', 'scale-z'],
    default: 'scale',
    utilityMap: xyzUtilityScales,
  },
  'big': {
    type: 'scale',
    axis: 'all',
    vars: ['scale-x', 'scale-y', 'scale-z'],
    default: 'scale',
    utilityMap: xyzUtilityScales,
  },
  'narrow': {
    type: 'scale',
    axis: 'x',
    vars: ['scale-x'],
    default: 'scale',
    utilityMap: xyzUtilityScales,
  },
  'wide': {
    type: 'scale',
    axis: 'x',
    vars: ['scale-x'],
    default: 'scale',
    utilityMap: xyzUtilityScales,
  },
  'short': {
    type: 'scale',
    axis: 'y',
    vars: ['scale-y'],
    default: 'scale',
    utilityMap: xyzUtilityScales,
  },
  'tall': {
    type: 'scale',
    axis: 'y',
    vars: ['scale-y'],
    default: 'scale',
    utilityMap: xyzUtilityScales,
  },
  'thin': {
    type: 'scale',
    axis: 'z',
    vars: ['scale-z'],
    default: 'scale',
    utilityMap: xyzUtilityScales,
  },
  'thick': {
    type: 'scale',
    axis: 'z',
    vars: ['scale-z'],
    default: 'scale',
    utilityMap: xyzUtilityScales,
  },

  // Rotations
  'flip-up': {
		type: 'rotate',
    axis: 'x',
    vars: ['rotate-x'],
    default: 'rotate',
		utilityMap: utilityRotations,
	},
	'flip-down': {
		type: 'rotate',
    axis: 'x',
    vars: ['rotate-x'],
    default: 'rotate',
		utilityMap: utilityRotations,
	},
	'flip-left': {
		type: 'rotate',
    axis: 'y',
    vars: ['rotate-y'],
    default: 'rotate',
		utilityMap: utilityRotations,
	},
	'flip-right': {
		type: 'rotate',
    axis: 'y',
    vars: ['rotate-y'],
    default: 'rotate',
		utilityMap: utilityRotations,
	},
	'turn-cw': {
		type: 'rotate',
    axis: 'z',
    vars: ['rotate-z'],
    default: 'rotate',
		utilityMap: utilityRotations,
	},
	'turn-ccw': {
		type: 'rotate',
    axis: 'z',
    vars: ['rotate-z'],
    default: 'rotate',
		utilityMap: utilityRotations,
	},
}

export const xyzUtilityClasses = Object.entries(xyzUtilityClassesMap).map(([name, mode]) => {
  return {
    name: name,
    ...mode,
  }
})

export function getXyzUtilityClass(name, level) {
  const classObj = {
    name: name,
    ...xyzUtilityClassesMap[name],
  }

  if (level !== undefined) {
    classObj.level = level
    classObj.string = `${name}-${level}`
  } else {
    classObj.string = name
  }

  return classObj
}
