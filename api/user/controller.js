const { nanoid } = require('nanoid');
const auth = require('../auth');
const TABLE = 'user';
let store;
module.exports = function(storeInjected){
    store = storeInjected;
    if(!store){
        store = require('../../store/dummy');
    }

    function list(){
        return store.list(TABLE);
    }

    function get(id){
        return store.get(TABLE, id);
    }

    async function insert(body){
        const user = {
            name : body.name,
            id: nanoid(),
            username: body.username,
        }

        if(body.password || body.username){
            await auth.insert({
                id: user.id,
                username: user.username,
                password: body.password,
            });
        }

        return store.insert(TABLE, user);
    }

    function remove(id){
        return store.remove(TABLE, id);
    }

    return {
        list,
        get,
        insert,
        remove,
    }
}
