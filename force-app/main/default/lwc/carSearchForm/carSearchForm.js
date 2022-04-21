/**
 * @description       : 
 * @author            : Manish_pal@Epam.com
 * @group             : 
 * @last modified on  : 04-05-2022
 * @last modified by  : Manish_pal@Epam.com
**/
import { LightningElement, track, wire } from 'lwc';
import getCarTypesDB from '@salesforce/apex/CarSearchFormController.getCarTypesDB';
import { ShowToastEvent} from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';



export default class CarSearchForm extends NavigationMixin(LightningElement) {

   
    @track carTypes;

    @wire(getCarTypesDB)
    wiredCarTypes({data, error}) {

        this.carTypes = [{label:'All Types', value:''}];

        if(data) {
            //Change the received data into label and value format
            data.forEach(element =>{

                const carType = {};
                carType.label = element.Name;
                carType.value = element.Id;

                //pushing the carType object into the carTypes array.
                this.carTypes.push(carType);

            });

        } else if(error) {

            this.showToastEvent('ERROR', error.body.message, 'error');
        }
    }

    handleCarTypeChange(event) {

        // getting the selected cartype Id which will be passed via an event to the parent cmp.
        const carTypeId = event.detail.value;
        console.log('Car type Id received in CarSearchForm Js file is =: ', carTypeId);

        //Custom event fired
        const carTypeSelectionChangeEvent = new CustomEvent('cartypeselect', {detail:carTypeId});
        console.log('custom event before firing  =: ', carTypeSelectionChangeEvent);

        this.dispatchEvent(carTypeSelectionChangeEvent);

    }

    createNewCarType(){
        // We need to show the popup to show the user to add a new car type 
        // using the navigation mixin library to achieve that

        //once imported the library we need to create a page reference and then use navigate method to reach 

        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes:{
                objectApiName : 'Car_Type__c',
                actionName : 'new' 
            }

        })
    }

    showToastEvent(title, message, variant) {

        const evt = new ShowToastEvent({

            title:title,
            message:message,
            variant:variant,
        });
        this.dispatchEvent(evt); 
    }
}