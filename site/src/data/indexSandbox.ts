export const indexSandboxProps = {
  name: 'sandbox',
  examples: [
    {
      name: 'Sandbox',
      template: `
<div class="example-wrap">
  <XyzTransition duration="auto" v-xyz="data.utilities" :style="data.variables" v-on="data.listeners">
    <div class="item-group xyz-none" v-if="data.toggled">
      <div class="square xyz-nested" v-for="index in 3" :key="index"></div>
    </div>
  </XyzTransition>
</div>
      `,
      code: [
        {
          name: 'HTML',
          content: `
##html
<div class="item-group" \${data.utilitiesString && \`xyz="\${data.utilitiesString}"\`}>
  <div class="square \${data.mode}"></div>
  <div class="square \${data.mode}"></div>
  <div class="square \${data.mode}"></div>
</div>

\${data.variablesString && \`
<style>
  .item-group { \${data.variablesString} }
</style>
\`}
          `,
        },
        {
          name: 'Vue',
          content: `
##vue
<XyzTransitionGroup class="item-group" \${data.utilitiesString && \`xyz="\${data.utilitiesString}"\`}>
  <div class="square" v-if="\${data.toggled}"></div>
  <div class="square" v-if="\${data.toggled}"></div>
  <div class="square" v-if="\${data.toggled}"></div>
</XyzTransitionGroup>

\${data.variablesString && \`
##html
<style>
  .item-group { \${data.variablesString} }
</style>
\`}
          `,
        },
        {
          name: 'React',
          content: `
##jsx
<XyzTransitionGroup className="item-group" \${data.utilitiesString && \`xyz="\${data.utilitiesString}"\`}>
  {\${data.toggled} && <div className="square" />}
  {\${data.toggled} && <div className="square" />}
  {\${data.toggled} && <div className="square" />}
</XyzTransitionGroup>

\${data.variablesString && \`
##html
<style>
  .item-group { \${data.variablesString} }
</style>
\`}
          `,
        },
      ],
    },
  ],
  modifiers: {
    utilities: {
      defaults: ['fade'],
    },
    variables: true,
    presets: [
      { title: '🎓 Drop out', utilities: ['fade', 'down-100%', 'back-5'] },
      { title: '🌪 Spinny', utilities: ['fade', 'down-5', 'rotate-right-50%', 'stagger'] },
      { title: '⤵️ Flippy', utilities: ['fade', 'flip-up', 'flip-left'] },
      { title: '💾 Floppy', utilities: ['fade', 'front-3', 'flip-down-50%', 'duration-10', 'stagger-5'] },
      {
        title: '🎈 Yoink!',
        utilities: ['stagger-2', 'narrow-100%'],
        variables: ['translate-y: -350%', 'ease: cubic-bezier(0.5,-1.5,0.5,1.5)'],
      },
      { title: '📺 Click', utilities: ['duration-6', 'short-100%', 'wide-25%'] },
      {
        title: `🌀 It's gone spiral!`,
        variables: ['rotate-z: 1turn', 'origin: center -200%', 'duration: 2s', 'scale-x: 0', 'scale-y: 0'],
      },
      {
        title: '💫 Engage',
        variables: [
          'rotate-x: 90deg',
          'rotate-z: -180deg',
          'origin: -200%',
          'stagger: 0.1s',
          'duration: 0.75s',
          'perspective: 100px',
          'translate-z: 100px',
          'translate-y: 10vh',
        ],
      },
    ],
    groups: [
      { name: 'Fade', types: ['opacity'] },
      { name: 'Translate', types: ['translate'] },
      { name: 'Rotate', types: ['rotate'] },
      { name: 'Scale', types: ['scale'] },
      { name: 'Skew', types: ['skew'] },
      { name: 'Perspective', types: ['perspective'] },
      { name: 'Origin', types: ['origin'] },
      { name: 'Timing', types: ['duration', 'delay'] },
      { name: 'Ease', types: ['ease'] },
      { name: 'Stagger', types: ['stagger'] },
      { name: 'Iterate', types: ['iterate'] },
      { name: 'Direction', types: ['direction'] },
    ],
  },
} as const
