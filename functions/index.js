const functions = require('firebase-functions');
const admin = require('firebase-admin');
const vision = require('@google-cloud/vision');
const visionClient = new vision.ImageAnnatotorClient();
let promise = require('promise');
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
