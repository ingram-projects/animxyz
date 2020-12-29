module.exports = {
	lintOnSave: false,
	css: {
		loaderOptions: {
			sass: {
				additionalData: `
          @import '@/styles/_variables.scss';
        `,
			},
		},
	},
}
