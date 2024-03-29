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
    function GetCustomerInfo(data) {
        var tranid = data.salesOrderNumber;

        var filters = [];
        filters.push(
             search.createFilter({
                 name: 'tranid',
                 operator: search.Operator.IS,
                 values: tranid
             })
        );

        var res = [];
        search.create({
            type: search.Type.SALES_ORDER,
            filters: filters,
            columns: [
                {
                    name: 'entity'
                }
            ],
        }).run().each(function(record){
            res.push({
                "Party Name": record.getText({
                    name: 'entity'
                }),
                "Attribute1": "???"
            });
        });

        return res;
    }

	function doGet(data){
        return GetCustomerInfo(data);
    }

    return {
        'get': doGet
    };
});