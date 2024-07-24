class User{
    constructor({id, name, email, password}){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static fromFirestore(document){
        return new User({
            id: document.id,
            name: document.data().name,
            email: document.data().email,
            password: document.data().password
        
        });
    }
    toPlainObject(){
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password
        }
    }
}

module.exports = User;