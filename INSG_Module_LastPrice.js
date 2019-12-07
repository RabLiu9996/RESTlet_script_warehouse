/**
 * Copyright (c) 2018, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * @author pduong
 * @NApiVersion 2.0
 * @NModuleScope Public
 */

  /**
 * Story 2687. Get unit sale price for given sales order number and line number.
 *
 */

define(['N/search'],
function (search) {
    function execute(data) {
        var tranid = data.salesOrderNumber;
        var lineNumber = data.lineNumber;
​
        if (!tranid || !lineNumber) {
            return {
                error: "Parameter salesOrderNumber and linenumber are required!"
            }
        }

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
                    name: 'rate'
                },
                {
                    name: 'line'
                }
            ]
        }).run().each(function(record){
            var recordLine = record.getValue({
                name: 'line'
            });
            if ( recordLine == lineNumber ) {
                res.push({
                    "Unit selling price": record.getValue({
                        name: 'rate'
                    })
                });
            }

            return true;
        });

        return res;
    }

    return {
        execute: execute
    };
});