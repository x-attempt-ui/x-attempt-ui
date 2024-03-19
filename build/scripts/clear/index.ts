import fs from 'fs-extra'
import { createPath, esDir, libDir, pkgDir } from '../../utils/paths'

function clear() {
  fs.removeSync(createPath(esDir))
  fs.removeSync(createPath(libDir))
  fs.removeSync(createPath(pkgDir))
}

export default clear
