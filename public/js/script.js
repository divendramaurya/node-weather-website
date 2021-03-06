console.log('script . js consoled');   
//alert("script . js alerted"); 

// fetch('https://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//         document.write(data);
        
//     })
// }) 

/* fetch('http://localhost:3000/weather?address=!').then((response) => {
    response.json().then((data) => {

        if(data.error){
            console.log(data.error); 
            document.write(data.error);
        }
        else{
            console.log(data.forecastStatement , data.location); 
            document.write(data.forecastStatement ,data.location);
        }
       
        document.write(data);
        
    })
}) */


const weatherForm = document.querySelector('form') ;
const search = document.querySelector('input');



document.getElementById("reset").addEventListener("click", function() {
    document.querySelector('input').value = ""; 
    document.getElementById('message-1').innerText = "";
    document.getElementById('message-2').innerText = "";  
  }); 

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault();

    document.getElementById('message-1').innerText = "Loading...";
    document.getElementById('message-2').innerText = "";  

    const location  = search.value;
    fetch('/weather?address='+ location).then((response) => { 
    response.json().then((data) => {

        if(data.error){
            console.log(data.error); 
            document.getElementById('message-1').innerText = data.error;
            document.getElementById('message-2').innerText = "";
          
        }
        else{ 
            console.log(data.forecastStatement , data.location);  
            document.getElementById('message-1').innerText = data.forecastStatement;
            document.getElementById('message-2').innerHTML = data.location; 
           
        }
       
      
         
    })
})


})