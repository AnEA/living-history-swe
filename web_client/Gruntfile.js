'use strict';

module.exports = function (grunt) {

    var jsDependencies = [
            'www/lib/jquery/dist/jquery.js',
            'www/lib/angular/angular.js',
            'www/lib/angular-route/angular-route.js',
            'www/lib/angular-mocks/angular-mocks.js',
            'www/lib/angular-resource/angular-resource.js',
            'www/lib/angular-bootstrap/ui-bootstrap-tpls.js',
            'www/lib/angular-ui-router/release/angular-ui-router.js',
            'www/lib/restangular/dist/restangular.js',
            'www/lib/lodash/dist/lodash.js',
            'www/lib/bluebird/js/browser/bluebird.js',
            'www/lib/angular-google-maps/dist/angular-google-maps.js',
            'www/lib/angular-rangeslider/angular.rangeSlider.js',
            'www/lib/moment/moment.js',
            'www/lib/angular-moment/angular-moment.js',
            'www/lib/angular-xeditable/dist/js/xeditable.js',
            'www/lib/ng-file-upload/angular-file-upload.js'
        ],

        projectFiles = [
            'www/config.js',
            'www/app.js',
            'www/custom.js',
            'www/modules/core/*.js',
            'www/modules/core/**/*.js'
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
                tasks: []
            },

            indexHtml: {
                files: '<%= index.source %>',
                tasks: ['buildDev']
            },

            changables: {
                files: ['www/**', '!www/lib/**'],
                options: {
                    livereload: true
                }
            }
        },

        connect: {
            server: {
                options: {
                    port: 3000,
                    base: ['www', 'www/assets', 'stubs', 'www/build']
                }
            }
        },

        index: {
            source: 'www/index.tmpl',
            target: 'www/index.html'
        },

        uglify: {
            dist: {
                options: {
                    sourceMap: true,
                    sourceMapName: 'www/build/sourcemap.map'
                },
                files: {
                    'www/build/app.min.js': jsFiles
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