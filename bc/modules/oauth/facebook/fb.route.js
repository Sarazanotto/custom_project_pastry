const express= require ('express')
const oauth = express.Router()
const passport = require('passport')
const oauthController = require('./fb.controller')

oauth.get('/facebook',passport.authenticate('facebook', { scope: ['public_profile']}),oauthController.auth )
oauth.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), oauthController.manageOauthCallback)

module.exports= oauth