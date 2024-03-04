'use strict'

import { Router } from "express"
import { addCompany, generateExcel, listAsc, listByCategory, listByTrajectory, listCompany, listDesc, test } from "./company.controller.js"

const api = Router()

api.get('/test', test)
api.post('/add', addCompany)
api.get('/list', listCompany)
api.get('/listAsc', listAsc)
api.get('/listDesc', listDesc)
api.get('/listTrajectory', listByTrajectory)
api.get('/listCategory', listByCategory)

export default api