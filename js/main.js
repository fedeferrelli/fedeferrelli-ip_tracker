// acceso a las API's

var api_key = "at_TNqJ3VjHADFAj6wBOFVelH7jlczgB" 
var token = "pk.eyJ1IjoiZmVkZXJpY29mZXJyZWxsaW1henphIiwiYSI6ImNrc2xzYTkzbzFjOHgycHBlMDFiMmsxcXoifQ.HPihWYtW1cK0SObvbVb9NA" 


// ubicaciòn de variables
var mymap

var ip_address = document.getElementById("ip_num")
var ip_location = document.getElementById("location")
var timezone = document.getElementById("timezone")
var isp = document.getElementById("isp")
var ip_address_input = document.getElementById("input")
var boton = document.getElementById("boton")


// Renderizado del mapa de Pantalla de Inicio con la ubicación del dipositivo

axios({
    method: 'GET',
    url: `https://geo.ipify.org/api/v1?apiKey=${api_key}`
}).then(res => {
    ip_address_input.value = res.data.ip    
    ip_address.innerHTML = res.data.ip
    ip_location.innerHTML = `${res.data.location.city}, ${res.data.location.region} (${res.data.location.country})`
    timezone.innerHTML = `UTC${res.data.location.timezone}`
    isp.innerHTML = res.data.isp

    var lat = res.data.location.lat 
    var long = res.data.location.lng

    // creando el mapa

    mymap = L.map('map',{ zoomControl: false}).setView([`${lat/1.0001}`, `${long}` ], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: `${token}`
}).addTo(mymap);


var marker = L.marker([lat, long]).addTo(mymap);
})


// Busquedas a traves del search (data y mapa)


boton.addEventListener("click", ()=>{
    axios({
    method: 'GET',
    url: `https://geo.ipify.org/api/v1?apiKey=${api_key}&ipAddress=${ip_address_input.value}`
}).then(res => {    
    ip_address.innerHTML = res.data.ip
    ip_location.innerHTML = `${res.data.location.city}, ${res.data.location.region} (${res.data.location.country})`
    timezone.innerHTML = `UTC${res.data.location.timezone}`
    isp.innerHTML = res.data.isp
    
    var lat = res.data.location.lat 
    var long = res.data.location.lng

mymap.flyTo(L.latLng(lat, long));
L.marker([lat, long], {

}).addTo(mymap);

    })
    .catch(function (error) {
        document.getElementById("title").classList.add("brillo_error")
        document.getElementById("map").classList.add("brillo_error")
        document.getElementById("search").classList.add("brillo_error")
        document.getElementById("error").style.zIndex = "2"
        
      })
});


// Mensaje de error

const btn_error = document.getElementById("error-btn")

btn_error.addEventListener("click", ()=>{
    document.getElementById("title").classList.remove("brillo_error")
    document.getElementById("map").classList.remove("brillo_error")
    document.getElementById("search").classList.remove("brillo_error")
    document.getElementById("error").style.zIndex = "-1";
})