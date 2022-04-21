/**
 * @description       : 
 * @author            : Manish_pal@Epam.com
 * @group             : 
 * @last modified on  : 04-04-2022
 * @last modified by  : Manish_pal@Epam.com
**/
import { LightningElement, api, wire, track } from 'lwc';
import getCarsDB from '@salesforce/apex/CarSearchResultController.getCarsDB';
import { ShowToastEvent} from 'lightning/platformShowToastEvent';


export default class CarSearchResult extends LightningElement {

    @api carTypeId;  //means that this property value will be passed from the markup and handled in the js file i.e here

    @track cars;
    @track selectedCarId;

    //passing the parameter to the wired method
    @wire(getCarsDB, {carTypeId : '$carTypeId'})
    wiredCars({data, error}) {

        if(data) {
            //setting the list of cars
            this.cars = data;
            console.log('Data received in the carSearchResult Component is  ' + this.cars);

        } else if(error) {

            console.log('Error Occured in the carSearchResult js file');
            this.showToastEvent('ERROR', error.body.message, 'error');

        }
    }

    get carsFound() {

        if(this.cars) {
            return true;
        }else {
            return false;
        }
    }

    carSelectHandler(event) {

        const carId = event.detail;
        this.selectedCarId = carId;

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