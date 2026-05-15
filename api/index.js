import jsonServer from 'json-server'
import auth from 'json-server-auth'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, '../backend/db.json'))
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.db = router.db
server.use(auth)
server.use(router)

export default server