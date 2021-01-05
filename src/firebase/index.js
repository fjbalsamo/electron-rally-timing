import firebase from 'firebase/app';
import 'firebase/database';
/**
 * in this same folder create `./firebase.config.js file`
 * 
 * export const config = {
 *  apiKey, 
 *  authDomain,
 *  databaseURL,
 *  projectId,
 *  storageBucket,
 *  messagingSenderId,
 *  appId
 * };
 */
import { config } from './firebase.config';



const app = firebase.initializeApp(config);
const db = app.database();
export const calendars = db.ref('calendars');

