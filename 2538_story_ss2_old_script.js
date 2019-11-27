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
    function createSearch(data) {

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
            label: 'expandable_order_???'
        });
        columns[5] = search.createColumn({
            name: 'cccustomercode',
            label: 'customer_number'
        });
        columns[6] = search.createColumn({
            name: 'entity',
            label: 'customer'
        });
        columns[7] = search.createColumn({
            name: 'cccustomercode',
            label: 'ship_to_location_???'
        });
        columns[8] = search.createColumn({
            name: 'cccustomercode',
            label: 'bill_to_location_???'
        });
        columns[9] = search.createColumn({
            name: 'cccustomercode',
            label: 'ship_from_org_???'
        });
        columns[10] = search.createColumn({
            name: 'cccustomercode',
            label: 'freight_term_code_???'
        });
        columns[11] = search.createColumn({
            name: 'cccustomercode',
            label: 'org_id_???'
        });
        columns[12] = search.createColumn({
            name: 'cccustomercode',
            label: 'sold_from_org_id_???'
        });
        columns[13] = search.createColumn({
            name: 'cccustomercode',
            label: 'sold_to_org_id_???'
        });
        columns[14] = search.createColumn({
            name: 'cccustomercode',
            label: 'ship_from_org_id_???'
        });
        columns[15] = search.createColumn({
            name: 'cccustomercode',
            label: 'ship_to_org_id_???'
        });
        columns[16] = search.createColumn({
            name: 'cccustomercode',
            label: 'ship_to_customr_id'
        });
        columns[17] = search.createColumn({
            name: 'cccustomercode',
            label: 'bill_to_customer_id'
        });
        columns[18] = search.createColumn({
            name: 'cccustomercode',
            label: 'booked_date'
        });
        columns[19] = search.createColumn({
            name: 'cccustomercode',
            label: 'request_date_???'
        });
        columns[20] = search.createColumn({
            name: 'cccustomercode',
            label: 'pricing_date_???'
        });
        columns[21] = search.createColumn({
            name: 'shipcarrier',
            label: 'freight_carrier_code'
        });
        columns[22] = search.createColumn({
            name: 'datecreated',
            label: 'creation_date'
        });
        columns[23] = search.createColumn({
            name: 'cccustomercode',
            label: 'created_by'
        });
        columns[24] = search.createColumn({
            name: 'lastmodifieddate',
            label: 'last_update_date'
        });
        columns[25] = search.createColumn({
            name: 'cccustomercode',
            label: 'last_update_by_???'
        });

        var salesOrderSearch = search.create({
            type: search.Type.SALES_ORDER,
            //columns: columns
            columns: [
                {
                    name: 'internalid',
                    label: 'so_header_id'
                },
                {
                    name: 'tranid',
                    label: 'so_number'
                },
                {
                    name: 'purchaseorder',
                    label: 'customer_po_number'
                },
                {
                    name: 'trandate',
                    label: 'ordered_date'
                },
                {
                    name: 'cccustomercode',
                    label: 'expandable_order_???'
                },
                {
                    name: 'cccustomercode',
                    label: 'customer_number'
                },
                {
                    name: 'entity',
                    label: 'customer'
                },
                {
                    name: 'cccustomercode',
                    label: 'ship_to_location'
                },
                {
                    name: 'cccustomercode',
                    label: 'bill_to_location_???'
                },
                {
                    name: 'cccustomercode',
                    label: 'ship_from_org_???'
                },
                {
                    name: 'cccustomercode',
                    label: 'freight_term_code_???'
                },
                {
                    name: 'cccustomercode',
                    label: 'org_id_???'
                },
                {
                    name: 'cccustomercode',
                    label: 'sold_from_org_id_???'
                },
                {
                    name: 'cccustomercode',
                    label: 'sold_to_org_id_???'
                },
                {
                    name: 'cccustomercode',
                    label: 'ship_from_org_id_???'
                },
                {
                    name: 'cccustomercode',
                    label: 'ship_to_org_id_???'
                },
                {
                    name: 'cccustomercode',
                    label: 'ship_to_customr_id'
                },
                {
                    name: 'cccustomercode',
                    label: 'bill_to_customer_id'
                },
                {
                    name: 'cccustomercode',
                    label: 'booked_date'
                },
                {
                    name: 'cccustomercode',
                    label: 'request_date_???'
                },
                {
                    name: 'cccustomercode',
                    label: 'pricing_date_???'
                },
                {
                    name: 'shipcarrier',
                    label: 'freight_carrier_code'
                },
                {
                    name: 'datecreated',
                    label: 'creation_date'
                },
                {
                    name: 'cccustomercode',
                    label: 'created_by'
                },
                {
                    name: 'lastmodifieddate',
                    label: 'last_update_date'
                },
                {
                    name: 'cccustomercode',
                    label: 'last_update_by_???'
                }
            ]
        });
        
        var res = salesOrderSearch.run().getRange(1,100);
        
        return JSON.stringify(res);
    }

	function doGet(data){
        return createSearch(data);
    }

    return {
        'get': doGet
    };
});