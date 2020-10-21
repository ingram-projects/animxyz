---
title: Active Classes
quote: Element goes in, element goes out, you can't explain that.
---

AnimXYZ animates elements in and out when activated by their respective classes. `xyz-in` animates elements **from** the values set by XYZ utilities and variables, while `xyz-out` animates elements **to** those values.

For example an element with `xyz-in` and `xyz="fade"` will fade from 0 to its natural opacity, while `xyz-out` will fade it from its natural opacity to 0.

AnimXYZ utilities and variables by default apply to both the in and out classes, but you can set specific animations for each direction. Utilities and variable have in and out variants which will apply to the relevant direction. For example an element with `xyz="in-up out-turn-cw"` will slide in and rotate out. [Try it out here](<?tab=examples&example=Example 1#active-classes>)

Also an element with an `xyz-nested` class will animate if it is a descendant of an element with an active class, and will adopt the direction set by the parent class.

::: note [Vue,React]
There is also an `xyz-appear` class.
:::