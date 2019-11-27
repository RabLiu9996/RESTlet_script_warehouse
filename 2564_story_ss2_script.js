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
    function createSearch(data) {
        var recordType = data[0].recordType.toUpperCase();
        var tranid = data[1].tranid;

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

        // for ( i = 1; i < tranid.length; i++ ) {
            
        //     filters.push(
        //         search.createFilter({
        //             name: 'tranid',
        //             operator: search.Operator.IS,
        //             values: tranid[i]
        //         })
        //     );

            var salesOrderSearch = search.create({
                type: search.Type[recordType],
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
        return createSearch(data);
    }

    return {
        'post': doPost
    };
});