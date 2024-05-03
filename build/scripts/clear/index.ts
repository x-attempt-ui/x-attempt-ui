import fs from 'fs-extra'
import { createPath, distDir, esDir, libDir } from '../../utils/paths'

function clear() {
  fs.removeSync(createPath(distDir))
  fs.removeSync(createPath(esDir))
  fs.removeSync(createPath(libDir))
}

export default clear
