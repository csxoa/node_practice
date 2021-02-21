const prisma = require('../prisma')

// fields type = object
// typescript 로 할 경우 interface mapping 을 통해 type 을 지정해 줄 수 있을것이다.
// ex = interface createUserInput { email: String, password: String }

const createUser = (fields) => {
    return prisma.users.create({ data: fields })
}

// 하나의 field (=email 혹은 id) 로만 찾게 만든다.
const checkUser = (field) => { // email 으로 찾든 id 로 찾든 찾아지도록 범용성있게 만들어야 한다. 
    const [uniqueKey] = Object.keys(field)
    const isKeyId = uniqueKey === 'id' // id 일 경우 string 이 아니라 number 이므로 handling 이 필요하다.
    const value = isKeyId ? Number(field[uniqueKey]) : field[uniqueKey] // 삼항연산자?

    return prisma.users.findUnique({ where: { [uniqueKey] : value} })
}

module.exports = {
    createUser,
    checkUser
}