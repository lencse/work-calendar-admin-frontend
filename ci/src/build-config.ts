import dirs from './dirs'
import * as fs from 'fs'
import * as path from 'path'
import * as colors from 'colors/safe'
// import { config } from '12factor-config'

const cfg = {
    apiUrl: process.env.WCADMIN_API_URL
}

// const cfg = config({
//     apiUrl: {
//         env: 'WCADMIN_API_URL',
//         type: 'string',
//         required : true
//     }
// })

const targetDir = path.resolve(dirs.projectRoot, dirs.config)

if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir)
}

const targetFile = path.resolve(targetDir, 'config.json')
const targetFileDisplay = path.relative(dirs.projectRoot, targetFile)

fs.writeFileSync(targetFile, JSON.stringify(cfg))

console.info(`${colors.cyan(targetFileDisplay)} written`)
