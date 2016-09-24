module.exports = function (config) {
    config.set({

        files: [
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
            'app/js/**/*.js',

            // Load test files
            'app/bower_components/angular-mocks/angular-mocks.js',
            'test/**/*.js'
        ],

        processContentExclude: [
            'app/js/main.min.js'
        ],

        autoWatch: true,
        colors: true,

        frameworks: ['jasmine'],

        browsers: ['PhantomJS'],

        plugins: [
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-coverage'
        ],

        reporters: ['dots', 'coverage'],

        // Source files to check code coverage
        preprocessors: {
            'app/js/!(vendor)/*.js': 'coverage'
        },

        // Generate code coverage in clover format
        coverageReporter: {
            dir: 'build',
            reporters: [
                {
                    type : 'clover',
                    file : 'clover.xml',
                    subdir: '.'
                },
                {
                    type : 'html',
                    subdir: 'html'
                }
            ]
        }

    });
};
