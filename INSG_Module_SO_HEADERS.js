/**
 * This Query/Module return Sales Order main data for a given order.
 *
 */

define(['N/search'],

function(search) {

    /**
     * Return the Sales Order main data for a given Order Number.
     *
     * @param {Object} parameters
     *
     * @return {Object[]}
     */
    function execute(parameters) {

        const resultColumnsMapping = {
            so_header_id: {
                name: 'internalid'
            },
            so_number: {
                name: 'tranid'
            },
            sold_to_org_id: {
                name: 'representingsubsidiary',
                join: 'customermain'
            },
            customer_number: {
                name: 'entityid',
                join: 'customermain'
            }
        };

        /* If there is no sSONumber parameter or it is an empty array, something is wrong */
        if(!parameters.sSONumber || parameters.sSONumber.length === 0) {
            return {
                error:"sSONumber parameter is required and can't be empty."
            }
        }

        var aFilters = [];
        aFilters.push(
            search.createFilter({
                name: 'mainline',
                operator: search.Operator.IS,
                values: true
            })
        );
        aFilters.push(
            search.createFilter({
                name: 'tranid',
                operator: search.Operator.IS,
                values: parameters.sSONumber
            })
        );

        var aColumns = [];
        for (var nKey in resultColumnsMapping) {
            aColumns.push(
                search.createColumn(resultColumnsMapping[nKey])
            )
        }

        var oSearch = search.create({
            type: search.Type.SALES_ORDER,
            filters: aFilters,
            columns : aColumns
        });
​
        var soHeaderData = {};
        oSearch.run().each(function(oResult) {
            for (var nKey in resultColumnsMapping) {
                soHeaderData[nKey] = oResult.getText(resultColumnsMapping[nKey]);
                if (!soHeaderData[nKey] || soHeaderData[nKey] === null) {
                    soHeaderData[nKey] = oResult.getValue(resultColumnsMapping[nKey]);
                }
            }
        });

        /* Parsing the Representing Subsidiary */
        if (soHeaderData.sold_to_org_id && soHeaderData.sold_to_org_id.indexOf(':') !== -1) {
            soHeaderData.sold_to_org_id = soHeaderData.sold_to_org_id.split(': ').pop();
        }

        return soHeaderData;
    }

    return {
        execute: execute
    }
});
