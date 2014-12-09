module.exports = function(grunt){
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        copy: {
            production: {
                expand: true,
                cwd: 'assets/',
                src: '**',
                dest: 'public/libs/'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('default', ['copy'])
}