const TABLE = 'auth';
const auth = require('../../auth');
const bcrypt = require('bcrypt');

module.exports = function(injectedStore){
    let store = injectedStore;
    if(!store){
        store = require('../../store/dummy');
    }

    async function insert(data){
        const authData = {
            id: data.id,
        }

        if(data.username){
            authData.username = data.username;
        }

        if(data.password){
            authData.password = await bcrypt.hash(data.password, 5);
        }

        return store.insert(TABLE, authData); 
    }

    async function login(username, password){
        const data = await store.query(TABLE, {username : username });
        return bcrypt.compare(password, data.password)
                .then(isPwdTrue => {
                    if(isPwdTrue){             
                        // generate token 
                        console.log(data);      
                        return auth.sign(data);
                    }
                    else{                        
                        throw new Error("Error al hacer login");
                    }
                });
    }

    return {
        insert,
        login,
    }
}