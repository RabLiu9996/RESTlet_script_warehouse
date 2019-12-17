--2538-2536
SELECT xxnvtl_nfs_so_header.so_header_id, 
       xxnvtl_nfs_so_header.so_number, 
       xxnvtl_nfs_so_header.customer_number, 
       xxnvtl_nfs_so_header.customer, 
       xxnvtl_nfs_so_header.sold_to_org_id, 
       xxnvtl_nfs_so_header.ship_to_customer_id, 
       xxnvtl_nfs_so_header.bill_to_customer_id
FROM   bolinf.xxnvtl_nfs_so_header XXNVTL_NFS_SO_HEADER;
-----------------------------------------------------------many fields are missing

--2564-3130
select max(transactional_curr_code) 
from oe_order_headers_all
where order_number in (sSONumber);

--2882-3151
select P.PARTY_NAME, C.ATTRIBUTE1
from OE_ORDER_HEADERS_ALL OH, HZ_CUST_ACCOUNTS c, HZ_PARTIES P 
where oh.sold_to_org_id = c.CUST_ACCOUNT_ID 
and C.PARTY_ID = P.PARTY_ID 
and order_number = '&tbNVTLSONumber';
--SO.entityname is PARTY_NAME
--CT.accountnumber CUST_ACCOUNT_ID
--SO.tranid is SONumber or sales order number
-----------------------------------------------ATTRIBUTE1 is missing, it's about warrenty term

--2854-3147
SELECT P.PARTY_NAME 
FROM HZ_CUST_ACCOUNTS_ALL C, HZ_PARTIES P 
WHERE (C.PARTY_ID = P.PARTY_ID) 
AND ACCOUNT_NUMBER = '&tbCustomerNumber';
--NS dont have party ID NS has entity id
--party name is company name or entity name
--account number is account number in NS CUSTOMER type

--2861-3148
select Customer_Number 
from SO_HEADERS 
where SO_NUMBER = '&SONumber';
--Customer number is 'cccustomercode' in NS sales order

--2687-3131
select unit_selling_price 
from xxnvtl_sales_order_data 
where order_number = '&OrderNumber'
and line_number = '&LineNumber'

--2701--3133
select description 
from mtl_system_items 
where segment2 = '&Novatel_SKU' 
AND Organization_id ='107';
--SKU: By definition, a stock keeping unit (or SKU) is a number 
--assigned to a product by a retail store to identify the price, 
--product options and manufacturer of the merchandise. 
--------------------------------------------organization_id is missing

--2694--3132
SELECT DISTINCT FDST.SHORT_TEXT 
FROM FND_DOCUMENTS_SHORT_TEXT FDST,
FND_DOCUMENTS FDT,
FND_ATTACHED_DOCUMENTS FAD, 
FND_DOCUMENT_CATEGORIES_TL FDCT, 
OE_ORDER_HEADERS_ALL OOH 
WHERE FAD.DOCUMENT_ID = FDT.DOCUMENT_ID 
AND FDT.MEDIA_ID = FDST.MEDIA_ID 
AND FAD.PK1_VALUE = OOH.HEADER_ID 
AND FAD.ENTITY_NAME = 'OE_ORDER_HEADERS' 
AND FDCT.CATEGORY_ID = FAD.CATEGORY_ID 
AND FDCT.USER_NAME= '&Category' 
AND OOH.ORDER_NUMBER in ('&Sales_Order_Numbers');

--2743--3137
Select distinct ship_method_meaning 
From Wsh_Org_Carrier_Services Wocs, 
Wsh_Carrier_Services Wcs 
Where Wocs.Carrier_Service_Id = Wcs.Carrier_Service_Id
UNION ALL 
select ' ' from dual 
Order By Ship_Method_Meaning;

--2952--3161
select count(*) 
from FND_DOCUMENTS_SHORT_TEXT FDST,
FND_DOCUMENTS_TL FDT,
FND_ATTACHED_DOCUMENTS FAD, 
FND_DOCUMENT_CATEGORIES_TL FDCT,
OE_ORDER_HEADERS_ALL OOH 
where (FAD.DOCUMENT_ID = FDT.DOCUMENT_ID And FDT.MEDIA_ID = FDST.MEDIA_ID And FAD.PK1_VALUE = OOH.HEADER_ID) 
and FDCT.CATEGORY_ID = FAD.CATEGORY_ID 
and FDCT.USER_NAME= 'Printed Documents' 
AND upper(FDST.SHORT_TEXT) LIKE '%CHINA%' 
AND OOH.ORDER_NUMBER = '&Order_Number';

--2708--3134
select order_number,
line_number,
cust_po_number,
customer_name, 
"Novatel SKU",
Ordered_Item,
product,
request_date,
promise_date,
schedule_ship_date,
ordered_quantity,
hold_status,
header_hold,
line_hold,
cust_po_approved,
ship_to_address1,
ship_to_address2,
ship_to_address3,
ship_to_address4, 
ship_to_city_state_zip_country,
ship_to_city,
ship_to_state,
flow_status_code,
subinventory,
sales_rep,
order_created_by,
Order_type,
ship_contact,
ship_method,
freight_terms 
from xxnvtl_sales_order_data 
WHERE ORDER_NUMBER = '&txtNovatelSONumber' 
AND LINE_NUMBER = '&txtNovatelSOLineNumber';

--2534--2634
SELECT CUST.cust_account_id, 
       PARTY.party_name, 
       CUST.account_number, 
       CUST.status, 
       CUST.orig_system_reference, 
       PARTY.category_code, 
       CUST.customer_type, 
       PARTY.address1, 
       PARTY.address2, 
       PARTY.address3, 
       PARTY.city, 
       PARTY.state, 
       PARTY.postal_code, 
       T.territory_short_name, 
       Nvl(CUST.warehouse_id, 0), 
       CUST.creation_date, 
       CREATE_USER.user_name, 
       CUST.last_update_date, 
       UPDATE_USER.user_name, 
       CUST.attribute1 --(Warranty Terms(in Months))
FROM   hz_cust_accounts CUST, 
       hz_parties PARTY, 
       apps.fnd_territories_vl T, 
       fnd_user CREATE_USER, 
       fnd_user UPDATE_USER 
WHERE  CUST.party_id = PARTY.party_id 
       AND PARTY.country = T.territory_code 
       AND CUST.last_updated_by = UPDATE_USER.user_id
       AND CUST.created_by = CREATE_USER.user_id;

select count(*) 
from PO_HEADERS_ALL PH, 
PO_LINES_ALL PL, 
PO_LINE_TYPES PT 
where PH.PO_HEADER_ID = PL.PO_HEADER_ID 
and PL.LINE_TYPE_ID = PT.LINE_TYPE_ID 
and PH.SEGMENT1 = '&sPO' 
and PL.LINE_NUM = '&sPOLIne'
and PT.LINE_TYPE = 'Rework';

SELECT 
flow_status_code, 
cust_po_number, 
customer_name, 
SKU, 
ordered_item,
product, 
schedule_ship_date, 
ordered_quantity, 
hold_status, 
header_hold, 
line_hold
from xxnvtl_sales_order_data
WHERE ORDER_NUMBER = '&orderNumber'
AND LINE_NUMBER = '&lineNumber';

--Queries above were completed or partially completed
-----------------------------------------------------------------------------

select 
l.shipment_number, 
l.ordered_quantity, 
l.freight_carrier_code, 
l.schedule_ship_date, 
l.flow_status_code, 
l.subinventory, 
l.cust_po_number, 
msi.segment2 SKU 
from 
XXNVTL_NFS_SO_HEADER h, 
OE_ORDER_LINES_ALL l, 
MTL_SYSTEM_ITEMS msi 
where l.HEADER_ID = h.SO_HEADER_ID 
and h.SO_NUMBER = " & tbNVTLSONumber.Text 
and l.LINE_NUMBER = " & tbNVTLSOLineItem.Text 
and l.inventory_item_id = msi.inventory_item_id
and l.org_id = msi.organization_id
order by l.shipment_number

SELECT DISTINCT FDST.SHORT_TEXT, OOH.ORDER_NUMBER, FDCT.USER_NAME
FROM FND_DOCUMENTS_SHORT_TEXT FDST,
FND_DOCUMENTS FDT,
FND_ATTACHED_DOCUMENTS FAD, 
FND_DOCUMENT_CATEGORIES_TL FDCT, 
OE_ORDER_HEADERS_ALL OOH 
WHERE FAD.DOCUMENT_ID = FDT.DOCUMENT_ID 
AND FDT.MEDIA_ID = FDST.MEDIA_ID 
AND FAD.PK1_VALUE = OOH.HEADER_ID 
AND FAD.ENTITY_NAME = 'OE_ORDER_HEADERS'
AND FDCT.CATEGORY_ID = FAD.CATEGORY_ID 
AND FDCT.USER_NAME = 'Short Text'
AND OOH.ORDER_NUMBER in ('&Sales_Order_Numbers');

--2757
select po_ship_to,sub_inventory, 
item_category, 
so_cust_name,
so_cust_po_number,
 po_line_item, 
 po_line_promised_date,item_description, 
 pll_attribute1,
 po_shipment_quantity_ordered, 
 po_shipment_quantity_received, 
 receipt_shipment_number, 
 waybill_airbill_number 
 from XXNVTL_MASTER_SCHEDULE2_V 
 Where (shipment_closed_code = 'OPEN' 
 and po_ship_to <> 'Unallocated') 
 and (sub_inventory in ('&InventoryLocation') or po_ship_to in ('InventoryLocation'));