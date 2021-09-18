const request = require('request');

//function for geting the geocode for a given address.
const geoCode = (locname,callback)=>{
    console.log("address = ",locname);

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(locname)+'.json?access_token=pk.eyJ1Ijoia2VlcnRoYW5hcHJha3NoIiwiYSI6ImNrc3N3dGhrdjBhamIybm5zbjZpcjMwNGYifQ.WcY4wUus70XI_LMGdUEmrQ&limit=1';
    //request({url:url, json: true}, (error,response)=>{ destructured it url and responce to {body}
    request({url, json: true}, (error,{body})=>{
        if(error){
            callback("Cannot connect to mapbox. Check your connection!");
        }
        else if(body.features.length === 0){
            callback("Unable to find the location");
        }else{
            console.log(body.features);
            const longitude = body.features[0].center[0];
            const latitude = body.features[0].center[1];
            const placeName = body.features[0].place_name;

            callback(null,{
                longitude,
                latitude,
                placeName,
            });
        }
    });
} 

const forcast = (latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=954ac2f5f3c0955b329f7e3c7afefcff&query='+ encodeURIComponent(latitude)+','+ encodeURIComponent(longitude)+'&units=f';
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback("Unable to connect to internet!");
        }else if(response.body.error){
            callback("Unable to find the location")
        }else{
            const weatherDescriptions = response.body.current.weather_descriptions;
            const locationName = response.body.location.name;
            console.log({
                weatherDescriptions : weatherDescriptions,
                locationName : locationName,
            })
        const data = response.body;
        //do not use ',' and '+' to concantinate the string at the same time. use only one at a time. otherwise it wont work. 
        callback(null,data.current.weather_descriptions[0]+". It is currently "+data.current.temperature+" degress out. It feels like "+data.current.feelslike+" degress is out" );
        }
    });
};

module.exports = {
    geoCode : geoCode,
    forcast:forcast,
}