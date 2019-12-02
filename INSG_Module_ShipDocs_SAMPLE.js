/**
 * This Query/Module return the MAX of currency for a given list of Orders Numbers.
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
    function execute(parameters) {

        /* If there is no sSONumbers parameter or it is an empty array, something is wrong */
        if(!parameters.sSONumber || parameters.sSONumber.length === 0) {
            return {
                error:"sSONumber parameter is required and can't be empty."
            }
        }

        /* Creating Filter Expressions Array */
        var aFilters = [
            ['mainline', search.Operator.IS, true],
            'AND',
            []
        ];

        /* Getting the Array Position to Push the ORs conditions */
        var nPos = aFilters.length -1;
        parameters.sSONumber.forEach(function (soNumber) {
            aFilters[nPos].push(['tranid', search.Operator.IS, soNumber]);
            aFilters[nPos].push('OR');
        });
        aFilters[nPos].pop();

        var aColumns = [];
        aColumns.push(
            search.createColumn({
                name: 'currency',
                summary: search.Summary.MAX
            })
        );

        var oSearch = search.create({
            type: search.Type.SALES_ORDER,
            filters: aFilters,
            columns : aColumns
        });
​
        var currencyResult = '';
        oSearch.run().each(function(oResult) {
            currencyResult = oResult.getValue({name: 'currency', summary: search.Summary.MAX});
        });

        if (!currencyResult) {
            return {
                error:"No Currency Result found."
            }
        }

        return currencyResult;
    }

    return {
        execute: execute
    }
});
