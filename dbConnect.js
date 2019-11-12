const {Client} = require('pg');
const ircsettings = require('./irc-settings/settings.json');


const client = new Client({
    user: ircsettings.database.user,
    password: ircsettings.database.password,
    host: ircsettings.database.host,
    port: ircsettings.database.port,
    database: ircsettings.database.database
})

client.connect();

async function addEmotion(username,emotion) {
    await client.connect();
    console.log("Connected!");
    const results = await client.query("select * from users");
    console.table(results.rows);
    await client.end();
    
}

async function showTable() {
    console.log("Connected!");
    const results = await client.query("select * from users");
    console.table(results.rows);
    
}

async function deleteDuplicates() {
    var query = "SELECT username COUNT (($s1) FROM users";
    console.log("Connected!");
    const results = await client.query(query);
}


module.exports = {
    addEmotion,showTable,deleteDuplicates
};