module.exports = function (config) {
    config.set({

        files: [
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/bootstrap/dist/js/bootstrap.min.js',
            'app/bower_components/bootstrap-3-datepicker/dist/js/bootstrap-datepicker.min.js',
            'node_modules/moment/min/moment.min.js',
            'node_modules/angular/angular.min.js',
            'node_modules/angular-ui-router/release/angular-ui-router.min.js',
            'node_modules/angular-local-storage/dist/angular-local-storage.min.js',
            'node_modules/angular-moment/angular-moment.min.js',
            'node_modules/chart.js/dist/Chart.min.js',
            'node_modules/angular-chart.js/dist/angular-chart.min.js',
            'node_modules/clipboard/dist/clipboard.min.js',
            'node_modules/ngclipboard/dist/ngclipboard.min.js',
            'node_modules/angular-smart-table/dist/smart-table.min.js',
            'node_modules/ng-tags-input/build/ng-tags-input.min.js',
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
