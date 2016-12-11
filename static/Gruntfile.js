module.exports = function(grunt) {
	var 	banner_modified =
				'/* Project: <%= pkg.name %>    */\n' +
				'/* Author: Gkiokan Sali        */\n' +
				'/* Date: <%= grunt.template.today("yyyy-mm-dd HH:MM") %> */\n' +
				'/* URL: gkiokan.net          */\n' +
				'/* Comments: Copyright by Gkiokan | Concataned by grunt, config by me :) */\n';

  // We'll need this for better readability in the cli
	require('time-grunt')(grunt);

	// All the Grunt configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

    /*
 		 * Sass stuff
		 */
    sass: {
	      dist: {
	        options:  {
	            style: 'compressed',
	            debugInfo: false
	        },
	        files: [{
	            expand: true,
	            cwd: 'assets/sass',
	            src: ['**/*.scss'],
	            dest: 'assets/css',
	            ext: '.min.css'
	        }],
	      }
		},


		/*
		 * Let's do some minifisation on the JS files
		 */
    uglify: {
        // options: {
        //     banner: '/* Copyright by Gkiokan | <%= pkg.name %> last compile at <%= grunt.template.today("yyyy-mm-dd") %> */'
        // },
        dist: {
          files: [{
              expand: true,
              cwd: 'assets/javascript',
              src: '**/*.js',
              dest: 'assets/js',
							ext: '.min.js'
          }],
        }
    },


		/*
		 * BrowserSync
		 */
		browserSync: {
				  default_options: {
				    bsFiles: {
				      src: [
				        "assets/css/*.css",
				        "*.html"
				      ]
				    },
				    options: {
				      watchTask: true,
				      server: {
				        baseDir: "gkiokan.dev"
				      }
				    }
			  }
		},


		/*
		 * Concatination
		 */
		concat: {
			 js: {
				 options: { banner: banner_modified },
				 src: ['assets/js/*.js'],  // [['foo/*.js', 'bar/*.js'], 'baz/*.js']
				 dest: 'assets/release/app.complete.min.js',      // 'build/abcde.js'
			 },

			 css: {
				 options: { banner: banner_modified },
				 src: ['assets/css/*.css'],  // [['foo/*.js', 'bar/*.js'], 'baz/*.js']
				 dest: 'assets/release/app.complete.min.css',      // 'build/abcde.js'
			 }
		},


		/*
		 * Watch Configurations
		 */
		watch: {
			css: {
				files: '**/*.scss',
				tasks: ['sass:dist']
			},

      scripts: {
        files: '**/*.js',
        tasks: ['uglify']
      }
		}




	});  // end grunt.initConfig()



	/*
	* Seperating the js files
	*/
	grunt.registerTask("pp", "Finds and prepares modules for concatenation.", function() {
	    // get all module directories
	    grunt.file.expand("assets/js/*").forEach(function (dir) {

	        // get the module name from the directory name
	        var dirName = dir.substr(dir.lastIndexOf('/')+1);

	        // get the current concat object from initConfig
	        var concat = grunt.config.get('concat') || {};

	        // create a subtask for each module, find all src files
	        // and combine into a single js file per module
	        concat[dirName] = {
							options: { banner: banner_modified },
	            src: [dir + '/**/*.js'],
	            dest: 'assets/release/app.' + dirName + '.min.js'
	        };

	        // add module subtasks to the concat task in initConfig
	        grunt.config.set('concat', concat);
	    });
	});


	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['watch', 'uglify', 'browserSync']);
	grunt.registerTask('js', ['uglify:dist', 'pp', 'cc']);
	grunt.registerTask('css', ['sass:dist']);
	grunt.registerTask('cc', ['concat']);

  grunt.registerTask('build', ['sass:build', 'uglify']);
}
