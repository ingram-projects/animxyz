'use strict'

const fs = require('node:fs')
const path = require('node:path')
const { defineConfig, devices } = require('@playwright/test')

// Prefer the Chromium build Playwright manages. In sandboxes that pre-provision
// a browser at PLAYWRIGHT_BROWSERS_PATH but with a different revision than this
// @playwright/test release expects, fall back to the provisioned executable so
// the suite runs without a network download.
function resolveChromiumExecutablePath() {
	try {
		const { chromium } = require('playwright-core')
		if (fs.existsSync(chromium.executablePath())) {
			return undefined // managed browser is present; let Playwright use it
		}
	} catch {
		// fall through to the provisioned browser
	}
	const provisioned = path.join(process.env.PLAYWRIGHT_BROWSERS_PATH || '/opt/pw-browsers', 'chromium')
	if (fs.existsSync(provisioned)) {
		return provisioned
	}
	return undefined // let Playwright raise its usual "run playwright install" error
}

const PORT = process.env.XYZ_TEST_PORT || 4173

module.exports = defineConfig({
	testDir: './specs',
	fullyParallel: true,
	forbidOnly: Boolean(process.env.CI),
	retries: process.env.CI ? 2 : 0,
	reporter: process.env.CI ? [['list'], ['github']] : 'list',
	use: {
		baseURL: `http://127.0.0.1:${PORT}`,
		trace: 'retain-on-failure',
	},
	projects: [
		{
			name: 'chromium',
			use: {
				...devices['Desktop Chrome'],
				launchOptions: {
					executablePath: resolveChromiumExecutablePath(),
				},
			},
		},
	],
	webServer: {
		command: `node scripts/serve.mjs ${PORT}`,
		url: `http://127.0.0.1:${PORT}/html/`,
		reuseExistingServer: !process.env.CI,
	},
})
