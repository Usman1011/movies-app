const AuthenticationServices = require('./services/authentication.services');
const db = require('./config/database.config');

beforeAll(async () => {
    try{
    let dbconnected = await db.sequelize.sync();
    console.log("DataBase Successfulllllllly Connected");
    }   
    catch(error)
    {
        console.log("Error Connecting DataBase", error);
    } 
  });

describe('User Authentication Tests', ()=>{
    
    describe('Login Should Fail', ()=>{
        test.each([
            {
                userInfo: {
                "userName": "usmanhu21",
                "password": "usman12345"
                }, expectedOutputMessage: "Invalid Credentials"
            },
            {
                userInfo: {
                    "userName": "usmanhu21",
                    "password": "usman123"
                    }, expectedOutputMessage: "Invalid Credentials"
            }
        ])('Invalid Crentials Case for credentials: $userInfo: ',async ({userInfo, expectedOutputMessage})=>{
            let sut = AuthenticationServices;

            let autualOutput = await sut.userAuthentication('', '', userInfo);

            expect(autualOutput.message).toBe(expectedOutputMessage);
        })
        test.each([
            {
                userInfo: {
                "userName": "usman",
                "password": "usman1234"
                }, expectedOutputMessage: "User Does not exist"
            },
            {
                userInfo: {
                    "userName": "usmanhussain",
                    "password": "usman1234"
                    }, expectedOutputMessage: "User Does not exist"
            }
        ])('User Does Not Exist Case for credentials: $userInfo: ',async ({userInfo, expectedOutputMessage})=>{
            let sut = AuthenticationServices;
            
            let autualOutput = await sut.userAuthentication('', '', userInfo);

            expect(autualOutput.message).toBe(expectedOutputMessage);
        })
    })
    describe('Login Successfull', ()=>{
        test.each([
            {
                userInfo: {
                "userName": "usmanhu21",
                "password": "usman1234"
                }, expectedOutputMessage: "User Successfully Authenticated"
            }
        ])('User Successfully Authenticated for credentials: $userInfo: ',async ({userInfo, expectedOutputMessage})=>{
            let sut = AuthenticationServices;

            let autualOutput = await sut.userAuthentication('', '', userInfo);

            expect(autualOutput.message).toBe(expectedOutputMessage);
        })
        
    })
});

afterAll(async()=>{
    try{
        await db.sequelize.close();
        console.log("Database Connection Closed")
    }
    catch(error)
    {
        console.log("Error Closing DB: ", error);
    }
})