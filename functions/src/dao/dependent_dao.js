const admin = require('firebase-admin');
const db = admin.firestore();

const Dependent = require('../models/user_dependent_model');
exports.getDependents = async () => {
    try {
        const dependents  = [];
        const snapshot = await db.collection('dependents').get();
        if(snapshot.empty){
            console.log('No matching documents.');  
            return null
        }
        snapshot.forEach((doc) => {
            console.log(doc.data());
            dependents.push(Dependent.fromFirestore(doc));
        });
        return dependents;
        
    } catch (error) {
        console.log(error)
        return null;
        
    }
}

exports.createDependent = async (dependentModel) => {
    console.log(dependentModel)
    try {
        const dependentRef = db.collection('dependents').doc(dependentModel.id);
        await dependentRef.set(dependentModel.toPlainObject());
        return dependentModel;
    } catch (error) {
        console.log(error)
        return null;
    }
}