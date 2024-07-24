class Dependent {
  constructor({id, name, age, username, userId}) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.username = username;
    this.userId = userId;
    };
    static fromFirestore(document) {
      return new Dependent({
        id: document.id,
        name: document.data().name,
        age: document.data().age,
        username:document.data().username,
        userId: document.data().userId
      });
    }
   
    toPlainObject() {
        return {
          id: this.id,
          name: this.name,
          age: this.age,
          username:this.username,
          userId: this.userId
        };
    }
}

module.exports = Dependent;