var express = require('express')
var crypto = require('crypto')
var router = express.Router()
var User = require('../../models/users.js')

router.post('/', (req, res) => { // add new user
  var email = req.body.email
  User.find({ email: email }, function (err, docs) {
    if (err) {
      console.log(err)
      res.send({
        success: false,
        message: 'Error'
      })
    } else if (docs.length) {
      res.send({
        success: false,
        message: 'User exists'
      })
    } else {
      var newUser = new User({
        name: req.body.name,
        intro: req.body.intro,
        email: email,
        password: crypto.createHash('md5').update(req.body.password, 'utf8').digest('hex'),
        department: { 'eb': 0, 'dc': 1, 'wp': 2, 'hd': 3 }[req.body.department],
        points: 0,
        profile: undefined
      })
      console.log(newUser)
      newUser.save(function (error) {
        if (error) {
          console.log(error)
          res.send({
            success: false,
            message: 'Error'
          })
          return
        }
        res.send({
          success: true,
          message: 'User saved successfully'
        })
      })
    }
  })
})

module.exports = router
