/**
 * @description       : 
 * @author            : Manish_pal@Epam.com
 * @group             : 
 * @last modified on  : 04-22-2022
 * @last modified by  : Manish_pal@Epam.com
**/
import { LightningElement } from 'lwc';

export default class UdemyVideosPipeline extends LightningElement {

    todoVideos = [
        {
            id:0,
            title:'Lightning Messaging Service',
            done:true,
            description:'Explain LMS with aura and Lwc Example'
        },
        {
            id:1,
            title:'Explain CSS Modules',
            done:false,
            description:'Share CSS styles among LWC components'
        },
        {
            id:2,
            title:'Check User Permission in LWC',
            done:false,
            description:'Check User Permission in LWC with new "userPermission" modules'
        },
        {
            id:3,
            title:'Check if Component is connected to DOM',
            done:false,
            description:'Check whether a Lightning component is connected to the DOM'
        }
    ]
}