// Initialize and add the map
let map;

async function initMap() {
  // The location of Uluru
//   4.711044598083734, -74.07305123559138 -> Bogota
  const position = { lat:  4.711044598083734, lng: -74.07305123559138 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerView } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 6,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  // The marker, positioned at Uluru
  // const marker = new AdvancedMarkerView({
  //   map: map,
  //   position: position,
  //   title: "Uluru",
  // });
}



// initMap();
