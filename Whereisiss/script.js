 //Making a map and Tiles
 const mymap = L.map('issMap').setView([0,0], 1);
 const attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
 const tileUrl ='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
 const tiles = L.tileLayer(tileUrl,{attribution});
 tiles.addTo(mymap);

//Making a marker with a custom icon
 const issIcon = L.icon({
 iconUrl: 'International_Space_Station.svg.png',
 iconSize: [50, 32],
 iconAnchor: [25, 16] 
});
 const marker = L.marker([0,0],{icon:issIcon}).addTo(mymap);
 const api_url ='https://api.wheretheiss.at/v1/satellites/25544';

 let firstTime =true;

 async function getIss(){
     const response = await fetch(api_url);
     const data = await response.json();
     const {latitude,longitude} = data; //destructuring

     marker.setLatLng([latitude,longitude]);
     if(firstTime){
         mymap.setView([latitude,longitude],5);
         firstTime = false;
     }

     document.getElementById("lat").textContent =latitude.toFixed(2);
     document.getElementById("lon").textContent =longitude.toFixed(2);
 }

 getIss();

 setInterval(getIss,1000);
