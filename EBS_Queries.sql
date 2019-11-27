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

select max(transactional_curr_code) 
from oe_order_headers_all
where order_number in (sSONumber);

select unit_selling_price 
from xxnvtl_sales_order_data 
where order_number = '&OrderNumber'
and line_number = '&LineNumber'

select description 
from mtl_system_items 
where segment2 = 'Novatel_SKU'
--Novatel_SKU is a column name in sales_order_data view
AND Organization_id ='107';

select description 
from mtl_system_items 
where segment2 = NVTL_SKU
AND Organization_id ='107';

Select distinct ship_method_meaning 
From Wsh_Org_Carrier_Services Wocs, 
Wsh_Carrier_Services Wcs 
Where (Wocs.Carrier_Service_Id = Wcs.Carrier_Service_Id) 
UNION ALL 
select ' ' 
from dual 
Order By Ship_Method_Meaning

SELECT flow_status_code, cust_po_number, customer_name, "Novatel SKU", ordered_item, 
product, schedule_ship_date, ordered_quantity, hold_status, header_hold, line_hold 
from xxnvtl_sales_order_data 
WHERE ORDER_NUMBER = '&OrderNumber' AND LINE_NUMBER = '&LineNumber'

SELECT PARTY_NAME FROM HZ_CUST_ACCOUNTS_ALL C, HZ_PARTIES P 
WHERE(C.PARTY_ID = P.PARTY_ID) AND ACCOUNT_NUMBER='&tbCustomerNumber.Text.Trim';

--2882-3151
select P.PARTY_NAME, C.ATTRIBUTE1
from OE_ORDER_HEADERS_ALL OH, HZ_CUST_ACCOUNTS c, HZ_PARTIES P 
where oh.sold_to_org_id = c.CUST_ACCOUNT_ID 
and C.PARTY_ID = P.PARTY_ID 
and order_number = '&tbNVTLSONumber';
--SO.entityname is PARTY_NAME
--CT.accountnumber CUST_ACCOUNT_ID
--SO.tranid is SONumber or sales order number

--2854-3147
SELECT P.PARTY_NAME 
FROM HZ_CUST_ACCOUNTS_ALL C, HZ_PARTIES P 
WHERE (C.PARTY_ID = P.PARTY_ID) 
AND ACCOUNT_NUMBER = '&tbCustomerNumber';
--NS dont have party ID NS has entity id
--party name is company name
--account number is account number in NS CUSTOMER type
