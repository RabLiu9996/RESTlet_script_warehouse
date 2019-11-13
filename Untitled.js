/**
 * Copyright (c) 2018, Oracle and/or its affiliates. All rights reserved.
 * otherwise make available this code.
 *
 * @NApiVersion 2.x
 * @NModuleScope Public
 */


 /**
  * This service is used for working with Entity bank records. It uses DAO to fetch records.
  */
 define(['../../data/11187_EntityBankDetailsDAO',
    '../../data/11187_PaymentFileFormatDAO',
    '../../data/9997_EntityDAO'
],

 function(entityBankDetailsDao, pffDao, entityDao){

     var PAYMENT_TYPE_TO_ENTITY_TYPE_MAPPING = {
         customerpayment: 'customer', vendorpayment: 'entity', expensereport: 'entity'
     };

     var ENTITY_DAO_SETTINGS = {
         entity : 'retrieveEFTEntities',
         customer : 'retrieveDDEntities'
     };
    /**
    * Get a list of entity bank details derived from a payment rec. The payment's entity, its type and id, is unknown
    *
    * @param {Record} paymentRec - the payment record.
    * @returns Object containing {
    *   [entity bank id] : [{ [refFieldLabel]: refFieldValue }],
    *   [entity bank id2] : [{ [refFieldLabel2]: refFieldValue2 }],
    *   ...
    * }
    */
    function getEntityBankDetailsForPaymentRecord(paymentRec){
        // Payment record is linked to an entity record
        // If that entity record has its 'EP eft bill payment' or 'EP customer payment' fields checked,

        var entityType = PAYMENT_TYPE_TO_ENTITY_TYPE_MAPPING[paymentRec.type] || 'entity';
        try {
            var entityDaoMethod = ENTITY_DAO_SETTINGS[entityType];
            var retrievedEntity = entityDao[entityDaoMethod]([paymentRec.getValue({fieldId: entityType})])[0];
            return entityBankDetailsDao.getAllWhereParentRecordEqualsPaymentEntityId({
                entityId: retrievedEntity.id, parentEntityType: retrievedEntity.recordType })
                .reduce(combineEntityBankAndRefFields, {});
        }
        catch(ex){
            log.error({title: 'getEntityBankDetailsForPaymentRecord',
                details: 'Got error while loading getEntityBankDetailsForPaymentRecord. '+ JSON.stringify(ex)});
            throw ex;
        }

    }


    /**
     * Entity Bank Detail records contain fields referencing the entity or customer where it is attached to.
     * parent_customer, parent_vendor, parent_employee, or parent_partner.
     *
     * Given a payment's entity type and entity id we will retrieve all entity bank details
     * that have matching parent_<entity_type> field
     *
     * @param  {type} payment.entityType description
     * @param  {type} payment.entityId description
     * @return {type}         description
     */
    function fetchEntityBankDetailsForPayment(payment){
        var entityDaoMethod = ENTITY_DAO_SETTINGS[payment.entityType];
        var retrievedEntity = entityDao[entityDaoMethod]([payment.entityId])[0];
        return entityBankDetailsDao.getAllWhereParentRecordEqualsPaymentEntityId({
            entityId: payment.entityId, parentEntityType: retrievedEntity.recordType })
            .reduce(combineEntityBankAndRefFields, {});
    }


    /**
     * This is intended to be used as a function parameter to reduce call but this can also be used in single execution
     * We pass in an entity bank record reference. We fetch each entity bank detail's payment file format along with tis
     * reference fields list. Using the fetched list, we format a string representation containing its details, name, id
     * which can be used for display. A 'primary' attribute will also be set if the entity bank has a primary bank present.
     *
     * @param  {Object} acc        accummulated value used in Array.reduce function. Use {} during single execution
     * @param  {Record} entityBank reference to an entity bank record
     * @return {Object}            mutated acc object with form
     * {
     *   id1 :  { name: 'name1', details: '[refFieldLabel1]: refFieldValue <br /> [refFieldLabe2]: refFieldValue2' },
     *   id2 :  { name: 'name2', details: '[refFieldLabel1]: refFieldValue <br /> [refFieldLabe2]: refFieldValue2' },
     *   primary : id1
     * }
     */
     // TODO: Check if this needs to be adjusted when ref field translation is implemented.
    function combineEntityBankAndRefFields(acc, entityBank){
        // search for the list of entity bank details and return an object mapping of the entitybankid to reffields values
        var pffRecord = pffDao.retrieveNsRecord(entityBank.getValue({fieldId: 'custrecord_2663_entity_file_format'}));
        var refFieldsList = pffDao.convertRefFieldXMLtoObject(pffRecord.getValue({fieldId: 'custrecord_2663_entity_ref_fields'}));
        log.debug('refFieldsObj', JSON.stringify(refFieldsList));
        acc[entityBank.id] = {};
        acc[entityBank.id]['details'] = refFieldsList.refFields.refField.map(function(refFieldContainer){
            var refField = refFieldContainer.attributes;
            return refField.label + ' : ' + entityBank.getValue({fieldId: refField.id});
        }).join('<br />');
        acc[entityBank.id]['name'] = entityBank.getValue({fieldId: 'name'});
        if(entityBank.getValue({fieldId: 'custrecord_2663_entity_bank_type'}) == 1 /*PRIMARY*/){
            acc['primary'] = entityBank.id + '';
        }
        return acc;
    }


    /**
     * Fetch the Entity Bank Details ref fields and values and format them for display
     *
     * @param  {Number} preferredBankId Entity bank detail id
     * @return {Object} entity bank details object in the form
     * {
     *    details: 'labela: refffieldvaluea <br /> labelb: reffieldvalueb < br /> reffieldvaluec',
     *    name: 'namea'
     * }
     *
     */
    function getEntityBankDetailsForPreferredBank(preferredBankId){
        return combineEntityBankAndRefFields({}, entityBankDetailsDao.load(preferredBankId))[preferredBankId];
    }

    return {
     getEntityBankDetailsForPaymentRecord: getEntityBankDetailsForPaymentRecord,
     getEntityBankDetailsForPreferredBank: getEntityBankDetailsForPreferredBank,
     fetchEntityBankDetailsForPayment: fetchEntityBankDetailsForPayment
    }
 });
