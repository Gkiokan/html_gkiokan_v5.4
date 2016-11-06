var countdown = {

        debug  : true,
        name   : 'Countdown JS | ',
        timers : {},

        init: function(){
            if(this.debug)
            console.log(this.name + 'loading');
        },


        // patch double elements
        patch_number : function(i){
            if(i < 10){
                return '0'+i
            }
            return i
        },


        // We will get the remaining time till date x
        getTimeRemaining : function(endtime) {
            var that = countdown

            var t = Date.parse(endtime) - Date.parse(new Date());
            var seconds = Math.floor((t / 1000) % 60);
            var minutes = Math.floor((t / 1000 / 60) % 60);
            var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
            var days = Math.floor(t / (1000 * 60 * 60 * 24));

            return {
                'total': that.patch_number(t),
                'days': that.patch_number(days),
                'hours': that.patch_number(hours),
                'minutes': that.patch_number(minutes),
                'seconds': that.patch_number(seconds)
            };
        },


        // ?
        initializeClock : function(el, endtime) {
            var that = countdown;

            var clock = {
                el: el,
                endtime: endtime,
            }

            clock.timer = setInterval(function(){ countdown.update(clock) }, 1000)
            countdown.timers[el] = clock

            console.log(clock)
        },


        // Update the clock
        update : function(clock){
            var that = countdown
            console.log(that.name + 'running update on Element ' + clock.el)
            var endtime  = clock.endtime
            var t = countdown.getTimeRemaining(clock.endtime);

            $(clock.el).find('.d').html(t.days)
            $(clock.el).find('.h').html(t.hours)
            $(clock.el).find('.m').html(t.minutes)
            $(clock.el).find('.s').html(t.seconds)


            if(t.total<=0){
              clearInterval(clock.timer);
            }
        },


        // Run the Clock
        run : function(el, endtime){
            var that = countdown
            console.log(that.name + 'run on Element: ' + el + ' & EndTime set to: ' + endtime)
            //var deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);
            that.initializeClock(el, endtime)
        }

}

countdown.init();
