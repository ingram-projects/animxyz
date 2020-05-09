import React, { Children } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import xyzTransitionProps from './xyzTransitionProps'

export default function (props) {
  const { component, childFactory, xyz, children, ...rest } = props
  const childrenArray = Children.toArray(children)

  return (
    <TransitionGroup component={component} childFactory={childFactory} xyz={xyz}>
      {childrenArray.map((child) => (
        <CSSTransition
          {...xyzTransitionProps}
          key={child.key}
          {...rest}
        >
          {child}
        </CSSTransition>
      ))}
    </TransitionGroup>
  )
}
