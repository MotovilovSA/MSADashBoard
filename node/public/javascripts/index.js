$(document).ready(function () {

    // getting data from google sheet
    $.ajax({
        url: "/allValues",
        type: "GET",
        contentType: "application/json"
    }).done(function (data) {
        let container = 'tableMainData'
        let table = new Table(data.values, container);
        table.render()
    });

    $("#appendForm").on('submit', function (event) {

        // Stop form from submitting normally
        event.preventDefault();

        // getting values from form
        let values = $('input, select', this)
            .not('.btn')
            .map(function(){
                let value;

                if(this.type == 'date'){
                    let tmpValue = this.value.split('-');
                    value = `${tmpValue[2]}.${tmpValue[1]}.${tmpValue[0]}` 
                } else 
                if (!isNaN(+this.value)) {
                    value = +this.value
                }
                else {
                    value = this.value
                }

                return value;
            })
            .toArray()
        ;

        $.ajax({
            type: "POST",
            url: "/appendString",
            data: JSON.stringify(values),
            datatType: "json",
            contentType: "application/json"
        }).done(function () {
          console.log('запрос ушел!')  
        });
    });
});