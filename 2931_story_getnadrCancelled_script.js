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
        function getNadrCancelled(data) {

            var filters = [];
            filters.push(
                search.createFilter({
                    name: 'transactionlinetype', //order_type
                    operator: search.Operator.ANYOF,
                    values: ['Return', 'Enfora Return', 'Credit Memo', 'Enfora Service Domestic']
                })
            );

            var res = [];

            search.create({
                type: 'transaction',
                filters: filters,
                columns: [{
                        name: 'tranid'
                    },
                    {
                        name: 'line'
                    },
                    {
                        name: 'shipaddress1'
                    },
                    {
                        name: 'shipaddress2'
                    },
                    {
                        name: 'shipaddress3'
                    },
                    {
                        name: 'shipaddress'
                    },
                    {
                        name: 'otherrefnum'
                    },
                    {
                        name: 'item'
                    },
                    {
                        name: 'quantity'
                    },
                    {
                        name: 'approvalstatus'
                    },
                    {
                        name: 'shipcity'
                    },
                    {
                        name: 'shipstate'
                    },
                    {
                        name: 'shipzip'
                    },
                    {
                        name: 'salesrep'
                    },
                    {
                        name: 'type'
                    },
                    {
                        name: "shipcarrier"
                    },
                    {
                        name: 'shipphone'
                    },
                    {
                        name: 'terms'
                    },
                    {
                        name: 'shipdate'
                    },
                    {
                        name: 'startdate'
                    },
                    {
                        name: 'shipmethod'
                    }, {
                        name: 'createdby'
                    },
                    {
                        name: 'custtype'
                    },
                    {
                        name: 'creditamount'
                    },
                    {
                        name: 'partner'
                    },
                    {
                        name: 'status'
                    }

                ]
            }).run().each(function(record) {
                var requestDate = record.getValue({
                    name: 'shipdate'
                });
                var flowStatus = record.getValue({
                    name: 'status'
                });
                var organizationId = record.getValue({
                    name: 'partner'
                });
                if (requestDate != "NULL" && flowStatus == "CANCELED" && (organizationId == 101 || organizationId == 174)) {
                    res.push({
                        "Order Number": record.getValue({
                            name: 'tranid'
                        })
                    }, {
                        "Line Number": record.getValue({
                            name: 'line'
                        })
                    }, {
                        "Address1": record.getValue({
                            name: 'shipaddress1'
                        })
                    }, {
                        "Address2": record.getValue({
                            name: 'shipaddress2'
                        })
                    }, {
                        "Address3": record.getValue({
                            name: 'shipaddress3'
                        })
                    }, {
                        "Address4": record.getValue({
                            name: 'shipaddress'
                        })
                    }, {
                        "PO Number": record.getValue({
                            name: 'otherrefnum'
                        })
                    }, {
                        "Item": record.getValue({
                            name: 'item'
                        })
                    }, {
                        "Quantity": record.getValue({
                            name: 'quantity'
                        })
                    }, {
                        "Hold status": record.getValue({
                            name: 'approvalstatus'
                        })
                    }, {
                        "Ship to city": record.getValue({
                            name: 'shipcity'
                        })
                    }, {
                        "Ship to state": record.getValue({
                            name: 'shipstate'
                        })
                    }, {
                        "Ship to Zip": record.getValue({
                            name: 'shipzip'
                        })
                    }, {
                        "Sales report": record.getValue({
                            name: 'salesrep'
                        })
                    }, {
                        "Order Type": record.getValue({
                            name: 'type'
                        })
                    }, {
                        "Ship Method": record.getValue({
                            name: 'shipcarrier'
                        })
                    }, {
                        "Ship Contact": record.getText({
                            name: 'shipphone'
                        })

                    }, {
                        "Freight Terms": record.getText({
                            name: 'terms'
                        })
                    }, {
                        "Ship date": record.getValue({
                            name: 'shipdate'
                        })
                    }, {
                        "Start date": record.getValue({
                            name: 'startdate'
                        })
                    }, {
                        "Ship method": record.getText({
                            name: 'shipmethod'
                        })
                    }, {
                        "Created By": record.getText({
                            name: 'createdby'
                        })
                    }, {
                        "Cust type": record.getText({
                            name: 'custtype'
                        })
                    });
                }
                return true;
            });
            return JSON.stringify(res);

            //return res;

        }

        function doGet(data) {
            return getNadrCancelled(data);
        }

        return {
            'get': doGet
        };
    });