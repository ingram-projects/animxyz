export default function (obj) {
	Object.keys(obj).forEach((key) => {
		if (obj[key] === undefined) {
			delete obj[key]
		}
	})
}
