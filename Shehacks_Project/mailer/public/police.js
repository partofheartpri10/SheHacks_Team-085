var x = document.getElementById("demo");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
var latt=0;
var longi=0;
function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude +
  "<br>Longitude: " + position.coords.longitude;
  latt=position.coords.latitude;
  longi=position.coords.longitude;
}


function initMap() {
  getLocation();
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 19.01, lng: 72.82 },
    zoom: 20,
  });
  document.getElementById("submit").addEventListener("click", () => {
    showMap(map);
  });


}

function showMap(map){
  const bounds = new google.maps.LatLngBounds();
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();
  const markersArray = [];
  const origin1 = { lat: latt, lng: longi};
  const destinationA =  "Police Station-Shipra Path,Jaipur" ;
  const destinationB =  "Mansarovar Police Station, Varun Path, Mansarovar, jaipur";
  const destinationC =  "Mahesh Nagar Police Station,Jaipur" ;
  const destinationD = "Jawahar Circle Police Station,Jaipur ";
  const destinationE = "Police Department,Jaipur ";
  const destinationF = "Police Chowki,Jaipur ";
  const destinationIcon =
    "https://chart.googleapis.com/chart?" +
    "chst=d_map_pin_letter&chld=D|FF0000|000000";
  const originIcon ="https://chart.googleapis.com/chart?" +
    "chst=d_map_pin_letter&chld=O|FFFF00|000000";

  directionsRenderer.setMap(map);
  const geocoder = new google.maps.Geocoder();
  const service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
    {
      origins: [origin1],
      destinations: [destinationA,destinationB,destinationC,destinationD,destinationE,destinationF],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false,
    },
    (response, status) => {
      if (status !== "OK") {
        alert("Error was: " + status);
      } else {
        const originList = response.originAddresses;
        const destinationList = response.destinationAddresses;
        const outputDiv = document.getElementById("output");
        outputDiv.innerHTML = "";
        deleteMarkers(markersArray);

        const showGeocodedAddressOnMap = function (asDestination) {
          const icon = asDestination ? destinationIcon : originIcon;

          return function (results, status) {
            if (status === "OK") {
              map.fitBounds(bounds.extend(results[0].geometry.location));
              markersArray.push(
                new google.maps.Marker({
                  map,
                  position: results[0].geometry.location,
                  icon: icon,
                })
              );
            } else {
              alert("Geocode was not successful due to: " + status);
            }
          };
        };

        for (let i = 0; i < originList.length; i++) {
          const results = response.rows[i].elements;
          geocoder.geocode(
            { address: originList[i] },
            showGeocodedAddressOnMap(false)
          );

          for (let j = 0; j < results.length; j++) {
            geocoder.geocode(
              { address: destinationList[j] },
              showGeocodedAddressOnMap(true)
            );
             var g=results[0].duration.text;
            var psName= 0;
            for(let i=1;i<results.length;i++){
             if(g>results[i].duration.text)
            {
              g= results[i].duration.text;
              psName=i;
            }
            }
             outputDiv.innerHTML =
              g +
              "<br>"+
              destinationList[psName]+
              "<br>"+
              originList[0];
              calculateAndDisplayRoute(directionsService, directionsRenderer,originList[0],destinationList[psName]);
        }
      }
    }
    }
  );
}

function calculateAndDisplayRoute(directionsService, directionsRenderer,origin1,destination1) {
  directionsService.route(
    {
      origin: {
        query: origin1,
      },
      destination: {
        query: destination1,
      },
      travelMode: google.maps.TravelMode.DRIVING,
    },
    (response, status) => {
      if (status === "OK") {
        directionsRenderer.setDirections(response);
      } else {
        window.alert("Directions request failed due to " + status);
      }
    }
  );
}

function deleteMarkers(markersArray) {
  for (let i = 0; i < markersArray.length; i++) {
    markersArray[i].setMap(null);
  }
  markersArray = [];
}
