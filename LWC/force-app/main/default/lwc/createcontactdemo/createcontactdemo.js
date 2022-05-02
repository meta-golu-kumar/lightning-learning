import { LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import LAST_NAME_FIELD from '@salesforce/schema/Contact.LastName';
import EXPERIENCE_FIELD from '@salesforce/schema/Contact.Experience__c';
import FIRST_NAME_FIELD from '@salesforce/schema/Contact.FirstName';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
export default class Createcontact extends LightningElement {
    firstName = '';
    lastName = '';
    email = '';
    contactId;
    experience = 0;
    handleFNameChange(event) {
        this.firstName = event.target.value;
    }
    handleLNameChange(event) {
        this.lastName = event.target.value;
    }
    handleEmailChange(event) {
        this.email = event.target.value;
    }
    handleExperienceChange(event) {
        this.experience = event.target.value;
    }

    createContact() {
        const fields = {};
        fields[FIRST_NAME_FIELD.fieldApiName] = this.firstName;
        fields[LAST_NAME_FIELD.fieldApiName] = this.lastName;
        fields[EMAIL_FIELD.fieldApiName] = this.email;
        fields[EXPERIENCE_FIELD.fieldApiName] = this.experience;
        const recordInput = { apiName: CONTACT_OBJECT.objectApiName, fields };
        console.log(recordInput);
        createRecord(recordInput)
            .then(contact => {
                this.contactId = contact.id;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Account created',
                        variant: 'success',
                    }),
                );
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
            });
    }

}