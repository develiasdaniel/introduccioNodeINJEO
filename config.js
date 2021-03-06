module.exports = {
    api : {
        port : 3000,
        host : 'http://localhost'
    },
    mysql:{
        host: process.env.MYSQL || 'sql5.freemysqlhosting.net',
        user: process.env.MYSQL_USER || 'sql5439057',
        password: process.env.MYSQL_PASSWORD || 'aZBpRR2FV4',
        database: process.env.MYSQL_DB || 'sql5439057'
    },
    mysqlService : {
        host: process.env.MYSQL_SRV_HOST || 'localhost',
        port: process.env.MYSQL_SRV_PORT || 3001
    },
    course: {
        port: process.env.COURSE_PORT || 3002,
    },
    remoteDB : process.env.REMOTE_DB || false,
}