import svgmin from 'gulp-svgmin';
import svgSprite from 'gulp-svg-sprite';
import cheerio from 'gulp-cheerio';

export const svgSprive = () => {
  return app.gulp.src(`${app.path.src.svgicons}`, {})
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "SVG",
        message: "Error: <%= error.message %>"
      }))
    )
    .pipe(svgmin({
			multipass: true,
      full: true,
      plugins: [
        'removeDoctype',
        'removeComments',
        'sortAttrs',
        'removeUselessStrokeAndFill',
      ],
    }))
    .pipe(
      cheerio({
        run: function ($) {
          $('[style]').removeAttr('style');
          $('[width]').removeAttr('width');
          $('[height]').removeAttr('height');
        },
        parserOptions: {
          xmlMode: true
        },
      })
    )
    .pipe(svgSprite({
			mode: {
				symbol: {
					sprite: '../icons/icons.svg',
					//example: true
				}
			},
			shape: {
				id: {
					separator: '',
					generator: 'svg-'
				},
				transform: [
					{
						svgo: {
							plugins: [
								{ removeXMLNS: true },
								{ convertPathData: false },
								{ removeViewBox: false },
							]
						}
					}
				]
			},
			svg: {
				rootAttributes: {
					style: 'display: none;',
					'aria-hidden': true
				},
				xmlDeclaration: false
			}
		}))
    .pipe(app.gulp.dest(`${app.path.build.images}`))
    .pipe(app.plugins.browsersync.stream());
}