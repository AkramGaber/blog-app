import jsonServer from 'json-server'
import auth from 'json-server-auth'
import path from 'path'
import { fileURLToPath } from 'url'

// Recreate __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

app.db = router.db

app.use(middlewares)
app.use(jsonServer.bodyParser)
app.use(auth)

app.use(router)

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`)
})