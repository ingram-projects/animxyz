export const integer = /[+-]?\d+/

export const number = /[+-]?(\d*\.)?\d+/

export const percentage = /@number%/

export const length = /@number(px|em|rem|vw|vh|vmin|vmax|ch|ex|cm|mm|in|pc|pt)/

export const angle = /@number(deg|turn|rad|grad)/

export const color = /#[a-f\d]{3,8}|(rgb|hsl)a?\([\w\d.%,]*\)/g
