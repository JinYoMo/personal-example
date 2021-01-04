//Grunt 的入口文件
//用于定义一些需要 Grunt 自动执行的任务
//需要导出一个函数
//此函数接收一个 Grunt 形参，内部提供一些创建任务时可以用到的 API

module.exports = grunt => {
   grunt.registerTask('foo',()=>{
     console.log('hello grunt~')
   })
   grunt.registerTask('bar','任务描述',()=>{
     console.log('other task~')
   })
  //  grunt.registerTask('default',()=>{
  //    console.log('default task~')
  //  })
  //默认执行多个指定任务
  grunt.registerTask('default',['foo','bar'])

  //grunt默认执行同步代码，下面的异步未执行
  // grunt.registerTask('async-task',()=>{
  //   setTimeout(()=>{
  //     console.log('async task working~')
  //   },1000)
  // })
  //grunt执行异步方式
  grunt.registerTask('async-task',function(){
    const done = this.async();
    setTimeout(()=>{
      console.log('async task working~');
      done()  //直到done被执行，grunt才会结束这个任务
    },1000)
  })
}