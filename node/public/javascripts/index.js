$(document).ready(function () {

    let table;

    // getting data from google sheet
    getRows(1, 10000, function (data) {
        let container = 'tableMainData'
        table = new Table(data.values, container)
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
        }).done(function (addedValues) {

            table.addRow(addedValues);
            
        });
    });
});


function getRows(rowFrom, rowTo, callback) {

    // getting data from google sheet
    $.ajax({
        url: `/allValues/?rowFrom=${rowFrom}&rowTo=${rowTo}`,
        type: "GET",
        datatType: "json",
        contentType: "application/json"
    }).done(function (data) {
        callback(data);
    });

}
