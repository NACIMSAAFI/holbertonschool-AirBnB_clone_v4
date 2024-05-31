window.addEventListener('load', function() {
    $.ajax({
        url: 'http://localhost:5001/api/v1/status',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            if (data.status === 'OK') {
                $('#api_status').css({
                    'background-color': '#ff545f'
                });
            } else {
                $('#api_status').css({
                    'background-color': ''
                });
            }
        },
        error: function() {
            console.error("Failed to retrieve API status.");
        }
    });

    const amenityIds = {};
    $('input[type=checkbox]').click(function() {
        if ($(this).prop('checked')) {
            amenityIds[$(this).attr('data-id')] = $(this).attr('data-name');
        } else {
            delete amenityIds[$(this).attr('data-id')];
        }
        if (Object.keys(amenityIds).length === 0) {
            $('div.amenities h4').html('&nbsp;');
        } else {
            $('div.amenities h4').text(Object.values(amenityIds).join(', '));
        }
    });

    $('.filters button').click(function() {
        $.ajax({
            type: 'POST',
            url: 'http://localhost:5001/api/v1/places_search/',
            contentType: 'application/json',
            data: JSON.stringify({ amenities: Object.keys(amenityIds) }),
            success: function(data) {
                $('section.places').empty();
                $('section.places').append('<h1>Places</h1>');
                data.forEach(place => {
                    const template = `<article>
                        <div class="title">
                            <h2>${place.name}</h2>
                            <div class="price_by_night">
                                $${place.price_by_night}
                            </div>
                        </div>
                        <div class="information">
                            <div class="max_guest">
                                <i class="fa fa-users fa-3x" aria-hidden="true"></i>
                                <br />
                                ${place.max_guest} Guests
                            </div>
                            <div class="number_rooms">
                                <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
                                <br />
                                ${place.number_rooms} Bedrooms
                            </div>
                            <div class="number_bathrooms">
                                <i class="fa fa-bath fa-3x" aria-hidden="true"></i>
                                <br />
                                ${place.number_bathrooms} Bathrooms
                            </div>
                        </div>
                        <div class="description">
                            ${place.description}
                        </div>
                    </article>`;
                    $('section.places').append(template);
                });
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("Error fetching places:", textStatus, errorThrown);
            }
        });
    });
});