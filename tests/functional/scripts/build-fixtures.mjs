// Builds each fixture app into dist/<name>/ so a single static server can host
// them all. The plain-HTML fixture is copied as-is (with the compiled core CSS);
// the Vue 2 / Vue 3 / React fixtures are bundled with Vite against the packages'
// built ESM dist files — the same artifacts consumers get from npm.
import { build } from 'vite'
import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DIST = path.join(ROOT, 'dist')

const CORE_CSS = require.resolve('@animxyz/core')

fs.rmSync(DIST, { recursive: true, force: true })

// --- plain HTML fixture: no bundling, just the page + the core stylesheet ---
fs.mkdirSync(path.join(DIST, 'html'), { recursive: true })
fs.copyFileSync(path.join(ROOT, 'fixtures', 'html', 'index.html'), path.join(DIST, 'html', 'index.html'))
fs.copyFileSync(CORE_CSS, path.join(DIST, 'html', 'animxyz.css'))

// --- bundled fixtures ---
const apps = [
	{
		name: 'vue3',
		// Full build so fixture templates compile at runtime (matches CDN usage).
		alias: { vue: 'vue/dist/vue.esm-bundler.js' },
		define: {
			__VUE_OPTIONS_API__: 'true',
			__VUE_PROD_DEVTOOLS__: 'false',
			__VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
		},
	},
	{
		name: 'vue2',
		// The Vue 2 fixture depends on the npm alias package "vue2" (vue@2.7);
		// point bare "vue" imports at its full ESM build.
		alias: { vue: 'vue2/dist/vue.esm.js' },
	},
	{
		name: 'react',
		define: { 'process.env.NODE_ENV': JSON.stringify('production') },
		esbuild: { jsx: 'automatic' },
	},
]

async function main() {
	for (const app of apps) {
		await build({
			root: path.join(ROOT, 'fixtures', app.name),
			base: './',
			logLevel: 'warn',
			resolve: { alias: app.alias || {} },
			define: app.define || {},
			esbuild: app.esbuild,
			build: {
				outDir: path.join(DIST, app.name),
				emptyOutDir: true,
				minify: false,
				sourcemap: false,
			},
		})
	}

	console.log(`fixtures built into ${DIST}`)
}

main().catch((error) => {
	console.error(error)
	process.exit(1)
})
