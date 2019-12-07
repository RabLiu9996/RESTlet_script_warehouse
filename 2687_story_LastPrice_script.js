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
        function GetLastUnitSellingPrice(data) {
            var tranid = data.orderNumber;
            if (!tranid) {
                return {
                    error: "orderNumber is required!"
                }
            }
            var aFilters = [];
            aFilters.push(
                search.createFilter({
                    name: 'tranid',
                    operator: search.Operator.IS,
                    values: tranid
                })
            );

            var res = search.create({
                type: search.Type.SALES_ORDER,
                filters: aFilters,
                columns: [{
                    name: 'rate'
                }]
            }).run().each(function(record) {
                res.push({
                    "Unit Price": record.getText({
                        name: 'rate'
                    })
                });
            });

            return JSON.stringify(res);

        }

        function doGet(data) {
            return GetLastUnitSellingPrice(data);
        }

        return {
            'get': doGet
        };

    });