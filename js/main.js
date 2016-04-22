// this javascript appends too much
$(document).ready(function(){
    
    var init = 5;
    var i = 0;
    var n = [];
    // since there is no database, the notifications will be loaded from json
    var jsonLoading =  $.getJSON("json/notifications.json").done( function( data ){
       $.each( data.notifications, function( i, notifications ) { 
             n.push(notifications);
        });
        $.scrollLock( true );
        loaddata();
    });
    $(window).scroll(function (event) {
        if( $(window).width() >= '992'){
            var scroll = $(window).scrollTop();
            if(scroll >= '345'){
             console.log('now');
                $('.tools').css('maring-top', '0');
                $('.tools').css('top', '80px');
                $('.tools').css('position','fixed');
                $('.tools').css('width', '22.5%');
            }else{
                console.log('okay');
                $('.tools').css('maring-top', '');
                $('.tools').css('top', '');
                $('.tools').css('position','relative');
                $('.tools').css('width', '100%'); 
            }
        }
    });
    //Load JSON
   loaddata = function(){
        for(i; i < init; i++){
            if(i < n.length){
                $('.button-holder').remove();
                var noti = 'noti'+i;
                var wrap = 'wrap'+i;
                // notification wrapper
                $('article').append('<div class="notification '+noti+'"></div>');
                // hide for animation
                $('.'+noti).hide();
                //header
                $('.'+noti).append('<div class=notification-header><h2>'+n[i].header+'</h2></div>');
                //wrapper
                $('.'+noti).append('<div class="notification-content-wrapper '+wrap+'"></div>');
                //Category
                $('.'+wrap).append('<div class="notification-category"><p><span class="glyphicon glyphicon-chevron-right"></span>'+n[i].category+'</p></div>'); 
                // Date & time
                $('.'+wrap).append('<div class="notification-date"><p><span class="glyphicon glyphicon-time"></span><b>'+n[i].date+'</b> klo '+n[i].time+'</p></div>');
                // content
                $('.'+wrap).append('<div class="notification-content"><p>'+n[i].content+'</p></div>');
                if( n[i].contentImage.length != 0 ){
                     $('.'+wrap).append('<div class="notification-image"><img src='+n[i].contentImage+'></div>');
                }
                // Owner info
              //  $('.'+wrap).append('<div class="notification-owner"><span class="glyphicon glyphicon-user"></span> '+n[i].ownerName+'<b><br>'+n[i].ownerEmail+'</b><p>'+n[i].ownerNumber+'</p></div>');
                if( n[i].ownerImage.length != 0 ){
                  $('.'+noti).append('<div class="notification-owner"><img class="notification-owner-image" src="'+n[i].ownerImage+'"/><p><b> '+n[i].ownerName+'</b></p></div>');
                }else{
                    $('.'+noti).append('<div class="notification-owner"><img class="notification-owner-image" src="assets/blankProfile.PNG"/><p><b> '+n[i].ownerName+'</b></p></div>');
                }
                // rating
                //$('.'+wrap).append('<div class="notification-rating"><p>'+n[i].rating+'</p></div>');
                $.scrollLock( true );
                $('.'+noti).show('easing');
            }else{
                $('article').append('<div class="noMore"><h3>Ei uusia ilmoituksia</h3></div>');
                $('.button-holder').remove();
                 $.scrollLock( false );
                break;
            }
        }
       if(i < n.length){
            $.scrollLock( false );
            $('article').append('<div class="button-holder"><button class="loaddata btn btn-default" onClick="loaddata()">Lataa lisää</button></div>');
            i = init;
            init += 5;
       }
    }
    $(document).on( "click",".hideAddNew", function(s) {
        s.preventDefault();
        $('.add-notification').empty();
        $('.add-notification').append('<a href="#" class="showAddNew" data-toggle="modal" data-target="#loginModal"><p>Lisää ilmoitus</p><p class="glyphicon glyphicon-plus add"></p></a>');
    }); 
   
    $(document).on( "click",".showAddNew", function(e) {
        e.preventDefault();
        $('.add-notification').empty();
        $('.add-notification').append('<div class="add-new-notification"></div>');
        $('.add-new-notification').animate({
            height: "380px",
        }, { duration: 200, complete: function(){
            $('.add-new-notification').append('<form class="notification-form"><div class="form-group"><input type="text" class="form-control" placeholder="Otsikko"></div><div class="form-group"><textarea class="form-control add-text" rows="9" placeholder="Sisältö"></textarea></div><div class="form-group fileUpload"><span class="btn btn-default btn-file">Lisää kuva<input type="file"></span></div></form>');
            $('.add-new-notification').append('<a href="#" class="hideAddNew btn btn-default">Peruuta</a>');
            $('.add-new-notification').append('<a href="#" class="publish hideAddNew btn btn-default">Julkaise</a>');
            }
        });
    });
    $(document).on( "click",".changeUserName", function(e) {
        e.preventDefault();
        setPreview();
    });
    $('.shareEmail, .shareNumber, .incognito').change(function (){
       setPreview();
    });
    var setPreview = function(){
        console.log('kävin täällä');
         $('.preview').empty();
            $('.preview').append('<img class="notification-owner-image" src="assets/blankProfile.PNG"/>');
           $('.preview').append('<p class="owner-name"><b>' + $('.settings-username').val() + '</b></p>' );
           if($('.shareEmail').prop('checked') == true){
            $('.preview').append('<p class="owner-email">matti.myyja@gmail.com</p>' );
        }
        if($('.shareNumber').prop('checked') == true){
             $('.preview').append('<p class="owner-number">04055882303</p>' );
        }if($('.incognito').prop('checked') == true){
             $('.preview').empty();
            $('.preview').append('<img class="notification-owner-image" src="assets/blankProfile.PNG"/>');
             $('.preview').append('<p class="owner-name"><b>Anonymous</b></p>' );
        }
    }
   
});
//http://www.sitepoint.com/implementing-infinite-scroll-jquery/
      