const fs = require('fs')
const {Transform} = require('stream')
exports.default=()=>{
  //文件读取流
  const read = fs.createReadStream('normalize.css')
  //文件写入流
  const write = fs.createWriteStream('normalize.min.css')
  //文件转换流
  const transform = new Transform({
    transform:(chunk,encoding,callback)=>{
      //核心转换过程
      //chunk 读取流中读取到的内容(Buffer) chunk为字节数组
      const input = chunk.toString()
      const output = input.replace(/\s+/g,'').replace(/\/\*.+?\*\//g,'')  //将空白字符和css注释替换掉
      callback(null,output)  //callback为错误优先回调函数 第一个参数为传入的错误对象 若没发生错误传入null
    }
  })
  //把读取出来的文件流导入写入文件流
  // read.pipe(write)  //相当于文件复制
  read
    .pipe(transform)  //转换压缩
    .pipe(write)   //写入
    
  return read
}