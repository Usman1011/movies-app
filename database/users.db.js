const {users} = require('../models/user');

const getUserByUserName = async (userName)=>{

    console.log("getUserByUserName: ", userName)
    let dbResult = await users.findOne({
        where: {
            userName
        }
    })
    return dbResult?.dataValues;
}

module.exports = {
    getUserByUserName
}