/**
 * Module that handles Orders' related logic
 *
 */

define(['N/search'],

function(search) {

    function execute(parameters) {

        if (!parameters.novatelSku) {
            return {
                error: "novatelSku is required"
            }
        }

        var oSearch = search.create({
            type: "inventoryitem",
            filters: [
                ["type", "anyof", "InvtPart"],
                "AND",
                ["name", "is", parameters.novatelSku]
            ],
            columns: [
                search.createColumn({ name: "salesdescription" })
            ]
        });
​
        var oResults = [];
        oSearch.run().each(function (oResult) {
            oResults.push(oResult.getValue(oResult.columns[0]));
            return true;
        });

        return oResults;
    }

    return {
        execute: execute
    }
});
