const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

module.exports = prisma // 객체로 내보낼 필요가 없으므로 그냥 내보낸다.