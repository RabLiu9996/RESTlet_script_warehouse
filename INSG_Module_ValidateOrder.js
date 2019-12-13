/**
 * Copyright (c) 2018, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * @author pduong
 * @NApiVersion 2.0
 * @NModuleScope Public
 */

  /**
 * Story 2708. Get sales order info for given sales order number and line number.
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
            request_date: {
                label: "Request date", 
                searchColumn: {
                    name: "datecreated",
                }
            },
            promise_date: {
                label: "Promise date",
                searchColumn: {
                    name: 'trandate'
                }
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
            cust_po_approved: {
                label: "Customer purchase order approved", 
                searchColumn: "???"
            }, 
            ship_to_address1: {
                label: "Ship to address1", 
                searchColumn: {
                    name: 'shipaddress1'
                }
            },
            ship_to_address2: {
                label: "Ship to address2", 
                searchColumn: {
                    name: 'shipaddress2'
                }
            },
            ship_to_address3: {
                label: "Ship to address3", 
                searchColumn: {
                    name: 'shipaddress3'
                }
            }, 
            ship_to_address4: {
                label: "Ship to address4", 
                searchColumn: {
                    name: 'shipaddress'
                }
            }, 
            ship_to_city_state_zip_country: {
                label: "Ship to Zip", 
                searchColumn: {
                    name: 'shipzip'
                }
            },
            ship_to_city: {
                label: "Ship to city", 
                searchColumn: {
                    name: 'shipcity'
                }
            }, 
            ship_to_state: {
                label: "Ship to state", 
                searchColumn: {
                    name: 'shipstate'
                }
            }, 
            flow_status_code: {
                label: "Flow status code", 
                searchColumn: "???"
            }, 
            subinventory: {
                label: "Subinventory", 
                searchColumn: "???"
            }, 
            sales_rep: {
                label: "Sales representative", 
                searchColumn: {
                    name: 'salesrep'
                }
            }, 
            order_created_by: {
                label: "Order created by", 
                searchColumn:  {
                    name: 'createdby'
                }
            }, 
            order_type: {
                label: "Order type", 
                searchColumn: {
                    name: 'type'
                }
            }, 
            ship_contact: {
                label: "Ship contact",
                searchColumn: {
                    name: 'phone',
                    join: 'contactprimary'
                }
            },
            ship_method: {
                label: "Ship method", 
                searchColumn: {
                    name: 'shipcarrier'
                }
            },
            freight_terms: {
                label: "Freight terms",
                searchColumn: {
                    name: 'terms'
                }
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
                    "Order number": resSet[i].getValue({
                        name: 'tranid'
                    }),
                    "Line number": resSet[i].getValue({
                        name: 'line'
                    }),
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
                    "Request date": resSet[i].getValue({
                        name: "datecreated",
                    }),
                    "Promise date": resSet[i].getValue({
                        name: 'trandate'
                    }),
                    "Schedule ship date": resSet[i].getValue({
                        name: 'shipdate'
                    }),
                    "Ordered quantity": resSet[i].getValue({
                        name: 'quantity'
                    }),
                    "Hold status": "---TBD---",
                    "Header hold": "---TBD---",
                    "Line hold": "---TBD---",
                    "Customer purchase order approved": "---TBD---",
                    "Ship to address1": resSet[i].getValue({
                        name: 'shipaddress1'
                    }),
                    "Ship to address2": resSet[i].getValue({
                        name: 'shipaddress2'
                    }),
                    "Ship to address3": resSet[i].getValue({
                        name: 'shipaddress3'
                    }),
                    "Ship to address4": resSet[i].getValue({
                        name: 'shipaddress'
                    }),
                    "Ship to city": resSet[i].getValue({
                        name: 'shipcity'
                    }),
                    "Ship to state": resSet[i].getValue({
                        name: 'shipstate'
                    }),
                    "Ship to Zip": resSet[i].getValue({
                        name: 'shipzip'
                    }),
                    "Flow status code": "---TBD---",
                    "Subinventory": "---TBD---",
                    "Sales representative": resSet[i].getValue({
                        name: 'salesrep'
                    }),
                    "Order created by": resSet[i].getValue({
                        name: 'createdby'
                    }),
                    "Order type": resSet[i].getValue({
                        name: 'type'
                    }),
                    "Ship contact": resSet[i].getValue({
                        name: 'phone',
                        join: 'contactprimary'
                    }),
                    "Ship method": resSet[i].getValue({
                        name: 'shipcarrier'
                    }),
                    "Freight terms": resSet[i].getText({
                        name: 'terms'
                    })
                });
            }
        };

        return res;
    }

    return {
        execute: execute
    };
});