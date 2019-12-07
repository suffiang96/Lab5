var mymap = L.map('mapid').setView([47.258, -122.465], 4);
			L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
				attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
				maxZoom: 18,
				id: 'mapbox.streets',
				accessToken: 'pk.eyJ1Ijoic3VmZmlhbmc5NiIsImEiOiJjazN2MjZ3a2QwN3A1M2Vvd3BoZWY2aGptIn0.TshYd57hSztXfIni3EbVkg'
			}).addTo(mymap);
			// *load GeoJSON from an external file*
			//$.getJSON("usGeoJson.json",function(data){
		    // *add GeoJSON layer to the map once the file is loaded. This is Leaflet's version of the map.data.loadGeoJson method in the Google Maps API.*
		    //L.geoJson(data,
					//{onEachFeature: addPopup}
				//).addTo(mymap);
		  //});
			//*Popup function*
			//function addPopup (feature, layer){
				//layer.bindPopup(feature.properties.NAME)
			//}
