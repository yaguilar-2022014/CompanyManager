import { initServer } from "./configs/app.js"
import { connect } from "./configs/mongo.js"
import { defaultCategory } from "./src/category/category.controller.js"
import { generateExcel } from "./src/company/company.controller.js"

initServer()
connect()
defaultCategory()
generateExcel()