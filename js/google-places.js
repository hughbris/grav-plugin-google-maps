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
					});

				var marker = new google.maps.Marker(markerOptions);
			}
			}
		);
    });
});
