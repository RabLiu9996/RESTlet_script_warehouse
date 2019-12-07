/**
 * Module that handles Orders' related logic
 *
 */

define(['N/search'],

function(search) {

    /**
     * Return the currency name for a given list of orders numbers.
     *
     * @param {Array} paramOrders
     *
     * @return {Object[]}
     */
    function execute(context) {

        var paramOrders = context.sSONumber;

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
                operator: search.Operator.ANYOF,
                values: paramOrders
            })
        );

        var aColumns = [];
        aColumns.push(
            search.createColumn({
                name: 'tranid'
            })
        );
        aColumns.push(
            search.createColumn({
                name: 'currency'
            })
        );

        var oSearch = search.create({
            type: search.Type.SALES_ORDER,
            filters: aFilters,
            columns : aColumns
        });
​
        var oResults = [];
        oSearch.run().each(function(oResult) {
            oResults.push({
                order       : oResult.getValue({name: 'tranid'}),
                currency    : oResult.getText({name: 'currency'})
            });

            return true;
        });

        return oResults;
    }

    return {
        execute: execute
    }
});
