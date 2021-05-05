module.exports = {
  // -------------------------------------------- sourcemaps
  mapsPath: "maps",
  // -------------------------------------------- autoprefixer
  autoprefixer: {
    opts: {
      browsers: ["last 3 versions"],
    },
  },
  // --------------------------------------------- browsersync
  browsersync: {
    server: {
      server: "build/",
      index: "index.html",
    },
    watch: [
      "./src/assets/scss/*.scss",
      "./src/assets/scss/**/*.scss",
      "./src/assets/js/*.js",
      "./src/assets/images/**",
      "./src/assets/fonts/**",
      "./src/templates/**/*.html",
    ],
  },
  // --------------------------------------------- styles
  styles: {
    src: {
      custom: ["./src/assets/scss/*.scss"],
      all: ["./src/assets/scss/**/*.scss", "./src/assets/scss/*.scss"],
    },
    dest: "./build/assets/css",
    concat: "styles.min.css",
    sass: {
      outputStyle: "expanded",
    },
    postcss: {
      removeAll: true,
    },
  },
  // --------------------------------------------- scripts
  scripts: {
    src: {
      custom: ["./src/assets/js/main.js"],
      all: ["./src/assets/js/main.js"],
    },
    dest: "build/assets/js",
    concat: "bundle.min.js",
  },
  // --------------------------------------------- templates
  templates: {
    src: {
      pages: [
        "./src/templates/**/*.html",
        "!src/templates/app/**",
        "!src/templates/components/**",
      ],
      all: "./src/templates/**/*.html",
    },
    dest: "build",
    nunjunks: {
      searchPaths: ["src/templates/"],
    },
  },
  // --------------------------------------------- images
  images: {
    src: "src/assets/images/**/*",
    dest: "build/assets/images",
  },
  // --------------------------------------------- fonts
  fonts: {
    src: "src/assets/fonts/*",
    dest: "build/assets/fonts",
  },
  // --------------------------------------------- deploy code
  deployCode: {
    src: "build/*.html",
    dest: "dist/pages",
    replace: {
      first: "assets/images",
      last: "../assets/images",
    },
    babel: {
      presets: ["babel-preset-env"],
    },
    if: {
      css: "*.css",
      js: "*.js",
    },
  },
  // --------------------------------------------- deploy images
  deployImages: {
    src: "build/assets/images/**/*",
    dest: "dist/assets/images",
    newer: "dist/assets/images",
    imagemin: {
      mozjpeg: {
        quality: 75,
      },
      pngquant: {
        quality: [0.5, 0.5],
      },
      svgo: {
        removeViewBox: false,
      },
    },
  },
  // --------------------------------------------- deploy fonts
  deployFonts: {
    src: "build/assets/fonts/*",
    dest: "dist/assets/fonts",
  },
};
