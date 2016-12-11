var G = {
    name: 'G FMWK ',
    debug: true,

    scrolldown_props : {
        animation : 'easeInOutCubic',
        time: 1300
    },


    init: function(){

        this.addEventListener()

        if(this.debug)
        console.log(this.name + ' has been loaded...')
    },


    /*
        The Event Listener contructor
    */
    addEventListener: function(){
        $(document).on('click', '.scrolldown', this.scrolldown);
    },


    /*
        Scroll Down
    */
    scrolldown : function(EventObject){
        var event = EventObject
        event.preventDefault()

        // check this for pos 1
        if($(this).hasClass('up')){
            k.scrollTo(0)
            return false;
        }


        // Default behavior, find next and jump
        var parent = $(this).parents('section, header').next();
        if(parent !== undefined ){
            var pos = $(parent).offset().top
            k.scrollTo(pos)
        }
    },


    /*
        Move the scroll to function out of the scope
    */
    scrollTo : function(pos){
        var s   = k.scrolldown_props;
        $('html, body').stop().animate({ scrollTop: pos }, s.time, s.animation)
    }

}

G.init();
