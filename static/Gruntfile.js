/*
	File: Gruntfile.js
	Author: Gkiokan Sali
	Date: 2.12.2016
	Comments: Grunfile.js Configuration for new Projects
	usage:
	I've prepared a nicely structure for running with grunt.
	All your source development files will be in assets/src.
	Beneath that you split up your code in /js and /sass folders.
	By default as the code is, javascript and css will be compiled to
	assets/js by uglyfy and assets/css by sass.
	Foreach file in the dev JS folder, it will be concatenated to one min.js file.
	Each folder will be concatenated to a app.*.min.js file afterwards in the dist/js folder.
	The same rule goes for the css files too. Except the sourcemaps of the compiled css
	will be copied by another function.

	CLI Usage:
	grunt default - should work if not, help me to fix that.
	grunt css - compile all the CSS stuff
	grunt js - compile all the JS stuff
	grunt cc - concatenate the whole css and js stuff to dist folder
	grunt bower - compile the bower components to one min.js / min.css files.
	grunt build - do everything
*/
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
								sourcemap: 'inline',
		            debugInfo: false
		        },
		        files: [{
		            expand: true,
		            cwd: 'assets/src/sass',
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
				// Hold this option for later usage, maybe filename output or smth.
        // options: {
        //     banner: '/* Copyright by Gkiokan | <%= pkg.name %> last compile at <%= grunt.template.today("yyyy-mm-dd") %> */'
        // },
        dist: {
          files: [{
              expand: true,
              cwd: 'assets/src/javascript',
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
					 src: ['assets/js/*.js'],
					 dest: 'assets/dist/js/app.default.min.js',
			 },

			 css: {
					 options: { banner: banner_modified },
					 src: ['assets/css/*.css'],
					 dest: 'assets/dist/css/app.complete.min.css',
			 }
		},


		/*
		 * Copy scripts
		 * *
		 * Exemplary usage on SourceMap files top copy them from the /css to dist/css folder.
		 */
		 copy: {
			 sourcemaps: {
			     files: [{
							 	expand: true,
								cwd: 'assets/css',
								src: ['*.css.map'],
								dest: 'assets/dist/css/',
						 }]
		   },

			 images: {
			     files: [{
							 	expand: true,
								cwd: 'assets/images',
								src: ['*.*'],
								dest: 'assets/dist/images/',
						 }]
		   },

			 fonts: {
				 		files: [{
								expand: true,
								cwd: 'assets/src/fonts',
								src: ['*.*'],
								dest: 'assets/fonts'
						},{
								expand: true,
								cwd: 'assets/src/fonts',
								src: ['*.*'],
								dest: 'assets/dist/fonts'
						}]
			 }
		 },

		 /*
 		 * Bower Components concat
 		 * *
		 *
 		 */
		 bower_concat: {
			  all: {
				    dest: {
				      'js'   : 'assets/src/javascript/bower.js',
				      'css'  : 'assets/src/sass/bower.scss'
							// 'scss' : 'assets/src/sass/bower.scss'
				    },
				    exclude: [
				      'jquery', 'modernizr', 'vue',
							'bootstrap', 'font-awesome'
				    ],
				    dependencies: {
				      // 'underscore': 'jquery',
				      // 'backbone': 'underscore',
				      // 'jquery-mousewheel': 'jquery'
				    },
				    bowerOptions: {
				      relative: false
				    }
			  }
		},


		/*
		 * Bower build tasks
		 */
		 bower: {
				 install: {
			       options: {
			         copy: true,
			         targetDir: 'assets/lib',
			         //layout: 'byType',
			         install: true,
			         verbose: false,
			         prune: false,
			         cleanTargetDir: true,
			         cleanBowerDir: false,
			         bowerOptions: {}
			       }
		     }
		 },


		/*
		 * Watch Configurations
		 */
		watch: {
			css: {
				files: '**/*.scss',
				tasks: ['css']
			},

      scripts: {
        files: '**/*.js',
        tasks: ['js']
      }
		}




	});  // end grunt.initConfig()



	/*
	* Seperating the js files
	* *
	* Each folder in assets/js/* will get his own *.min.js file, which can be
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
	            dest: 'assets/dist/js/app.' + dirName + '.min.js'
	        };

	        // add module subtasks to the concat task in initConfig
	        grunt.config.set('concat', concat);
	    });
	});


	// Load all nessesary npm module
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-bower-task');
	grunt.loadNpmTasks('grunt-bower-concat');
	grunt.loadNpmTasks('grunt-browser-sync');


	// Register our Custom Tasks
  grunt.registerTask('default', ['watch', 'browserSync']);
	grunt.registerTask('js', ['uglify', 'pp', 'cc:js']);
	grunt.registerTask('css', ['sass', 'cc:css']);
	grunt.registerTask('cc', ['concat']);
	grunt.registerTask('b', ['bower']);
  grunt.registerTask('build', ['bower', 'css', 'js', 'copy']);
}
