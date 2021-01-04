//gulp 入口文件
//通过导出函数成员的方式定义gulp任务
//glup取消同步代码模式 约定每个任务为异步代码模式

exports.foo = done => {
  console.log('foo task working~')
  done()  //标识任务完成
}

exports.default = done => {
  console.log('default task working~')
  done()  //标识任务完成
}