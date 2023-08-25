const MovieServices = require('./services/movies.services');
const db = require('./config/database.config');

beforeAll(async () => {
    try{
    let dbconnected = await db.sequelize.sync();
    console.log("DataBase Successfully Connected");
    }   
    catch(error)
    {
        console.log("Error Connecting DataBase", error);
    } 
  });

describe('Get All Movies Service',()=>{
    describe('Should Return All objects when no filter is provided', ()=>{
        test('No Query String', async ()=>{

            let filterBody = {}

            let sut = MovieServices

            let actualOutput = await MovieServices.getAllMovies(filterBody);
            expect(actualOutput.data.length).toBeGreaterThan(0);
        })
    })
    describe('Should return single object when title is provided in filter', ()=>{
        test.each([
            {filterBody: {
                title: "A New Hope"
            }},
            {filterBody: {
                title: "The Empire Strikes Back"
            }}

        ])('Title in query string: $filterBody.title', async ({filterBody, expectedMovieTitle})=>{

            let sut = MovieServices

            let actualOutput = await MovieServices.getAllMovies(filterBody);
            expect(actualOutput.data[0].Title).toBe(filterBody.title)
        })
    })
    describe('Should return Error when title filter does not match', ()=>{
        test.each([
            {filterBody: {
                title: "Hello World"
            }},
            {filterBody: {
                title: "SpiderMan 3"
            }}

        ])('Title in query string: $filterBody.title', async ({filterBody, expectedMovieTitle})=>{

            let sut = MovieServices

            let actualOutput = await MovieServices.getAllMovies(filterBody);
            expect(actualOutput.success).toBeFalsy();
        })
    })
})

describe('Get Movie Details by ID', ()=>{
    test('Movie Not Found', async()=>{
        let id = 17;

        let sut = MovieServices

        actualOutput = await sut.getMovieDetails(id);

        expect(actualOutput.success).toBeFalsy();
    })
    test('Movie Found', async ()=>{
        let id = 1;

        let sut = MovieServices;

        actualOutput = await sut.getMovieDetails(id);

        expect(actualOutput.success).toBeTruthy();
    })
});

describe('Update Movie by ID', ()=>{
    test('Movie Not Found', async()=>{
        let updateChanges = {
            "id": 19,
            "title": "A New Hope (Starwars)",
            "opening_crawl": "Princess Leia gets abducted by the insidious Darth Vader. Luke Skywalker then teams up with a Jedi Knight, a pilot and two droids to free her and to save the galaxy from the violent Galactic Empire",
            "director": "Usman Hussain"
        }

        let sut = MovieServices

        actualOutput = await sut.updateMovie(updateChanges);

        expect(actualOutput.success).toBeFalsy();
    })
    test('Movie Updated Successfully', async ()=>{
        let updateChanges = {
            "id": 1,
            "title": "A New Hope (Starwars)",
            "opening_crawl": "Princess Leia gets abducted by the insidious Darth Vader. Luke Skywalker then teams up with a Jedi Knight, a pilot and two droids to free her and to save the galaxy from the violent Galactic Empire",
            "director": "Usman Hussain"
        }

        let sut = MovieServices;

        actualOutput = await sut.updateMovie(updateChanges);

        expect(actualOutput.success).toBeTruthy();
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