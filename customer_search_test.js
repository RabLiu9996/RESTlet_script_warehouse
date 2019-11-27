/**
 * Copyright (c) 2018, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * @author pduong
 * @NApiVersion 2.x
 * @NScriptType Restlet
 * @NModuleScope Public
 */

define(['N/record','N/search'],
function (record,search) {
    function createSearch(data) {
      var recordType = data['recordType'].toUpperCase();
      var results = [];
        var mySalesOrderSearch = search.create({
            type: search.Type[recordType]
        });
        mySalesOrderSearch.run().each(function(item) {
        	results.push(item);
       	});
        var recordObj = record.load({type: record.Type[recordType], id: results[0].id, isDynamic: true});
        return recordObj;
        //return JSON.stringify(recordObj);
    }
	function doGet(data){
      return createSearch(data);
    }
    return {
      'get': doGet
    };
});