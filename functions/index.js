/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");


// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

const { onRequest } = require("firebase-functions/v2/https");
const { onDocumentWritten } = require("firebase-functions/v2/firestore");
const logger = require("firebase-functions/logger");
const admin = require('firebase-admin');
// Example HTTP function
exports.helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

// Firestore trigger

// Initialize Firebase Admin SDK
admin.initializeApp();

const db = admin.firestore();

// Firestore trigger to handle user creation
// HTTP function to add a user
exports.userCreated = onDocumentWritten("/users/{userId}", async (event) => {
    const userId = event.params.userId;
    const oldValue = event.data.oldValue;
    const newValue = event.data.value;
  
    if (!newValue) {
      logger.info("No new data for user creation");
      return;
    }
  
    try {
      const userData = newValue.fields;
      const userName = userData.name ? userData.name.stringValue : "Unnamed User";
      const userEmail = userData.email ? userData.email.stringValue : "No Email";
  
      await db.collection('user_profiles').doc(userId).set({
        name: userName,
        email: userEmail,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
  
      logger.info(`Created user profile for user ID: ${userId}`, { userName, userEmail });
    } catch (error) {
      logger.error('Error creating user profile', { error: error.message, stack: error.stack });
    }
  });