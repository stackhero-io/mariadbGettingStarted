# Getting started with MariaDB

Note: this example should works with MySQL too but it could be better to use the dedicated code available on [https://github.com/stackhero-io/mysqlGettingStarted](https://github.com/stackhero-io/mysqlGettingStarted).


## How to use

This example will connect to your MariaDB server, create the database `stackherotest` and the table `users` and fill it with 1000 fake users datas.


1. Clone this repository: `git clone https://github.com/stackhero-io/mariadbGettingStarted && cd mariadbGettingStarted`

2. Copy the file `.env-example` to `.env` and fill it with your credentials.

3. Install dependencies: `npm install`.

4. Run the script: `npm run start`.


You can see the script code in the file `app.js` and see how it works to use it as an example.