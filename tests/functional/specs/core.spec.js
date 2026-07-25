'use strict'

const { test, expect } = require('@playwright/test')
const { computed, expectVar, expectVarUnset } = require('./helpers')

test.describe('@animxyz/core in plain HTML/CSS', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/html/')
	})

	test.describe('trigger mode classes', () => {
		test('attach the mode keyframe animations', async ({ page }) => {
			expect(await computed(page, '#mode-in', 'animation-name')).toContain('xyz-in-keyframes')
			expect(await computed(page, '#mode-out', 'animation-name')).toContain('xyz-out-keyframes')
			expect(await computed(page, '#mode-appear', 'animation-name')).toContain('xyz-appear-keyframes')
		})

		test('apply duration, delay, easing and iteration count to the animation', async ({ page }) => {
			expect(await computed(page, '#anim-active', 'animation-duration')).toBe('1s')
			expect(await computed(page, '#anim-active', 'animation-delay')).toBe('0.2s')
			expect(await computed(page, '#anim-active', 'animation-timing-function')).toBe('linear')
			expect(await computed(page, '#anim-iterate', 'animation-iteration-count')).toBe('3')
			expect(await computed(page, '#anim-active', 'animation-fill-mode')).toContain('both')
		})
	})

	test.describe('utilities via the data-xyz attribute', () => {
		// Typed @property dials compute calc() expressions; assertions use the
		// computed values Chromium serializes (not the authored calc() strings).
		test('fade sets the opacity variable', async ({ page }) => {
			await expectVar(page, expect, '#u-fade', '--xyz-opacity', '0')
			await expectVar(page, expect, '#u-fade-level', '--xyz-opacity', '0.5')
		})

		test('translate utilities set axis variables with direction sign', async ({ page }) => {
			await expectVar(page, expect, '#u-translate', '--xyz-translate-y', '-25%')
			await expectVar(page, expect, '#u-translate', '--xyz-translate-x', '20px')
			await expectVar(page, expect, '#u-translate', '--xyz-translate-z', '-400px')
			await expectVar(page, expect, '#u-translate-level', '--xyz-translate-y', '30px')
			await expectVar(page, expect, '#u-translate-level', '--xyz-translate-x', '-100%')
			await expectVar(page, expect, '#u-translate-level', '--xyz-translate-z', '200px')
		})

		test('rotate and flip utilities set rotation variables', async ({ page }) => {
			await expectVar(page, expect, '#u-rotate', '--xyz-rotate-x', '20deg')
			await expectVar(page, expect, '#u-rotate', '--xyz-rotate-y', '-90deg')
			await expectVar(page, expect, '#u-rotate', '--xyz-rotate-z', '180deg')
		})

		test('scale utilities set scale variables per axis', async ({ page }) => {
			await expectVar(page, expect, '#u-scale', '--xyz-scale-x', '1.5')
			await expectVar(page, expect, '#u-scale', '--xyz-scale-y', '1.5')
			await expectVar(page, expect, '#u-scale', '--xyz-scale-z', '1.5')
			await expectVar(page, expect, '#u-scale-small', '--xyz-scale-x', '0.75')
			await expectVar(page, expect, '#u-scale-x', '--xyz-scale-x', '1.075')
			await expectVar(page, expect, '#u-scale-y', '--xyz-scale-y', '2')
			await expectVar(page, expect, '#u-scale-z', '--xyz-scale-z', '1.05')
		})

		test('skew utilities set skew variables', async ({ page }) => {
			await expectVar(page, expect, '#u-skew', '--xyz-skew-x', '30deg')
			await expectVar(page, expect, '#u-skew', '--xyz-skew-y', '-20deg')
		})

		test('timing, origin and perspective utilities set their variables', async ({ page }) => {
			await expectVar(page, expect, '#u-timing', '--xyz-duration', '1s')
			await expectVar(page, expect, '#u-timing', '--xyz-delay', '0.2s')
			await expectVar(page, expect, '#u-timing', '--xyz-stagger', '0.3s')
			await expectVar(page, expect, '#u-timing', '--xyz-stagger-rev', '0.1s')
			await expectVar(page, expect, '#u-timing', '--xyz-iterate', '3')
			await expectVar(page, expect, '#u-timing', '--xyz-ease', 'linear')
			await expectVar(page, expect, '#u-timing', '--xyz-direction', 'alternate')
			await expectVar(page, expect, '#u-timing', '--xyz-origin', 'top')
			await expectVar(page, expect, '#u-timing', '--xyz-perspective', '1000px')
		})

		test('mode-scoped utilities set mode-specific variables only', async ({ page }) => {
			// Mode-specific vars are unregistered, so they keep authored calc() form.
			await expectVar(page, expect, '#u-mode-scoped', '--xyz-in-opacity', 'calc(1 - 1)')
			await expectVar(page, expect, '#u-mode-scoped', '--xyz-out-translate-y', 'calc(100% * -1)')
			await expectVar(page, expect, '#u-mode-scoped', '--xyz-appear-duration', '2s')
			// [data-xyz] resets registered dials to their typed identity initial-value
			await expectVarUnset(page, expect, '#u-mode-scoped', '--xyz-opacity', '1')
			await expectVarUnset(page, expect, '#u-mode-scoped', '--xyz-translate-y', '0px')
		})
	})

	test.describe('staggering', () => {
		test('nested children get increasing animation-delay', async ({ page }) => {
			const delays = await page.$$eval('#stagger-root .xyz-nested', (els) =>
				els.map((el) => window.getComputedStyle(el).getPropertyValue('animation-delay'))
			)
			expect(delays).toEqual(['0s', '0.2s', '0.4s', '0.6s'])
		})

		test('stagger-rev reverses the delay order', async ({ page }) => {
			const delays = await page.$$eval('#stagger-rev-root .xyz-nested', (els) =>
				els.map((el) => window.getComputedStyle(el).getPropertyValue('animation-delay'))
			)
			expect(delays).toEqual(['0.4s', '0.2s', '0s'])
		})
	})

	test.describe('nested elements', () => {
		test('xyz-nested and matching mode-nested elements animate with the parent', async ({ page }) => {
			expect(await computed(page, '#nested-child', 'animation-name')).toContain('xyz-in-keyframes')
			expect(await computed(page, '#nested-in-child', 'animation-name')).toContain('xyz-in-keyframes')
		})

		test('non-matching mode-nested and plain children do not animate', async ({ page }) => {
			expect(await computed(page, '#nested-out-child', 'animation-name')).toBe('none')
			expect(await computed(page, '#nested-plain', 'animation-name')).toBe('none')
		})
	})

	test.describe('variable scoping', () => {
		test('children without a data-xyz attribute inherit variables', async ({ page }) => {
			await expectVar(page, expect, '#scope-plain', '--xyz-opacity', '0')
		})

		test('a data-xyz attribute resets inherited variables', async ({ page }) => {
			// Registered dials reset to typed identity (not guaranteed-invalid)
			await expectVarUnset(page, expect, '#scope-reset', '--xyz-opacity', '1')
			await expectVar(page, expect, '#scope-reset', '--xyz-translate-y', '-25%')
		})

		test('the inherit utility opts back into inherited variables', async ({ page }) => {
			await expectVar(page, expect, '#scope-inherit', '--xyz-opacity', '0')
			await expectVar(page, expect, '#scope-inherit', '--xyz-translate-y', '-25%')
		})
	})

	test.describe('behavior toggles', () => {
		test('xyz-paused pauses the animation', async ({ page }) => {
			expect(await computed(page, '#toggle-paused', 'animation-play-state')).toBe('paused')
		})

		test('xyz-none disables the animation', async ({ page }) => {
			expect(await computed(page, '#toggle-none', 'animation-name')).toBe('none')
		})

		test('xyz-absolute removes the element from the flow', async ({ page }) => {
			expect(await computed(page, '#toggle-absolute', 'position')).toBe('absolute')
		})

		test('xyz-paused-all pauses nested animations too', async ({ page }) => {
			expect(await computed(page, '#nested-root', 'animation-play-state')).toBe('paused')
			expect(await computed(page, '#nested-child', 'animation-play-state')).toBe('paused')
		})
	})

	test.describe('running animations', () => {
		test('adding xyz-in runs the animation to completion and settles visible', async ({ page }) => {
			await page.evaluate(() => window.trigger('dyn-box', 'xyz-in'))
			await expect
				.poll(async () => page.evaluate(() => window.animEvents.map((e) => `${e.id}:${e.name}`)))
				.toContain('dyn-box:xyz-in-keyframes')
			expect(await computed(page, '#dyn-box', 'opacity')).toBe('1')
		})

		test('nested elements each complete their own staggered animation', async ({ page }) => {
			await page.evaluate(() => window.trigger('dyn-nested-root', 'xyz-in'))
			await expect
				.poll(async () => page.evaluate(() => window.animEvents.map((e) => `${e.id}:${e.name}`)))
				.toEqual(expect.arrayContaining(['dyn-nested-1:xyz-in-keyframes', 'dyn-nested-2:xyz-in-keyframes']))
		})
	})

	test.describe('reduced motion', () => {
		test('animations are disabled when prefers-reduced-motion is set', async ({ page }) => {
			await page.emulateMedia({ reducedMotion: 'reduce' })
			expect(await computed(page, '#mode-in', 'animation-name')).toBe('none')
			expect(await computed(page, '#nested-child', 'animation-name')).toBe('none')
		})
	})
})
