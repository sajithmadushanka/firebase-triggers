
const admin = require('firebase-admin');
const db = admin.firestore();

const User = require('../models/user_model');
exports.getUsers = async () => {
    try {
        const users = [];
    const snapshot = await db.collection('users').get();
    if(snapshot.empty){
        console.log('No matching documents.');  
        return null
    }
    snapshot.forEach((doc) => {
        console.log(doc.data());
        users.push(User.fromFirestore(doc));
    });
    console.log(users);
    return users;
        
    } catch (error) {
        console.log(error)
        return null
    }
}

exports.createUser = async (userModel) => {
    console.log(userModel)
   try {
    const userRef = db.collection('users').doc(userModel.id);
    await userRef.set(userModel.toPlainObject());
    return userModel;
   } catch (error) {
    console.log(error)
    return null
   }
}
exports.updateUser = async (userModel) => {
    console.log(userModel)
    try {
        const userRef = db.collection('users').doc(userModel.id);
        await userRef.update(userModel.toPlainObject());
        return userModel;
    } catch (error) {
        console.log(error)
        return null
    }
}

exports.deleteUser = async (id) => {
    console.log(id)
    try {
        const userRef = db.collection('users').doc(id);
        const user = await userRef.get();
        if(!user.exists) {
            console.log('No such document!');
            return null
        }
        await userRef.delete();
        return user.data();
    } catch (error) {
        console.log(error)
        return null
    }
}
