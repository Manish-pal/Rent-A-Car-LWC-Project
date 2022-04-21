/**
 * @description       : 
 * @author            : Manish_pal@Epam.com
 * @group             : 
 * @last modified on  : 04-08-2022
 * @last modified by  : Manish_pal@Epam.com
**/
import { LightningElement, api, track } from 'lwc';
import getExperiencesDB from '@salesforce/apex/CarExperience.getExperiencesDB';
import { ShowToastEvent} from 'lightning/platformShowToastEvent';

import { NavigationMixin } from 'lightning/navigation';

export default class CarExperiences extends NavigationMixin(LightningElement) {

    /* 
    will no longer use the public property instead will be using getter and setter as when ever this public property change
    I want to call the getExperiencesDB method to load the new car experience method
    
    @api carId;

    */
    privateCarId;

    //tracking the car Experiences and making it at array so as to check the length of it.
    //@track carExperiences;
    @track carExperiences = [];
    
    //Using connected callback as whenever this component is loaded we need to show all the Experiences
    connectedCallback(){
        // we will make a call to the method which will bring all the experience records from the server
        this.getCarExperiences();
    }

    @api
    get carId(){
        console.log('gettter called returning the value', this.privateCarId);
        return this.privateCarId;
    }

    set carId(value){
       
        this.privateCarId = value;
        console.log('Setter called for setting the privateCarId value  >  ', this.privateCarId);
        this.getCarExperiences();
    }

    @api
    getCarExperiences() {

        //getExperiencesDB({carId : this.carId}).then((experiences) =>{
            getExperiencesDB({carId : this.privateCarId}).then((experiences) =>{
            console.log('GetExperiences Called from the method and successfull results fetched are ', experiences);
            // adding the fetched results from the Apex to carExperience Property
            this.carExperiences = experiences;

        }).catch(error =>{

            this.showToastEvent('ERROR', error.body.message, 'error');
        })

    }

    userClickHandler(event) {

        const userID = event.target.getAttribute('data-userid');
        this[NavigationMixin.Navigate]({

            type : "standard__recordPage",
            attributes : {
                recordId : userID,
                objectApiName : "User",
                actionName : "view",


            }
        });

    }

    get hasExperiences(){
        console.log('checking the experiences list ', this.carExperiences);
        if(this.carExperiences.length > 0){
            return true;
        }
        console.log('else part experiences list ', this.carExperiences);
        return false;
    }


    showToastEvent(title, message, variant) {

        const evt = new ShowToastEvent({

            title : title,
            message : message,
            variant : variant
        });

        this.dispatchEvent(evt);
    }

}