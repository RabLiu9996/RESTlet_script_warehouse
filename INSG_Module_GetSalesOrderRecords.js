/**
 * Copyright (c) 2018, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * @author pduong
 * @NApiVersion 2.0
 * @NModuleScope Public
 */

 /**
 * Story 2528. Get sales order records from NetSuite.
 *
 */

define(['N/search'],
function (search) {
    function execute(data) {

        var filters = [];
        filters[0] = search.createFilter({
            name: 'mainline',
            operator: search.Operator.IS,
            values: true
        });

        var columns = [];
        columns[0] = search.createColumn({
            name: 'internalid'
        });
        columns[1] = search.createColumn({
            name: 'tranid'
        });
        columns[2] = search.createColumn({
            name: 'cccustomercode'
        });
        columns[3] = search.createColumn({
            name: 'entityid', join: 'customer'
        });
        columns[4] = search.createColumn({
            name: 'entity'
        });
        columns[5] = search.createColumn({
            name: 'accountnumber', join: 'customer'
        });
        columns[6] = search.createColumn({
            name: 'entitynumber', join: 'customer'
        });

        var res = [];
        search.create({
            type: search.Type.SALES_ORDER,
            filters: filters,
            columns: columns
        }).run().each(function(record) {
            res.push({
                'so_header_id': record.getValue({
                    name: 'internalid'
                }),
                'so_number': record.getValue({
                    name: 'tranid'
                }),
                'customer_number': record.getValue({
                    name: 'accountnumber', join: 'customer'
                }),
                'customer': record.getValue({
                    name: 'entityid', join: 'customer'
                }),
                'sold_to_org_id': record.getValue({
                    name: 'entitynumber', join: 'customer'
                }), 
                'ship_to_customer_id': record.getValue({
                    name: 'entity'
                }),
                'bill_to_customer_id': record.getValue({
                    name: 'entity'
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