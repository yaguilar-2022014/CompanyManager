'use strict'

import express from "express"
import { addCategory, deleteCategory, test } from "./category.controller.js"

const api = express.Router()

api.get('/test', test)
api.post('/add', addCategory)
api.delete('/delete/:id', deleteCategory)

export default api