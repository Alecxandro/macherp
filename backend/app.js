import express from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { DBConnection } from './services/db.js';
import './services/passport.js'
import router from './Routes.js';

dotenv.config({ path: './.env' });
DBConnection();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

console.log('JWT Secret:', process.env.JWT_SECRET);

app.use(passport.initialize());
app.use('/', router)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
