import { LightningElement, wire } from 'lwc';
import { subscribe, publish, MessageContext, APPLICATION_SCOPE } from 'lightning/messageService';
import SAMPLEMC from "@salesforce/messageChannel/SampleChannel__c";

export default class MessageChannelLWC extends LightningElement {

    @wire(MessageContext)
    messageContext;
    receivedMessage;
    subscription = null;

    handleClick() {

        const message = {
            variable1: "Test",
            variable2: "From LWC"
        };
        publish( this.messageContext, SAMPLEMC, message);

    }

    subscribeMC() {

        if (this.subscription) {
            return;
        }
        this.subscription = subscribe(
            this.messageContext,
            SAMPLEMC, ( message ) => {
                this.handleMessage( message );
            },
            {scope: APPLICATION_SCOPE});

    }

    unsubscribeMC() {

        unsubscribe( this.subscription );
        this.subscription = null;

    }

    handleMessage( message ) {

        this.receivedMessage = message ? JSON.stringify( message, null, '\t' ) : 'no message payload';

    }

}