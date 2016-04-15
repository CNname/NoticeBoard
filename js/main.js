// this javascript appends too much
$(document).ready(function(){
    
    /*var width = $(window).width();
    var game = new Phaser.Game(width, 500, Phaser.CANVAS, 'animationTest', { preload: preload, create: create, update: update });


    function preload(){
        this.game.load.image('hillLeft', 'assets/hill.png'); 
        this.game.load.image('hillRight', 'assets/hillRight.png'); 
        this.game.load.image('moon', 'assets/moonSmall.png');
    }
    function create(){
        this.game.stage.backgroundColor = '#28363F';
        this.leftHill = this.game.add.sprite(0, 100,  'hillLeft');
        this.width = $(window).width() / 2;
        this.moon = this.game.add.sprite(this.width, 200,  'moon');
        this.moon.anchor.setTo(0.5);
        this.rightHill = this.game.add.sprite(700, 100, 'hillRight')
    }
    function update(){
        this.width = $(window).width();
        if(this.moon.x = 100){
            console.log('täällä');
       }else{
           this.moon.x -= 1;
       }
        
    }
    */
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
    $(document).on( "click",".hideAddNew", function(s) {
        s.preventDefault();
        $('.add-notification').empty();
        $('.add-notification').append('<a href="#" class="showAddNew"><p>Lisää ilmoitus</p><p class="glyphicon glyphicon-plus add"></p></a>');
    }); 
   
    $(document).on( "click",".showAddNew", function(e) {
        e.preventDefault();
        $('.add-notification').empty();
        $('.add-notification').append('<div class="add-new-notification"></div>');
        $('.add-new-notification').animate({
            height: "189px",
        }, { duration: 200, complete: function(){
            $('.add-new-notification').append('<form class="notification-form"><div class="form-group"><input type="text" class="form-control" placeholder="Otsikko"></div><div class="form-group"><textarea class="form-control add-text" rows="3" placeholder="Sisältö"></textarea></div></form>');
            $('.add-new-notification').append('<a href="#" class="hideAddNew btn btn-default">Peruuta</a>');
            }
        });
    });
});
//http://www.sitepoint.com/implementing-infinite-scroll-jquery/
      