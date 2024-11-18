import "dotenv/config.js"

const config = {
    port: process.env.PORT || 3001,
    apiKey: process.env.API_KEY,
    jwtSecret: process.env.JWT_SECRET,
    db_user: process.env.DB_USER,
    db_password:process.env.DB_PASSWORD,
    db_name:process.env.DB_NAME
}

export {config}