const fs = require('fs')
const path = require('path')

const args = process.argv.slice(2)
const distPath = path.resolve(__dirname, '..', 'dist')

function loadModuleSafe(name) {
	try {
		return require(name)
	} catch (e) {
		return undefined
	}
}

function copyFiles(from, to) {
	if (fs.existsSync(from)) {
		fs.readdirSync(from).forEach((file) => {
			fs.copyFileSync(path.join(from, file), path.join(to, file))
		})
	}
}

function installVersion(version) {
	copyFiles(path.join(distPath, version), distPath)
}

if (args[0]) {
	installVersion(args[0])
} else {
	const Vue = loadModuleSafe('vue')
	if (!Vue || typeof Vue.version !== 'string') {
		console.warn('[@animxyz/vue] Vue was not detected in the dependencies. Please install Vue first.')
	} else if (Vue.version.startsWith('2.')) {
		installVersion('vue2')
	} else if (Vue.version.startsWith('3.')) {
		installVersion('vue3')
	} else {
		console.warn(`[@animxyz/vue] Vue version v${Vue.version} is not suppported.`)
	}
}
