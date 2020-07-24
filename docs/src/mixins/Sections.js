export default {
  computed: {
		sections() {
			const sectionsObj = {}
			this.$page.sections.edges.forEach((sectionEdge) => {
				sectionsObj[sectionEdge.node.title] = sectionEdge.node
			})

			return this.sectionDefinitions.map((sectionDefinition) => {
				if (sectionDefinition.header) {
					return sectionDefinition
				}

				const section = sectionsObj[sectionDefinition]
				return {
					...section,
					anchor: section.title.trim().toLowerCase().replace(/\s/g, '-').replace(/[^\w-]/g, ''),
				}
			})
		},
		mainSections() {
			return this.sections.filter((section) => !section.header)
		},
	},
}
