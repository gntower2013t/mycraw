// const Database = require('better-sqlite3')
import * as Database from "better-sqlite3";

const db = new Database('e:/temp/foobar.db', { verbose: console.log });

const stm = db.prepare(`CREATE TABLE IF NOT EXISTS user ('id' integer not null primary key autoincrement,
'name' varchar(255))`)
stm.run()

db.prepare(`insert into user('name') values ('csg')`).run()

const select = db.prepare(`SELECT * FROM user WHERE name = ?`).all('csg');
console.log(select);

process.on('exit', () => {
  console.log("end===");
  db.close()
});
