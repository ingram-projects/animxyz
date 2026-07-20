'use strict'

const { test, expect } = require('@playwright/test')

async function getLog(page) {
	return page.evaluate(() => window.log)
}

test.describe('@animxyz/react', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/react/')
		await page.waitForSelector('#app main')
	})

	test('XyzTransition animates an element in and completes', async ({ page }) => {
		await page.click('#single-toggle')
		await expect(page.locator('#single-box')).toBeVisible()
		await expect.poll(() => getLog(page)).toContain('single:entered')
		// react-transition-group leaves the done class applied
		await expect(page.locator('#single-box')).toHaveClass(/xyz-in-to/)
	})

	test('XyzTransition animates an element out and removes it', async ({ page }) => {
		await page.click('#single-toggle')
		await expect.poll(() => getLog(page)).toContain('single:entered')
		await page.click('#single-toggle')
		await expect.poll(() => getLog(page)).toContain('single:exited')
		await expect(page.locator('#single-box')).toHaveCount(0)
	})

	test('xyz, className and style props are merged onto the child', async ({ page }) => {
		await expect.poll(() => getLog(page)).toContain('merge:entered')
		expect(await page.getAttribute('#merge-box', 'xyz')).toBe('fade up')
		const classes = await page.getAttribute('#merge-box', 'class')
		expect(classes).toContain('wrapper-class')
		expect(classes).toContain('child-class')
		expect(await page.$eval('#merge-box', (el) => el.style.getPropertyValue('--xyz-duration'))).toBe('50ms')
		// appear completed and settled visible
		await expect(page.locator('#merge-box')).toHaveClass(/xyz-appear-to/)
	})

	test('mode="out-in" leaves the old element before entering the new one', async ({ page }) => {
		await page.click('#switch-toggle')
		await expect(page.locator('#switch-b')).toBeVisible()
		await expect(page.locator('#switch-a')).toHaveCount(0)
		await expect.poll(() => getLog(page)).toContain('switch:entered')
		const log = await getLog(page)
		expect(log.indexOf('switch:exited')).toBeGreaterThanOrEqual(0)
		expect(log.indexOf('switch:exited')).toBeLessThan(log.indexOf('switch:entered'))
	})

	test('XyzTransitionGroup applies stagger index variables to children', async ({ page }) => {
		expect(await page.getAttribute('#group', 'class')).toContain('group-class')
		const indexes = await page.$$eval('#group .item', (els) =>
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
		await expect.poll(() => getLog(page)).toContain('group:entered')
		await page.click('#group-remove')
		await expect.poll(() => getLog(page)).toContain('group:exited')
		await expect(page.locator('#item-1')).toHaveCount(0)
	})

	test('appearVisible pauses the appear animation until the element is scrolled into view', async ({ page }) => {
		// below the fold: paused, not yet completed
		await expect(page.locator('#visible-box')).toHaveClass(/xyz-paused-all/)
		expect(await page.evaluate(() => window.log)).not.toContain('visible:entered')

		await page.locator('#visible-box').scrollIntoViewIfNeeded()

		await expect.poll(() => getLog(page)).toContain('visible:entered')
		await expect(page.locator('#visible-box')).not.toHaveClass(/xyz-paused-all/)
	})
})
