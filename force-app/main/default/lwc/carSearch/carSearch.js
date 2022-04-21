/**
 * @description       : 
 * @author            : Manish_pal@Epam.com
 * @group             : 
 * @last modified on  : 04-04-2022
 * @last modified by  : Manish_pal@Epam.com
**/
import { LightningElement, track } from 'lwc';

export default class CarSearch extends LightningElement {


    @track carTypeId;


    carTypeSelectHandler(event) {

        console.log('Inside car Search parent component and the value for the carTypeId received is =: ', event.detail);
        // this event is coming from the child comp.
        this.carTypeId = event.detail;
    }
}