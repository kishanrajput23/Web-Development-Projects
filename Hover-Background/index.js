for (var i = 12; i>=0; i--) {
    var row = $('#icons').clone()
    row.attr("id", "icon"+i);
    $('#icons').after(row);
}