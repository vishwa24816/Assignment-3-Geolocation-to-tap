function geoFindMe() {
    const statusElement = document.querySelector("#status");
    const mapLinkElement = document.querySelector("#map-link");
    mapLinkElement.href = "";
    mapLinkElement.textContent = "";
  
    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        statusElement.textContent = "Location found successfully!";
        mapLinkElement.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
        mapLinkElement.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    }
  
    function error(error) {
        let errorMessage = "Unable to retrieve your location.";
        switch(error.code) {
            case error.PERMISSION_DENIED:
                errorMessage = "User denied the request for Geolocation.";
                break;
            case error.POSITION_UNAVAILABLE:
                errorMessage = "Location information is unavailable.";
                break;
            case error.TIMEOUT:
                errorMessage = "The request to get user location timed out.";
                break;
            case error.UNKNOWN_ERROR:
                errorMessage = "An unknown error occurred.";
                break;
        }
        statusElement.textContent = errorMessage;
        console.error("Geolocation error:", error); 
    }

    if (!navigator.geolocation) {
        statusElement.textContent = "Geolocation is not supported by your browser.";
    } else {
        statusElement.textContent = "Locating… Please grant permission if prompted.";
        navigator.geolocation.getCurrentPosition(
            success,
            error,
            {
                enableHighAccuracy: true, 
                timeout: 5000,           
                maximumAge: 0            
            }
        );
    }
}
  
document.querySelector("#find-me").addEventListener("click", geoFindMe);
