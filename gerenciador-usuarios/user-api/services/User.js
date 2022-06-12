var knex = require('../database/connection')
var bcrypt = require('bcrypt');

// Service
class User {
    async findAll() {
        try {
            const result = await knex.select(['id', 'name', 'email', 'role']).from('users');
            return result;
        } catch (error) {
            console.warn(error);
            return [];
        }
    }

    async findById(id) {
        try {
            const result = await knex.select(['id', 'name', 'email', 'role']).where({ id: id }).table('users');
            return result[0];
        } catch (error) {
            console.warn(error);
        }
    }

    async findByEmail(email){
        try{
            var result = await knex.select(["id","email","password","role","name"]).where({email:email}).table("users");
            
            if(result.length > 0){
                return result[0];
            }else{
                return undefined;
            }

        }catch(err){
            console.log(err);
            return undefined;
        }
    }
    
    async findEmail(email){
        try{
            var result = await knex.select("*").from("users").where({email: email});
            return result.length > 0;
        }catch(err){
            console.log(err);
            return false;
        }
    }

    async create(name, email, password) {
        try {
            const hash = await bcrypt.hash(password, 10);
            await knex.insert({ name, email, password: hash, role: 0 }).table('users');
        } catch (error) {
            console.warn(error);
        }
    }

    async update(id, name, email, role) {
        const user = await this.findById(id);
        const editedUser = {};

        if(user == undefined) {
            return { status: false, error: 'Usuário não encontrado' }
        }
        
        editedUser.name = name != undefined ? name : user.name;
        editedUser.email = email != undefined ? email : user.email;
        editedUser.role = role != undefined ? role : user.role;
        
        try {
            await knex.update(editedUser).where({ id: id }).table('users');
            return { status: true }
        } catch (error) {
            console.warn(error);
            return { status: false, error: error }
        }
    }

    async delete(id) {
        const user = await this.findById(id);

        if(user == undefined) {
            return { status: false, error: 'Usuário não encontrado' }
        }

        try {
            await knex.delete().where({ id: id }).table('users');
            return { status: true }
        } catch (error) {
            console.warn(error);
            return { status: false, error: error }
        }
    }

    async changePassword(newPassword, id, token) {
        try {
            const hash = await bcrypt.hash(newPassword, 10);
            await knex.update({ password: hash }).where({ id: id }).table('users');

            return { status: true }
        } catch (error) {
            console.warn(error)
            return { status: false }
        }
    }
    
    async findEmail(email) {
        try {
            const result = await knex.select(['id', 'name', 'email', 'role'])
                .where({ email: email }).table('users');
            if(result.length > 0) return true;
            else return false;
        } catch (error) {
            console.warn(error);
            return false;
        }
    }
}

module.exports = new User();