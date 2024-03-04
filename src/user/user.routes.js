'use strict'

import express from "express"
import { deleteUser, listUser, login, regist, test, update } from "./user.controller.js"
import { isAdmin, validateJwt } from "../middlewares/validate-jwt.js"

const api = express.Router()

api.get('/test', [validateJwt, isAdmin], test)
api.post('/regist', regist)
api.post('/login', login)
api.delete('/delete/:id', [validateJwt, isAdmin], deleteUser)
api.put('/update/:id', [validateJwt, isAdmin], update)
api.get('/list', [validateJwt, isAdmin], listUser)

export default api