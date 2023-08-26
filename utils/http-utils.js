const axios = require('axios');
const NodeCache = require('node-cache');
const myCache = new NodeCache({ checkperiod: process.env.CACHE_CHECK_PERIOD || 600 });

const getAllCharacters = async (charactersUrl) => {
    console.log("GET ALL CHARACTERS: ");
    let characters = [];
    let characterId;
    
    try{
        for(let url of charactersUrl)
        {
            characterId = getCharacterIdFromUrl(url);
            if(myCache.get(`character-${characterId}`))
            {
                characters.push(myCache.get(`character-${characterId}`));
            }
            else
            {
                let res = await axios(url);
                if(res.data.name)
                {
                    myCache.set(`character-${characterId}`, res.data.name)
                    characters.push(res.data.name);

                }
            }
        }
    }
    catch(error)
    {
        console.log("Error Getting Characters", error.message);
        throw error;
    }
    return characters;
}

const getAllPlanets = async (planetsUrl)=>{
    let planets = [];
    let planetId =""
    try{
        for(let url of planetsUrl)
        {
            planetId = getPlanetsIdFromUrl(url);
            if(myCache.get(`planet-${planetId}`))
            {
                planets.push(myCache.get(`planet-${planetId}`));
            }
            else
            {
                let res = await axios(url);
                if(res?.data?.name)
                {
                    planets.push(res?.data?.name);
                    myCache.set(`planet-${planetId}`, res?.data?.name)
                }

            }
        }
    }
    catch(error)
    {
        console.log("Error Getting Planets", error.message);
        throw error;
    }
    return planets;
}

const getAllStarships = async (starshipsUrl)=>{
    let planets = [];
    let starshipId =""
    try{
        for(let url of starshipsUrl)
        {
            starshipId = getStarShipIdFromUrl(url);
            if(myCache.get(`planet-${starshipId}`))
            {
                planets.push(myCache.get(`planet-${starshipId}`));
            }
            else
            {
                let res = await axios(url);
                if(res?.data?.name)
                {
                    planets.push(res?.data?.name);
                    myCache.set(`planet-${starshipId}`, res?.data?.name)
                }

            }
        }
    }
    catch(error)
    {
        console.log("Error Getting Planets", error.message);
        throw error;
    }
    return planets;
}

const getCharacterIdFromUrl = (url)=>{
    if(parseInt(url[url.length-3]))
        return url.slice(29,31);
    else
        return url.slice(29,30);
} 

const getPlanetsIdFromUrl = (url)=>{
    if(parseInt(url[url.length-3]))
    return url.slice(30,32);
    else
    return url.slice(30,31);
} 
const getStarShipIdFromUrl = (url)=>{
    if(parseInt(url[url.length-3]))
    return url.slice(30,32);
    else
    return url.slice(30,31);
} 
module.exports = {
    getAllCharacters,
    getAllPlanets,
    getAllStarships
}