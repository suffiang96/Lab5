var center = [48.009296, -124.151837];

var chinmap = new L.Map('mapone', {
	layers: [chintiles][chintiles2],
	center: center,
	zoom: 9
});

var chintiles =	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
				attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
				id: 'mapbox.light',
				accessToken: 'pk.eyJ1Ijoic3VmZmlhbmc5NiIsImEiOiJjazN2MjZ3a2QwN3A1M2Vvd3BoZWY2aGptIn0.TshYd57hSztXfIni3EbVkg'
			}).addTo(chinmap);
var chintiles2 = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
				attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
				id: 'mapbox.outdoors',
				accessToken: 'pk.eyJ1Ijoic3VmZmlhbmc5NiIsImEiOiJjazN2MjZ3a2QwN3A1M2Vvd3BoZWY2aGptIn0.TshYd57hSztXfIni3EbVkg'
			}).addTo(chinmap);

var falllayer =  $.getJSON("fallchnook.json",function(fallData){
		    L.geoJson(fallData, {
					style: function (feature){
					   return { color: '#cc7c27',
					          weight: 2.5
									};
					 },
			  	 onEachFeature: function( feature, layer ){
					   layer.bindPopup(  "This waterway hosts Chinook salmon in the Fall" )
					 }
				 }).addTo(chinmap);
			 });

let smrlayer =
L.layerGroup().addTo( chinmap )
$.getJSON("smrchnook.json",function(smrData){
		    L.geoJson(smrData, {
				  onEachFeature: addMyData,
   })
 })
 function addMyData( feature, layer ){
   smrlayer.addLayer( layer )
 };

 var osmGeocoder = new L.Control.OSMGeocoder();
 chinmap.addControl(osmGeocoder);


var baseMaps ={
	"Light": chintiles,
	"Topographic" :chintiles2
};
var layerControl = {
	"Summer": smrlayer
}
L.control.layers(baseMaps,layerControl).addTo(chinmap);



					L.control.legend({
				    items: [
				        {color: '#cc7c27', label: 'Fall Chinook Run'},
								{color: '#0099ff', label: 'Summer Chinook Run'},
				    ],
				    collapsed: true,

				    buttonHtml: 'show legend'
				}).addTo(chinmap);


 var distmap = new L.Map('maptwo', {
	 layers: [disttiles][distlayer],
	 center: center,
	 zoom: 9,
 });

 var disttiles = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	  id: 'mapbox.light',
	  accessToken: 'pk.eyJ1Ijoic3VmZmlhbmc5NiIsImEiOiJjazN2MjZ3a2QwN3A1M2Vvd3BoZWY2aGptIn0.TshYd57hSztXfIni3EbVkg',
	 }).addTo(distmap);
	 var disttiles2 = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	 				attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	 				id: 'mapbox.outdoors',
	 				accessToken: 'pk.eyJ1Ijoic3VmZmlhbmc5NiIsImEiOiJjazN2MjZ3a2QwN3A1M2Vvd3BoZWY2aGptIn0.TshYd57hSztXfIni3EbVkg'
	 			}).addTo(chinmap);



var distlayer = 	$.getJSON("anadromous.json",function(anadData){
	L.geoJson(anadData, {
	style: function(feature){
	 return { color: '#bf3939',
		 weight: 1.5
		};
	 },
 onEachFeature: function( feature, layer ){
	 layer.bindPopup(  "<b>Waterway name:</b> " + feature.properties.STRMNAME )
}
		}).addTo(distmap);
								});

var geojsonMarkerOptions = {
						 	     radius: 4,
						 	     fillColor: "#325aa8",
						 	     color: "#000",
						 	     weight: 1,
						 	     opacity: 1,
						 	     fillOpacity: 0.8
						 	 };

var damslayer=	 $.getJSON("dams.json",function(damData){
	 L.geoJson(damData, {
	 pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, geojsonMarkerOptions);
	 },
	 onEachFeature: function( feature, layer ){
		layer.bindPopup( "<p>This dam is on the " + feature.properties.STREAMNAME + " and is managed by the " + feature.properties.AGENCY + "</p>" + "<p>Hatchery: " + feature.properties.HATCHNAME + "</p><p>Fish type: " + feature.properties.FISHTYPE + "</p>")
	 }
}).addTo(distmap);
		});

var osmGeocoder = new L.Control.OSMGeocoder();
distmap.addControl(osmGeocoder);

var baseMaps ={
	"Light": disttiles,
	"Topographic" :disttiles2
};
L.control.layers(baseMaps).addTo(distmap);

L.control.legend({
 items: [
	 {color: '#bf3939', label: 'Stream with anadromous fish present'},
	 {color: '#325aa8', label: 'Dams'},
	       ],
 collapsed: true,
  buttonHtml: 'show legend'
				}).addTo(distmap);
