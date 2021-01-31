const fs = require('fs')
const autoprefixer = require('autoprefixer')
const postcss = require('postcss')
const animxyz = require('./dist/animxyz')

async function generate() {
	const css = fs.readFileSync('./animxyz.css')

	const result = await postcss([animxyz, autoprefixer]).process(css, {
		from: './animxyz.css',
		to: './dist/animxyz.css',
	})

	fs.writeFile('./dist/animxyz.css', result.css, () => true)
	if (result.map) {
		fs.writeFile('./dist/animxyz.css.map', result.map.toString(), () => true)
	}
}

generate()
