$('.menu-toggle').click(function(){
    $('.menu-toggle').toggleClass('active');
    $('ul').slideToggle();
    $('ul ul').css('display','none');
})
$('ul li').click(function(){
    $(this).find('ul').slideToggle(function(){
        $('ul ul li').slideDown();
    });
});
