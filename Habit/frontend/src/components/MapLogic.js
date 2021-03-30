let location;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
    location = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
  });
}

function initMap() {
  console.log("MAP");
  map = new google.maps.Map(document.getElementById("map"), {
    center: location,
    zoom: 3,
  });
  const marker = new google.maps.Marker({
    position: location,
    map: map,
  });
}
