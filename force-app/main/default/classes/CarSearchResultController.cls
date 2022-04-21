/**
 * @description       : 
 * @author            : Manish_pal@Epam.com
 * @group             : 
 * @last modified on  : 04-04-2022
 * @last modified by  : Manish_pal@Epam.com
**/
public with sharing class CarSearchResultController {
    

    @AuraEnabled(cacheable=true)
    public static List<Car__c> getCarsDB(String carTypeId){
        try {
            if(String.isEmpty(carTypeId)) {

                return [SELECT id, Name, Picture__c, Contact__r.Name, Geolocation__latitude__s, Geolocation__longitude__s 
                        FROM Car__c 
                        WHERE Available_For_Rent__c = true];
            } else{

                return [SELECT id, Name, Picture__c, Contact__r.Name, Geolocation__latitude__s, Geolocation__longitude__s 
                FROM Car__c 
                WHERE Available_For_Rent__c = true 
                AND Car_type__c =: carTypeId];

            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
