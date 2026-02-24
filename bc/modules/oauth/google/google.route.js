const express= require ('express')
const oauth = express.Router()
const passport = require('passport')
const oauthController = require('./google.controller')

oauth.get('/google',passport.authenticate('google', { scope: ['profile']}),oauthController.auth )
oauth.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), oauthController.manageOauthCallback)

module.exports= oauth