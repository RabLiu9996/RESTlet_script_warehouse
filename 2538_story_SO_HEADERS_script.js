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
function (search) {
    function GetSalesOrderDataFromNetSuite(data) {

        var columns = [];
        columns[0] = search.createColumn({
            name: 'internalid',
            label: 'so_header_id'
        });
        columns[1] = search.createColumn({
            name: 'tranid',
            label: 'so_number'
        });
        columns[2] = search.createColumn({
            name: 'purchaseorder',
            label: 'customer_po_number'
        });
        columns[3] = search.createColumn({
            name: 'trandate',
            label: 'ordered_date'
        });
        columns[4] = search.createColumn({
            name: 'cccustomercode',
            label: 'customer_number'
        });
        columns[5] = search.createColumn({
            name: 'entity',
            label: 'customer'
        });
        columns[6] = search.createColumn({
            name: 'shipcarrier',
            label: 'freight_carrier_code'
        });
        columns[7] = search.createColumn({
            name: 'datecreated',
            label: 'creation_date'
        });
        columns[8] = search.createColumn({
            name: 'lastmodifieddate',
            label: 'last_update_date'
        });

        var salesOrderSearch = search.create({
            type: search.Type.SALES_ORDER,
            columns: columns
        });
        
        var res = salesOrderSearch.run().getRange(1,100);
        
        return JSON.stringify(res);
    }

	function doGet(data){
        return GetSalesOrderDataFromNetSuite(data);
    }

    return {
        'get': doGet
    };
});