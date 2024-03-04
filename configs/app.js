import express from 'express'
import morgan from 'morgan'
import { config } from 'dotenv'
import userRoutes from '../src/user/user.routes.js'
import categoryRoutes from '../src/category/category.routes.js'
import companyRoutes from '../src/company/company.routes.js'

//Configurations
const app = express()
config()
const port = process.env.PORT || 3200

//Configurate Server Express
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(morgan('dev'))

//Routes Declaration
app.use('/user', userRoutes)
app.use('/category', categoryRoutes)
app.use('/company', companyRoutes)

//Build Server
export const initServer = () => {
    app.listen(port)
    console.log(`Server HTTP running in port ${port}`)
}