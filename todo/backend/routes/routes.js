import express from "express"
import { CreateData,UpdateData,DeleteData,ViewData } from "../controllers/crudController.js"

const router = express.Router()

router.post('/',CreateData)

router.get('/',ViewData)
router.get('/:id',UpdateData)
router.delete('/:id',DeleteData)

export default router