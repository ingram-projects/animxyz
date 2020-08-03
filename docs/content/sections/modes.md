---
title: Modes
quote: Element goes in, element goes out, you can't explain that.
---

AnimXYZ animates elements when they are added or removed from view. Following the same concept as Vue and React's animation systems, AnimXYZ animations come in 3 modes. **Appear** for when an element initially appears. **In** for when an element is added. **Out** for when an element is removed.

Each animation mode is triggered by a related class on the animating element or parent element. For example to run the **Out** animation, you add the class `xyz-out` to an element with an [XYZ Context](#contexts).

The provided animation utilities and variables adapt to each mode. **In** and **Appear** animate from the provided utility or variable values, and **Out** animates back to those values.