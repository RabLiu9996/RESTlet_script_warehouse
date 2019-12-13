/**
 * Copyright (c) 2018, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * @author pduong
 * @NApiVersion 2.0
 * @NModuleScope Public
 */

/**
 * Story 2882. Get customer company name and warranty term for a given sales order numbers.
 *
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
            type: 'salesorder',
            filters: filters,
            columns: [
                {
                    name: 'entityid',
                    join: 'customer'
                }
            ],
        }).run().each(function(record){
            res.push({
                "Party Name": record.getValue({
                    name: 'entityid', join: 'customer'
                }),
                "Attribute1": "???"
            });
            return true;
        });

        return res;
    }

    return {
        execute: execute
    };
});