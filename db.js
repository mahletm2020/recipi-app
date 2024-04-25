const { PrismaClient } = require('@prisma/client');

let db;

if (!global._db) {
  db = new PrismaClient();
  global._db = db;
} else {
  db = global._db;
}

module.exports = db;