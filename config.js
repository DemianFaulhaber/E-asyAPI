import "dotenv/config.js"


const { PORT, API_KEY, JWT_SECRET, DB_USER, DB_PASSWORD, DB_NAME, COOKIE_DOMAIN} = process.env
const config = {
    PORT,
    API_KEY,
    JWT_SECRET,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    COOKIE_DOMAIN
}

export {config}