var sqlite3 = require("sqlite3");
let db = new sqlite3.Database("Authentication.db", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, err => {
    if (err) { console.error(err.message); }
    console.log("Connected to the authentication database.");
});

// Creating the table for the first time, also shows the table structure. Lots of info incase you want to add stuff in the future (forward thinking)
db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS "accounts" ("DiscordId" BIGINT NOT NULL UNIQUE, "Username" VARCHAR(50) NOT NULL, "McUsername" VARCHAR(16), "NickName" VARCHAR(50), "Email" VARCHAR(100), "Desciption" TEXT, "Servers" TEXT, "Links" TEXT, "Rank" TINYINT DEFAULT `guest`, "Added" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY("DiscordId"));');
});

// E.x. modifyPermissions(discordId,rankList[0]) || modifyPermissions(discordId,"mod")
const modifyPermissions = (discordId, rank) =>{
    db.run("UPDATE accounts set Rank = ? WHERE DiscordId = ?", [rank, BigInt(discordId)], (err) => {
        if (err) { console.error(err.message);}
        console.log("Changed Rank for discordId: "+discordId+" to "+rank);
    });
}
modifyPermissions("219185683447808001", 'banned')
