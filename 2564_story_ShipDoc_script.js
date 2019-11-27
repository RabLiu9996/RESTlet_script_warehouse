/**
 * Copyright (c) 2018, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * @author pduong
 * @NApiVersion 2.0
 * @NScriptType Restlet
 * @NModuleScope Public
 */

define(['N/search'],
function (search) {
  function GetShipDocsForOrderNumbers(data) {
        var tranid = data.sSONumber.split(',');

        var columns = [];
        columns[0] = search.createColumn({
            name: 'currency'
        });

        var filters = [];
        filters.push(
            search.createFilter({
                name: 'tranid',
                operator: search.Operator.ANYOF,
                values: tranid
            })
        );

        var salesOrderSearch = search.create({
          type: search.Type.SALES_ORDER,
          filters: filters,
          columns: columns
        });

        var res = '';
        salesOrderSearch.run().each(function(record) {
          var currencyName = record.getText({
            name: 'currency'
          });
          if (currencyName > res) {
            res = currencyName;
          }
        });

        return res;
    }
    function GetShipDocsForOrderNumbersWithPOST(data) {
        var tranid = data[0].sSONumber;

        var columns = [];
        columns[0] = search.createColumn({
            name: 'currency'
        });

        var filters = [];
        filters.push(
            search.createFilter({
                name: 'tranid',
                operator: search.Operator.ANYOF,
                values: tranid
            })
        );

        var salesOrderSearch = search.create({
          type: search.Type.SALES_ORDER,
          filters: filters,
          columns: columns
        });

        var res = '';
        salesOrderSearch.run().each(function(record) {
          var currencyName = record.getText({
            name: 'currency'
          });
          if (currencyName > res) {
            res = currencyName;
          }
        });

        return res;
    }

    function doPost(data){
        return GetShipDocsForOrderNumbersWithPOST(data);
    }
  
  function doGet(data){
        return GetShipDocsForOrderNumbers(data);
    }

    return {
      	'get': doGet,
        'post': doPost
    };
});