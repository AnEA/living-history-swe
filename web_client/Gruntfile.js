'use strict';

module.exports = function (grunt) {

    var jsDependencies = [
            'public/lib/jquery/dist/jquery.js',
            'public/lib/angular/angular.js',
            'public/lib/angular-route/angular-route.js',
            'public/lib/angular-mocks/angular-mocks.js',
            'public/lib/angular-resource/angular-resource.js',
            'public/lib/angular-bootstrap/ui-bootstrap.js',
            'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
            'public/lib/angular-ui-router/release/angular-ui-router.js',
            'public/lib/restangular/dist/restangular.js',
            'public/lib/lodash/dist/lodash.js',
            'public/lib/bluebird/js/browser/bluebird.js',
            'public/lib/angular-google-maps/dist/angular-google-maps.js',
            'public/lib/angular-rangeslider/angular.rangeSlider.js'
        ],

        projectFiles = [
            'public/config.js',
            'public/app.js',
            'public/modules/core/*.js',
            'public/modules/core/**/*.js'
        ],

        jsFiles = jsDependencies.concat(projectFiles);

    grunt.initConfig({
        env: 'DEV',

        pkg: grunt.file.readJSON('package.json'),

        jsFilesToInclude: jsFiles,

        jshint: {
            files: projectFiles,
            options: grunt.file.readJSON('.jshintrc')
        },

        watch: {
            jsfiles: {
                files: jsFiles,
                tasks: ['jshint']
            },

            indexHtml: {
                files: '<%= index.source %>',
                tasks: ['buildDev']
            },

            changables: {
                files: ['public/**', '!public/lib/**'],
                options: {
                    livereload: true
                }
            }
        },

        connect: {
            server: {
                options: {
                    port: 3000,
                    base: ['public', 'public/assets', 'stubs', 'public/build']
                }
            }
        },

        index: {
            source: 'public/index.tmpl',
            target: 'public/build/index.html'
        },

        uglify: {
            dist: {
                options: {
                    sourceMap: true,
                    sourceMapName: 'public/build/sourcemap.map'
                },
                files: {
                    'public/build/app.min.js': jsFiles
                }
            }
        },

        processhtml: {
            dev: {
                files: {
                    '<%= index.target %>': '<%= index.target %>'
                }
            },

            dist: {
                files: {
                    '<%= index.target %>': '<%= index.target %>'
                }
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },

                files: {
                    '<%= index.target %>': '<%= index.target %>'
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('test', ['jshint']);

    grunt.registerTask('buildDev', ['processhtml:dev', 'includeJsFiles']);
    grunt.registerTask('buildProd', ['includeJsFiles', 'processhtml:dist', 'htmlmin:dist', 'uglify']);

    grunt.registerTask('default', ['buildDev', 'connect', 'watch']);
    grunt.registerTask('heroku', ['setProdEnvironment', 'buildProd']);
    grunt.registerTask('deployTest', ['setProdEnvironment', 'buildProd', 'connect', 'watch']);

    grunt.registerTask('setProdEnvironment', function () {
        grunt.config('env', 'PROD');
    });

    grunt.registerTask('includeJsFiles', 'Generate index.html depending on configuration', function () {
        var conf = grunt.config('index'),
            tmpl = grunt.file.read(conf.source);

        grunt.file.write(conf.target, grunt.template.process(tmpl));

        grunt.log.writeln('Generated \'' + conf.target + '\' from \'' + conf.source + '\'');
    });

};