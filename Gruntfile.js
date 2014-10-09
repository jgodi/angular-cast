// Generated on 2014-10-07 using generator-angular 0.9.5
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({

        shared: 'app/shared',

        config: {
            sender: {
                options: {
                    variables: {
                        'app': 'app/sender',
                        'dist': 'dist/sender',
                        'tmp': '.tmp/sender',
                        'port': 9000,
                        'livereload': 35729
                    }
                }
            },
            receiver: {
                options: {
                    variables: {
                        'app': 'app/receiver',
                        'dist': 'dist/receiver',
                        'tmp': '.tmp/receiver',
                        'port': 9001,
                        'livereload': 35730
                    }
                }
            },
            shared: {
                options: {
                    variables: {
                        'app': 'app/shared'
                    }
                }
            }
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep']
            },
            js: {
                files: [
                    '<%= grunt.config.get("app") %>/scripts/{,*/}*.js'
                ],
                tasks: ['newer:jshint:all'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            compass: {
                files: [
                    '<%= grunt.config.get("app") %>/styles/{,*/}*.{scss,sass}'
                ],
                tasks: ['compass:server', 'autoprefixer']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= grunt.config.get("app") %>/{,*/}*.html',
                    '.tmp/styles/{,*/}*.css'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    middleware: function (connect) {
                        return [
                            connect.static('.tmp'),
                            connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
                            ),
                            connect.static('app/shared'),
                            connect.static('app/sender')
                        ];
                    }
                }
            },
            dist: {
                options: {
                    open: true,
                    base: 'dist/sender'
                }
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: {
                src: [
                    'Gruntfile.js',
                    '<%= grunt.config.get("app") %>/scripts/{,*/}*.js'
                ]
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [
                    {
                        dot: true,
                        src: [
                            '.tmp',
                            'dist'
                        ]
                    }
                ]
            },
            server: '.tmp',
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= grunt.config.get("tmp") %>/styles/',
                        src: '{,*/}*.css',
                        dest: '<%= grunt.config.get("tmp") %>/styles/'
                    }
                ]
            }
        },

        // Automatically inject Bower components into the apps
        wiredep: {
            app: {
                src: ['<%= grunt.config.get("app") %>/index.html'],
                exclude: ['bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/'],
                ignorePath: /\.\.\/\.\.\//
            }
        },

        // Compiles Sass to CSS and generates necessary files if requested
        compass: {
            sender: {
                options: {
                    sassDir: 'app/sender/styles',
                    cssDir: '.tmp/sender/styles'
                },
                server: {
                    options: {
                        debugInfo: true
                    }
                }
            },
            receiver: {
                options: {
                    sassDir: 'app/receiver/styles',
                    cssDir: '.tmp/receiver/styles'
                },
                server: {
                    options: {
                        debugInfo: true
                    }
                }
            },
            shared: {
                options: {
                    sassDir: '<%= shared %>/styles',
                    cssDir: '.tmp/shared/styles',
                },
                server: {
                    options: {
                        debugInfo: true
                    }
                }
            }
        },

        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                    '<%= grunt.config.get("dist") %>/scripts/{,*/}*.js',
                    '<%= grunt.config.get("dist") %>/styles/{,*/}*.css',
                    '<%= grunt.config.get("dist") %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                    '<%= grunt.config.get("dist") %>/styles/fonts/*'
                ]
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: '<%= grunt.config.get("app") %>/index.html',
            options: {
                dest: '<%= grunt.config.get("dist") %>',
                flow: {
                    html: {
                        steps: {
                            js: ['concat', 'uglifyjs'],
                            css: ['cssmin']
                        },
                        post: {
                        }
                    }
                }
            }
        },

        // Performs rewrites based on filerev and the useminPrepare configuration
        usemin: {
            html: [
                '<%= grunt.config.get("dist") %>/{,*/}*.html'
            ],
            css: [
                '<%= grunt.config.get("dist") %>/styles/{,*/}*.css'
            ]
        },

        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= grunt.config.get("dist") %>',
                        src: [
                            '*.html',
                            'views/{,*/}*.html'
                        ],
                        dest: '<%= grunt.config.get("dist") %>'
                    }
                ]
            }
        },

        // ngmin tries to make the code safe for minification automatically by
        // using the Angular long form for dependency injection. It doesn't work on
        // things like resolve or inject so those have to be done manually.
        ngmin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '.tmp/concat/scripts',
                        src: '*.js',
                        dest: '.tmp/concat/scripts'
                    }
                ]
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= grunt.config.get("app") %>',
                        dest: '<%= grunt.config.get("dist") %>',
                        src: [
                            '.htaccess',
                            '*.html',
                            'views/{,*/}*.html'
                        ]
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= shared %>',
                        dest: '<%= grunt.config.get("dist") %>',
                        src: [
                            'views/{,*/}*.html'
                        ]
                    },
                    {
                        expand: true,
                        cwd: '.',
                        src: 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*',
                        dest: '<%= grunt.config.get("dist") %>'
                    }
                ]
            }
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
                'compass:shared:server',
                'compass:sender:server',
                'compass:receiver:server'
            ],
            dist: [
                'compass:shared:dist',
                'compass:sender:dist',
                'compass:receiver:dist'
            ]
        }
    });

    grunt.loadNpmTasks('grunt-config');

    grunt.registerTask('serve', 'Serves up the sender app, the receiver should be deployed!', function () {
        grunt.task.run([
            'clean:server',
            'config:sender',
            'wiredep',
            'concurrent:server',
            'autoprefixer',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('build', 'Build the WHOLE application', function () {
        grunt.task.run([
            'clean:dist',
            'build-sender',
            'build-receiver'
        ]);
    });

    // Build just the sender portion
    grunt.registerTask('build-sender', [
        'config:sender',
        'wiredep',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'ngmin',
        'copy:dist',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
    ]);

    // Build just the receiver portion
    grunt.registerTask('build-receiver', [
        'config:receiver',
        'wiredep',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'ngmin',
        'copy:dist',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'build'
    ]);
};
