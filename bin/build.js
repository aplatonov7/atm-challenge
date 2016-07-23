/* Build script for production config */

import 'shelljs/global'

import webpack from 'webpack'
import path from 'path'
import conf from '../webpack.config.prod'

const distPath = path.join(__dirname, '../dist')
const distStaticPath = path.join(distPath, 'static')
const appStaticPath = path.join(__dirname, '../app/static/')

/* Cleaning the dist dir before the build */
rm('-rf', distPath)
mkdir(distPath)

/* Building our project via webpack using prod config */
webpack(conf, (err, stats) => {
  if (err) {
    throw err
  }

  /* Copying static folder from /app to /dist after successful build */
  cp('-R', appStaticPath, distStaticPath)

  process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n')
});
