/**
 * Copyright (c) 2018, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * @author pduong
 * @NApiVersion 2.0
 * @NModuleScope Public
 */

  /**
 * Story 2819. Get sales order info for given sales order number and line number.
 *
 */

define(['N/search'],
function (search) {
    function execute(data) {
        var tranid = data.salesOrderNumber;
        var lineNumber = data.lineNumber;

        if (!tranid || !lineNumber) {
            return {
                error: "Parameter salesOrderNumber and linenumber are required!"
            }
        }

        const COLUMNS_MAP = {
            order_number: {
                label: "Order number", 
                searchColumn: {
                    name: 'tranid'
                }
            },
            line_number: {
                label: "Line number", 
                searchColumn: {
                    name: 'line'
                }
            },
            cust_po_number: {
                label: "Customer purchase order number", 
                searchColumn: {
                    name: 'otherrefnum'
                }
            },
            customer_name: {
                label: "Customer name", 
                searchColumn: {
                    name: 'entityid',
                    join: 'customer'
                }
            }, 
            novatel_sku: {
                label: "SKU", 
                searchColumn: {
                    name: 'inventorynumber',
                    join: 'itemnumber'
                }
            },
            ordered_item: {
                label: "Ordered item",
                searchColumn: {
                    name: 'item'
                }
            },
            product: {
                label: "Product", 
                searchColumn: "???"
            },
            schedule_ship_date: {
                label: "Schedule ship date",
                searchColumn: {
                    name: 'shipdate'
                }
            },
            ordered_quantity: {
                label: "Ordered quantity",
                searchColumn: {
                    name: 'quantity'
                }
            }, 
            hold_status: {
                label: "Hold status",
                searchColumn: {
                    name: 'approvalstatus'
                }
            }, 
            header_hold: {
                label: "Header hold", 
                searchColumn: "???"
            }, 
            line_hold: {
                label: "Line hold", 
                searchColumn: "???"
            }, 
            flow_status_code: {
                label: "Flow status code", 
                searchColumn: "???"
            }
        };

        var filters = [];
        filters.push(
            search.createFilter({
                name: 'tranid',
                operator: search.Operator.IS,
                values: tranid
            })
        );
        
        var columns = [];
        for(var i in COLUMNS_MAP) {
            if (COLUMNS_MAP[i].searchColumn != "???")
                columns.push(COLUMNS_MAP[i].searchColumn);
        }

        var res = [];
        var resSet = search.create({
            type: 'transaction',
            filters: filters,
            columns: columns
        }).run().getRange(0,100);

        for (var i in resSet) {
            var recordLine = resSet[i].getValue({
                name: 'line'
            });
            if (recordLine == lineNumber) {
                res.push({
                    "Customer purchase order number": resSet[i].getValue({
                        name: 'otherrefnum'
                    }),
                    "Customer name": resSet[i].getValue({
                        name: 'entityid', 
                        join: 'customer'
                    }),
                    "SKU": resSet[i].getValue({
                        name: 'inventorynumber',
                        join: 'itemnumber'
                    }),
                    "Ordered item": resSet[i].getValue({
                        name: 'item'
                    }),
                    "Product": "---TBD---",
                    "Schedule ship date": resSet[i].getValue({
                        name: 'shipdate'
                    }),
                    "Ordered quantity": resSet[i].getValue({
                        name: 'quantity'
                    }),
                    "Hold status": "---TBD---",
                    "Header hold": "---TBD---",
                    "Line hold": "---TBD---",
                    "Flow status code": "---TBD---"
                });
            }
        };

        return res;
    }

    return {
        execute: execute
    };
});