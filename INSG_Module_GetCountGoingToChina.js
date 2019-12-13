/**
 * This Query/Module return the MAX of currency for a given list of Orders Numbers.
 *
 */

define(['N/search', 'N/record'],

    function (search) {

        const NoteTypeIds = {
            "Printed Documents": 13,
        };

        /**
         * Return the currency name for a given list of orders numbers.
         *
         * @param {Array} paramOrders
         *
         * @return {Object[]}
         */
        function execute(parameters) {        

            if (!parameters.orderNumber || parameters.orderNumber === '') {
                return {
                    error: "salesOrderNumbers parameter is required and can't be empty."
                }
            }

            var aFilters = [
                ['transaction.mainline', search.Operator.IS, true], 'AND',
                ['notetype', search.Operator.ANYOF, [NoteTypeIds["Printed Documents"]]], 'AND',
                ['note', search.Operator.CONTAINS, 'China'], 'AND',
                ['transaction.numbertext', search.Operator.IS, parameters.orderNumber]
            ];


            var oSearch = search.create({
                type: search.Type.NOTE,
                filters: aFilters,
                columns: [
                    search.createColumn({
                        name: 'note',
                        summary: search.Summary.COUNT
                    })                
                ]
            });

            var result = 0;
            oSearch.run().each(function(oResult) {
                result = oResult.getValue({ name: 'note', summary: search.Summary.COUNT });
                return true;
            });

            return result;
        }

    return {
        execute: execute
    }
});
