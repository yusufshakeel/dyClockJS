/*!
 * dyClock is a JavaScript library for creating clock.
 *
 * Author: Yusuf Shakeel
 * https://github.com/yusufshakeel
 *
 * GitHub Link: https://github.com/yusufshakeel/dyClockJS
 *
 * MIT license
 * Copyright (c) 2016 Yusuf Shakeel
 *
 * Date: 2014-01-29 Wednesday
 */
module.exports = function(grunt) {

    // project configurations
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        sass: {
            dist: {
                files: {
                    "src/css/dyClock.css": "src/scss/dyClock.scss",
                }
            }
        },

        cssmin : {
            target : {
                src : ["src/css/dyClock.css"],
                dest : "dist/css/dyclock.min.css"
            }
        },

        uglify: {
            distVersion: {
                options : {
                    banner : "/*! dyClockJS v<%= pkg.version %> | https://github.com/yusufshakeel/dyClockJS | MIT License Copyright (c) 2016 Yusuf Shakeel | Build: <%= grunt.template.today(\"yyyy-mm-dd HH:MM:ss\") %> */",
                    mangle: true
                },
                files: {
                    'dist/js/dyclock.min.js': [
                        'src/js/dyClock.js'
                    ]
                }
            }
        }

    });

    // load plugin
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // create default task
    grunt.registerTask("default", ["sass", "cssmin", "uglify:distVersion"]);

};