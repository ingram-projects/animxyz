---
title: Timing

examples:
  - name: Timing
    template: |
      <xyz-transition xyz="fade turn-cw-50" v-xyz="data.modifiers.utilities" v-on="data.listeners">
        <div class="square" v-show="data.toggled"></div>
      </xyz-transition>
    code:
      - language: html
        content: |
          <div class="square ${data.mode}" xyz="fade turn-cw-50 ${data.modifiers.utilities}"></div>

modifiers:
  utilities:
    default: duration-20
  groups:
    - name: Timing
      types: [duration, delay]
    - name: Ease
      types: [ease]

---

This is the timing section

Curabitur blandit tempus porttitor. Maecenas faucibus mollis interdum. Vestibulum id ligula porta felis euismod semper. Donec id elit non mi porta gravida at eget metus.

Etiam porta sem malesuada magna mollis euismod. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed posuere consectetur est at lobortis. Maecenas faucibus mollis interdum.

Aenean lacinia bibendum nulla sed consectetur. Maecenas faucibus mollis interdum. Aenean lacinia bibendum nulla sed consectetur. Maecenas sed diam eget risus varius blandit sit amet non magna. Donec sed odio dui. Donec id elit non mi porta gravida at eget metus. Vestibulum id ligula porta felis euismod semper.
