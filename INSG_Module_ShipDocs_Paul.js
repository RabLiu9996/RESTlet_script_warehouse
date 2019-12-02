/**
 * Copyright (c) 2018, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * @author pduong
 * @NApiVersion 2.0
 * @NModuleScope Public
 */

 /**
  * Story 2564. Get currency name for an given array of sales order number.
  */

define(['N/search'],
function (search) {
  function execute(data) {

    if(!data.sSONumber || data.sSONumber.length === 0) {
      return {
          error:"sSONumber parameter is required and can't be empty."
      }
    }

    var columns = [];
    columns[0] = search.createColumn({
        name: 'currency',
    });

    var filters = [];
    filters.push(
        search.createFilter({
            name: 'tranid',
            operator: search.Operator.ANYOF,
            values: data.sSONumber
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

    var res = { "Currency code": res };

    return res;
  }

  return {
    execute: execute
  }
});