var notification = {
    // Variables
    name : 'Notification | ',
    debug: true,
    sw : false,

    // Init
    init: function(){
        if(this.debug)
        console.log(this.name + 'Loading ...')

        this.ask()
    },

    // Event Listeners
    addEventListeners : function(){

    },

    // So some stuff
    magic: function(){

    },

    // Req.
    ask : function(){
        var that = notification

        if(that.debug)
        console.log(that.name + 'Checking for Debug')

        // Check for Service Worker
        if('serviceWorker' in window.navigator){
            that.sw = true
            console.log(that.name + 'Service Worker found')
        }


    }


}


notification.init()
