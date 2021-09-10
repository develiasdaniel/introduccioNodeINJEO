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

module.exports = {
    list,
    get,
}