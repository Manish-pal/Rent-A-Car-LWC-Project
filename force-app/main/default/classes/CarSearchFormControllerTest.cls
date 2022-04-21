/**
 * @description       : 
 * @author            : Manish_pal@Epam.com
 * @group             : 
 * @last modified on  : 04-14-2022
 * @last modified by  : Manish_pal@Epam.com
**/
@isTest 
private class CarSearchFormControllerTest {

    @isTest
    static void getCarTypeDBTest(){
        
        Car_Type__c carType = new Car_Type__c();
        carType.Name = 'Sports';
        insert carType;

        User contextuser = [SELECT Id FROM User WHERE UserName='jiraya1995@epam.com']; 
        Test.startTest();
        
        System.runAs(contextuser){
            
            List<Car_Type__c> carTypeList = CarSearchFormController.getCarTypesDB();
            System.assertEquals(1,carTypeList.size());
        }
        Test.stopTest();
        
    }


    @isTest
    static void throwExceptionWhileGettingCarTypes(){
        

        Test.startTest();

        List<Car_Type__c> carTypeList = CarSearchFormController.getCarTypesDB();

        Test.stopTest();

    }
}