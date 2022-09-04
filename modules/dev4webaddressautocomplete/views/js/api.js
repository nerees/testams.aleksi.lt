document.addEventListener("DOMContentLoaded", function(event) {
    if ($(document).find('#field-address1').length > 0) {
        let imported = document.createElement('script')
        imported.src = 'https://maps.googleapis.com/maps/api/js?key='+google_api_key+'&callback=initAutocomplete&libraries=places&language=lt';
        document.head.appendChild(imported);
    }
});

let autocomplete;
let componentForm = {
    city: 'short_name',
    postcode: 'short_name'
};

function initAutocomplete() {
    let address1 = document.getElementById("field-address1");
    let city = document.getElementById("field-city");
    let postcode = document.getElementById("field-postcode");
    
    autocomplete = new google.maps.places.Autocomplete(address1, {
        componentRestrictions: { country: ["lt"] },
        fields: ["address_components", "formatted_address"],
        types: ["geocode"],
    });
    autocomplete.addListener("place_changed", onPlaceChanged)
}

function onPlaceChanged() {
    let place = autocomplete.getPlace();
    
    //console.log(place);  // Uncomment this line to view the full object returned by Google API.
    
    for (let i=0; i < place.address_components.length; i++) {
        
        let addressType = place.address_components[i].types[0];
        
        if (addressType == 'locality') {
            addressType = 'city';
        }
        
        if (addressType == 'postal_code') {
            addressType = 'postcode';
        }
        
        if (componentForm[addressType]) {
            let val = place.address_components[i][componentForm[addressType]];
            //console.log(val);
            //console.log(document.getElementById("field-"+addressType));
            console.log(document.getElementById("field-"+addressType));
            document.getElementById("field-"+addressType).value = val;
        }
    }
}

function geolocate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var geolocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({
                center: geolocation,
                radius: position.coords.accuracy
            });
            //autocomplete.setBounds(circle.getBounds());
        });
    }
}