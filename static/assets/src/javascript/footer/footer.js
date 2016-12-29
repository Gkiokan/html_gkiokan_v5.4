$(function(){
    countdown.run('#countdown_new_year', new Date('2017/01/01'))


    /*
        Started animation move thing
    */
     setTimeout(function(){
        // If the user is on the top AND have a device larger then 769px
        if($(window).width() >= 769 === true)
        if($(document).scrollTop()==0)
           $('body').addClass('collapsed')

        // Some adjustments for the background thing
        $('.background').addClass('active');
     }, 1337)


});
