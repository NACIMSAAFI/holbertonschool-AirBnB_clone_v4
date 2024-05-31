$(document).ready(function () {
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
    
    
});