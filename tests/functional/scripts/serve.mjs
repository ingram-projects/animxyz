// Minimal static file server for the built fixture apps in dist/.
// Zero dependencies so the test workspace stays light.
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const DIST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist')
const PORT = Number(process.argv[2]) || 4173

const MIME = {
	'.html': 'text/html; charset=utf-8',
	'.js': 'text/javascript; charset=utf-8',
	'.mjs': 'text/javascript; charset=utf-8',
	'.css': 'text/css; charset=utf-8',
	'.map': 'application/json; charset=utf-8',
	'.json': 'application/json; charset=utf-8',
	'.svg': 'image/svg+xml',
}

const server = http.createServer((req, res) => {
	const url = new URL(req.url, `http://127.0.0.1:${PORT}`)
	let filePath = path.normalize(path.join(DIST, decodeURIComponent(url.pathname)))

	if (!filePath.startsWith(DIST)) {
		res.writeHead(403).end('Forbidden')
		return
	}
	if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
		filePath = path.join(filePath, 'index.html')
	}
	if (!fs.existsSync(filePath)) {
		res.writeHead(404).end('Not found')
		return
	}
	res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath)] || 'application/octet-stream' })
	fs.createReadStream(filePath).pipe(res)
})

server.listen(PORT, () => {
	console.log(`fixture server running at http://127.0.0.1:${PORT} (serving ${DIST})`)
})
