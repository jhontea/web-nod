// Add the map center coordinate
var center = {lat: -6.7638293, lng: 108.1824759};

var map = new google.maps.Map(document.getElementById('map'), 
    {
        zoom: 15,
        center: center
    }
);		

function addMarker(markers){

    var marker = new google.maps.Marker({
            position: markers.coordinate,
            map: map,
            label: markers.number,
            animation: google.maps.Animation.DROP,
            icon: markers.icon
        })

    var infowindow = new google.maps.InfoWindow({
            content: markers.infowindow
        });


    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });


}			

// Add the markers to the Map
addMarker({
    coordinate:{lat: -6.8341052, lng: 108.2085991},
    infowindow:'<div id="content">'+
    '<h4 class="font-weight-light"><span class="custom-color">Our</span> Location</h4>'+
    '<div class="map-info-content">'+
    '<p>Islamic Centre Majalengka, Majalengka, Jawa Barat</p>'+
    '</div>'+
    '</div>',
    icon: "/img/map_marker.png",
});

addMarker({
    coordinate:{lat: -6.7053977, lng: 108.5532272},
    infowindow:'<div id="content">'+
    '<h4 class="font-weight-light"><span class="custom-color">Stasiun</span> Cirebon</h4>'+
    '<div class="map-info-content">'+
    '<p>Stasiun Cirebon, Cirebon, Jawa Barat</p>'+
    '</div>'+
    '</div>',
    icon: "/img/map_marker.png",
});

		