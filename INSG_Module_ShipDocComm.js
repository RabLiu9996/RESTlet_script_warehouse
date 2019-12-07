/**
 * This Query/Module return the MAX of currency for a given list of Orders Numbers.
 *
 */

define(['N/search', 'N/record'],

    function (search) {

        const NoteTypeIds = {
            "Shipping Instructions": 10,
            "Printed Documents": 13,
            "Notify Party": 12
        };

        /**
         * Return the currency name for a given list of orders numbers.
         *
         * @param {Array} paramOrders
         *
         * @return {Object[]}
         */
        function execute(parameters) {        

            /* If there is no category parameter or it is an empty array, something is wrong */
            if (!parameters.category || parameters.category === "") {
                return {
                    error: "category parameter is required and can't be empty."
                }
            }

            const categoryId = NoteTypeIds[parameters.category];

            if (categoryId === undefined) {
                return {
                    error: "Unknown note type: " + parameters.category
                }
            }

            if (!parameters.salesOrderNumbers || parameters.salesOrderNumbers.length == 0) {
                return {
                    error: "salesOrderNumbers parameter is required and can't be empty."
                }
            }

            var aFilters = [
                ['transaction.mainline', search.Operator.IS, true], 'AND',
                ['notetype', search.Operator.ANYOF, [categoryId]], 'AND',
                []
            ];

            var nPos = aFilters.length - 1;
            parameters.salesOrderNumbers.forEach(function (soNumber) {
                aFilters[nPos].push(['transaction.numbertext', search.Operator.IS, soNumber]);
                aFilters[nPos].push('OR');
            });
            aFilters[nPos].pop();

            var oSearch = search.create({
                type: search.Type.NOTE,
                filters: aFilters,
                columns: [
                    search.createColumn({
                        name: 'note'
                    })                
                ]
            });


    ​
            var results = [];
            oSearch.run().each(function(oResult) {
                results.push(oResult.getValue({ name: 'note' }));
                return true;
            });

            return results;
        }

    return {
        execute: execute
    }
});
