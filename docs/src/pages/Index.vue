<template>
	<layout>
    <main class="page-content">
      <div class="banner__wrap">
        <banner></banner>
      </div>

      <xyz-transition appear>
        <div class="intro__wrap" xyz="fade small-2 duration-7 ease-out-back">
          <p class="intro-text">
            The first truly composable CSS animation toolkit. Built for Vue, React, SCSS, and CSS, AnimXYZ will bring
            your website to life.
          </p>
        </div>
      </xyz-transition>

			<xyz-transition-group tag="section" class="sections__wrap" appear xyz="fade down">
        <docs-section v-for="section in mainSections" :section="section" :key="section.title"></docs-section>
      </xyz-transition-group>
    </main>
  </layout>
</template>

<page-query>
{
  sections: allSection {
    edges {
      node {
        title
				quote
				content
				examples {
					name
					template
					code {
						language
						content
					}
				}
				modifiers {
					utilities {
						hide
						multiple
						defaults
					}
					variables {
						hide
						defaults {
							name
							value
						}
					}
					groups {
						name
						types
					}
				}
      }
    }
  }
}
</page-query>

<script>
import Banner from '~/components/banner/Banner'
import DocsSection from '~/components/docsSection/DocsSection'
import SectionsMixin from '~/mixins/Sections'

export default {
	mixins: [SectionsMixin],
	components: {
		Banner,
		DocsSection,
	},
	data() {
		return {
			sectionDefinitions: [
				'Why AnimXYZ?',
			],
		}
	},
	metaInfo() {
		return {
			title: '',
		}
	},
}
</script>

<style lang="scss" scoped>
.page-content {
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.intro__wrap {
	--xyz-duration: 0.7s;
	--xyz-delay: 1.2s;
	margin: 0 auto;
	margin-bottom: $sp-xxl;
	text-align: center;
}

.intro-text {
	padding: 0 $sp-l;
	font-size: $fs-xl;
	font-weight: 500;
	line-height: 1.75;
	max-width: 56ch;

	@include media('<phone') {
		font-size: $fs-l;
	}
}

.banner__wrap {
	margin: $sp-xxl auto;
	padding: 0 $sp-m;
	width: 100%;
	max-width: 80rem;

	@include media('<phone') {
		margin: $sp-l auto;
		max-width: 80vw;
	}
}

.sections__wrap {
	margin: 0 auto;
	margin-bottom: $sp-xxxl;
	width: 100%;
	max-width: 80rem;
}
</style>
