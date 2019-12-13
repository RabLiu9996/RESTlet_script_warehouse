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
        function getNadrNoShipDate(data) {

            var filters = [];
            filters.push(
                search.createFilter({
                    name: 'transactionlinetype', //order_type
                    operator: search.Operator.NONEOF,
                    values: ['Return', 'Enfora Return', 'Credit Memo', 'Enfora Service Domestic']
                })
            );

            var res = [];

            var temp = search.create({
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
                    },
                    {
                        name: 'rate'
                    },
                    {
                        name: 'quantityshiprecv'
                    },
                    {
                        name: 'actualshipdate'
                    }

                ]
            }).run().getRange(0, 100);

            for (var i = 0; i < temp.length; i++) {

                var flowStatus = temp[i].getValue({
                    name: 'status'
                });
                var organizationId = temp[i].getValue({
                    name: 'partner'
                });

                var quantityFilled = temp[i].getValue({
                    name: 'quantityshiprecv'
                });

                var clarifyLineStatus = temp[i].getValue({
                    name: 'shiprecvstatusline'
                });
                var scheduleShipDate = temp[i].getValue({
                    name: 'actualshipdate'
                });

                if (flowStatus != "AWAITING_RETUR" &&
                    (organizationId == 101 || organizationId == 174) &&
                    quantityFilled == "NULL" &&
                    clarifyLineStatus == "APPROVED" &&
                    scheduleShipDate == "NULL") {
                    res.push({
                        "Order Number": temp[i].getValue({
                            name: 'tranid'
                        })
                    }, {
                        "Line Number": temp[i].getValue({
                            name: 'line'
                        })
                    }, {
                        "Address1": temp[i].getValue({
                            name: 'shipaddress1'
                        })
                    }, {
                        "Address2": temp[i].getValue({
                            name: 'shipaddress2'
                        })
                    }, {
                        "Address3": temp[i].getValue({
                            name: 'shipaddress3'
                        })
                    }, {
                        "Address4": temp[i].getValue({
                            name: 'shipaddress'
                        })
                    }, {
                        "PO Number": temp[i].getValue({
                            name: 'otherrefnum'
                        })
                    }, {
                        "Item": temp[i].getValue({
                            name: 'item'
                        })
                    }, {
                        "Quantity": temp[i].getValue({
                            name: 'quantity'
                        })
                    }, {
                        "Hold status": temp[i].getValue({
                            name: 'approvalstatus'
                        })
                    }, {
                        "Ship to city": temp[i].getValue({
                            name: 'shipcity'
                        })
                    }, {
                        "Ship to state": temp[i].getValue({
                            name: 'shipstate'
                        })
                    }, {
                        "Ship to Zip": temp[i].getValue({
                            name: 'shipzip'
                        })
                    }, {
                        "Sales report": temp[i].getValue({
                            name: 'salesrep'
                        })
                    }, {
                        "Order Type": temp[i].getValue({
                            name: 'type'
                        })
                    }, {
                        "Ship Method": temp[i].getValue({
                            name: 'shipcarrier'
                        })
                    }, {
                        "Ship Contact": temp[i].getText({
                            name: 'shipphone'
                        })

                    }, {
                        "Freight Terms": temp[i].getText({
                            name: 'terms'
                        })
                    }, {
                        "Ship date": temp[i].getValue({
                            name: 'shipdate'
                        })
                    }, {
                        "Start date": temp[i].getValue({
                            name: 'startdate'
                        })
                    }, {
                        "Ship method": temp[i].getText({
                            name: 'shipmethod'
                        })
                    }, {
                        "Created By": temp[i].getText({
                            name: 'createdby'
                        })
                    }, {
                        "Cust type": temp[i].getText({
                            name: 'custtype'
                        })
                    }, {
                        "Unit selling price": temp[i].getText({
                            name: 'rate'
                        })
                    }, {
                        "Quantit_filled": temp[i].getText({
                            name: 'quantityshiprecv'
                        })
                    }, {
                        "Clarify line status": temp[i].getText({
                            name: 'shiprecvstatusline'
                        })
                    }, {
                        "Schedule ship date": temp[i].getText({
                            name: 'actualshipdate'
                        })
                    });
                }
            }
            return JSON.stringify(res);

        }

        function doGet(data) {
            return getNadrNoShipDate(data);
        }

        return {
            'get': doGet
        };
    });