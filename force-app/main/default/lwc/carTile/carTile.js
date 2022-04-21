/**
 * @description       : 
 * @author            : Manish_pal@Epam.com
 * @group             : 
 * @last modified on  : 04-11-2022
 * @last modified by  : Manish_pal@Epam.com
**/
import { LightningElement, api, wire } from 'lwc';
import{ CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';

export default class CarTile extends LightningElement {
//This comp has to accept the car obj which will be supplied by the carSearchResult component. 

@api car;
@api carSelectedId;

@wire(CurrentPageReference) PageRef;

handleCarSelect(event) {

    event.preventDefault();  // ensures that the default action of anchor tag is prevented.
    const carId = event.detail.id;

    const carSelect = new CustomEvent('carselect', {detail:carId});
    this.dispatchEvent(carSelect);

    //firing pubsub event so that the carDetails comp can get the carId
    //fireEvent(this.PageRef, 'carselect', this.car.Id);
    fireEvent(this.PageRef, 'carselect', this.car);

    this.dispatchEvent(fireEvent);

}

//creating a getter property to verify if the car selected Id is same
get isCarSelected() {

    if(this.car.id === this.carSelectedId) {

        return "tile selected";
    }
    return "tile";
}

}