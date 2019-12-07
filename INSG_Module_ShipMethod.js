/**
 * This Query/Module return all the active Ship Methods(ShipItems) in NetSuite.
 *
 */

define(['N/search'],

function(search) {

    /**
     * Return the NetSuite Active Ship Methods(ShipItems).
     *
     * @param {Object} parameters
     *
     * @return {Array}
     */
    function execute(parameters) {

        var aFilters = [];
        aFilters.push(
            search.createFilter({
                name: 'isinactive',
                operator: search.Operator.IS,
                values: false
            })
        );

        var aColumns = [];
        aColumns.push(
            search.createColumn({
                name: 'itemid'
            })
        );

        var oSearch = search.create({
            type: search.Type.SHIP_ITEM,
            filters: aFilters,
            columns : aColumns
        });
​
        var shipItems = [];
        oSearch.run().each(function(oResult) {
            shipItems.push(oResult.getValue({name: 'itemid'}));

            return true;
        });

        return shipItems;
    }

    return {
        execute: execute
    }
});
