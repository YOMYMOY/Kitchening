// 1. Guardar al usuario
// 2. Buscar al usuario por su email
// 3. Buscar a un usuario por su ID
// 4. Editar información de un usuario
// 5. Eliminar a un usuario

const fs = require('fs');
const {hashSync} = require('bcryptjs');

const User = {
    fileName : './data/users.json',

    getData : function() {
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
    },

    findAll : function() {
        return this.getData();
    },

    generateID : function() {
        const allUsers = this.findAll();
        const lastUser = allUsers.pop();
        return lastUser ? lastUser.id + 1 : 1;
    },

    findByPK : function(id) {
        const allUsers = this.findAll();
        const user = allUsers.find(oneUser => oneUser.id === id)
        return user;
    },

    findByField : function(field, text) {
        const allUsers = this.findAll();
        const user = allUsers.find(oneUser => oneUser[field] === text) // los corchetes se utilizan cuando no especifico la propiedad exacta
        return user;
    },

    create : function(userData) {
        const allUsers = this.findAll();
        const newUser = {
            id : this.generateID(),
            mail,
            name,
            surname,
            password : hashSync(userData.password, 10),
        }
        allUsers.push(newUser);
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, 3), 'utf-8');
        return true;
    },

    delete : function(id) {
        const allUsers = this.findAll();
        const finalUsers = allUsers.filter(oneUser => oneUser.id !== id);
        fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, 3), 'utf-8');
    }
}

module.exports = User;