export interface Config {
    apiUrl: string
}

function getConfig(): Config {
    return require('../../config/config.json')
}

const config: Config = getConfig()

export default config
