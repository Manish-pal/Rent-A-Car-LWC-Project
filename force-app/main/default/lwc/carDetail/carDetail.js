/**
 * @description       : 
 * @author            : Manish_pal@Epam.com
 * @group             : 
 * @last modified on  : 04-05-2022
 * @last modified by  : Manish_pal@Epam.com
**/
import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';


export default class CarDetail extends NavigationMixin(LightningElement) {
    
    @api car;  // this is coming from parent component

    fullDetails() {

        console.log('Car Property data > ', this.car);
        this[NavigationMixin.Navigate]({
            type:"standard__recordPage",
            attributes:{
                recordId : this.car.data.fields.Id.value,
                objectApiName : "Car__c",
                actionName : "view"
                 
            }
        });
    }

    get carName() {

        try{
            return this.car.data.fields.Name.value;
        }catch(error){
            return 'NA';
        }
    }

    get carMileage() {

        try{
            return this.car.data.fields.Mileage__c.value;
        }catch(error){
            return 'NA';
        }
    }

    get carPerDayRent() {

        try{
            return this.car.data.fields.Per_Day_Rent__c.value;
        }catch(error){
            return 'NA';
        }
    }

    get carBuildYear() {

        try{
            return this.car.data.fields.Build_Year__c.value;

        }catch(error){
            return 'NA';
        }
    }

    get carContactName() {

        try{
            return this.car.data.fields.Contact__r.Name.value;

        }catch(error){
            return 'NA';
        }
    }

    get carContactEmail() {

        try{
            return this.car.data.fields.Contact__r.Email.value;

        }catch(error){
            return 'NA';
        }
    }

    get carContactPhone() {

        try{
            return this.car.data.fields.Contact__r.HomePhone.value;

        }catch(error){
            return 'NA';
        }
    }
    get carTypeName() {

        try{
            return this.car.data.fields.Contact__r.Name.value;

        }catch(error){
            return 'NA';
        }
    }

    
    get carPictureUrl() {

        try{
            return this.car.data.fields.Picture__c.value;

        }catch(error){
            return 'NA';
        }
    }

}