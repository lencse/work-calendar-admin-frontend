import dirs from './dirs'
import * as fs from 'fs'
import * as path from 'path'
import * as colors from 'colors/safe'
import * as config from '12factor-config'

const cfg = config({
    apiUrl: {
        env: 'WCADMIN_API_URL',
        type: 'string',
        required: true
    }
})

const targetFile = path.resolve(dirs.projectRoot, dirs.config, 'config.json')
const targetFileDisplay = path.relative(dirs.projectRoot, targetFile)

fs.writeFileSync(targetFile, JSON.stringify(cfg))

console.info(`${colors.cyan(targetFileDisplay)} written`)
