import dotenv from "dotenv";
dotenv.config()
import db from "./connection.js";
import bcrypt from "bcrypt";

const isDeleteMode = process.argv.findIndex((argument) => argument === "delete_mode") === -1 ? false : true;
console.log(isDeleteMode);

if (isDeleteMode){
    db.exec("DROP TABLE IF EXISTS users");
    db.exec("DROP TABLE IF EXISTS roles");
    db.exec("DROP TABLE IF EXISTS upcoming_movies");
}

// DDL
db.exec(
    `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        password TEXT,
        email TEXT,
        role_id INTEGER,
        FOREIGN KEY (role_id) REFERENCES roles (id)
    );
    `
);

db.exec(
    `
    CREATE TABLE IF NOT EXISTS roles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        role_name TEXT 
    );
    `
);

db.exec(
    `
    CREATE TABLE IF NOT EXISTS upcoming_movies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        movie_name TEXT 
    );
    `
);


// DML
const adminPasswordPlaintext = process.env.ADMIN_PASSWORD;
const adminHashedPasword = await bcrypt.hash(adminPasswordPlaintext, 12);

const adminOnePasswordPlaintext = process.env.ADMIN_ONE_PASSWORD;
const adminOneHashedPasword = await bcrypt.hash(adminOnePasswordPlaintext, 12);

const userPasswordPlaintext = process.env.USER_PASSWORD;
const userHashedPasword = await bcrypt.hash(userPasswordPlaintext, 12);

const useOnePasswordPlaintext = process.env.USER_ONE_PASSWORD;
const userOneHashedPasword = await bcrypt.hash(useOnePasswordPlaintext, 12);

const guestPasswordPlaintext = process.env.GUEST_PASSWORD;
const guesteHashedPasword = await bcrypt.hash(guestPasswordPlaintext, 12);

if (isDeleteMode){

    // roles
    db.run("INSERT INTO roles (role_name) VALUES (?)", ['admin']);
    db.run("INSERT INTO roles (role_name) VALUES (?)", ['user']);
    db.run("INSERT INTO roles (role_name) VALUES (?)", ['guest']);
    
    // users
    db.run("INSERT INTO users (username, password, email, role_id ) VALUES (?, ?, ?, ?)",['admin', adminHashedPasword, 'admin@admin.dk',1]);
    db.run("INSERT INTO users (username, password, email, role_id ) VALUES (?, ?, ?, ?)",['admin1', adminOneHashedPasword, 'admin1@admin.dk',1]);
    db.run("INSERT INTO users (username, password, email, role_id ) VALUES (?, ?, ?, ?)",['user', userHashedPasword, 'user@user.dk', 2]);
    db.run("INSERT INTO users (username, password, email, role_id ) VALUES (?, ?, ?, ?)",['user1', userOneHashedPasword, 'user1@user.dk', 2]);
    db.run("INSERT INTO users (username, password, email, role_id ) VALUES (?, ?, ?, ?)",['guest', guesteHashedPasword, 'guest@guest.dk', 3]);

    // upcoming movies
    db.run("INSERT INTO upcoming_movies (movie_name) VALUES (?)", ['Det ser sort ud ⬛️']);
    db.run("INSERT INTO upcoming_movies (movie_name) VALUES (?)", ['Spiderman 🕷️']);
    db.run("INSERT INTO upcoming_movies (movie_name) VALUES (?)", ['ROBOTS']);
    db.run("INSERT INTO upcoming_movies (movie_name) VALUES (?)", ['Barbie']);
}
