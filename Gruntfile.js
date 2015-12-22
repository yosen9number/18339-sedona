"use strict";

module.exports = function(grunt) {
  require("load-grunt-tasks")(grunt);

  var config = {
    pkg: grunt.file.readJSON("package.json"),

    less: {
      style: {
        files: {
          "build/css/style.css": ["source/less/style.less"]
        }
      }
    },
    cmq: {
      style: {
        files: {
          "build/css/style.css": ["build/css/style.css"]
        }
      }
    },
    postcss: {
      options: {
        processors: [
          require("autoprefixer")({browsers: "last 2 versions"})
        ]
      },
      style: {
        src: "build/css/*.css"
      }
    },
    cssmin: {
      options: {
        keepSpecialComments: 0,
        report: "gzip"
      },
      style: {
        files: {
          "build/css/style.min.css": ["build/css/style.css"]
        }
      }
    },
    imagemin: {
      images: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          src: ["build/img/**/*.{png,jpg,gif,svg}"]
        }]
      }
    },
    watch: {
      style: {
        files: ["less/**/*.less"],
        tasks: ["less", "cmq", "postcss"],
        options: {
          spawn: false,
          livereload: true
        }
      }
    },
    clean: {
      build: ["build"]
    },
    htmlmin: {
      options: {
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        caseSensitive: true,
        keepClosingSlash: false
      },
      html: {
        files: {
          "build/index.min.html": "build/index.html"
        }
      }
    },
    copy: {
      build: {
        files: [{
          expand: true,
          cwd: "source",
          src: [
            "img/**",
            "js/**",
            "*.html"
          ],
          dest: "build"
        }]
      }
    },
    uglify: {
      build: {
        src: "source/js/scripts.js",
        dest: "build/js/scripts.min.js"
      }
    }
  };

  grunt.registerTask("build", [
    "clean",
    "copy",
    "less",
    "cmq",
    "postcss",
    "cssmin",
    "uglify",
    "imagemin",
    "htmlmin"
  ]);


  // Не редактируйте эту строку
  config = require("./.gosha")(grunt, config);

  grunt.initConfig(config);
};
