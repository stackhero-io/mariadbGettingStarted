require('dotenv').config();
const mysql = require('mysql2/promise');
const faker = require('faker');


(async () => {
  if (!process.env.MARIADB_HOST) {
    console.error('You have to define credentials in the `.env` file (see the `.env-example` file as an example).');
    process.exit(1);
  }


  // Note: credentials have to be defined in the `.env` file (see the `.env-example` file as an example).
  const db = await mysql.createConnection({
    host: process.env.MARIADB_HOST,
    user: process.env.MARIADB_USERNAME,
    password: process.env.MARIADB_PASSWORD,
  });

  // Create database stackherotest if not exists yet
  await db.query('CREATE DATABASE IF NOT EXISTS stackherotest');


  // Create table users if not exists yet
  await db.query('CREATE TABLE IF NOT EXISTS `stackherotest`.`users` '
    + '('
    + '`userId` INT UNSIGNED NOT NULL,'
    + '`name` VARCHAR(128) NOT NULL,'
    + '`address` TEXT NOT NULL,'
    + '`email` VARCHAR(265) NOT NULL'
    + ') '
    + 'ENGINE = InnoDB;');


  // Prepare 1000 fake users to be inserted
  const users = [];
  for (let i = 0; i < 1000; i++) {
    users.push([
      Math.round(Math.random() * 100000), // Generate a fake userId
      faker.name.findName(), // "name"
      faker.address.streetName(), // "address"
      faker.internet.email() // "email"
    ]);
  }

  // Insert the 1000 users
  await db.query(
    'INSERT INTO `stackherotest`.`users` (`userId`, `name`, `address`, `email`) VALUES ?',
    [ users ]
  );


  console.log('Users have been added 👍');
  console.log('Connect to your PhpMyAdmin and see them in database stackherotest, table users');


  // Count number of rows in table users
  const [ usersCount ] = await db.query('SELECT COUNT(*) AS `cpt` FROM `stackherotest`.`users`');
  console.log(`There is now ${usersCount[0].cpt} in table "users"`);

  await db.end();
})().catch(error => {
  console.error('');
  console.error('🐞 An error occurred!');
  console.error(error);
  process.exit(1);
});