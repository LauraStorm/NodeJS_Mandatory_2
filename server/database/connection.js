import  sqlite3  from "sqlite3"; // driver
import { open } from "sqlite";   // databasen

const connection = await open({
    filename: './movie.db',
    driver: sqlite3.Database
});

export default connection;
