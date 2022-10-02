$('#submit').click(getImage);

function getImage(){
    var date = $('#date').val();

    $('#lower img').remove();
    $.ajax({
        url : 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos',
        method : 'GET',
        success : function(response){
            if(response.photos.length !== 0){
                $.each(response.photos, function(index, value){
                    var imageUrl = value.img_src;
                    $('#lower').append('<img src = "'+imageUrl+'" width="500px" height="500px">');
                });
            
            }
            else {
                alert("image of this day is not available, please enter valid date.")
            }
            
        },
        data : {
            earth_date : date,
            api_key : 'DEMO_KEY'
        }


        
    });
}