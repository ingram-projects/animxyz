'use strict'

const { test, expect } = require('@playwright/test')

async function getLog(page) {
	return page.evaluate(() => window.log)
}

test.describe('@animxyz/vue3', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/vue3/')
		await page.waitForSelector('#app main')
	})

	test('XyzTransition animates an element in and completes', async ({ page }) => {
		await page.click('#single-toggle')
		await expect(page.locator('#single-box')).toBeVisible()
		await expect.poll(() => getLog(page)).toContain('single:after-enter')
		// transition classes are cleaned up after completion
		const classes = await page.getAttribute('#single-box', 'class')
		expect(classes).not.toContain('xyz-in')
	})

	test('XyzTransition animates an element out and removes it', async ({ page }) => {
		await page.click('#single-toggle')
		await expect.poll(() => getLog(page)).toContain('single:after-enter')
		await page.click('#single-toggle')
		await expect.poll(() => getLog(page)).toContain('single:after-leave')
		await expect(page.locator('#single-box')).toHaveCount(0)
	})

	test('XyzTransition applies xyz transition classes while animating', async ({ page }) => {
		await page.click('#slow-toggle')
		// active class present mid-flight with the xyz attr forwarded to the element
		await expect(page.locator('#slow-box')).toHaveClass(/xyz-in/)
		expect(await page.getAttribute('#slow-box', 'xyz')).toBe('fade')
		expect(await page.$eval('#slow-box', (el) => window.getComputedStyle(el).animationName)).toContain(
			'xyz-in-keyframes'
		)
	})

	test('appear runs the appear animation on mount', async ({ page }) => {
		await expect.poll(() => getLog(page)).toContain('appear:after-appear')
		await expect(page.locator('#appear-box')).toBeVisible()
	})

	test('numeric duration prop resolves the transition', async ({ page }) => {
		await page.click('#duration-number-toggle')
		await expect.poll(() => getLog(page)).toContain('duration-number:after-enter')
	})

	test('duration="auto" waits for nested animations', async ({ page }) => {
		await page.click('#duration-auto-toggle')
		await expect.poll(() => getLog(page)).toContain('duration-auto:after-enter')
		await expect(page.locator('#duration-auto-box .xyz-nested')).toHaveCount(2)
	})

	test('mode="out-in" leaves the old element before entering the new one', async ({ page }) => {
		await page.click('#switch-toggle')
		await expect(page.locator('#switch-b')).toBeVisible()
		await expect(page.locator('#switch-a')).toHaveCount(0)
		await expect.poll(() => getLog(page)).toContain('switch:after-enter')
		const log = await getLog(page)
		expect(log.indexOf('switch:after-leave')).toBeGreaterThanOrEqual(0)
		expect(log.indexOf('switch:after-leave')).toBeLessThan(log.indexOf('switch:after-enter'))
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
		// indexes are recalculated for the remaining items
		const indexes = await page.$$eval('#group li', (els) => els.map((el) => el.style.getPropertyValue('--xyz-index')))
		expect(indexes).toEqual(['0', '1', '2'])
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
