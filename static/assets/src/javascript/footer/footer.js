$(function(){
    countdown.run('#countdown_new_year', new Date('2017/01/01'))


    /*
        Started animation move thing
    */
     setTimeout(function(){
        // If the user is on the top AND have a device larger then 769px
        if($(document).scrollTop()==0 && $(window).width() >= 769)
            $('body').addClass('collapsed')
     }, 1337)

     
});
