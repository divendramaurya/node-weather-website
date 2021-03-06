const express = require('express');
const path =  require('path');
const app = express();
const hbs = require('hbs');
const { query } = require('express');

const port = process.env.PORT || 3000;

// console.log(__dirname);
// console.log(__filename);   


// Define path foe Express config
const publicDirectoryPath =  path.join(__dirname, '../public');              // Require static assets from public folder
const viewsPath =  path.join(__dirname, '../templates/views');             // wo abhi "views" folder mai nahi "templates" folder mai dekhega
const partialsPath =  path.join(__dirname, '../templates/partials');      // partials path is defined

//set handle bar location and views location
app.set('view engine', 'hbs');  
app.set('views', viewsPath);  
hbs.registerPartials(partialsPath) ;    

// setup static directory to serve.
app.use(express.static(publicDirectoryPath));     // public folder mai se lata hai// Require static assets from public folder

 

app.get("", (req, res)=> {                                       // views folder mai se lata hai   // index.hbs 
    res.render('index',{
        title : "My Weather",
        name: "Devendra",  
        message : "Use this site to get your weather",
    });                                       
})    

app.get("/about", (req, res)=> {                                       // views folder mai se lata hai   // about.hbs 
    res.render('about',{
        title : "About Me",
        name: "Devendra Maurya",       
    });                                        
})

app.get("/help", (req, res)=> {                                       // views folder mai se lata hai   // help.hbs 
    res.render('help',{
        message : "Always happy to help.",  
        name: "Devendra Maurya", 
        title : "Help Page",    
    });                                        
})


/* app.get("/products", (req, res)=> {
  if(!req.query.search){
     return res.send({
          error : "Must provide search term",
      })
  }

  console.log(req.query.search);
    res.send({
        product : [] 
    });   
}) */




 
/* app.get("", (req, res)=> {
    res.send('Hello default express');   
})
 */
/* app.get("/about", (req, res)=> {
    res.send('<h2>About page</h2>') 
})

app.get("/help", (req, res)=> {
    res.send([{ name : "Dev" },{ name : " Ramu" }]) 
}) */ 

const fngeocode = require('./utils/fngeocode');    
const fnforecast = require('./utils/fnforecast');

app.get("/weather", (req, res)=> { 

    if(!req.query.address){
        return res.send({
             error : "Must provide address term",
         })
     }


     fngeocode(req.query.address, (error ,{lattitude ,longtitude, location} = {}) => { 
  
        if(error){
            return res.send({
              error
         })
        }
        
        
    
        fnforecast(lattitude,longtitude, (error ,forecastdata) => {   
    
           
            if(error){
                return res.send({
                 error 
             })
            }
            
            
            console.log('Correct Details.. Printing Details in Browser');
           // console.log("With chaining location details : ",location);    
            const{weather_descriptions, temperature, feelslike, country ,region ,humidity , pressure ,localtime , lat , lon} = forecastdata;  
           // console.log(`With chaining ... Weather here in ${region}(${country}) is ${weather_descriptions}. Temp is ${temperature}, but it feels like ${feelslike}`); 
            res.send({
                forecastStatement : `Weather here in ${region} (${country}) is ${weather_descriptions}. Temp is ${temperature} F, but it feels like ${feelslike} F. Humidity is ${humidity} % and Pressure is ${pressure} Pascal. Current local time is ${localtime}. Latitude is ${lat} and Longtitude is ${lon}.`, 
                forecast : forecastdata, 
                location : location,
                address : req.query.address 

            })        
        })

   
     /* console.log(req.query.address); 
     res.send({
        forecast : 'Rainy',
        location : 'Mumbai',
        address : req.query.address,
    }) */

})
}) 


app.get("/help/*", (req, res)=> {                                       // help/ ke badd kuch bhi likha hto ye page aayega
    res.render('404',{
        message : "I am ready to help", 
        name: "Devendra Maurya", 
        title : "Help Page", 
        errorMessage : 'Path after "/help/.."  not found...',      
    });                                        
})

app.get("*", (req, res)=> {                                       //  * sab kuch match kar lega// last mai rekhate hai usko
    res.render('404',{
        message : "I am ready to help", 
        name: "Devendra Maurya", 
        title : "Help Page", 
        errorMessage : 'Bad url entered. Page not found'   
    });                                        
})

app.listen(port , () => {
    console.log('server started on Port no' + port);  
})  