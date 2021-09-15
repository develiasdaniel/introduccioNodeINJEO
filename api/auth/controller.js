const TABLE = 'auth';
const auth = require('../../auth');
module.exports = function(injectedStore){
    let store = injectedStore;
    if(!store){
        store = require('../../store/dummy');
    }

    function insert(data){
        const authData = {
            id: data.id,
        }

        if(data.username){
            authData.username = data.username;
        }

        if(data.password){
            authData.password = data.password;
        }

        return store.insert(TABLE, authData); 
    }

    async function login(username, password){
        const data = await store.query(TABLE, {username : username });
        if(data.password == password){
            // generate token
            return auth.sign(data);
        }
        else{
            throw new Error("Error al hacer login");
        }
    }

    return {
        insert,
        login,
    }
}