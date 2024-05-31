$(document).ready(function() {
    var selectedAmenities = [];
    function updateSelectedAmenities() {
        $('.amenities h4').text(selectedAmenities.join(', '));
    }
    $('input[type="checkbox"]').change(function() {
        var amenityId = $(this).parent().data('id');
        var amenityName = $(this).parent().data('name');

        if ($(this).is(':checked')) {
            selectedAmenities.push(amenityName);
        } else {
            var index = selectedAmenities.indexOf(amenityName);
            if (index !== -1) {
                selectedAmenities.splice(index, 1);
            }
        }

        updateSelectedAmenities();
    });
});