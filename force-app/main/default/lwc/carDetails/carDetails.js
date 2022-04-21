/**
 * @description       : 
 * @author            : Manish_pal@Epam.com
 * @group             : 
 * @last modified on  : 04-16-2022
 * @last modified by  : Manish_pal@Epam.com
**/
import { LightningElement, track, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import { registerListener } from 'c/pubsub';
import { unregisterAllListeners } from 'c/pubsub';
import{ CurrentPageReference } from 'lightning/navigation';

import custlabel from '@salesforce/label/c.myCustomLabel';



import CAR_ID from '@salesforce/schema/Car__c.Id';
import CAR_NAME from '@salesforce/schema/Car__c.Name';
import CAR_MILEAGE from '@salesforce/schema/Car__c.Mileage__c';
import CAR_PER_DAY_RENT from '@salesforce/schema/Car__c.Per_Day_Rent__c';
import CAR_BUILD_YEAR from '@salesforce/schema/Car__c.Build_Year__c';
import CAR_PICTURE from '@salesforce/schema/Car__c.Picture__c';
import CAR_CONTACT_NAME from '@salesforce/schema/Car__c.Contact__r.Name';
import CAR_CONTACT_EMAIL from '@salesforce/schema/Car__c.Contact__r.Email';
import CAR_CONTACT_PHONE from '@salesforce/schema/Car__c.Contact__r.HomePhone';
import CAR_CARTYPE_NAME from '@salesforce/schema/Car__c.Contact__r.Name';

// we will be passing this array to the wiredmethod wiredCar so as to fetch the fields defiend in the array
const fields = [
    CAR_ID,
    CAR_NAME,
    CAR_MILEAGE,
    CAR_PER_DAY_RENT,
    CAR_BUILD_YEAR,
    CAR_PICTURE,
    CAR_CONTACT_NAME,
    CAR_CONTACT_EMAIL,
    CAR_CONTACT_PHONE,
    CAR_CARTYPE_NAME
]


export default class CarDetails extends LightningElement {

   @track carId;  //Making this as track property coz on car click we would like to update the car experience section 
    

    @wire(getRecord, {recordId : '$carId', fields})
    wiredCar;

    @wire(CurrentPageReference) pageRef;
    @track selectedTabValue;

    label = {custlabel};

   //=========================================================================

    connectedCallback(){
        // first param will be the event we want to listen for, 2nd will be a callback method, 3rd will be current page reference 
        registerListener('carselect',this.callbackmethod, this);
    }


    callbackmethod(payload) {
        // this method sets the carId/whatever value we need to set\
        console.log('The payload value is =:', payload)
        this.carId = payload.Id;


    }


    disconnectedCallback(){
        // when the component is destroyed or not the part of page dom
        unregisterAllListeners(this);
    }
    
//===========================================================================


    // sets the currently selected tab value to selectedTabValue
    tabChangeHandler(event) {
        console.log('tab change handler Clicked! selected value is ', event.target.value);
        this.selectedTabValue = event.target.value;
        

    }

    experienceAddedHandler(event) {

        //before calling the getCarExperiences() method we need to get the <c-car-experience> component 
        //using query selector for getting it
        const carExperienceComponent = this.template.querySelector('c-car-experiences');
        if(carExperienceComponent) {
            carExperienceComponent.getCarExperiences(); //this is a public method 
        }

        //Changing the tab selected value to move to the "view experiences section"
        this.selectedTabValue = 'viewexperience';
    }


    //get property to determine if the car data is there then show the tab set section on carDetails Markup
    get carFound() {
        if(this.wiredCar.data){
            return true;
        }
        return false;

    }

    

    
}