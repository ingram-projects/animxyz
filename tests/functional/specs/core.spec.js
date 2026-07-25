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

	// NOTE ON EXPECTED VALUES: the all-mode dials are registered with @property in
	// v1, so the browser resolves them at computed-value time — getComputedStyle
	// returns the substituted value ("0", "-25%", "1.5") rather than the authored
	// token stream ("calc(1 - 1)"). The mode-scoped dials below are deliberately
	// left unregistered, so those still read back as the literal calc().
	test.describe('utilities via the data-xyz attribute', () => {
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
			// authored as `calc(0.25turn * -1)` / `0.5turn`; <angle> registration
			// normalizes turns to degrees
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
			await expectVar(page, expect, '#u-mode-scoped', '--xyz-in-opacity', 'calc(1 - 1)')
			await expectVar(page, expect, '#u-mode-scoped', '--xyz-out-translate-y', 'calc(100% * -1)')
			await expectVar(page, expect, '#u-mode-scoped', '--xyz-appear-duration', '2s')
			// The unscoped dials must stay untouched. They are registered, so an
			// untouched dial reads back as its identity initial-value (fully
			// opaque / no displacement) rather than as an empty string.
			await expectVar(page, expect, '#u-mode-scoped', '--xyz-opacity', '1')
			await expectVar(page, expect, '#u-mode-scoped', '--xyz-translate-y', '0px')
		})

		// v1 breaking change: the configuration attribute is `data-xyz`, and the
		// compiled CSS matches `[data-xyz~='…']` ONLY — there is no dual-selector
		// fallback for the legacy bare `xyz` attribute. Both dials read back as
		// their registered identity values, i.e. nothing was applied.
		test('the legacy bare xyz attribute is not matched', async ({ page }) => {
			await expectVar(page, expect, '#legacy-xyz', '--xyz-opacity', '1')
			await expectVar(page, expect, '#legacy-xyz', '--xyz-translate-y', '0px')
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

		// v1 lifts the $xyz-index-levels (20) cap by deriving the index from CSS
		// sibling-index() where supported. The nth-child ladder still ships, so on
		// engines without sibling-index() the 21st+ child correctly falls back to
		// index 0 — assert the capped behavior there rather than skipping blind.
		test('stagger continues past the nth-child ladder cap', async ({ page }) => {
			const supportsSiblingIndex = await page.evaluate(() =>
				CSS.supports('animation-delay', 'calc(1s * (sibling-index() - 1))')
			)
			const delays = await page.$$eval('#stagger-uncapped .xyz-nested', (els) =>
				els.map((el) => window.getComputedStyle(el).getPropertyValue('animation-delay'))
			)
			expect(delays).toHaveLength(25)
			// Inside the ladder's range both paths agree.
			expect(delays[0]).toBe('0s')
			expect(delays[19]).toBe('3.8s')

			if (supportsSiblingIndex) {
				expect(delays[20]).toBe('4s')
				expect(delays[24]).toBe('4.8s')
			} else {
				// Ladder-only fallback: no rule matches child 21+, so --xyz-index
				// falls back to 0.
				expect(delays[20]).toBe('0s')
				expect(delays[24]).toBe('0s')
			}
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
			// The reset returns --xyz-opacity to its registered identity value,
			// dropping the `fade` inherited from #scope-root, while `up` from this
			// element's own attribute still applies.
			await expectVar(page, expect, '#scope-reset', '--xyz-opacity', '1')
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

	// v1 registers the all-mode dials with @property. The point of registration is
	// type safety: an invalid value is rejected at computed-value time and falls
	// back to the typed initial-value instead of poisoning the whole animation.
	test.describe('typed dial custom properties', () => {
		test('an invalid value on a registered dial falls back to its initial value', async ({ page }) => {
			await expectVar(page, expect, '#prop-garbage', '--xyz-opacity', '1')
			await expectVar(page, expect, '#prop-garbage', '--xyz-scale-x', '1')
			// `42` is not an <angle>; the registered initial-value wins.
			await expectVar(page, expect, '#prop-garbage', '--xyz-rotate-z', '0deg')
		})

		// CRITICAL INVARIANT: mode dials are deliberately left unregistered so the
		// `var(--xyz-in-*, var(--xyz-*, …))` mode cascade keeps falling through.
		// An unregistered property accepts any token, so garbage survives here.
		test('mode-specific dials stay unregistered', async ({ page }) => {
			// An unregistered property accepts any token, so garbage survives here…
			await expectVar(page, expect, '#prop-unregistered', '--xyz-in-opacity', 'red')
			// …and, crucially, an untouched mode dial has NO value at all. If it had
			// been registered it would report an initial-value instead, and
			// `var(--xyz-in-opacity, var(--xyz-opacity, …))` would stop falling
			// through to the all-mode dial — a plain `fade` would stop fading.
			await expectVarUnset(page, expect, '#u-fade', '--xyz-in-opacity')
		})
	})

	// v1 emits everything inside @layer xyz and contains zero !important, which
	// inverts the override contract: author CSS wins unless it opts out.
	test.describe('cascade layers', () => {
		test('unlayered author CSS beats AnimXYZ', async ({ page }) => {
			// #layer-unlayered is .xyz-absolute (position: absolute in xyz.overrides);
			// the unlayered author rule `position: static` must win. Under 0.x this
			// was `position: absolute !important` and the author lost.
			expect(await computed(page, '#layer-unlayered', 'position')).toBe('static')
		})

		test('author CSS in a layer declared before xyz loses to AnimXYZ', async ({ page }) => {
			// Same rule, but inside `@layer base` with `@layer base, xyz;` declared
			// first — the documented way to deliberately lose to AnimXYZ.
			expect(await computed(page, '#layer-base', 'position')).toBe('absolute')
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
