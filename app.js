const geoCode = require('./utils/geocode')

console.log(process.argv[2]);
let location = process.argv[2]; //getting location from commandline.

if(!location){
    console.log("Enter a location")
}else{
    //calling the mapbox api 
    //we used object destructuring in the second parameter.
    geoCode.geoCode(location,(error,{latitude,longitude,placeName}={})=>{
        if(error){
            return console.log(error)
        }
        console.log("latitude",latitude);
        console.log("longitude",longitude);
        console.log("placeName",placeName);
        //calling weater stack api
        geoCode.forcast(latitude,longitude,(error,forcastData)=>{
            if(error){
                return console.log(error)
            }
            console.log(forcastData);      
        });
    
    });
    
}








//url to fetch weather from the weaterstack api
/*
const url = 'http://api.weatherstack.com/current?access_key=954ac2f5f3c0955b329f7e3c7afefcff&query=India&units=f';
request({url:url},(error,response)=>{
    if(error){
        console.log("Cannor connect ther weather api");
    }
    else if(response.body.error){
        console.log("unable to find the location");

    }else{
        const data = JSON.parse(response.body);
        console.log(data.current);
        console.log(data.current.weather_descriptions[0]+". It is currently",data.current.temperature,"degress out. It feels like ", data.current.feelslike," degress is out" );


    }
    
});

 */


//mapbox.com
/*
const url2 = `https://api.mapbox.com/geocoding/v5/mapbox.places/Alappuzha.json?access_token=pk.eyJ1Ijoia2VlcnRoYW5hcHJha3NoIiwiYSI6ImNrc3N3dGhrdjBhamIybm5zbjZpcjMwNGYifQ.WcY4wUus70XI_LMGdUEmrQ&limit=1`;
request({url:url2, json: true}, (error,response)=>{
    if(error){
        console.log("cannot connect !");
    }
    else if(response.body.features.length === 0){
        console.log("unable to find the location");
    }else{
        const longitude  = response.body.features[0].center[0];
        const latitude  = response.body.features[0].center[1];
        console.log("The latitued is "+latitude+" and the longitude is "+longitude+".");
    }



});
*/