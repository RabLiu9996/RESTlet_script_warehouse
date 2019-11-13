function getRecords(datain) {
  var data = JSON.parse(datain);
    const SALES_ORDER = "salesorder", CUSTOMER = "customer", ITEM = "item", PURCHASE_ORDER = "purchaseorder"
    var type = data.recordType.toLowerCase();
    var id = data.internalId;

    switch(type) {
        case SALES_ORDER:
            if(id != null)
                return getSingleSalesData(type, id);
            return getAllSalesData(type);
        case CUSTOMER:
            if(id != null)
                return getSingleCustomer(type, id);
            return getAllCustomer(type);
        case ITEM:
            if(id != null)
                return getSingleItem(type, id);
            return getAllItem(type);
        case PURCHASE_ORDER:
            if (id != null)
                return getSinglePO(type, id);
            return getAllPO(type);
    }
}

function getAllPO(type) {
    nlapiLogExecution('ERROR', 'All Purchase Order: ' + "Yes: " + type);

  var context = nlapiGetContext();
  var purchaseOrderSearch = nlapiSearchRecord(type, null, null,
    [
        new nlobjSearchColumn("line"),
        new nlobjSearchColumn("ordertype").setSort(false),
        new nlobjSearchColumn("mainline"),
        new nlobjSearchColumn("trandate"),
        new nlobjSearchColumn("asofdate"),
        new nlobjSearchColumn("postingperiod"),
        new nlobjSearchColumn("taxperiod"),
        new nlobjSearchColumn("type"),
        new nlobjSearchColumn("tranid"),
        new nlobjSearchColumn("entity"),
        new nlobjSearchColumn("account"),
        new nlobjSearchColumn("memo"),
        new nlobjSearchColumn("amount"),
        new nlobjSearchColumn("custbody_4599_mx_operation_type"),
        new nlobjSearchColumn("custbody_4599_sg_import_permit_num"),
        new nlobjSearchColumn("custbody_my_import_declaration_num"),
        new nlobjSearchColumn("custbody_nsts_gaw_superapp_approved"),
        new nlobjSearchColumn("custbody_11187_pref_entity_bank"),
        new nlobjSearchColumn("custbody_11724_pay_bank_fees"),
        new nlobjSearchColumn("custbody_11724_bank_fee"),
        new nlobjSearchColumn("custbody_fam_lp_company"),
        new nlobjSearchColumn("custbody_fam_lp_contractnum"),
        new nlobjSearchColumn("custbody_fam_lp_assetdesc"),
        new nlobjSearchColumn("custbody_fam_lp_term"),
        new nlobjSearchColumn("custbody_fam_lp_annualrate"),
        new nlobjSearchColumn("custbody_fam_lp_startdate"),
        new nlobjSearchColumn("custbody_fam_lp_enddate"),
        new nlobjSearchColumn("custbody_fam_lp_totalnpv"),
        new nlobjSearchColumn("custbody_fam_lp_totalleaseliab"),
        new nlobjSearchColumn("custbody_fam_lp_totalinterest"),
        new nlobjSearchColumn("custbody_rr_valuechangesemiannually"),
        new nlobjSearchColumn("custbody_rr_valuechangequarterly"),
        new nlobjSearchColumn("custbody_rr_valuechangemonthly"),
        new nlobjSearchColumn("custbody_rr_valuechangeannually"),
        new nlobjSearchColumn("custbody_rr_valuechangeweekly"),
        new nlobjSearchColumn("custbody_rr_immediateclcreate"),
        new nlobjSearchColumn("custbody_rr_netvalueweekly"),
        new nlobjSearchColumn("custbody_rr_netvaluemonthly"),
        new nlobjSearchColumn("custbody_rr_netvaluequarterly"),
        new nlobjSearchColumn("custbody_rr_netvalueannually"),
        new nlobjSearchColumn("custbody_rr_billdaysinadvance")
    ]
  );
  if (context.getRemainingUsage() <= 0 && (i + 1) < purchaseOrderSearch.length) {
    var status = nlapiScheduleScript(context.getScriptId(), context.getDeploymentId())
    if (status == 'QUEUED') {
    }
  }
  if (context.getRemainingUsage() < 1000) {
    nlapiYieldScript();
  }
  nlapiLogExecution('ERROR', 'All Purchase Order Data: ' + JSON.stringify(purchaseOrderSearch));
  return JSON.stringify(purchaseOrderSearch);
}

function getSinglePO(type, id) {
    nlapiLogExecution('ERROR', 'Single Purchase Order: ' + "Yes: " + id);

  var context = nlapiGetContext();
  var purchaseOrderSearch = nlapiSearchRecord(type,null,
[
   ["internalidnumber","equalto", id]
  ],
[
       new nlobjSearchColumn("tranid"),
   new nlobjSearchColumn("line"),
   new nlobjSearchColumn("linesequencenumber"), 
   new nlobjSearchColumn("pnrefnum"),
   new nlobjSearchColumn("account"), 
   new nlobjSearchColumn("memo"), 
   new nlobjSearchColumn("amount"),
            new nlobjSearchColumn("line"),
        new nlobjSearchColumn("ordertype").setSort(false),
        new nlobjSearchColumn("mainline"),
        new nlobjSearchColumn("trandate"),
        new nlobjSearchColumn("asofdate"),
        new nlobjSearchColumn("postingperiod"),
        new nlobjSearchColumn("taxperiod"),
        new nlobjSearchColumn("type"),
        new nlobjSearchColumn("tranid"),
        new nlobjSearchColumn("entity"),
        new nlobjSearchColumn("account"),
        new nlobjSearchColumn("memo"),
        new nlobjSearchColumn("amount"),
        new nlobjSearchColumn("custbody_4599_mx_operation_type"),
        new nlobjSearchColumn("custbody_4599_sg_import_permit_num"),
        new nlobjSearchColumn("custbody_my_import_declaration_num"),
        new nlobjSearchColumn("custbody_nsts_gaw_superapp_approved"),
        new nlobjSearchColumn("custbody_11187_pref_entity_bank"),
        new nlobjSearchColumn("custbody_11724_pay_bank_fees"),
        new nlobjSearchColumn("custbody_11724_bank_fee"),
        new nlobjSearchColumn("custbody_fam_lp_company"),
        new nlobjSearchColumn("custbody_fam_lp_contractnum"),
        new nlobjSearchColumn("custbody_fam_lp_assetdesc"),
        new nlobjSearchColumn("custbody_fam_lp_term"),
        new nlobjSearchColumn("custbody_fam_lp_annualrate"),
        new nlobjSearchColumn("custbody_fam_lp_startdate"),
        new nlobjSearchColumn("custbody_fam_lp_enddate"),
        new nlobjSearchColumn("custbody_fam_lp_totalnpv"),
        new nlobjSearchColumn("custbody_fam_lp_totalleaseliab"),
        new nlobjSearchColumn("custbody_fam_lp_totalinterest"),
        new nlobjSearchColumn("custbody_rr_valuechangesemiannually"),
        new nlobjSearchColumn("custbody_rr_valuechangequarterly"),
        new nlobjSearchColumn("custbody_rr_valuechangemonthly"),
        new nlobjSearchColumn("custbody_rr_valuechangeannually"),
        new nlobjSearchColumn("custbody_rr_valuechangeweekly"),
        new nlobjSearchColumn("custbody_rr_immediateclcreate"),
        new nlobjSearchColumn("custbody_rr_netvalueweekly"),
        new nlobjSearchColumn("custbody_rr_netvaluemonthly"),
        new nlobjSearchColumn("custbody_rr_netvaluequarterly"),
        new nlobjSearchColumn("custbody_rr_netvalueannually"),
        new nlobjSearchColumn("custbody_rr_billdaysinadvance")
]
);
  if (context.getRemainingUsage() <= 0 && (i + 1) < purchaseOrderSearch.length) {
    var status = nlapiScheduleScript(context.getScriptId(), context.getDeploymentId())
    if (status == 'QUEUED') {
    }
  }
  if (context.getRemainingUsage() < 1000) {
    nlapiYieldScript();
  }
  nlapiLogExecution('ERROR', 'All Purchase Order Data: ' + JSON.stringify(purchaseOrderSearch));
  return JSON.stringify(purchaseOrderSearch);
}
function getSingleSalesData(type, id) {
  nlapiLogExecution('ERROR', 'Single Sales2: ' + "Yes");
  var context = nlapiGetContext();

var filters = new Array();
        filters[0] = new nlobjSearchFilter('type', null, 'anyof', 'SalesOrd');
        filters[1] = new nlobjSearchFilter('tranid', null, 'is', id);

  var salesorderSearch = nlapiSearchRecord(type, null,filters,
    [
      new nlobjSearchColumn("ordertype").setSort(false),
      new nlobjSearchColumn("mainline"),
      new nlobjSearchColumn("trandate"),
      new nlobjSearchColumn("asofdate"),
      new nlobjSearchColumn("postingperiod"),
      new nlobjSearchColumn("taxperiod"),
      new nlobjSearchColumn("type"),
      new nlobjSearchColumn("tranid"),
      new nlobjSearchColumn("entity"),
      new nlobjSearchColumn("rate"),
      new nlobjSearchColumn("account"),
      new nlobjSearchColumn("memo"),
      new nlobjSearchColumn("amount"),
      new nlobjSearchColumn("item"),
      new nlobjSearchColumn("binnumber", "inventoryDetail", null),
      new nlobjSearchColumn("inventorynumber", "inventoryDetail", null),
      new nlobjSearchColumn("itemcount", "inventoryDetail", null)
    ]
  );

  if (context.getRemainingUsage() <= 0 && (i + 1) < salesorderSearch.length) {
    var status = nlapiScheduleScript(context.getScriptId(), context.getDeploymentId())
    if (status == 'QUEUED') {
    }
  }

  if (context.getRemainingUsage() < 1000) {
    nlapiYieldScript();
  }
  nlapiLogExecution('ERROR', 'Sales Data: ' + JSON.stringify(salesorderSearch));
  return JSON.stringify(salesorderSearch);
}
function getAllSalesData(type) {
  nlapiLogExecution('ERROR', 'All Sales2: ' + "Yes");
  var context = nlapiGetContext();
  var salesorderSearch = nlapiSearchRecord(type, null,
    [
      ["type", "anyof", "SalesOrd"]
    ],
    [
      new nlobjSearchColumn("ordertype").setSort(false),
      new nlobjSearchColumn("mainline"),
      new nlobjSearchColumn("trandate"),
      new nlobjSearchColumn("asofdate"),
      new nlobjSearchColumn("postingperiod"),
      new nlobjSearchColumn("taxperiod"),
      new nlobjSearchColumn("type"),
      new nlobjSearchColumn("tranid"),
      new nlobjSearchColumn("entity"),
      new nlobjSearchColumn("account"),
      new nlobjSearchColumn("memo"),
      new nlobjSearchColumn("amount"),
      new nlobjSearchColumn("item"),
      new nlobjSearchColumn("binnumber", "inventoryDetail", null),
      new nlobjSearchColumn("inventorynumber", "inventoryDetail", null),
      new nlobjSearchColumn("itemcount", "inventoryDetail", null)
    ]
  );

  if (context.getRemainingUsage() <= 0 && (i + 1) < salesorderSearch.length) {
    var status = nlapiScheduleScript(context.getScriptId(), context.getDeploymentId())
    if (status == 'QUEUED') {
    }
  }

  if (context.getRemainingUsage() < 1000) {
    nlapiYieldScript();
  }
  nlapiLogExecution('ERROR', 'Sales Data: ' + JSON.stringify(salesorderSearch));
  return JSON.stringify(salesorderSearch);
}

function getAllCustomer(type) {
  nlapiLogExecution('ERROR', 'All Customer2: ' + "Yes");
  var context = nlapiGetContext();
  var customerSearch = nlapiSearchRecord(type, null, null,
[
   new nlobjSearchColumn("entityid").setSort(false),
   new nlobjSearchColumn("email"),
   new nlobjSearchColumn("phone"),
   new nlobjSearchColumn("altphone"),
   new nlobjSearchColumn("fax"),
   new nlobjSearchColumn("contact"),
   new nlobjSearchColumn("altemail"),
   new nlobjSearchColumn("custentity_4599_sg_uen"),
   new nlobjSearchColumn("custentity_my_brn"),
   new nlobjSearchColumn("custentity_inseego_ownership"),
   new nlobjSearchColumn("custentity_inseego_channel"),
   new nlobjSearchColumn("address"),
   new nlobjSearchColumn("shipaddress")
]
);
  if (context.getRemainingUsage() <= 0 && (i + 1) < customerSearch.length) {
    var status = nlapiScheduleScript(context.getScriptId(), context.getDeploymentId())
    if (status == 'QUEUED') {
    }
  }

  if (context.getRemainingUsage() < 1000) {
    nlapiYieldScript();
  }
  nlapiLogExecution('ERROR', 'Customer Data: ' + JSON.stringify(customerSearch));
  return JSON.stringify(customerSearch);
}

function getSingleCustomer(type, id) {
  nlapiLogExecution('ERROR', 'Single Customer2: ' + "Yes");
  var context = nlapiGetContext();
  var customerSearch = nlapiSearchRecord(type, null,
    [
      ["internalid", "anyof", id]
    ],
    [
      new nlobjSearchColumn("entityid").setSort(false),
      new nlobjSearchColumn("email"),
      new nlobjSearchColumn("phone"),
      new nlobjSearchColumn("altphone"),
      new nlobjSearchColumn("fax"),
      new nlobjSearchColumn("contact"),
      new nlobjSearchColumn("altemail"),
      new nlobjSearchColumn("custentity_4599_sg_uen"),
      new nlobjSearchColumn("custentity_my_brn"),
      new nlobjSearchColumn("custentity_inseego_account_subtype"),
      new nlobjSearchColumn("custentity_inseego_ownership"),
      new nlobjSearchColumn("custentity_inseego_channel"),
      new nlobjSearchColumn("address"),
      new nlobjSearchColumn("shipaddress")
    ]
  );
  if (context.getRemainingUsage() <= 0 && (i + 1) < customerSearch.length) {
    var status = nlapiScheduleScript(context.getScriptId(), context.getDeploymentId())
    if (status == 'QUEUED') {

    }
  }

  if (context.getRemainingUsage() < 1000) {
    nlapiYieldScript();
  }
  nlapiLogExecution('ERROR', 'Customer Data: ' + JSON.stringify(customerSearch));
  return JSON.stringify(customerSearch);
}

function getSingleItem(type, id) {
  nlapiLogExecution('ERROR', 'Single Items2: ' + "Yes");
  nlapiLogExecution('ERROR', 'ID: ' + id);
  var context = nlapiGetContext();
  var itemSearch = nlapiSearchRecord(type, null,
    [
      ["internalid", "anyof", id]
    ],
    [
      new nlobjSearchColumn("itemid").setSort(false),
      new nlobjSearchColumn("displayname"),
      new nlobjSearchColumn("salesdescription"),
      new nlobjSearchColumn("type"),
      new nlobjSearchColumn("baseprice"),
      new nlobjSearchColumn("binnumber", "inventoryDetail", null),
      new nlobjSearchColumn("item", "inventoryDetail", null),
      new nlobjSearchColumn("itemcount", "inventoryDetail", null),
      new nlobjSearchColumn("quantity", "inventoryDetail", null),
      new nlobjSearchColumn("location", "inventoryDetail", null)
    ]
  );
  if (context.getRemainingUsage() <= 0 && (i + 1) < itemSearch.length) {
    var status = nlapiScheduleScript(context.getScriptId(), context.getDeploymentId())
    if (status == 'QUEUED') {

    }
  }

  if (context.getRemainingUsage() < 1000) {
    nlapiYieldScript();
  }
  nlapiLogExecution('ERROR', 'Item Data: ' + JSON.stringify(itemSearch));
  return JSON.stringify(itemSearch);
}

function getAllItem(type) {
  nlapiLogExecution('ERROR', 'All Items2: ' + "Yes");
  var context = nlapiGetContext();
  var itemSearch = nlapiSearchRecord(type, null, null,
    [
      new nlobjSearchColumn("itemid").setSort(false),
      new nlobjSearchColumn("displayname"),
      new nlobjSearchColumn("salesdescription"),
      new nlobjSearchColumn("type"),
      new nlobjSearchColumn("baseprice"),
      new nlobjSearchColumn("binnumber", "inventoryDetail", null),
      new nlobjSearchColumn("item", "inventoryDetail", null),
      new nlobjSearchColumn("itemcount", "inventoryDetail", null),
      new nlobjSearchColumn("quantity", "inventoryDetail", null),
      new nlobjSearchColumn("location", "inventoryDetail", null)
    ]
  );
  if (context.getRemainingUsage() <= 0 && (i + 1) < itemSearch.length) {
    var status = nlapiScheduleScript(context.getScriptId(), context.getDeploymentId())
    if (status == 'QUEUED') {
    }
  }

  if (context.getRemainingUsage() < 1000) {
    nlapiYieldScript();
  }
  nlapiLogExecution('ERROR', 'Item Data: ' + JSON.stringify(itemSearch));
  return JSON.stringify(itemSearch);
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

//Find Customer Record
function findCustomer(recordType, recordId) {
  var objCustomerSearch = nlapiSearchRecord(recordType, null, new nlobjSearchFilter('entityid', null, 'is', recordId));
  if (objCustomerSearch) {
    nlapiLogExecution('DEBUG', 'Found Customer ID:  ', objCustomerSearch[0].getId());
    return objCustomerSearch[0].getId();
  }
  //return nlapiSearchRecord(recordType, null, new nlobjSearchFilter('entityId', null, 'is', recordId));
}
function finditem(recordType, name) {
  var objItemSearch = nlapiSearchRecord(recordType, null, new nlobjSearchFilter('item', "name", 'is', recordId, "isinactive", "false"));
  if (objItemSearch) {
    return objItemSearch[0].getId();
  }
  //return nlapiSearchRecord(recordType, null, new nlobjSearchFilter('entityId', null, 'is', recordId));
}
function findGlobal(val) {
  var record;
  var searchresults = nlapiSearchGlobal(val);

  if (searchresults) {
    nlapiLogExecution('DEBUG', 'Found Record:  ', searchresult[0].getId());
    record = searchresult[0].getId();
    return record;
  } else {
    record = 0;
    return record;
  }
}
function find(recordType, fieldName, value, fieldName2, value2) {
  var retVal = null;
  if (value != null) {
    var filters = new Array();
    filters.push(new nlobjSearchFilter(fieldName, null, "is", String(value), "isinactive", "false"));
    if (fieldName2) {
      filters.push(new nlobjSearchFilter(fieldName2, null, "is", String(value2)));
    }
    var searchResults = nlapiSearchRecord(recordType, null, filters, null);
    if (searchResults != null) {
      var searchresult = searchResults[0];
      retVal = searchresult;
    }
    else {
      retVal = null;
    }
  }
  return retVal;
}
function item(sku) {
  return this.find("item", "name", sku, "isinactive", false);
}