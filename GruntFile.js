'use strict';

module.exports = function (grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				stripBanners: true,
				banner: '/*\n' +
				'* <%= pkg.title %> - <%= pkg.description %>\n' +
				'* @version <%= pkg.version %>\n' +
				'* @link <%= pkg.homepage %>\n' +
				'* @copyright Poul Nike\n' +
				'* @license Released under the GPLv3 license.\n' +
				'*/\n'
			},
			core_js: {
				src: [
					"app/app.js",
					"app/formaters/number.js"
				],
				dest: "js/b-table.app.js"
			}
		},
        watch: {
            js: {
                files: 'app/**/*.js',
                tasks: 'concat:core_js'
            }
        }
	});

	// Load grunt tasks
	grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('js', ['concat']);
};
