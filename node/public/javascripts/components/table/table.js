(function(){
	'use strict';

	class Table{
            constructor(data, container){
            this.data = data;
            this.container = container;
            }

            _dataTransformer(data){

                  for(let i = 0; i < data.length; i++){
                        data[i].unshift(i + 1);
                        data[i].push('editButton');
                        data[i].push('saveButton');
                  }

                  let dataSliced = data.slice(-10);

                  return dataSliced;

            }

            _removeEditable(elem){

                  $('td', $(elem).parent().parent())
                        .css('background-color', 'white')
                        .attr('contentEditable', false)
                  ;

            }

            _editClickHandler(elem){
                  this._removeEditable(elem);

                  // $(elem).parent()
                  //       .addClass("form-row")
                  //       // .css('display', 'inline')

                  $('td', $(elem).parent())
                        .css('background-color', '#F2F4F4')
                        .attr('contentEditable', true);
            }

            _saveClickHandler(elem){
                  this._removeEditable(elem);

                  let data = {};

                  data.rowNo = $('.rowNo', $(elem).parent()).html()

                  data.values = $('td', $(elem).parent())
                        .not('.btn, .rowNo')
                        .map(function () {
                              let value;

                              if (!isNaN(+$(this).html())) {
                                    value = +$(this).html()
                                    }
                              else {
                                    value = $(this).html()
                              }

                              return value;
                        })
                        .toArray()
                  ;

                  $.ajax({
                        type: "POST",
                        url: "/updateString",
                        data: JSON.stringify(data),
                        datatType: "json",
                        contentType: "application/json"
                  }).done(function () {
                        console.log('запрос ушел!')
                  });
            }

            render () {

                  let _this = this;
                  let data = this._dataTransformer(this.data);



                  let body = d3.select('#tableMainData');

                  let table = body
                        .append('table')
                        .classed('table', true)
                        .append('tbody')
                  ;

                  let rows = table.selectAll('tr')
                        .data(data)
                        .enter()
                        .append('tr')
                  ;

                  rows.selectAll('td')
                        .data(function (row) {
                              return row;
                        })
                        .enter()
                        .append('td')
                        .attr('class', function(d, i){
                              let className;
                              
                              if (i == 0){
                                    className = 'rowNo';
                              } 

                              if (d == 'editButton' || d == 'saveButton'){
                                    className = 'btn';
                              }

                              return className;
                        })
                        .html(function (d) { 
                              let innerHTML;

                              if(d == 'editButton'){
                                    innerHTML = '<img src="/images/editButton.png">';
                              } else if (d == 'saveButton'){
                                    innerHTML = '<img src="/images/saveButton.png">';
                              } else {
                                    innerHTML = d;
                              }

                              return innerHTML;
                        })
                        .on('click', function (d) {
                              if (d == 'editButton') {
                                    return _this._editClickHandler(this);
                              } else if (d == 'saveButton') {
                                    return _this._saveClickHandler(this);
                              }
                        })
                  ;
            }
	}

	//export
	window.Table = Table;
})();