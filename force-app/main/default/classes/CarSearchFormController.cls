/**
 * @description       : 
 * @author            : Manish_pal@Epam.com
 * @group             : 
 * @last modified on  : 04-04-2022
 * @last modified by  : Manish_pal@Epam.com
**/
public with sharing class CarSearchFormController {
    
    @AuraEnabled(cacheable=true)
    public static List<Car_Type__c> getCarTypesDB(){
        try {

            return [SELECT Id, Name FROM Car_Type__c];
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
