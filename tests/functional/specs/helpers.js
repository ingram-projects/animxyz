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
	expect(normalizeCalc(value), `${selector} ${property}`).toBe(expected)
}

module.exports = { computed, normalizeCalc, expectVar }
