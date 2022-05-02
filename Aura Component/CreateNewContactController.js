({
    clickCreate : function(component, event, helper) {
        let validContact = component.find('contactform').reduce(function (validSoFar,inputField){
            inputField.showHelpMessageIfInvalid();
            return validSoFar && inputField.get('v.validity').valid;
        },true);
        
        if(validContact){
            let newContact = component.get('v.newContact');
            console.log("Create contact: " + JSON.stringify(newContact));
            
            let action = component.get('c.createContact');
            action.setParams({
                'con': newContact
            });
            action.setCallback(this, function(response){
                let state = response.getState();
                if (state === "SUCCESS") {
                    component.set("v.newContact", { 'sobjectType': 'Contact',
                             'Name': '',
                             'First Name': '',
                             'Last Name': '',
                             'Email': '',
                             'Phone': '',
                             'Fax': '',
                             'Experience':''
                             });
                    alert('Success')
                    
                }else{
                    alert('Error');
                }
            });
            $A.enqueueAction(action);
        }
    }
})