---
title: How it Works
quote: TBD
---

AnimXYZ uses [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) under the hood to modify a core keyframe animation. These xyz-variables determine the timing and the values of the element properties that will be animated such as opacity and transform. Each value will be animated to and from depending on whether the element is animating in or out.

Here is a simplified version of whats going on behind the scenes:
```css
@keyframes xyz-keyframes {
  from {
    opacity: var(--xyz-fade);
    transform: translate3d(var(--xyz-translate-x), var(--xyz-translate-y), var(--xyz-translate-z));
  }
}

.xyz-in {
  animation-name: xyz-keyframes;
  animation-duration: var(--xyz-duration);
  animation-direction: forwards;
}

.xyz-out {
  animation-name: xyz-keyframes;
  animation-duration: var(--xyz-duration);
  animation-direction: reverse;
}
```

 Instead of having to write keyframes for every unique animation, you just tell the one animation what to do.
