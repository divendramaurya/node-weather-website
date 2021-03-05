
const request = require('request'); 

const fnforecast = (lattitude, longtitude ,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b71f0918d472659694967bcbdf09c912&query=' + encodeURIComponent(lattitude) +','+ encodeURIComponent(longtitude)+'&units=f';
    console.log("url", url); 

    request({url , json : true},(error, {body}) => { // {body} liya hai response mai se khali  // url : url kr jaghe khali url liye hai

        if(error){

            callback('Unable to connect...  Check Internet Connection...', undefined);
 
        }else if(body.error)  { //or response.body.features.length === 0  
             callback('Bad cordinates... Incorrect Lat Long details.... Enter proper Lat Long', undefined); 
              
        }else{  
            callback(  
                undefined, {
                    weather_descriptions : body.current.weather_descriptions[0],
                    temperature : body.current.temperature,
                    feelslike : body.current.feelslike,
                    country : body.location.country, 
                    region : body.location.region,    
                }
             )
        }  
    }) 
}

module.exports = fnforecast;  


