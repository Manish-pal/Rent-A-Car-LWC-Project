/**
 * @description       : 
 * @author            : Manish_pal@Epam.com
 * @group             : 
 * @last modified on  : 04-08-2022
 * @last modified by  : Manish_pal@Epam.com
**/
public with sharing class CarExperience {
 

    //as we would not be using the wire adaptor to call this method hence no need to make it cacheable
    @AuraEnabled
    public static List<Car_Experience__c> getExperiencesDB(String carId){
     

            List<Car_Experience__c> recordToReturn = [SELECT Id,
            Name,
            Experience__c,
            LastModifiedDate,
            CreatedDate,
            CreatedBy.Name,
            CreatedBy.SmallPhotoUrl,
            CreatedBy.CompanyName
       FROM Car_Experience__c
       WHERE Car__c  = :carId
       ORDER BY CreatedDate DESC];

            System.debug('Returned values is > '+ recordToReturn);
            
            return [SELECT Id,
            Name,
            Experience__c,
            LastModifiedDate,
            CreatedDate,
            CreatedBy.Name,
            CreatedBy.SmallPhotoUrl,
            CreatedBy.CompanyName
       FROM Car_Experience__c
       WHERE Car__c  = :carId
       ORDER BY CreatedDate DESC];

                    
                     
        
    }
}
