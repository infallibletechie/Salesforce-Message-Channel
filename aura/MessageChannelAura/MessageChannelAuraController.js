({
    
    onMessageReceive : function( component, message, helper ) {
        
        if ( message != null ) 
        	component.set( "v.ReceivedMessage", 
                          ( message.getParam( "variable1" ) + " - " + message.getParam( "variable2" ) ) );

    },
    
    publish: function( component, event, helper ) {
        var payload = {
            variable1: "Sample",
            variable2: "From Aura Component"
        };

        component.find( "sampleMessageChannel" ).publish( payload );
        
    }
    
})