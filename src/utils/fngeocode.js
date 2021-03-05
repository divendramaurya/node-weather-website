
const request = require('request'); 

const fngeocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZGl2ZW5kcmFtYXVyeWEiLCJhIjoiY2tscXp6eHY0MDAzaTJucThucGMwbHRpNSJ9.SYZeoRQ3DcnvP5bhJNmfQg&limit=1';

    request({url : url , json : true},(error, response) => {

        if(error){
              callback('Unable to connect...  Check Internet Connection...', undefined);

        }else if(response.body.features[0] === undefined)  { //or response.body.features.length === 0 
              callback('Incorrect location details.... Enter proper location', undefined);
              
        }else{   
            callback(
                undefined, {
                    lattitude : response.body.features[0].center[1],
                    longtitude : response.body.features[0].center[0],
                    location : response.body.features[0].place_name,
                    WrongAddress : response.body.features[0] === undefined, 
                }
             )
        } 
    }) 
}

module.exports = fngeocode;