import cleanCss from 'gulp-clean-css';
import webpcss from 'gulp-avif-css';
import autoprefixer from 'gulp-autoprefixer';
import groupCssMediaQueries from 'gulp-group-css-media-queries';

export const css = () => {
	return app.gulp.src(`${app.path.build.css}style.css`, {})
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "CSS",
				message: "Error: <%= error.message %>"
			})))
		.pipe(
			app.plugins.if(
				app.isBuild,
				groupCssMediaQueries()
			)
		)
		.pipe(
			app.plugins.if(
				app.isBuild,
				autoprefixer({
					grid: false,
					flexbox: false,
					overrideBrowserslist: ["last 3 versions"],
					cascade: true
				})
			)
		)
		.pipe(
			app.plugins.if(
				app.isWebP,
				app.plugins.if(
					app.isBuild,
					webpcss(
						{
							webpClass: ".webp",
							noWebpClass: ".no-webp"
						}
					)
				)
			)
		)
		// Раскомментировать если нужен не сжатый дубль файла стилей
		.pipe(app.gulp.dest(app.path.build.css))
		.pipe(
			app.plugins.if(
				app.isBuild,
				cleanCss({
					compatibility: false,
					level: 2
				})
			)
		)
		.pipe(app.plugins.rename({ suffix: ".min" }))
		.pipe(app.gulp.dest(app.path.build.css));
}