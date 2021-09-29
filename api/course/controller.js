const TABLE = 'course';

module.exports = function(injectedStore){
    let store = injectedStore;
    if(!store){
        store = require('../../store/dummy');
    }

    function list(){
        return store.list(TABLE);
    }

    return{
        list,
    }
}