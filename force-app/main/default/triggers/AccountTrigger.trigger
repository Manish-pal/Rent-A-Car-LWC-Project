/**
 * @description       : 
 * @author            : Manish_pal@Epam.com
 * @group             : 
 * @last modified on  : 04-19-2022
 * @last modified by  : Manish_pal@Epam.com
**/
trigger AccountTrigger on Account (before insert, before update, after insert, after update, after delete) {

    if(Trigger.isInsert && Trigger.isBefore) {

        //populating billing address into the account shipping address
        for( Account acc : Trigger.New) {

            if(acc.BillingStreet != null){

                acc.ShippingStreet = acc.BillingStreet;
            }
            if(acc.BillingCity != null){ acc.ShippingCity = acc.BillingCity;}
            if(acc.BillingCountry != null){ acc.ShippingCountry = acc.BillingCountry;}
            if(acc.BillingState != null){ acc.ShippingState = acc.BillingState;}

        }
    }
/*========================================================================================================================================*/
/*
    when the Account is updated check all opportunities related to the account.
    Update all Opportunities Stage to close lost 
    if an opportunity created date is greater than 30 days from today and stage not equal to close won.
*/
    if(Trigger.isUpdate && Trigger.isAfter) {

        Set<Id> UpdatedAccIds = new Set<Id>();

        for(Account acc : Trigger.new) {

            UpdatedAccIds.add(acc.Id);
        }

        DateTime day30 = System.now()-30;
        List<Opportunity> oppToBeUpdated = new List<Opportunity>();

        List<Opportunity> oppList = [SELECT Id, StageName, CreatedDate from OPPORTUNITY WHERE AccountId IN : UpdatedAccIds];
        //oppList has now all the opportunities which are associated with the newly updated account records.
        if(oppList.size() > 0) {
            for(Opportunity opp : oppList) {

                if(opp.createdDate > day30 && opp.StageName != 'Closed Won') {

                    opp.StageName = 'Closed Lost';
                    opp.CloseDate = System.today();
                    oppToBeUpdated.add(opp);
                }
            }

        }

        //Checking if the list in not empty and has data
        if(oppToBeUpdated.size() > 0){

            update oppToBeUpdated;
        }

    }
/*========================================================================================================================================*/
/* 
Once an Account is inserted an email should go to the System Admin user with specified text below.
An account has been created and the name is “Account Name”.
*/
    if(Trigger.isInsert && Trigger.isAfter) {

        //To send list of Emails
        List<Messaging.SingleEmailMessage> mailsToSendList = new List<Messaging.SingleEmailMessage>();

        //Query to get the email of the System admin user
        User userobj = [SELECT id, Profile.Name, Email from User where Profile.Name = 'System Administrator' ];

        for(Account acc : Trigger.new) {

            //Checking if the email is not null
            if(userobj.email != null) {

                Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
                mail.setSenderDisplayName('Salesforce Account Trigger');
                //Making all the below fields as false as they are not needed
                mail.setUseSignature(false);
                mail.setBccSender(false);
                mail.setSaveAsActivity(false);
                
                //Assigning the receiver email address
                mail.setToAddress = new String[]{userobj.Email};
                mail.setSubject('New Account was Created in Jiraya Org');

                //Variable to Write the body of the email
                String body = 'Dear System Admin, <br/>';
                body += 'An Account has been created and the name is ' + acc.Name +'.';
                //assignning the body variable to the html message
                mail.setHtmlBody(body);

                mailsToSendList.add(mail);
            }
        }

        if(mailsToSendList.size() > 0) {

            Messaging.sendEmailResult[] results = Messaging.sendEmails(mailsToSendList);
            
            //we are checking if the mails are sent or not.
            if(results[0].success){

                System.debug('The Email was sent Successfully');
            } else {

                System.debug('The Email failed to send: ' + results[0].errors[0].message);
            }

        }
    }

/*========================================================================================================================================*/
 /*Once an Account will update then that Account will update with the total amount from All its Opportunities on the Account Level.*/
 
 if(Trigger.isUpdate && Trigger.isBefore) {

    //getting all the accounts id which are getting updated
    Set<Id> accIdSet = new Set<Id>();

    for(Account accountobj : Trigger.New) {

        accIdSet.add(accountobj.Id);
    }
    //map to get the Account Id and the sum of its related opportunities amount to insert later
    Map<Id, Double> accIdToOppSumAmount = new Map<Id, Double>();

    List<AggregateResult> results = [SELECT AccountId, sum(Amount)TotalAmount from Opportunity WHERE AccountId IN: accIdSet GROUP BY AccountId];

    // Similarly we can count the number of opportunites associate by changing the above aggregate query to 
    //[SELECT AccountId, Count(Id)OppCount from Opportunity WHERE AccountId IN: accIdSet GROUP BY AccountId];  --> Rest all the logic would be same
    
    if(results.size() > 0) {

        for(AggregateResult ar : results) {

            Id accountId = (Id)ar.get(AccountId);
            Double totalAmount = (Double)ar.get(TotalAmount);
            //Populating the Map
            accIdToOppSumAmount.put(accountId, totalAmount);
        }
    }

    //Now populating total amount value in account field
    for(Account acc : Trigger.New) {

        if(accIdToOppSumAmount.containsKey(acc.Id)) {

            //getting the value from map and adding to the account field
            acc.Total_Opportunity_Amount__c = accIdToOppSumAmount.get(acc.Id);

        }
    }

 }

}