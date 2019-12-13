/**
 * This Query/Module return all active customers needed data.
 *
 */

define(['N/search'],

function(search) {

    /**
     * Return all active customers data.
     *
     * @param {Object} parameters
     *
     * @return {Object[]}
     */
    function execute(parameters) {

        const COLUMNS_MAP = {
            party_name: {
                searchColumn: {name: 'entityid'},
                valueType: 'VALUE'
            },
            account_number: {
                searchColumn: {name: 'accountnumber'},
                valueType: 'VALUE'
            },
            status: {
                searchColumn: {name: 'entitystatus'},
                valueType: 'TEXT'
            },
            /* TBD */
            /*orig_system_reference: {
                searchColumn: {name: '????'},
                valueType: 'TEXT'
            },*/
            category_code: {
                searchColumn: {name: 'category'},
                valueType: 'TEXT'
            },
            customer_type: {
                searchColumn: {name: 'isperson'},
                valueType: 'VALUE'
            },
            address1: {
                searchColumn: {name: 'address1'},
                valueType: 'VALUE'
            },
            address2: {
                searchColumn: {name: 'address2'},
                valueType: 'VALUE'
            },
            address3: {
                searchColumn: {name: 'address3'},
                valueType: 'VALUE'
            },
            city: {
                searchColumn: {name: 'city'},
                valueType: 'VALUE'
            },
            state: {
                searchColumn: {name: 'state'},
                valueType: 'VALUE'
            },
            postal_code: {
                searchColumn: {name: 'zipcode'},
                valueType: 'VALUE'
            },
            /* TBD */
            /*warehouse_id: {
                searchColumn: {name: '????'},
                valueType: 'TEXT'
            },*/
            territory_short_name: {
                searchColumn: {name: 'territory'},
                valueType: 'TEXT'
            },
            creation_date: {
                searchColumn: {name: 'datecreated'},
                valueType: 'VALUE'
            }
            /* Fields TBD
             CREATE_USER.user_name,
             CUST.last_update_date,
             UPDATE_USER.user_name,
             CUST.attribute1 (Warranty Terms(in Months))
            */
        };

        var aFilters = [];
        aFilters.push(
            search.createFilter({
                name: 'isinactive',
                operator: search.Operator.IS,
                values: false
            })
        );
        aFilters.push(
            search.createFilter({
                name: 'isdefaultbilling',
                operator: search.Operator.IS,
                values: true
            })
        );

        var aColumns = [];
        for (var nKey in COLUMNS_MAP) {
            aColumns.push(
                search.createColumn(COLUMNS_MAP[nKey].searchColumn)
            )
        }

        var oSearch = search.create({
            type: search.Type.CUSTOMER,
            filters: aFilters,
            columns : aColumns
        });
​
        var oCustomersResults = [];
        var oPagedSearch = oSearch.runPaged();
        oPagedSearch.pageRanges.forEach(function(pageRange) {

            var oPage = oPagedSearch.fetch({
                index: pageRange.index
            });

            oPage.data.forEach(function(oResult) {
                var oCustomerData = {};
                for (var nKey in COLUMNS_MAP) {
                    if (COLUMNS_MAP[nKey].valueType === 'TEXT') {
                        oCustomerData[nKey] = oResult.getText(COLUMNS_MAP[nKey].searchColumn);
                    }
                    if (COLUMNS_MAP[nKey].valueType === 'VALUE') {
                        oCustomerData[nKey] = oResult.getValue(COLUMNS_MAP[nKey].searchColumn);
                    }
                }

                oCustomerData['customer_type'] = oCustomerData['customer_type'] ? 'Individual' : 'Company';
                oCustomersResults.push(oCustomerData);

                return true;
            });
        });

        return oCustomersResults;
    }

    return {
        execute: execute
    }
});