jQuery(document).ready(function () {
	var $placeDivs = $('.google-place');
	$placeDivs.each(function (index) {

	mapOptions = {}, markerOptions = {'clickable': false};

	if( icon = $(this).data('iconurl') ) {
		markerOptions['icon'] = icon;
	}

	if ( zoom = parseInt($(this).data('zoom')) ) {
		mapOptions['zoom'] = zoom;
	}

	['scrollwheel', 'draggable', 'pancontrol'].forEach( function(property) {
		mapOptions[property] = property;
	});

	var map = new google.maps.Map(this, mapOptions);
	var placesService = new google.maps.places.PlacesService(map);

	placesService.getDetails({
		'placeId': $(this).data('placeid'),
		}, function(place, status) {
			if (status === google.maps.places.PlacesServiceStatus.OK) {
				map.setCenter(place.geometry.location);
				jQuery.extend(markerOptions, {
					'map': map,
					'position': place.geometry.location,
					'icon': { url: 'https://maps.gstatic.com/mapfiles/place_api/icons/dentist-71.png', scaledSize: new google.maps.Size(20,20), anchor: new google.maps.Point(10,10), labelOrigin: new google.maps.Point(52,15), },
					'label': { color: '#44f', text: 'QE2 Dental', 'font-weight': 'bold', },
					// 'place': {location: place.geometry.location, placeId: place.place_id,},
					});
				if(!markerOptions.hasOwnProperty('icon')) {
					markerOptions.icon = place.icon;
				}
				console.log(place);
				var marker = new google.maps.Marker(markerOptions);
			}
			}
		);
    });
});
