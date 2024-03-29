/**
 * Copyright (c) 2018, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * @author pduong
 * @NApiVersion 2.0
 * @NModuleScope Public
 */

/**
 * Story 2854. Get customer company name for a given account numbers.
 *
 */

define(['N/search'],
function (search) {
    function execute(data) {
        var accountNumber = data.accountNumber;

        if (!accountNumber) {
            return {
                error: "Parameter accountNumber is required!"
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
                 name: 'accountnumber',
                 operator: search.Operator.IS,
                 values: accountNumber
             })
        );

        var res = [];
        search.create({
            type: search.Type.CUSTOMER,
            filters: filters,
            columns: [
                {
                    name: 'entityid'
                }
            ],
          	filters: filters
        }).run().each(function(record) {
            res.push({
                "Customer Name": record.getValue({
                    name: 'entityid'
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