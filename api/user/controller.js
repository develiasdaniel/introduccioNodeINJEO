const { nanoid } = require('nanoid');
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

    function insert(body){
        const user = {
            name : body.name,
            id: nanoid(),
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
