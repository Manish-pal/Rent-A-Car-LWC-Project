/**
 * @description       : 
 * @author            : Manish_pal@Epam.com
 * @group             : 
 * @last modified on  : 04-13-2022
 * @last modified by  : Manish_pal@Epam.com
**/
@isTest
private class CarExperienceTest {
    
    static testmethod void getExperienceObjectData(){
        
        Car_Experience__c carExpObj = new Car_Experience__c();
        carExpObj.Name = 'TEST TITLE';
        carExpObj.Experience__c = 'Test Car Experience it was a wonderful experience';
        carExpObj.car__c = 'a025j0000075N9pAAE';

        insert carExpObj;
        // The following code runs as user u3.
        User u3 = [SELECT Id FROM User WHERE UserName='jiraya1995@epam.com'];
        Test.startTest();
        System.runAs(u3){ //context user
            List<Car_Experience__c> carExpList = CarExperience.getExperiencesDB('a025j0000075N9pAAE');
            System.debug('Size of the list returned '+carExpList.size());
            System.assert(!carExpList.isEmpty(), 'List Should not be empty');
        }
        Test.stopTest();
        
    }

}
