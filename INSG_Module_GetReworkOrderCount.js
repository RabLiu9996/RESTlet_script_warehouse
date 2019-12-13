/**
 * Copyright (c) 2018, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * @author pduong
 * @NApiVersion 2.0
 * @NModuleScope Public
 */

  /**
 * Story 2917. Get number of sales order for given sales order number and line number.
 *
 */

define(['N/search'],
function (search) {
    function execute(data) {
        var poNumber = data.poNumber;
        var lineNumber = data.lineNumber;
​
        if (!poNumber || !lineNumber) {
            return {
                error: "Parameter poNumber and linenumber are required!"
            }
        }

        var filters = [];
        filters.push(
            search.createFilter({
                name: 'otherrefnum',
                operator: search.Operator.IS,
                values: poNumber
            })
        );

        var res = [];
        search.create({
            type: search.Type.TRANSACTION,
            //filters: filters,
            columns: [
                {
                    name: 'otherrefnum',
                },
                {
                    name: 'line'
                },
                {
                    name: 'transactionlinetype'
                }
            ]
        }).run().each(function(record) {
            var recordLine = record.getValue({
                name: 'line'
            });
            var lineType = record.getValue({
                name: 'transactionlinetype'
            });
            var recordPONumber = record.getValue({
                name: 'otherrefnum'
            });
            if (recordLine == lineNumber && recordPONumber == poNumber && lineType == "REWORK") {
                res.push({
                    "ponumber": recordPONumber,
                    "line": recordLine,
                    "type": lineType
                });
            }
            return true;
        })

        return res.length;

    }

    return {
        execute: execute
    };
});