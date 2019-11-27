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
    function GetCustNameByAccountNumber(data) {
        var accountNumber = data.accountNumber;

        var filters = [];
        filters.push(
             search.createFilter({
                 name: 'accountnumber',
                 operator: search.Operator.IS,
                 values: accountNumber
             })
        );

        var res = search.create({
            type: search.Type.CUSTOMER,
            filters: filters,
            columns: [
                {
                    name: 'companyname'
                }
            ],
          	filters: filters
        }).run().getRange(0,100);
      
        return JSON.stringify(res);
    }

	function doGet(data){
        return GetCustNameByAccountNumber(data);
    }

    return {
        'get': doGet
    };
});