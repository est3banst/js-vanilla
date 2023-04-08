window.addEventListener('load',()=>{{
    // Selecting every element from the DOM
    let  long;
    let  lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let tempDescript = document.querySelector(".temp-descriptive"); 

//  Access coords with geolocation
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
   
            
            fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${long}?key=5WFS2S2BL2E85BUPNG6Y7FBRQ`)
                .then(response=>{
                    return response.json();
            })
            // Displaying all the data from the api
                .then(data=>{
                    const {conditions, temp, icon} = data.currentConditions;
                    console.log(data)
                    temperatureDegree.textContent = temp;
                    temperatureDescription.textContent = conditions;
                    locationTimezone.textContent = data.timezone;
                    
                    tempDescript.textContent = data.description;
                    // Calling the function to dynamic icons
                    setIcons(icon, document.querySelector(".icon"))
            })
        })};
        // Setting the function to change icons
        function setIcons (icon, iconId) {
            const skycons = new Skycons ({ color:"white"});
            const currentIcon = icon.replace(/-/g,"_").toUpperCase();
            skycons.play();
            return skycons.set(iconId, Skycons[currentIcon])
        }
}});

