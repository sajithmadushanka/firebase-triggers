const admin = require('firebase-admin');
const db = admin.firestore();

exports.onUserDelete = async (snap, context) => {
    console.log('Deleting user and dependents...');
    const userId = context.params.id;
    console.log(userId)

    // Query dependents collection to find all dependents with the deleted user's ID
    const dependentsSnapshot = await db.collection('dependents').where('userId', '==', userId).get();

    const deletePromises = [];
    dependentsSnapshot.forEach(dependentDoc => {
        deletePromises.push(dependentDoc.ref.delete());
    });

    // Delete all dependents
    await Promise.all(deletePromises);
    console.log(`Deleted ${deletePromises.length} dependents for user ${userId}`);
};

exports.onUserUpdate = async (change, context) => {
    console.log('Updating user and dependents...');
    const userId = context.params.id;
    console.log(userId)

    // Query dependents collection to find all dependents with the updated user's ID
    const dependentsSnapshot = await db.collection('dependents').where('userId', '==', userId).get();

    const updatePromises = [];
    dependentsSnapshot.forEach(dependentDoc => {
        updatePromises.push(dependentDoc.ref.update({ username: change.after.data().name }));
    });

    // Update all dependents
    await Promise.all(updatePromises);
    console.log(`Updated ${updatePromises.length} dependents for user ${userId}`);
}