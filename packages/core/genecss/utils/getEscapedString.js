export default function (string) {
	if (/^\/.+\/$/.test(string)) return string.substring(1, string.length - 1)
	return string.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
}
