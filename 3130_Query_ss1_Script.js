function getRecords(datain) {
  var data = JSON.parse(datain);
    const SALES_ORDER = "salesorder";
    var type = data.recordType.toLowerCase();
    var id = data.internalId;

    switch(type) {
        case SALES_ORDER:
            return getSalesOrderCurrencyName(type, id);
      	default:
        	return data;
    }
}

function getSalesOrderCurrencyName(type, id){
	var getSalesOrderRecord = nlapiLoadRecord(type,id)
	return JSON.stringify(getSalesOrderRecord.getFieldValue('currencyname'));
}