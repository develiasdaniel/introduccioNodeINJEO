const db = {
    'user': [
        { id : '1', name : 'Elias Sánchez'}
    ]
}

const firstPosition = 0;
async function list(table){
    return db[table];
}

async function get(table, id){
    let rows = await list(table);
    return rows.filter(user => user.id === id)[firstPosition] || null;
}

async function insert(table, user){
    db[table].push(user);
    return true;
}

async function remove(tabla, id){
    const index = db[tabla].findIndex( user => user.id === id);

    if(index >= 0){       
        db[tabla].splice(index, 1);
        return true;
    }

    return false;
}

module.exports = {
    list,
    get,
    insert,
    remove,
}