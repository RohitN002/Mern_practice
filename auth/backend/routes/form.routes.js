const signupController = require('../controller/form.controller.js')
const express = require('express')

const router = express.Router()

router('/',signupController)

module.exports= router