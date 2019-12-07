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
-----------------------------------------------------------ATTRIBUTE1 is missing, it's about warrenty term

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

--Queries above were completed or partially completed
-----------------------------------------------------------------------------

--2687-3131
select unit_selling_price 
from xxnvtl_sales_order_data 
where order_number = '&OrderNumber'
and line_number = '&LineNumber'

select description 
from mtl_system_items 
where segment2 = 'Novatel_SKU'
--Novatel_SKU is a column name in sales_order_data view
AND Organization_id ='107';

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
 and (sub_inventory in ('&InventoryLocation') or po_ship_to in ('InventoryLocation'))