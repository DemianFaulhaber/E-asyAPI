import "dotenv/config.js"

const config = {
    port: process.env.PORT || 3001,
    apiKey: process.env.API_KEY,
}

export {config}