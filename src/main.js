import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import routes from './route/routes.js'
import { ErrorHandlerMiddleware } from './middleware/errorHandler.middleware.js'

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(process.cwd(), 'src', 'views'))

app.use('/assets', express.static(path.join(process.cwd(), 'src', 'public')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use('/api', routes)
app.use('/', () => {
    return res.json({
        message: `This for Web Technology coursework`
    })
})
app.use('/*', (_, res) => {
    return res.json({
        message: `Error with routing`
    })
})
app.use(ErrorHandlerMiddleware)

app.listen(7001)
