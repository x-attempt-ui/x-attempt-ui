import fs from 'fs-extra'
import { createPath, publishDir } from '../../utils/paths'

function clear() {
  fs.removeSync(createPath(publishDir))
}

export default clear
