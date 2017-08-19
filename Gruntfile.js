module.exports = function (grunt) {

    // Get command line arguments
    var cssFile = grunt.option('css-file') || 'app/css/main.min.css',
        jsFile = grunt.option('js-file') || 'app/js/main.min.js',
        cssFilesTemplate = {},
        cssMinFilesTemplate = {},
        jsUglifyTemplate = {},
        jsConcatTemplate = {},
        currentTimestamp = new Date().getTime();

    cssFilesTemplate[cssFile] = 'app/sass/main.scss';
    cssMinFilesTemplate[cssFile] = [
        'app/bower_components/fontawesome/css/font-awesome.min.css',
        'app/bower_components/bootstrap/dist/css/bootstrap.min.css',
        'app/bower_components/bootstrap-3-datepicker/dist/css/bootstrap-datepicker3.min.css',
        'app/bower_components/ng-tags-input/ng-tags-input.min.css',
        'app/bower_components/ng-tags-input/ng-tags-input.bootstrap.min.css',
        cssFile
    ];
    jsUglifyTemplate[jsFile] = [
        'app/js/app.js',
        'app/js/controllers/CreateServerCtrl.js',
        'app/js/services/ServerService.js',
        'app/js/services/UuidGenerator.js',
        'app/js/components/serversMenu.js',
        'app/js/services/ApiService.js',
        'app/js/controllers/ListShortUrlsCtrl.js',
        'app/js/filters/rangeFilter.js',
        'app/js/controllers/DeleteServerCtrl.js',
        'app/js/components/pagination.js',
        'app/js/controllers/VisitsCtrl.js',
        'app/js/services/StatsProcessor.js',
        'app/js/controllers/CreateShortUrlCtrl.js',
        'app/js/directives/modalImage.js',
        'app/js/filters/color.js'
    ];
    jsConcatTemplate[jsFile] = [
        'app/bower_components/jquery/dist/jquery.min.js',
        'app/bower_components/bootstrap/dist/js/bootstrap.min.js',
        'app/bower_components/bootstrap-3-datepicker/dist/js/bootstrap-datepicker.min.js',
        'app/bower_components/moment/min/moment.min.js',
        'app/bower_components/angular/angular.min.js',
        'app/bower_components/angular-ui-router/release/angular-ui-router.min.js',
        'app/bower_components/angular-local-storage/dist/angular-local-storage.min.js',
        'app/bower_components/angular-moment/angular-moment.min.js',
        'app/bower_components/chart.js/dist/Chart.min.js',
        'app/bower_components/angular-chart.js/dist/angular-chart.min.js',
        'app/bower_components/clipboard/dist/clipboard.min.js',
        'app/bower_components/ngclipboard/dist/ngclipboard.min.js',
        'app/bower_components/angular-smart-table/dist/smart-table.min.js',
        'app/bower_components/ng-tags-input/ng-tags-input.min.js',
        jsFile
    ];

    // Project configuration.
    grunt.initConfig({

        // Load configuration
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            main: {
                src: [
                    'app/js/**/*.js',
                    'test/**/*.js',
                    '*.js',
                    '!app/js/**/*.min.js'
                ],
                options: {
                    jshintrc: '.jshintrc'
                }
            }
        },

        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },

        watch: {
            sass: {
                files: 'app/sass/*.scss',
                tasks: ['sass']
            }
        },

        sass: {
            main: {
                options: {
                    sourceMap: true
                },
                files: cssFilesTemplate
            }
        },

        cssmin: {
            main: {
                files: cssMinFilesTemplate
            }
        },

        concat: {
            options: {
                separator: ';\n'
            },
            js: {
                files: jsConcatTemplate
            }
        },

        uglify: {
            options: {
                compress: {
                    'drop_console': true
                }
            },
            main: {
                files: jsUglifyTemplate
            }
        },

        processhtml: {
            main: {
                files: {
                    'app/index.html': ['app/index.html']
                }
            }
        },

        'string-replace': {
            main: {
                options: {
                    replacements: [{
                        pattern: /(.js|.css)\?v/ig,
                        replacement: '$1?v=' + currentTimestamp
                    }]
                },
                files : {
                    'app/index.html': ['app/index.html']
                }
            }
        },

        copy: {
            fontAwesomeFonts: {
                files: [{
                    expand: true,
                    cwd: 'app/bower_components/fontawesome/fonts/',
                    src: '**',
                    dest: 'app/fonts/'
                }]
            }
        }

    });

    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-sass');

    // Custom tasks
    grunt.registerTask('default', ['sass', 'cssmin', 'uglify', 'concat', 'processhtml', 'string-replace', 'copy']);
    grunt.registerTask('check', ['jshint', 'karma']);
};
