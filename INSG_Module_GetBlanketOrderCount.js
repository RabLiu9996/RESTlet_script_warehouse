/**
 * Module that handles Orders' related logic
 *
 */

define(['N/search'],

function(search) {

    function execute(parameters) {

        if (!parameters.poNumber) {
            return {
                error: "poNumber is required"
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
                values: parameters.poNumber
            })
        );

        var oSearch = search.create({
            type: "blanketpurchaseorder",
            filters: aFilters,
            columns: [{
                name: 'tranid',
                summary: search.Summary.COUNT
            }]
        });
        var count = 0;
        oSearch.run().each(function (result) {
            count = parseInt(result.getValue({
                "name": "tranid",
                "summary": search.Summary.COUNT
            }));
            
            return true;
        })

        return count;
    }

    return {
        execute: execute
    }
});
