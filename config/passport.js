import passport from 'passport'
import LocalStrategy from 'passport-local'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'

export const initializePassport = () => {
  //cb = callback
  passport.use(new LocalStrategy({ usernameField: 'email' }, async function verify(email, password, cb) {
    try {
      const user = await User.findOne({ email: email })
      const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

      if (!(user && passwordCorrect)) {
        return cb(null, false, { message: 'Incorrect email address or password.' })
      }
      return cb(null, user)
    } catch (err) {
      return cb(err)
    }
  }))

  passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      // menee kohtaan: req.session.passport.user
      cb(null, { id: user.id, email: user.email, role: user.role })
    })
  })

  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user)
    })
  })
}
