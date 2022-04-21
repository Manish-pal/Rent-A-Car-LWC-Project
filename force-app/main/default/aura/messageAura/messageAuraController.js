/**
 * @description       : 
 * @author            : Manish_pal@Epam.com
 * @group             : 
 * @last modified on  : 04-21-2022
 * @last modified by  : Manish_pal@Epam.com
**/
({
    sendHandler : function(component, event, helper) {

        //sending MEssage from Aura to LWC
        const inputElement = component.find("inputBox");
        if(inputElement) {
            const msg = inputElement.get("v.value");
            console.log('The value of the message in AURA inputbox ==> ',msg);
            const messages = component.get("v.messages");
            console.log('messages initial value  ', messages);
            messages.push({

                id: messages.length,
                value: msg,
                from : "AURA"
            });

            console.log('messages final value  ', messages);
            component.set("v.messages", messages);

            //constrcuting  message payload 
            const messagePayload = {

                messages : msg
            };

            //we need to publish this msg on message channel

            const msgChanel = component.find("messageChannel");
            //in AURA doesn't use messageContext it's taken care by the framework behind the scenes
            msgChanel.publish(messagePayload);

            inputElement.set("v.value","");
        }
        
    },

    messageHandler : function(component, event, helper) {

        //Method Defination goes here
        if(event && event.getParam("message") && event.getParam("from") !== "AURA") {
        //if(event && event.getParam("message")) {
            const msg = event.getParam("message");
            const messages = component.get("v.messages");
            messages.push({
                id: messages.length,
                value: msg,
                from: "LWC"
            });

            component.set("v.messages", messages);
        }
    }
});


