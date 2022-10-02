$(document).ready(function(){
    $('button').click(function(){
    const name = $('#nameid').val();
    $('.imgchange').attr('src',`https://joeschmoe.io/api/v1/${name}`);
    const b = $('.imgchange');
    console.log(b);

});
   });