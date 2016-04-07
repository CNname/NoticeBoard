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
   showAddNew = function(){
       $('.add-notification').empty();
       $('.add-notification').append('<div class="add-new-notification"><form><div class="form-group"><div class="add-new-wrapper"><input type="text" class="form-control" placeholder="Otsikko"></div></div><div class="form-group"><textarea class="form-control add-text" rows="3" placeholder="Sisältö"></textarea></div></form></div></div>');
       $('.add-new-notification');
   }
});
//http://www.sitepoint.com/implementing-infinite-scroll-jquery/
    