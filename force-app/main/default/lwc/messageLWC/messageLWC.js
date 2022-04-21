/**
 * @description       : 
 * @author            : Manish_pal@Epam.com
 * @group             : 
 * @last modified on  : 04-21-2022
 * @last modified by  : Manish_pal@Epam.com
**/
import { LightningElement, track, wire } from 'lwc';
import messageDemo from '@salesforce/messageChannel/messageDemo__c'; // imported from messageChannel and then messageChannel api name
// Need to import other properties from lightning/messageService
import {APPLICATION_SCOPE, createMessageContext, MessageContext, publish, releaseMessageContext, subscribe, unsubscribe } from 'lightning/messageService';

/*
APPLICATION_SCOPE -> defines a message with application scope i.e msg can be received anywhere in a single application

createMessageContext -> used to create the message context. (as MEssageContext property is not directly available on the service component )
releaseMessageContext  -> used to release the message context as by default it's not released in service component

MessageContext -> it's a wired adaptor that creates a message context to send or receive a message

publish -> used to send a message
subscribe - > unsubscribe from a message
*/
export default class MessageLWC extends LightningElement {

   @track messages = [];

   @wire(MessageContext) msgContext;

   subscription = null;

  
    //As soon as my component loads I want to subscribe to this message channel
    connectedCallback() {
      //checking if the subscription is null
        if (!this.subscription) {
          this.subscription = subscribe(
            this.msgContext,
            messageDemo,
            msg => {
              this.messageHandler(msg);
            },
            { scope: APPLICATION_SCOPE }
          );

          console.log('subscription value', this.subscription);
        }
      }

    disconnectedCallback(){

        unsubscribe(this.subscription);
        this.subscription = null;
    }



    sendHandler() {

        const inputElement = this.template.querySelector("lightning-input");
        if(inputElement) {

            const msg = inputElement.value;
            this.messages.push({
                id: this.messages.length,
                value: msg,
                from: 'LWC'
            });

            //publish message using LMS
            
            //constructing message
            const messagePayload = {

                message : msg,
                from:"LWC"
            };

            publish(this.msgContext, messageDemo, messagePayload);  // messageContext, message channel, message payload

            inputElement.value = '';
        }

     
        

    }

    messageHandler(msgPayload){

        //something with message
        if (msgPayload && msgPayload.from !== "LWC") {
            console.log('value of the payload received via Aura is ', msgPayload.message)
            this.messages.push({
              id: this.messages.length,
              value: msgPayload.message,
              from: msgPayload.from
            });
          }
    }
}