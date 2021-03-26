function mapInit() {
    // follow the Leaflet Getting Started tutorial here
    var map = L.map('mapid').setView([38.98, -76.94], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoibXRhZGVzc2UiLCJhIjoiY2ttcDczM21jMGl4MTJ1bGZyYmJrNzQ2dyJ9.GDJ1569abWYYJgzmwSlqfg'
  }).addTo(map);
    return map;
  }
  async function dataHandler(mapObjectFromFunction) {
    // gets the data and inits the needed html elements
    const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
    const form = document.querySelector('.userform');
    const search = document.querySelector('#search_value');
    const targetList = document.querySelector('.target-list');
  
    // structures the recieved data into json
    const request = await fetch(endpoint);
    const data = await request.json();
    console.log(data);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log('submit fired', search.value);
  const filtered=data.filter((record)=> record.zip.includes(search.value)&&record.geocoded_column_1);
  console.table(filtered);

  filtered5=filtered.slice(0,5);

  filtered5.forEach((item)=> {
    const longLat = item.geocoded_column_1.coordinates;
    const marker = L.marker([longLat[1], longLat[0]]).addTo(mapObjectFromFunction);
    const appendItem = document.createElement('li');
    appendItem.innerHTML = `<span class="name">${item.name}</span>` + ' ' + `<address><span class="address">${item.address_line_1}</span></address>`
    targetList.append(appendItem) ;
});
  

  const {coordinates} = filtered5[0]?.geocoded_column_1
    mapObjectFromFunction.panTo([coordinates[1], coordinates[0]], 0);

});

  }
async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
}

window.onload = windowActions;