export default function randomArrayItem(arr) {
	const index = Math.floor(Math.random() * arr.length)
	return arr[index]
}
