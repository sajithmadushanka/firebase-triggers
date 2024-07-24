const functions = require('firebase-functions');
const admin = require('firebase-admin');
console.log('Initializing Firebase Admin SDK...');
admin.initializeApp();
console.log('Firebase Admin SDK initialized.');
const userTriggers = require('./triggers/userTriggers');

const appRoutes = require('./apis/app_api');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use('/', appRoutes);

exports.app = functions.https.onRequest(app);

// Export Firestore triggers
exports.onDocumentUpdate = functions.firestore
  .document('users/{id}')
  .onUpdate((change, context) => {
    console.log('Document updated:', context.params.id);
    userTriggers.onUserUpdate(change, context);
    // const before = change.before.data();
    // const after = change.after.data();
    // console.log('Document updated from:', before, 'to:', after);
    // return null; // Return a promise or value if you need to perform async operations
  });
  exports.onDocumentDelete = functions.firestore
    .document('users/{id}')
    .onDelete((snap, context) => {
      console.log('Document deleted:', context.params.id);
      userTriggers.onUserDelete(snap, context);
      // const deletedValue = snap.data();
      // console.log('Document deleted:', deletedValue);
      // return null; // Return a promise or value if you need to perform async operations
    });
