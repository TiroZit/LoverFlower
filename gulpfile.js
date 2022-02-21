// Основной модуль
import gulp from 'gulp';
// Импорт путей
import { path } from './gulp/config/path.js';
// Импорт общих плагинов
import { plugins } from './gulp/config/plugins.js';

// Передаем значения в глобальную переменную
global.app = {
  isBuild: process.argv.includes('--build'),
  isDev: !process.argv.includes('--build'),
  path: path,
  gulp: gulp,
  plugins: plugins
}

// Импорт задач
import { copy } from './gulp/tasks/copy.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { server } from './gulp/tasks/server.js';
import { sass } from './gulp/tasks/sass.js';
import { js } from './gulp/tasks/js.js';
import { images } from './gulp/tasks/images.js';
import { otfToTtf, ttfToWoff, fontsStyle } from './gulp/tasks/fonts.js';
import { svgSprive } from './gulp/tasks/svgSprive.js';
import { zip } from './gulp/tasks/zip.js';
import { ftp } from './gulp/tasks/ftp.js';
import { gitignore } from './gulp/tasks/gitignore.js';

// Наблюдатель за изменениями в файлах
function watcher(){
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.sass, sass);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images);
  gulp.watch(path.watch.svgSprive, svgSprive);
}

// Последовательная обработка шрифтов 
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, sass, js, images, svgSprive, gitignore));

// Построение сценариев выполнение задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server))
const build = gulp.series(reset, mainTasks, svgSprive);
const deployZIP = gulp.series(reset, mainTasks, svgSprive, zip)
const deployFTP = gulp.series(reset, mainTasks, svgSprive, ftp)

// Экспорт сценариев
export { dev }
export { build }
export { deployZIP }
export { deployFTP }

// Выполнение сценария по умолчанию
gulp.task('default', dev);

// "devDependencies": {
//   "browser-sync": "^2.27.7",
//   "del": "^6.0.0",
//   "gulp": "^4.0.2",
//   "gulp-autoprefixer": "^8.0.0",
//   "gulp-clean-css": "^4.3.0",
//   "gulp-fonter": "^0.3.0",
//   "gulp-group-css-media-queries": "^1.2.2",
//   "gulp-htmlmin": "^5.0.1",
//   "gulp-if": "^3.0.0",
//   "gulp-imagemin": "^8.0.0",
//   "gulp-newer": "^1.4.0",
//   "gulp-notify": "^4.0.0",
//   "gulp-plumber": "^1.2.1",
//   "gulp-pug": "^5.0.0",
//   "gulp-rename": "^2.0.0",
//   "gulp-replace": "^1.1.3",
//   "gulp-sass": "^5.0.0",
//   "gulp-svg-sprite": "^1.5.0",
//   "gulp-ttf2woff2": "^4.0.1",
//   "gulp-version-number": "^0.2.4",
//   "gulp-webp": "^4.0.1",
//   "gulp-webp-html-nosvg": "^1.0.1",
//   "gulp-webpcss": "^1.1.1",
//   "gulp-zip": "^5.1.0",
//   "sass": "^1.45.1",
//   "util": "^0.12.4",
//   "vinyl-ftp": "^0.6.1",
//   "webp-converter": "2.2.3",
//   "webpack": "^5.65.0",
//   "webpack-stream": "^7.0.0"
// }