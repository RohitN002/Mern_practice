const {signupController,signinController} = require('../controller/form.controller.js')
const express = require('express')

const router = express.Router()

router('/signup',signupController)
router('/signin',signinController)

module.exports= router