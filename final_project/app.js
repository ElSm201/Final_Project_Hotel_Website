import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import staffRoutes from "./routes/staff.js"
import guestRoutes from "./routes/guest.js"
import { query } from './db/postgres.js'

// create the app
const app = express()
// set the port
app.set('port', 3000)
// middleware
app.use(express.json())
app.use(cors())

app.get('/', (_req, res) => {
    res.send('Hotel Application')
})

app.get('/up', (_req, res) => {
    res.json({status: 'up'})
})

//connection to routes
staffRoutes(app)
guestRoutes(app)

app.listen(app.get('port'), () => {
    console.log(`App is running at http://localhost:3000`)
})