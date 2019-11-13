function pushData(datain) {
    var recordType = datain.recordtype;
    switch (recordType) {
        case "transferorder":
            return createRecord(datain);
            break;
    }

}

function createRecord(datain) {
    var err = new Object();

    // Validate if mandatory record type is set in the request
    if (!datain.recordtype) {
        err.status = "failed";
        err.message = "missing recordtype";
        return err;
    }

    var record = nlapiCreateRecord(datain.recordtype);

    for (var fieldname in datain) {
        if (datain.hasOwnProperty(fieldname)) {
            if (fieldname != 'recordtype' && fieldname != 'id') {
                var value = datain[fieldname];
                if (value && typeof value != 'object') // process non-item fields
                {
                    record.setFieldValue(fieldname, value);
                }
                if (value && typeof value == 'object') // process line item objects
                {
                    for (var itemobject in value) {
                        record.selectNewLineItem('item');
                        var lineitemobject = value[itemobject];
                        for (var lineitemfieldname in lineitemobject) {
                            var lineitemfieldvalue = lineitemobject[lineitemfieldname];
                            record.setCurrentLineItemValue('item', lineitemfieldname, lineitemfieldvalue);
                        }
                        record.commitLineItem('item');
                    }
                }
            }
        }
    }
    var recordId = nlapiSubmitRecord(record);
    var myID = {"transferorder":recordId};
    return myID;
}

//var recordId = nlapiSubmitRecord(record);
//return recordId;

function createTransferOrder(recordtype) {

    var recordtype = "transferorder";
    var tranOrder = nlapiCreateRecord(recordtype);
    tranOrder.setFieldValue('location', 1); //From Location field
    tranOrder.setFieldValue('transferlocation', 2); //To Location field

    tranOrder.selectNewLineItem('item');
    tranOrder.setCurrentLineItemValue('item', 'item', 47);
    tranOrder.commitLineItem('item');

    var to = nlapiSubmitRecord(tranOrder);

    //Create item fulfillment record
    var fulfillRecord = nlapiTransformRecord('transferorder', to_recId, 'itemfulfillment', null);
    fulfillRecord.setFieldText('shipstatus', 'SHIPPED');
    fulfillRecord.setFieldValue('generateintegratedshipperlabel', 'F');
    var fulfillmentId = nlapiSubmitRecord(fulfillRecord);
    nlapiLogExecution('DEBUG', 'Item Fulfillment Created', fulfillmentId);

    var myID = {
        "transferorder": to
    };
    return myID;
}

function finditem(recordType, name) {
    var objItemSearch = nlapiSearchRecord(recordType, null, new nlobjSearchFilter('item', "name", 'is', recordId, "isinactive", "false"));
    if (objItemSearch) {
        return objItemSearch[0].getId();
    }
    //return nlapiSearchRecord(recordType, null, new nlobjSearchFilter('entityId', null, 'is', recordId));
}

function findOrder(recordId) {
    var record;
    var saleID = nlapiSearchRecord('salesorder', null, new nlobjSearchFilter('tranid', null, 'haskeywords', recordId));
    if (saleID) {
        record = saleID[0].getId();
        return record;
    } else {
        record = 0;
        return record;
    }
}
function findCustomer(recordType, recordId) {
    var objCustomerSearch = nlapiSearchRecord(recordType, null, new nlobjSearchFilter('entityid', null, 'is', recordId));
    if (objCustomerSearch) {
        nlapiLogExecution('DEBUG', 'Found Customer ID:  ', objCustomerSearch[0].getId());
        return objCustomerSearch[0].getId();
    }
    //return nlapiSearchRecord(recordType, null, new nlobjSearchFilter('entityId', null, 'is', recordId));
}

function item(sku) {
    return this.find("item", "name", sku, "isinactive", false);
}