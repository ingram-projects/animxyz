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

// A custom property reset via `initial` computes to guaranteed-invalid; engines
// serialize that as an empty string, but be lenient about the literal keyword.
async function expectVarUnset(page, expect, selector, property) {
	const value = await computed(page, selector, property)
	expect(['', 'initial'], `${selector} ${property} should be unset (raw: ${JSON.stringify(value)})`).toContain(
		normalizeCalc(value)
	)
}

module.exports = { computed, normalizeCalc, expectVar, expectVarUnset }
