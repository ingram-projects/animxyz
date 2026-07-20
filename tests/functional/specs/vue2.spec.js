'use strict'

const { test, expect } = require('@playwright/test')

async function getLog(page) {
	return page.evaluate(() => window.log)
}

test.describe('@animxyz/vue (Vue 2)', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/vue2/')
		await page.waitForSelector('#app main, main')
	})

	test('XyzTransition animates an element in and completes', async ({ page }) => {
		await page.click('#single-toggle')
		await expect(page.locator('#single-box')).toBeVisible()
		expect(await page.getAttribute('#single-box', 'xyz')).toBe('fade')
		await expect.poll(() => getLog(page)).toContain('single:after-enter')
	})

	test('XyzTransition animates an element out and removes it', async ({ page }) => {
		await page.click('#single-toggle')
		await expect.poll(() => getLog(page)).toContain('single:after-enter')
		await page.click('#single-toggle')
		await expect.poll(() => getLog(page)).toContain('single:after-leave')
		await expect(page.locator('#single-box')).toHaveCount(0)
	})

	test('appear runs the appear animation on mount', async ({ page }) => {
		await expect.poll(() => getLog(page)).toContain('appear:after-appear')
		await expect(page.locator('#appear-box')).toBeVisible()
	})

	test('XyzTransitionGroup renders the tag and stagger index variables', async ({ page }) => {
		expect(await page.$eval('#group', (el) => el.tagName)).toBe('UL')
		expect(await page.getAttribute('#group', 'class')).toContain('group-class')

		const indexes = await page.$$eval('#group li', (els) =>
			els.map((el) => [el.style.getPropertyValue('--xyz-index'), el.style.getPropertyValue('--xyz-index-rev')])
		)
		expect(indexes).toEqual([
			['0', '2'],
			['1', '1'],
			['2', '0'],
		])
	})

	test('XyzTransitionGroup animates added and removed items', async ({ page }) => {
		await page.click('#group-add')
		await expect(page.locator('#item-4')).toBeVisible()
		await page.click('#group-remove')
		await expect(page.locator('#item-1')).toHaveCount(0)
	})

	test('v-xyz directive sets the xyz attribute', async ({ page }) => {
		expect(await page.getAttribute('#dir-plain', 'xyz')).toBe('fade up')
	})

	test('v-xyz composes with an existing xyz attribute and updates reactively', async ({ page }) => {
		expect(await page.getAttribute('#dir-compose', 'xyz')).toBe('duration-5 fade up')
		await page.click('#dir-update')
		await expect(page.locator('#dir-compose')).toHaveAttribute('xyz', 'duration-5 left')
	})
})
