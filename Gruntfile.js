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

        cssmin : {
            target : {
                src : ["css/dyclock.css"],
                dest : "css/dyclock.min.css"
            }
        },

        uglify: {
            distVersion: {
                options : {
                    banner : "/*!\n" +
                    " * dyClock is a JavaScript library for creating clock.\n" +
                    " *\n" +
                    " * Author: Yusuf Shakeel\n" +
                    " * https://github.com/yusufshakeel\n" +
                    " *\n" +
                    " * GitHub Link: https://github.com/yusufshakeel/dyClockJS\n" +
                    " *\n" +
                    " * MIT license\n" +
                    " * Copyright (c) 2016 Yusuf Shakeel\n" +
                    " *\n" +
                    " * Date: 2014-01-29 Wednesday\n" +
                    " * Build: <%= grunt.template.today(\"yyyy-mm-dd HH:MM:ss\") %> \n" +
                    " */",
                    mangle: true
                },
                files: {
                    'js/dyclock.min.js': [
                        'js/dyclock.js'
                    ]
                }
            }
        }

    });

    // load plugin
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // create default task
    grunt.registerTask("default", ["cssmin", "uglify:distVersion"]);

};