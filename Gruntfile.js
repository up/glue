/*global  require: true */

module.exports = function(grunt) {
  "use strict";

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-plato');
  grunt.loadNpmTasks('grunt-contrib-watch');

  var src = [
    'src/glue.core.js', 
    'src/glue.utilities.js', 
    'src/glue.dom.js', 
    'src/glue.event.js', 
    'src/glue.ajax.js', 
    'src/glue.cookie.js',
    'src/glue.misc.js',
    'src/glue.template.js',
    'src/glue.promise.js'
  ];

  var all = [
    'Gruntfile.js', 
    'src/*.js', 
    'test/spec/*.js'
  ];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: src,
        dest: 'dest/<%= pkg.name %>.min.js'
      }
    },

    connect: {
      server: {
        options: {
          port: 9001,
          base: '.'
        }
      }
    },

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        globals: {
          glue: true
        }
      },
      all: all
    },

    jasmine: {
      pivotal: {
        src: src,
        options: {
          helpers: 'test/spec/*Helper.js',
          specs: 'test/spec/*Spec.js'
        }
      },
      coverage: {
        src: src,
        options: {
          helpers: 'test/spec/*Helper.js',
          specs: 'test/spec/*Spec.js',
          template: require('grunt-template-jasmine-istanbul'),
          templateOptions: {
            coverage: 'coverage/coverage.json',
            report: 'coverage',
            thresholds: {
              lines: 50,
              statements: 50,
              branches: 20,
              functions: 50
            }
          }
        }
      }
    },

    plato: {
      task: {
        options: {
          complexity: {
            logicalor: false,
            switchcase: false,
            forin: true,
            trycatch: true
          },
          jshint: {

          }
        },
        files: {
          'reports': ['src/*.js']
        }
      }
    },

    watch: {
      scripts: {
        files: all,
        tasks: ['jshint'],
        options: {
          spawn: false
        }
      }
    }

  });

  grunt.registerTask('test', ['jshint', 'jasmine']);
  grunt.registerTask('coverage', ['jasmine:coverage']);
  grunt.registerTask('build', ['test', 'uglify', 'plato']);

};
