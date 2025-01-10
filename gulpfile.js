const path = require("path");

const { series, src, dest, parallel, watch } = require("gulp");
const webpack = require("webpack");
const webpackStream = require("webpack-stream");
const del = require("del");
const autoprefixer = require("gulp-autoprefixer");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();

const webpackConfig = require("./webpack.config.js");

const paths = {
  images: {
    src: 'src/img/**/*.{jpg,jpeg,png,gif,svg}',
    dest: 'dist/img'
  },
  scripts: {
    src: "src/ts/index.ts",
    watch: "src/ts/**/*.ts",
  },
  styles: {
    src: "src/scss/main.scss",
    watch: "src/scss/**/*.scss",
  },
  img: {
    src: "src/img/**/*",
  },
  html: {
    src: "src/index.html",
  },
  dest: "dist",
  temp: ".tmp",
};

function clean() {
  return del([paths.dest, paths.temp]);
}

function server() {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
  });
}

function styles() {
  return src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(sourcemaps.write())
    .pipe(dest(paths.dest))
    .pipe(browserSync.stream());
}

function scripts() {
  return src(paths.scripts.src)
    .pipe(webpackStream(webpackConfig(paths), webpack))
    .pipe(dest(paths.dest))
    .pipe(browserSync.stream());
}

function html() {
  return src(paths.html.src).pipe(dest(paths.dest)).pipe(browserSync.stream());
}

function img() {
  return src(paths.img.src).pipe(dest(paths.dest + "/img"));
}

async function optimizeImages() {
  const imagemin = await import('gulp-imagemin');
  return src(paths.images.src)
    .pipe(imagemin.default([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({ quality: 75, progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [
          { name: 'removeViewBox', active: true },
          { name: 'cleanupIDs', active: false }
        ]
      })
    ]))
    .pipe(dest(paths.images.dest));
}

const build = series(clean, parallel(styles, scripts, html, img, optimizeImages));
const dev = () => {
  watch(paths.scripts.watch, { ignoreInitial: false }, scripts).on(
    "change",
    browserSync.reload
  );
  watch(paths.styles.watch, { ignoreInitial: false }, styles);
  watch(paths.img.src, { ignoreInitial: false }, img);
  watch(paths.images.src, { ignoreInitial: false }, optimizeImages);
  watch(paths.html.src, { ignoreInitial: false }, html).on(
    "change",
    browserSync.reload
  );
  server();
};

exports.build = build;
exports.server = server;
exports.styles = styles;
exports.scripts = scripts;
exports.optimizeImages = optimizeImages;
exports.default = dev;
exports.clean = clean;