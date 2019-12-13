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

        if (!tranid) {
            return {
                error: "Parameter salesOrderNumber is required!"
            }
        }

        var filters = [];
        filters.push(
            search.createFilter({
                name: 'mainline',
                operator: search.Operator.IS,
                values: true
            })
        );
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
                    name: 'accountnumber',
                    join: 'customer'
                }
            ],
        }).run().each(function(record){
            res.push({
                "Customer Number": record.getValue({
                    name: 'accountnumber',
                    join: 'customer'
                })
            });

            return true;
        });

        return res;
    }

    return {
        execute: execute
    };
});