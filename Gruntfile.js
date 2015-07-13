'use strict';

module.exports = function(grunt){


  require('time-grunt')(grunt);

  //自动加载grunt任务
  require('load-grunt-tasks')(grunt);

  var config = {
    libdev: 'lib-dev',
    libdist: 'lib',
    tmp: '.tmp'
  };

  //定义任务配置文件
  grunt.initConfig({

    config:config,

    watch: {
      livereload: {
        options: {
          livereload:'<%=connect.options.livereload %>'
        },
        files: [
          '<%=config.tmp %>/{,*/}*.css'
        ]
      }
    },

    copy: {
      lib: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.libdev %>',
          src:'{,*/}*.{jpg,png,gif,webp}',
          dest: '<%= config.libdist %>'
        }]
      }
    },

    sass: {
      lib: {
        expand: true,
        cwd: '<%= config.libdev %>',
        src: '{,*/}*.{scss,sass}',
        dest: '<%=config.tmp %>',
        ext: '.css'
      }
    },
     // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%=config.tmp %>/',
          src: '{,*/}*.css',
          dest: '<%=config.tmp %>/'
        }]
      }
    },
    cssmin: {
      lib: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.libdev %>',
          dest: '<%= config.libdist %>',
          src: '{,*/}*.css'
        },{
          expand: true,
          dot: true,
          cwd: '<%= config.tmp %>',
          dest: '<%= config.libdist %>',
          src: '{,*/}*.css'          
        }]
      }
    },

    uglify: {
      lib: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= config.libdev %>',
            dest: '<%= config.libdist %>',
            src: '{,*/}*.js'
          }
        ]
      }
    },

    clean: {
      lib: {
        files: [{
          dot:true,
          src: [
            '<%= config.tmp %>',
            '<%= config.libdist %>/*',
            '!<%= config.libdist %>/.git*'
          ]
        }]
      }
    },

    connect: {
       options: {
        port: 9000,
        open: true,
        livereload: 35729,
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          middleware: function(connect) {
            return [
              connect.static(config.tmp),
              connect.static(config.libdev)
            ];
          }
        }
      },
    }
  });

  grunt.registerTask('build',[
      'clean:lib',
      'copy:lib',
      'sass:lib',
      'autoprefixer',
      'cssmin:lib',
      'uglify:lib'
    ]);
  grunt.registerTask('serve',[
    'build',
    'connect:livereload',
    'watch']);
};