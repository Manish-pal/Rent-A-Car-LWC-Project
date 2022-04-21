/**
 * @description       : 
 * @author            : Manish_pal@Epam.com
 * @group             : 
 * @last modified on  : 04-11-2022
 * @last modified by  : Manish_pal@Epam.com
**/
import { LightningElement, track, api,  wire } from 'lwc';
import { registerListener, unregisterAllListeners } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';
// using leaflet to load the css and js from it to initialize map "we already have the static resources"
import LL from '@salesforce/resourceUrl/Leaflet';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader'; //both these methods returns a promise which we need to handle

import { ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class CarLocation extends LightningElement {

    @track car;

    @wire(CurrentPageReference) pageRef;

    //using a 3rd party library

    leafLetLoaded = false;  //private property for checking if the styles and scripts are loaded
    leafLetMap;

    connectedCallback(){
        registerListener('carselect', this.fetchCarDetails, this) // eventname, callback method, current instance

    }

    renderedCallback() {
        if(!this.leafLetLoaded){

            //Promise.all([]) --> passing the array of promises to get response from
            Promise.all([
                //current instance, static resource name (or Import property name which is LL), css file or script file you want to import
                loadStyle(this, LL+'/leaflet.css'),
                loadScript(this,LL+'/leaflet-src.js')  
            ]).then(()=>{
                this.leafLetLoaded = true;
            }).catch((error => {

                this.showToastEvent('Error Occured', error.body.message,'error');
            }))
        }
    }

    //callback method
    fetchCarDetails(payload) {
        this.car = payload;
        if(this.leafLetLoaded){
            if(!this.leafLetMap){

                const map = this.template.querySelector('.map');
                if(map) {
                    this.leafletMap = L.map(map, {zoomControl : true} ).setView([42.356045, -71.085650], 13);
                    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {attribution : 'Tiles For Rent A Car'}).addTo(this.leafletMap);
                }

                if(this.car){
                    const location = [this.car.Geolocation__latitude__s, this.car.Geolocation__longitude__s];

                    const leafletMarker = L.marker(location);
                    leafletMarker.addTo(this.leafletMap);
                    this.leafletMap.setView(location);
                }
            }

        }

    }


    disconnectedCallback(){
        unregisterAllListeners(this);

    }



    showToastEvent(title, message, variant){

        const evt = new ShowToastEvent({

            title:title,
            message:message,
            variant:variant
        });

        this.dispatchEvent(evt);
    }

    get hasCar(){

        if(this.car) {
            return 'slds-is-expanded';
        }
        return 'slds-is-collpased';
    }

}