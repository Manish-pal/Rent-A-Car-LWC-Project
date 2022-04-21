/*
 * @description       : 
 * @author            : Manish_pal@Epam.com
 * @group             : 
 * @last modified on  : 04-08-2022
 * @last modified by  : Manish_pal@Epam.com
**/
import { LightningElement, api, track } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';

//Defining the hard reference to the fields we would be passing 
import NAME_FIELD from '@salesforce/schema/Car_Experience__c.Name';
import EXPERIENCE_FIELD from '@salesforce/schema/Car_Experience__c.Experience__c';
import CAR_FIELD from '@salesforce/schema/Car_Experience__c.Car__c';
import EXPERIENCE_OBJECT from '@salesforce/schema/Car_Experience__c';

import { ShowToastEvent} from 'lightning/platformShowToastEvent';



export default class AddCarExperience extends LightningElement {

    expTitle = '';
    expDescription = '';
    
    @api carId;
    
    
    handleTitleChange(event){

        this.expTitle = event.detail.value;
    }


    handleDescriptionChange(event){

        this.expDescription = event.detail.value;
    }


    addExperience() {

        // we will use the create Record method of Lightning data service to push record into our salesforce org.

        const fields = {};

        fields[NAME_FIELD.fieldApiName] = this.expTitle;
        fields[EXPERIENCE_FIELD.fieldApiName] = this.expDescription;
        fields[CAR_FIELD.fieldApiName] = this.carId;

        // this is the parmameters which will be consumed by the createRecord method
        const recordInput = {apiName : EXPERIENCE_OBJECT.objectApiName, fields}
        createRecord(recordInput).then((carExperience) => {

            console.log('Records Inserted Success Toast should be visible now');
            this.showToastEvent('SUCCESS','Experience Record Updated Successfully!', 'success');

            //Adding this custom event after adding the exp for the selected car which will be handled by parent cmp. "carDetails"
            const recordAdded = new CustomEvent('experienceadded');
            this.dispatchEvent(recordAdded);


        }).catch(error =>{
            this.showToastEvent('ERROR',error.body.message,'error');
            console.log('Error Occured while calling createRecord method ', error.body.message);

        })

        
        
    }

    //For Showing Toast messages
    showToastEvent(title, message, variant) {

        const evt = new ShowToastEvent({
            title : title,
            message : message,
            variant : variant
        });
        this.dispatchEvent(evt);
    }


}