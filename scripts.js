var center = [48.009296, -124.151837];

var chinmap = new L.Map('mapone', {
	layers: [chintiles][sprglayer],
	layers: [smrlayer][falllayer],
	center: center,
	zoom: 9
});

var chintiles =	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
				attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
				id: 'mapbox.light',
				accessToken: 'pk.eyJ1Ijoic3VmZmlhbmc5NiIsImEiOiJjazN2MjZ3a2QwN3A1M2Vvd3BoZWY2aGptIn0.TshYd57hSztXfIni3EbVkg'
			}).addTo(chinmap);


chinmap.attributionControl.setPrefix('');

var falllayer =  $.getJSON("fallchnook.json",function(fallData){
		    L.geoJson(fallData, {
					style: function (feature){
					   return { color: 'red',
					          dashArray: '3',
					          weight: 2 ,
					          fillOpacity: 0.7 };
					 },
					 onEachFeature: function( feature, layer ){
					   layer.bindPopup(  "This waterway hosts Chinook salmon in the Fall" )
					 }
				 }).addTo(chinmap);
					});

var smrlayer =	$.getJSON("smrchnook.json",function(smrData){
		    L.geoJson(smrData, {
					style: function (feature){
					   return { color: 'yellow',
					          dashArray: '6',
					          weight: 2 ,
					          fillOpacity: 0.7 };
					 },
					 onEachFeature: function( feature, layer ){
					   layer.bindPopup(  "This waterway hosts Chinook salmon in the Summer" )
					 }
				 }).addTo(chinmap);
					});

	var sprglayer =	$.getJSON("sprchnook.json",function(sprgData){
		L.geoJson(sprgData, {
					style: function (feature){
					   return { color: 'green',
					          dashArray: '6',
					          weight: 2,
					          fillOpacity: 0.7 };
					 },
					 onEachFeature: function( feature, layer ){
					   layer.bindPopup(  "This waterway hosts Chinook salmon in the Spring" )
					 }
				 }).addTo(chinmap);
					});







 var distmap = new L.Map('maptwo', {
	 layers: [disttiles][distlayer],
	 center: center,
	 zoom: 9,
	 zoomControl: false
 });

 var disttiles = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	  id: 'mapbox.light',
	  accessToken: 'pk.eyJ1Ijoic3VmZmlhbmc5NiIsImEiOiJjazN2MjZ3a2QwN3A1M2Vvd3BoZWY2aGptIn0.TshYd57hSztXfIni3EbVkg',
	 }).addTo(distmap);

var damslayer=	 $.getJSON("dams.json",function(damData){
		 L.geoJson(damData, {
			 style: function(feature){
				 return { color: "blue",
									};
			 },
			 onEachFeature: function( feature, layer ){
				 layer.bindPopup( "<p>This dam is on the " + feature.properties.STREAMNAME + " and is managed by the " + feature.properties.AGENCY + "</p>" + "<p>Hatchery: " + feature.properties.HATCHNAME + "</p><p>Fish type: " + feature.properties.FISHTYPE + "</p>")
			 }
		 }).addTo(distmap);
			});

var distlayer = 	$.getJSON("anadromous.json",function(anadData){
				L.geoJson(anadData, {
					style: function(feature){
					   return { color: 'blue',
					          dashArray: '3',
					          weight: 2 ,
					          fillOpacity: 0.7 };
					 },
					 onEachFeature: function( feature, layer ){
					   layer.bindPopup(  "<b>Waterway name:</b> " + feature.properties.STRMNAME )
					 }
				 }).addTo(distmap);
					});

					// chinmap.sync(distmap);
					// distmap.sync(chinmap);
					//
					mapone.sync(maptwo);
					maptwo.sync(mapone);
