const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['error'],
  errorFormat: 'pretty',
});

module.exports = prisma;
