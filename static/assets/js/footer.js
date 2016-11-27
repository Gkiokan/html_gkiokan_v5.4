$(function(){
    countdown.run('#countdown_new_year', new Date('2017/01/01'))

    // lets do some magic for the header
     setTimeout(function(){
        if($(document).scrollTop()==0)
        $('body').addClass('collapsed')        
     }, 1300)
});
