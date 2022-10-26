import cpy from 'cpy'
import { resolve, dirname } from 'path'
import { promises as fs } from "fs"
import sass from "sass"
import glob from "fast-glob"
const sourceDir = resolve(__dirname, '../src')
//lib文件目录
const targetLib = resolve(__dirname, '../lib')
//es文件目录
const targetEs = resolve(__dirname, '../es')

//src目录

const srcDir = resolve(__dirname, '../src')

const buildLess = async () => {
  //直接将less文件复制到打包后目录
  await cpy(`${sourceDir}/**/*.scss`, targetLib)
  await cpy(`${sourceDir}/**/*.scss`, targetEs)

  //获取打包后.less文件目录(lib和es一样)
  const scssFils = await glob("**/*.scss", { cwd: srcDir, onlyFiles: true })

  //遍历含有less的目录
  for (let path in scssFils) {

    const filePath = `${srcDir}/${scssFils[path]}`
    //获取less文件字符串
    const lessCode = await fs.readFile(filePath, 'utf-8')
    //将less解析成css

    // const code = await sass.renderSync(lessCode, {
    //     //指定src下对应less文件的文件夹为目录
    //     paths: [srcDir, dirname(filePath)]
    // })
    sass.render({
      file: filePath
    },async function (err, result) { // node-style callback from v3.0.0 onwards
      if (!err) {
        //拿到.css后缀path
        const cssPath = scssFils[path].replace('.scss', '.css')
        //将css写入对应目录
        await fs.writeFile(resolve(targetLib, cssPath), result!.css)
        await fs.writeFile(resolve(targetEs, cssPath), result!.css)
      }
    });


  }



}
buildLess()