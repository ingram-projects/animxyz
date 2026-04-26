export default function (str) {
	const textarea = document.createElement('textarea')
	textarea.value = str
	textarea.setAttribute('readonly', '')
	textarea.style.position = 'absolute'
	textarea.style.left = '-9999px'
	document.body.appendChild(textarea)
	const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false
	textarea.select()
	document.execCommand('copy')
	document.body.removeChild(textarea)
	if (selected) {
		document.getSelection().removeAllRanges()
		document.getSelection().addRange(selected)
	}
}
