'use strict'

// Computed value of a CSS custom property (or any property) on an element.
async function computed(page, selector, property) {
	return page.$eval(selector, (el, prop) => window.getComputedStyle(el).getPropertyValue(prop).trim(), property)
}

// Normalize whitespace inside calc() expressions so assertions don't depend on
// serializer details across browser versions.
function normalizeCalc(value) {
	return value.replace(/\s+/g, ' ').trim()
}

async function expectVar(page, expect, selector, property, expected) {
	const value = await computed(page, selector, property)
	expect(normalizeCalc(value), `${selector} ${property} (raw: ${JSON.stringify(value)})`).toBe(expected)
}

// A custom property reset via `initial`:
// - unregistered props → guaranteed-invalid (serialized as '' or 'initial')
// - @property-registered dials → their typed initial-value (identity), which is
//   the v1 equivalent of "no contribution" for that dial
async function expectVarUnset(page, expect, selector, property, identity = null) {
	const value = await computed(page, selector, property)
	const allowed = identity == null ? ['', 'initial'] : ['', 'initial', identity]
	expect(allowed, `${selector} ${property} should be unset/identity (raw: ${JSON.stringify(value)})`).toContain(
		normalizeCalc(value)
	)
}

module.exports = { computed, normalizeCalc, expectVar, expectVarUnset }
