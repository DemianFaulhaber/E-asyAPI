import "dotenv/config.js"


const { PORT, API_KEY, JWT_SECRET, DB_USER, DB_PASSWORD, DB_NAME} = process.env
const config = {
    PORT,
    API_KEY,
    JWT_SECRET,
    DB_USER,
    DB_PASSWORD,
    DB_NAME
}

export {config}