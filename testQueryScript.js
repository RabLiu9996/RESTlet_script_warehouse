function getRecords(datain) {

    var data = JSON.parse(datain);
    const SALES_ORDER = "salesorder", ACCOUNT = "account";
    var type = data.recordType.toLowerCase();

    switch(type) {
        case SALES_ORDER:
            return getAllSalesData(type);
        case ACCOUNT:
            return getFilteredAccount(type);
        default:
            return {};
    }
    
}

function getAllSalesData(type) {
    nlapiLogExecution('ERROR', 'All Sales2: ' + "Yes");
    var context = nlapiGetContext();
    var salesorderSearch = nlapiSearchRecord(type, null,
        [
            ["type", "anyof", "SalesOrd"]  
        ],
        [
            new nlobjSearchColumn("tranid"),
            new nlobjSearchColumn("internalid"),
            //new nlobjSearchColumn("so_number"),
            new nlobjSearchColumn("otherrefnum"),
            new nlobjSearchColumn("trandate"),
            //new nlobjSearchColumn("expandable_order"),
            new nlobjSearchColumn("entity"),//customer record internal id???
            //new nlobjSearchColumn("customer"),//name of customer company
            new nlobjSearchColumn("shipaddress"),
            new nlobjSearchColumn("shipaddress1"),
            new nlobjSearchColumn("shipaddress2"),
            new nlobjSearchColumn("shipaddress3"),
            new nlobjSearchColumn("billaddress"),
            new nlobjSearchColumn("billaddress1"),
            new nlobjSearchColumn("billaddress2"),
            new nlobjSearchColumn("billaddress3"),
            new nlobjSearchColumn("location"),
            new nlobjSearchColumn("shipmethod"),
            new nlobjSearchColumn("subsidiary"),//???
            //sold from Org ID
            //sold to Org ID
            //ship from Org ID
            //ship to Org ID
            //ship to customer ID
            //biil to customer ID
            new nlobjSearchColumn("datecreated"),
            //request date
            //pricing date
            new nlobjSearchColumn("shipcarrier"),
            //creation date
            //created by
            new nlobjSearchColumn("lastmodifieddate")
            //last modified by
            //is multi ship to??? checkbox
        ]
    );

    nlapiLogExecution('ERROR', 'Sales Data: ' + JSON.stringify(salesorderSearch));
    return JSON.stringify(salesorderSearch);
}

function getSingleSalesData(type) {
    nlapiLogExecution('ERROR', 'testQueryScript: ' + "Yes");
    var context = nlapiGetContext();

    var filters = new Array();
    filters[0] = new nlobjSearchFilter('number', null, 'is', '1200');

    var accountSearch = nlapiSearchRecord(type, null,filters,
        [
        new nlobjSearchColumn("name"),
        new nlobjSearchColumn("number")
        ]
    );

    nlapiLogExecution('ERROR', 'testQueryScript: ' + JSON.stringify(accountSearch));
    return JSON.stringify(accountSearch);
}