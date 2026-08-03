import * as React from 'react'

declare module '@animxyz/react' {
	/**
	 * A CSS animation duration for AnimXYZ. Either a single value applied to every
	 * mode, or a per-mode map. Numbers are milliseconds; strings are CSS times
	 * (e.g. `'0.5s'`); `'auto'` waits for the real `animationend`/`animationcancel`.
	 */
	export type XyzDuration =
		| number
		| string
		| {
				appear?: number | string
				in?: number | string
				out?: number | string
		  }

	/**
	 * `appearVisible` gates the initial `appear` animation on the element scrolling
	 * into view. `true` uses default IntersectionObserver options; an object is
	 * passed straight through as `IntersectionObserverInit`.
	 */
	export type XyzAppearVisible = boolean | IntersectionObserverInit

	/** Lifecycle callbacks shared with react-transition-group. */
	interface XyzTransitionLifecycleProps {
		onEnter?: (node: HTMLElement, isAppearing: boolean) => void
		onEntering?: (node: HTMLElement, isAppearing: boolean) => void
		onEntered?: (node: HTMLElement, isAppearing: boolean) => void
		onExit?: (node: HTMLElement) => void
		onExiting?: (node: HTMLElement) => void
		onExited?: (node: HTMLElement) => void
		/**
		 * Custom end-of-transition detector. AnimXYZ supplies its own; overriding it
		 * replaces the built-in animation hook.
		 */
		addEndListener?: (node: HTMLElement, done: () => void) => void
	}

	/** Props common to every AnimXYZ transition component. */
	export interface XyzTransitionCommonProps extends XyzTransitionLifecycleProps {
		/**
		 * Space-separated AnimXYZ utility string, e.g. `"fade small stagger"`.
		 * Rendered onto the child as a `data-xyz` attribute.
		 */
		xyz?: string
		/** Per-mode or global animation duration. */
		duration?: XyzDuration
		/** Only run the `appear` animation once the element is visible. */
		appearVisible?: XyzAppearVisible
		/** Run the enter animation on initial mount. */
		appear?: boolean
		enter?: boolean
		exit?: boolean
		/** Mount the child only when it first enters. */
		mountOnEnter?: boolean
		/** Unmount the child after it has exited. */
		unmountOnExit?: boolean
		className?: string
		style?: React.CSSProperties
	}

	/**
	 * Animates a single child in and out. When used with `mode`, wraps
	 * react-transition-group's `SwitchTransition` so the old child leaves before
	 * (or in sync with) the new one entering. Passing no child is safe.
	 */
	export interface XyzTransitionProps extends XyzTransitionCommonProps {
		/** Switch strategy when the child changes. */
		mode?: 'out-in' | 'in-out' | 'default'
		/** A single element, or none (renders an empty placeholder). */
		children?: React.ReactNode
	}

	/**
	 * Animates a list of children as they mount, unmount, and reorder. Exposes
	 * `--xyz-index` / `--xyz-index-rev` CSS variables on each item for staggering.
	 */
	export interface XyzTransitionGroupProps extends XyzTransitionCommonProps {
		/** The element type rendered as the group wrapper (defaults to `div`). */
		component?: React.ElementType | null
		children?: React.ReactNode
	}

	export const XyzTransition: React.FC<XyzTransitionProps>
	export const XyzTransitionGroup: React.FC<XyzTransitionGroupProps>

	/**
	 * Re-export of `clsx`. Compose AnimXYZ utility strings conditionally, e.g.
	 * `xyz('fade', { small: isSmall })`.
	 */
	export function xyz(
		...args: Array<string | number | null | undefined | false | Record<string, unknown> | ReadonlyArray<unknown>>
	): string
}
