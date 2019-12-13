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

    function(search) {

        function GetReworkOrderCount(parameters) {

            if (!parameters.poNumber || !parameters.poLineNumber) {
                return {
                    error: "poNumber and poLineNumber are required."
                }
            }

            var aFilters = [
                ['mainline', search.Operator.IS, true], 'AND', ['otherrefnum', search.Operator.IS, parameters.poNumber], 'AND', ['line', search.Operator.IS, parameters.poLineNumber], 'AND', ['transactionlinetype', search.Operator.IS, 'Rework']
            ];


            var oSearch = search.create({
                type: 'transaction',
                filters: aFilters,
                columns: [{
                    name: 'transactionlinetype',
                    summary: search.Summary.COUNT
                }]
            });
            var count = 0;
            oSearch.run().each(function(record) {
                var recordLine = record.getValue({
                    name: 'line'
                });
                if (recordLine == parameters.poLineNumber) {
                    count = parseInt(record.getValue({
                        name: 'transactionlinetype',
                        summary: search.Summary.COUNT
                    }));
                }


                return true;
            })

            return JSON.stringify(count);
        }

        function doGet(parameters) {
            return GetReworkOrderCount(parameters);
        }

        return {
            'get': doGet
        };
    });