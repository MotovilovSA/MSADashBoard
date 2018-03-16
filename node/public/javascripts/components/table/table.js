(function(){
	'use strict';

	class Table{
            constructor(data, container){
            this.data = data;
            this.container = container;
            }

            _dataTransformer(data, slice){

                  for(let i = 0; i < data.length; i++){
                        data[i].unshift(i + 1);
                        data[i].push('editButton');
                        data[i].push('saveButton');
                  }

                  let dataSliced = data.slice(slice);

                  return dataSliced;

            }

            _removeEditable(elem){

                  $('td', $(elem).parent().parent())
                        .not($('td', $(elem).parent()))
                        .css('background-color', 'white')
                        .attr('contentEditable', false)
                  ;

            }

            _editClickHandler(elem){
                  this._removeEditable(elem);

                  $('td', $(elem).parent())
                        .css('background-color', '#F2F4F4')
                        .attr('contentEditable', true);
            }

            _saveClickHandler(elem){

                  let _this = this;

                  _this._removeEditable(elem);

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
                        let row = $(elem).parent();
                        _this._updateRowAnimation($('td', row));
                  });
            }

            _updateRowAnimation(row){
                  row.not('.btn')
                  .css('background-color', "#007bff")   
                  .animate({
                        backgroundColor: "white"
                  }, 1200)
            }

            addRow(addedValues){

                  let _this = this;
                  
                  $('tr:first', `#${this.container}`).remove();

                  //preparing data for inserting 
                  let data = this._dataTransformer(addedValues, 0);
 
                  // changing rowNo on actual
                  let nextRowNum = +$('tr:last td:first' , `#${this.container}`).html() + 1;
                  data[0].shift();
                  data[0].unshift(nextRowNum);

                  // generating html for new row
                  let cells = data[0].map(function (d, i) {

                        let innerHTML;

                        if (i == 0) {
                              innerHTML = `<td class="rowNo">${d}</td>`;
                        } else if (d == 'editButton') {
                              innerHTML = '<td class="btn"><img src="/images/editButton.png" alt="editButton"></td>';
                        } else if (d == 'saveButton') {
                              innerHTML = '<td class="btn"><img src="/images/saveButton.png" alt="saveButton"></td>';
                        } else {
                              innerHTML = `<td>${d}</td>`;
                        }

                        return innerHTML;
                  })
                  
                  let cellsHTML = `<tr>${cells.join('')}</tr>`;

                  // inserting new row to a table
                  $(`#${this.container} tr:last`).after(cellsHTML);

                  // adding event listeners for new row
                  let row = $(`#${this.container} tr:last td`);
                  row.on('click', function (d) {

                        let altAttrValue = $('img', this).attr("alt");

                        if (altAttrValue == 'editButton') {
                              return _this._editClickHandler(this);
                        } else if (altAttrValue == 'saveButton') {
                              return _this._saveClickHandler(this);
                        }
                        else {
                              return _this._removeEditable(this);
                        }
                  });

                  this._updateRowAnimation(row);
            }

            render () {
                  let _this = this;
                  let data = this._dataTransformer(this.data, -10);
                  // let data = this._dataTransformer(this.data, -100);

                  let body = d3.select(`#${this.container}`);

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
                                    innerHTML = '<img src="/images/editButton.png" alt="editButton">';
                              } else if (d == 'saveButton'){
                                    innerHTML = '<img src="/images/saveButton.png" alt="saveButton">';
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
                              else {
                                    return _this._removeEditable(this);
                              }
                        })
                  ;
            }
	}

	//export
	window.Table = Table;
})();