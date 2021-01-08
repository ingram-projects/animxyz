module.exports = function (pkg) {
	const banner = `/**
   * ${pkg.moduleName} v${pkg.version}
   * Copyright (c) 2020-present Ingram Projects
   * Released under the ${pkg.license} License.
   * ${pkg.homepage}
   */
  `

	return {
		banner,
		input: 'src',
		output: {
			dir: 'dist',
			moduleName: pkg.moduleName,
			fileName({ format }) {
				if (format === 'umd') {
					return `${pkg.moduleName}.js`
				}
				return `${pkg.moduleName}.[format].js`
			},
			format: ['umd-min', 'esm', 'cjs'],
		},
		external: [
			...Object.keys(pkg.dependencies),
			...Object.keys(pkg.peerDependencies),
			...Object.keys(pkg.devDependencies),
		],
	}
}
