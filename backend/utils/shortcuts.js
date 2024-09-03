
import express from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import router from '../Routes.js';
import { DBConnection } from '../services/db.js'


export const app = express();
//export * from '../services/db.js'
export const rt = router;
export const bodyPrs = bodyParser;
const dotEConfig = dotenv.config()
export const crs = cors;
export const pssprt = passport;

export const initialConfig = {
    dt: dotEConfig,
    dbConfig: DBConnection,
    pssprt: passport
}   