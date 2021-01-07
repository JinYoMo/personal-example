const {src,dest,parallel,series,watch} = require('gulp')  //源与目标位置 parallel组合任务同时进行 series组合任务串行执行

const del = require('del')

const browserSync = require('browser-sync')

const loadPlugins = require('gulp-load-plugins')  

const plugins = loadPlugins()  //该插件将所有插件引入

const bs=browserSync.create()  //创建服务器

const data = {
  menus: [
    {
      name: 'Home',
      icon: 'aperture',
      link: 'index.html'
    },
    {
      name: 'Features',
      link: 'features.html'
    },
    {
      name: 'About',
      link: 'about.html'
    },
    {
      name: 'Contact',
      link: '#',
      children: [
        {
          name: 'Twitter',
          link: 'https://twitter.com/w_zce'
        },
        {
          name: 'About',
          link: 'https://weibo.com/zceme'
        },
        {
          name: 'divider'
        },
        {
          name: 'About',
          link: 'https://github.com/zce'
        }
      ]
    }
  ],
  pkg: require('./package.json'),
  date: new Date()
}

const clean = () =>{
  return del(['dist','temp'])
}

const style = () =>{
  return src('src/assets/styles/*.scss',{base:'src'}) //{base:'src'} 保存src后面的目录结构
     .pipe(plugins.sass({outputStyle:'expanded'}))//每个插件提供的基本上为函数 该函数返回文件的转换流 _下划线开头的css会默认为引用类样式，sass插件不转换 expanded为括弧展开格式
     .pipe(dest('temp'))
     .pipe(bs.reload({stream:true}))  //以流的方式直接在浏览器端呈现
}

const script = () =>{
  return src('src/assets/scripts/*.js',{base:'src'})
      .pipe(plugins.babel({presets:['@babel/preset-env']}))
      .pipe(dest('temp'))
      .pipe(bs.reload({stream:true}))  //以流的方式直接在浏览器端呈现
}

const page = () =>{
  return src('src/*.html',{base:'src'})
      .pipe(plugins.swig({data,defaults: { cache: false }}))  //将预先准备好的数据渲染到html中 cache: false 清除缓存
      .pipe(dest('temp'))
      .pipe(bs.reload({stream:true}))  //以流的方式直接在浏览器端呈现
}

const image = ()=>{
  return src('src/assets/images/**',{base:'src'})
     .pipe(plugins.imagemin())
     .pipe(dest('dist'))
}

const font = ()=>{
  return src('src/assets/fonts/**',{base:'src'})
     .pipe(plugins.imagemin())
     .pipe(dest('dist'))
}

const extra = ()=>{   
  return src('public/**',{base:'public'}) 
     .pipe(dest('dist'))   //其他类型文件直接拷贝
}
 
//该任务会自动唤醒浏览器打开对应的链接
const serve = () =>{
  watch('src/assets/styles/*.scss',style)  //watch 监听变化同时查看是否需要重新执行该任务,若执行会覆盖原文件
  watch('src/assets/scripts/*.js',script)
  watch('src/*.html',page)
  // watch('src/assets/images/**',image)  //这三个任务image，font为无损压缩 extra任务为直接拷贝 在开发阶段可以不做处理,上线时做处理
  // watch('src/assets/fonts/**',font)
  // watch('public/**',extra)
  watch(['src/assets/images/**','src/assets/fonts/**','public/**'],bs.reload)  //监听到图片 字体样式 公共部分的变化后重新发起请求取最新的文件

  bs.init({   //bs启动web服务 所见即所得
    notify:false,  //关闭提示
    port:2080,  //设置启动端口
    // open:false,  //是否自动打开浏览器
    // files:'dist/**',  //监听文件路径 有 .pipe(bs.reload({stream:true})) 则无需指定监听路径
    server:{
      baseDir:['temp','src','public'],  //把dist目录作为网站根目录  请求的文件会按这个文件路径顺序依次查找
      routes:{
        '/node_modules':'node_modules'  //开发阶段routes路径指定 会优先于baseDir,文件中含有/node_modules文件会被指定到根目录node_modules下
      }
    }
  })
}

//该任务将打包文件下的依赖文件构建注释进行转换生成新的路径文件,并对文件执行压缩
const useref = () =>{
  return src('temp/*.html',{base:'temp'})
     .pipe(plugins.useref({searchPath:['temp','.']}))  //匹配dist文件 根目录文件 按顺序查找
     //html css js压缩
     .pipe(plugins.if(/\.js$/,plugins.uglify()))
     .pipe(plugins.if(/\.css$/,plugins.cleanCss()))
     .pipe(plugins.if(/\.html$/,plugins.htmlmin({collapseWhitespace:true,minifyCSS:true,minifyJS:true}))) //对内部css js 空白字符的压缩
     .pipe(dest('dist'))
}

const compile =parallel( style,script,page)
 
//上线之前执行的任务(以最大代价)
const build = series(
    clean,
    parallel(
      series(compile,useref),
      image,
      font,
      extra
    )
  )   //先清除 后执行编译

//开发阶段执行的任务(以最小代价) 减少构建次数,效率提高
const develop = series(compile,serve)

module.exports = {
  clean,
  build,
  develop
}