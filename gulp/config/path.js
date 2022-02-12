// Получаем имя папки проекта
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./docs`;
const srcFolder = `./src`;

export const path = {
  build: {
    js: `${buildFolder}/js/`,
    css: `${buildFolder}/css/`,
    html: `${buildFolder}/`,
    images: `${buildFolder}/img/`,
    fonts: `${buildFolder}/fonts/`,
    files: `${buildFolder}/files/`
  },
  src: {
    js: `${srcFolder}/_js/app.js`,
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,avif}`,
    svg: `${srcFolder}/img/**/*.svg`,
    sass: `${srcFolder}/_scss/style.scss`,
    html: `${srcFolder}/*.pug`,
    files: `${srcFolder}/files/**/*.*`,
    svgicons: `${srcFolder}/svg/*.svg`,
  },
  watch: {
    js: `${srcFolder}/_js/**/*.js`,
    sass: `${srcFolder}/_scss/**/*.{sass,scss}`,
    html: `${srcFolder}/**/*.pug`,
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,svg,ico}`,
    files: `${srcFolder}/files/**/*.*`,
    svgSprive: `${srcFolder}/svg/*.svg`,
  },
  clean: buildFolder,
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
  ftp: `/var/www/tirozit.ga`// Папка на удаленном сервере, куда залить
}