/**
 * Copyright (c) 2018, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * @author pduong
 * @NApiVersion 2.0
 * @NModuleScope Public
 */

/**
 * Story 2861. Get customer ID for a given sales order numbers.
 */

define(['N/search'],
function (search) {
    function execute(data) {
        var tranid = data.salesOrderNumber;

        var filters = [];
        filters.push(
             search.createFilter({
                 name: 'tranid',
                 operator: search.Operator.IS,
                 values: tranid
             })
        );

        var res;
        search.create({
            type: search.Type.SALES_ORDER,
            filters: filters,
            columns: [
                {
                    name: 'cccustomercode'
                }
            ],
        }).run().each(function(record){
            res = {
                "Customer Number": record.getValue({
                    name: 'cccustomercode'
                })
            }
        });

        return res;
    }

    return {
        execute: execute
    };
});