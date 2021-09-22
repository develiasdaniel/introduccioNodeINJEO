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

    function update(data){
        return store.update(TABLE, data);
    }

    function register(userId, courseid){
        var table = 'detail_course';
        return store.insert(table, { 
            user_id : userId, 
            course_id : courseid,  
        });
    }

    return {
        list,
        get,
        insert,
        remove,
        update,
        register,
    }
}
