import fs from 'fs-extra'
import { createPath, esDir, libDir } from '../../utils/paths'

function clear() {
  fs.removeSync(createPath(esDir))
  fs.removeSync(createPath(libDir))
}

export default clear
