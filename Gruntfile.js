module.exports = function (grunt) {

    // Get command line arguments
    var cssFile = grunt.option('css-file') || 'app/css/main.min.css',
        jsFile = grunt.option('js-file') || 'app/js/main.min.js',
        cssFilesTemplate = {},
        jsFilesTemplate = {};

    cssFilesTemplate[cssFile] = 'app/sass/main.scss';
    jsFilesTemplate[jsFile] = [
        'bower_components/angular'
    ];

    // Project configuration.
    grunt.initConfig({

        // Load configuration
        pkg: grunt.file.readJSON('package.json'),

        // // Minify app JS files into one file dropping console object
        // uglify: {
        //     options: {
        //         compress: {
        //             drop_console: true
        //         }
        //     },
        //     main: {
        //         files: jsFilesTemplate
        //     }
        // },
        //
        // // Concat created CSS file and vendor CSS libraries
        // concat: {
        //     options: {
        //         separator: ';\n'
        //     },
        //     main: {
        //         src: [
        //             'public/css/font-awesome.min.css',
        //             'public/css/bootstrap.min.css',
        //             cssFile
        //         ],
        //         dest: cssFile
        //     }
        // },
        //
        // processhtml: {
        //     options: {
        //         // Task-specific options go here.
        //     },
        //     main: {
        //         files: {
        //             'templates/partials/javascripts.html.twig': ['templates/partials/javascripts.html.twig'],
        //             'templates/partials/stylesheets.html.twig': ['templates/partials/stylesheets.html.twig']
        //         }
        //     }
        // },

        // Inspect javascript code
        jshint: {
            dashboard: {
                src: [
                    'app/js/*.js'
                ],
                options: {
                    jshintrc: '.jshintrc'
                }
            }
        },

        watch: {
            files: 'app/sass/*.scss',
            tasks: ['sass']
        },

        // Compile SASS files
        sass: {
            minified: {
                options: {
                    style: 'compressed',
                    compass: true,
                    sourcemap: 'none'
                },
                files: cssFilesTemplate
            }
        }

    });

    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // grunt.loadNpmTasks('grunt-contrib-uglify');
    // grunt.loadNpmTasks('grunt-contrib-concat');
    // grunt.loadNpmTasks('grunt-processhtml');

    // Default task.
    grunt.registerTask('default', ['sass'/*, 'uglify', 'concat', 'processhtml'**/]);

};
