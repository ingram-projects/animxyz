import { DefineComponent, Directive, Plugin } from 'vue'

export type XyzDuration = number | string | { [mode: string]: number }

export type XyzAppearVisible = boolean | IntersectionObserverInit

export interface XyzTransitionProps {
	/** Animate the element in on initial render. */
	appear?: boolean
	/** Animate `appear` only once the element scrolls into view. Accepts
	 *  IntersectionObserver options. */
	appearVisible?: XyzAppearVisible
	/** Override the animation duration (ms). A per-mode object, or `'auto'` to
	 *  detect the end from the running animation. */
	duration?: XyzDuration
	/** Passed through to the underlying `<Transition>` mode. */
	mode?: string
	appearFromClass?: string
	appearActiveClass?: string
	appearToClass?: string
	enterFromClass?: string
	enterActiveClass?: string
	enterToClass?: string
	leaveFromClass?: string
	leaveActiveClass?: string
	leaveToClass?: string
}

export interface XyzTransitionGroupProps extends XyzTransitionProps {
	/** Wrapper element rendered by the group. Defaults to `'div'`. */
	tag?: string
	moveClass?: string
}

export const XyzTransition: DefineComponent<XyzTransitionProps>

export const XyzTransitionGroup: DefineComponent<XyzTransitionGroupProps>

/** `v-xyz` directive: merges the bound value into the element's `data-xyz` attribute. */
export const xyz: Directive<HTMLElement, string | string[] | undefined>

declare const VueAnimXyz: Plugin
export default VueAnimXyz
