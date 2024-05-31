$(document).ready(function() {
    const selectedAmenities = {};

    $('input[type="checkbox"]').change(function () {
        if (this.checked) {
            selectedAmenities[$(this).data('id')] = $(this).data('name');
        } else {
            delete selectedAmenities[$(this).data('id')];
        }
        const amenitiesList = Object.values(selectedAmenities).join(', ');
        $('.amenities h4').text(amenitiesList);
    });

    // Request API status
    $(document).ready(function() {
        $.getJSON('http://localhost:5001/api/v1/status/', function (data) {
            if (data.status === 'OK') {
                $('#api_status').css({
                    'background-color': '#ff545f'
                });
            } else {
                $('#api_status').css({
                    'background-color': ''
                });
            }
        });
    });
    $.ajax({
        url: 'http://localhost:5001/api/v1/places_search/',
        type: 'POST',
        contentType: 'application/json',
        data: '{}', // Empty dictionary as requested
        success: function(data) {
            // Clear existing places if any
            $('.places').empty();

            // Loop through the response data
            data.forEach(place => {
                // Construct the article HTML, excluding the owner info
                const articleHtml = `
                    <article>
                        <div class="title_box">
                            <h2>${place.name}</h2>
                            <div class="price_by_night">$${place.price_by_night}</div>
                        </div>
                        <div class="information">
                            <div class="max_guest">${place.max_guest} Guest${place.max_guest!= 1? 's' : ''}</div>
                            <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms!= 1? 's' : ''}</div>
                            <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms!= 1? 's' : ''}</div>
                        </div>
                        <div class="description">
                            ${place.description}
                        </div>
                    </article>
                `;

                // Append the newly created article to the.places section
                $('.places').append(articleHtml);
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error("Error fetching places:", textStatus, errorThrown);
        }
    });
});