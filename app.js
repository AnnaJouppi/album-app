// Muista asentaa tähän projektiin
// npm i mongoose ja npm i dotenv

import 'dotenv/config'
import express from 'express'
import authRouter from './routes/auth.js';
import session from 'express-session';
import passport from 'passport';
import connectMongoDB from './db/mongodb.js'
import MongoDBStore from 'connect-mongo'
import { initializePassport } from './config/passport.js';
import albumRouter from './routes/albums.js'
import { ensureAuthenticated } from './middleware/auth.js';

const app = express()
const PORT = process.env.PORT || 3000;

const MONGO_URI = process.env.MONGO_URI

// Tells Express to use Pug
app.set('view engine', 'pug'); 
app.set('views', './views');

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.ACCESS_TOKEN_SECRET || 'fallbackSecretKey', // Uses your master key
  resave: false,
  saveUninitialized: false,
  store: MongoDBStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'passport-sessions',
  }),
  // Enable next line when using https
  // cookie: { secure: true }

}));

// Initialize Passport
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

// Both 'user' and 'admin' can see the form
app.get('/add-album', ensureAuthenticated, (req, res) => {
  res.render('add-album');
});

app.use('/albums', albumRouter)
app.use('/api/auth', authRouter)

try {
  await connectMongoDB(MONGO_URI)
  app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`))
} catch (error) {
  console.log(error)
}
