// JavaScript Document
var $mobileWidth = 767;
var $desktopWidth = 992;
var pageImages = [];
var tab_array = [];
var pageNum = 1;
var zoom1;
var h_count = 0,
    v_cnt = 0,
	m_cnt =0 ;
var page_load = false;
var $width;
$(window).load(function(){
	
	$('.loader').hide();
	})

$(document).ready(function() {
	//$('#create-wr-link-info').hide();
	 $width = $(window).width();
         /* if ($width > $mobileWidth){
			$('input[type="text"],input[type="email"],textarea').val("");
			$('input[type="text"],input[type="email"],textarea').attr("placeholder","");
				}*/
	/*login page */
		$("#new-user-login").on("click", function(e) {  //ess
			$('.register-user-ess').show();
			$('.login-wrap-ess').hide();
		});
		$("#recover-reset").on("click", function(e) {  //monarch
			$('.recover-reset-monarch').show();
			$('.login-wrap-monarch').hide();
		});
		$(".reg-submit-btn").on("click", function(e){
			e.preventDefault();
			window.location="ess_index-optout.html";
		});
		$(".update-pwd-ess").on("click", function(e){
			e.preventDefault();
			window.location="ess_login.html";
		});
		$(".recover-submit-btn").on("click", function(e){
			e.preventDefault();
			$(this).hide();
			var tmp=$(this).parents('.recover-id')
			tmp.find('.hide').removeClass('hide');
			tmp.find('input[type="email"]').attr('disabled',true);
			//$('.recover-user-btn').show();
		});
		$(".reset-submit-btn").on("click", function(e){
			e.preventDefault();
			$(this).hide();
			var tmp=$(this).parents('.reset-pwd')
			tmp.find('.hide').removeClass('hide');
			tmp.find('input[type="email"]').attr('disabled',true);
		});
		$(".reset-pwd-btn").on("click", function(e){
			e.preventDefault();
			window.location="login-resetPwd-monarch.html";
		});
/*login page */
   function add_scroll(){
	   var $width = $(window).width();
	   //alert(2);
	  /* if ($width <= $mobileWidth) {
		    $('.scrollbar-inner').scrollbar("destroy");
	   }
	   else{
		   if($('.scrollbar-inner').length>0)
  		 $('.scrollbar-inner').scrollbar();
	   }*/
   }
	if($('.datepicker').length>0){
   $('.datepicker').pickadate({ selectYears: true });}
   $('#start-date').change(function()
    {
		if($('#end-date').val()== null || $('#end-date').val()== "")
         $('#end-date').val($('#start-date').val());
    });

if($('#finish-date').length>0){
   $('#finish-date').pickadate();}
    
/*====Filters Section====*/
	/* show filters section*/
	 $('.filter-arrow-open').click(function() {

        $('.right-filter').animate({
            width: 'toggle'
        }, 300)
    });
	
	/* hide filters section*/
    $('.filter-arrow-close,.apply-filters').click(function() {
        $('.right-filter').animate({
            width: 'toggle'
        }, 300)
        $('.more-filters-content').slideUp(100);
        $('.more-filters').show();
    });
   
   /* load more filters section*/
   /* $('.more-filters').click(function() {
        $('.more-filters-content').slideDown(100);
        $(this).hide();
    });*/
	
	/* Expand/Collapse all filters*/   
	var active = true;
    $('#filters-exp-col').click(function() {
        if (active) {
            active = false;
            $('.panel-collapse').collapse('show');
            $('.panel-title').attr('data-toggle', 'Expand');
            $(this).text('  |    Collapse');
        } else {
            active = true;
            $('.panel-collapse').collapse('hide');
            $('.panel-title').attr('data-toggle', 'Collapse');
            $(this).text('  |    Expand');
        }
    });
	
	/*Add/Remove filter labels */
	$('.f-close').on("click",function(){
		$(this).closest('.filter-applied-item').remove();
		})
		
	/*Remove all filter labels */
	/*$('#remove-all-filters').on("click",function(){
		$('.filter-applied-item').remove();
		$('.filter-status').html('No Filters applied')
		})*/
		
		/*Move filters from common to Else */
		$('.common-filters').on("click",'.move-to-else',function(){
		 var temp = $(this).closest('.form-group');
			temp.find('span.move-to-else').replaceWith("<span class='glyphicon glyphicon-plus-sign move-to-common'>");
			temp.prependTo('.other-filters');
		})
		
		/*Move filters from Else to Common */
		$('.other-filters').on("click",'.move-to-common',function(){
		 var temp = $(this).closest('.form-group');
			temp.find('span.move-to-common').replaceWith("<span class='glyphicon glyphicon-remove-circle move-to-else'></span>");
			temp.prependTo('.common-filters');
		})
		
	/* Binding click event handler to the document object to close filters section when clicked outside*/
    $(document).bind('click', function(e) {
        var $clicked = $(e.target);
		//console.log($clicked);
        if (!$clicked.parents().hasClass("right-filter") && !$clicked.hasClass("filter-arrow-open")&& !$clicked.hasClass("f-close")&& !$clicked.hasClass("move-to-else") && !$clicked.hasClass("move-to-common"))  // if the target of the click isn't the container or filter icon
            $(".right-filter").hide();
			
		if (!$clicked.parents().hasClass("help-section") && !$clicked.hasClass("help-icon")&& !$clicked.hasClass("help-section"))  // if the target of the click isn't the container or filter icon
            $(".help-section").hide();	
			
		 if (!$clicked.closest("#notif-panel").length > 0 && !$clicked.parents().hasClass("action-icons") )  // if the target of the click isn't the container or notification icon
            $("#notif-panel").hide();
	
    });

/*====Help Section====*/
	/* show help section*/
	/* $('.help-icon').click(function() {

        $('.help-section').animate({
            width: 'toggle'
        }, 300)
    });
	*/
	/* hide help section*/
   /* $('.help-close').click(function() {
        $('.help-section').animate({
            width: 'toggle'
        }, 300)
    });
	*/

/*====Nav Section====*/	
	 /* show/hide left-nav section*/
    $('.navbar-toggle.menu-icon').click(function() {

        $('.main-wrap').toggleClass('nav-resize', 100);
    });
	
	/*highlight active nav item in left-nav section*/
    $(".left-nav li a ").on("click", function(e) {
            $(".left-nav li a ").removeClass("selected");
            $(this).addClass("selected");
        })
		
     /*left-nav multi-level dropdown level-1*/
    $(".left-nav li.nav-level-one > a ").on("click", function(e) {
        $(".left-nav li a").removeClass("open");
        $(".left-nav li.nav-level-two >ul").hide();
        if (!$(this).next().is(':visible')) {
            $(".left-nav li.nav-level-one >ul").hide();
            $(this).next().slideDown(400);
            $(this).addClass("open");
        } else {
            $(this).next().slideUp(400);

        }
    });
    /*left-nav multi-level dropdown level-2*/
    $(".left-nav li.nav-level-two > a ").on("click", function(e) {
        $(".left-nav li a").removeClass("a-open");
        if (!$(this).next().is(':visible')) {
            $(".left-nav li.nav-level-two >ul").hide();
            $(this).next().slideDown(400);
            $(this).addClass("a-open");
        } else {
            $(this).next().slideUp(400);

        }
    });

/*====Middle Section====*/	
    $('#legacy-menu-link-building').click(function(e) {
        $('#mid-2,#mid-0,#mid-3').hide();
        $('#mid-1').show();
          $('#search-box').hide(100);
        $('.mobile-search').removeClass('visible-xs').hide();
    });

    $('#legacy-menu-link-property').click(function(e) {
        $('#mid-2').show();
        $('#mid-0,#mid-1,#mid-3').hide();
         $('#search-box').hide(100);
         $('.mobile-search').removeClass('visible-xs').hide();
    });
	
	

	
	/* show work-requests as middle section */
    $('#request-link').click(function() {
        // $('#search-box').show(50);
        $('#mid-0').show();
        $('#mid-1,#mid-2,#mid-3').hide();
        //  $('.mobile-search').addClass('visible-xs').show();
    });
	
	/* show settings page as middle section */
    $('#action-settings-icon').click(function() {
        // $('#search-box').show(50);
        $('#mid-3').show();
        $('#mid-0,#mid-1,#mid-2').hide();
        $('.settings-wrap').removeClass('show')
		$('.main-wrap').addClass('nav-resize');
		$('.nav-links li a').removeClass('selected');
            //  $('.mobile-search').addClass('visible-xs').show();
    });	
	
/*====Settings page as Middle Section====*/	
	$('.text-edit .text-bold').on("click", function(e) {
        e.preventDefault();
       $(this).closest('.text-edit').find('textarea').css('font-weight','bold')
    })
	$('.text-edit .text-italic').on("click", function(e) {
        e.preventDefault();
       $(this).closest('.text-edit').find('textarea').css('font-style','italic')
    })
	$('.text-edit .text-underline').on("click", function(e) {
        e.preventDefault();
       $(this).closest('.text-edit').find('textarea').css('text-decoration','underline')
    })
	
	var tc_classes=['sc-red','sc-blue','sc-green']
		$('.tc-color-scheme .tc-item').on("click",function(){
			$('.tc-color-scheme .tc-item').removeClass('selected');
			var i=$(this).index();
			$(tc_classes).each(function(index,element){
				$('body').removeClass(element)
			})
			$('body').addClass(tc_classes[i])
			$(this).addClass("selected")
		})
		
	var op_classes=['op-head','op-button','op-link']
		$('.sc-option input[type="checkbox"]').on("click",function(){
			var tmp=$(this).closest('.sc-option').find('input[type="checkbox"]').index(this);
			if(this.checked){
			$('body').addClass(op_classes[tmp])
			}
		})
		
/*====Work-Requests as Middle Section====*/	
	
	 $('#create-new-req,#link-wrk-req').on("click", function(e) {
		 $width = $(window).width();
        if ($width <= $mobileWidth) {
			 $('.wrapper').addClass('detail-open');
		}
		 if($('#mid-0').hasClass('h-view')){
		 h_count=2;m_cnt=2;
		 $('#mid-0').addClass('detail-max-height').removeClass('grid-max-height');	
		 $('.lv-icon').removeClass('icon-list-default icon-list-max').addClass('icon-list-min');
		 $('.list-view:eq(0) table tbody tr:eq(0)').click();	 
		 }
		 else if($('#mid-0').hasClass('v-view')){
		 v_cnt=2;
		 $('#mid-0').addClass('detail-max-width').removeClass('grid-max-width'); // detail-section takes full width
		 $('.sv-icon').removeClass('icon-summary-default icon-summary-max').addClass('icon-summary-min');
		 $('.summary-view .record .rec-heading:eq(0)').click();
		 }
		 $('#detail-1').removeClass('detail-block').addClass('detail-close');
		 $('#detail-0').addClass('detail-block').removeClass('detail-close');
			if($(this).is('#create-new-req')){
		 		$('.detail-section-header .detail-create-header h3 .detail-head').html("New Work Request");
				$("#create-wr-link-info").addClass('hidden');
				$("#new-wrk-req-info").removeClass('hidden');

			}
		 	else{
				$('.detail-section-header .detail-create-header h3 .detail-head').html("10281212 : Create Linked Work Request");
				$("#create-wr-link-info").removeClass('hidden');
				$("#new-wrk-req-info").addClass('hidden');


			}
		 $(".middle-section").addClass("new-req-sel");
		 $('.detail-section-header .edit-table > a').removeClass('hidden').attr('data-target','');
		// $('.detail-section .form-control').attr('disabled',false);
		  chk_viewport_height();
	 })
	 
	 $('#view-link-wrk-req').on("click", function(e) { 
		$(".table-actions .breadcrumb li.view-lwr").addClass('open');
		$(".table-actions .breadcrumb li.collections").hide();
		$(".list-view:eq(0) table tbody tr").slice(0,10).hide();
	 }) 
	 $('.close-lwr').on("click", function(e) { 
		$(".table-actions .breadcrumb li.view-lwr").removeClass('open');
		$(".table-actions .breadcrumb li.collections").show();
		$(".list-view:eq(0) table tbody tr").show();
	 }) 
	/* Toggle between three -- list, summary and map views */
    $('.lv-icon').on("click", function(e) {  // list view
		if( $('.middle-section').hasClass('v-view') || $('.middle-section').hasClass('m-view')){
		 h_count=2;
		}
        e.preventDefault();
		$('.sv-icon').removeClass('icon-summary-max icon-summary-min selected').addClass('icon-summary-default');
		$('.mv-icon').removeClass('icon-map-max icon-map-min selected').addClass('icon-map-default');
		$(this).addClass('selected');
        $('.middle-section').addClass('h-view').removeClass('v-view m-view detail-max-width grid-max-width');
        $('.grid-section .tab-content .views').addClass('disp-none').removeClass('disp-block');
        $('.grid-section .tab-content .list-view').removeClass('disp-none').addClass('disp-block');
        if (h_count == 3) {
            h_count = 0;
        }
        h_count++;
        switch (h_count) {
            case 1:
                $('#mid-0').addClass('detail-max-height').removeClass('grid-max-height'); // detail-section takes full height
				$(this).removeClass('icon-list-default').addClass('icon-list-min');
                break;
            case 2:
                $('#mid-0').removeClass('detail-max-height').addClass('grid-max-height'); // grid-section takes full height
				$(this).removeClass('icon-list-min').addClass('icon-list-max');
                break;
            case 3:
                $('#mid-0').removeClass('detail-max-height grid-max-height'); // grid and detail section takes half height each
				$(this).removeClass('icon-list-max').addClass('icon-list-default');
                break;
        }
		detail_open();
		 $('#detail-1 .detail-head').html("&nbsp;" + $('.list-view:eq(0) table tbody tr.selected td:eq(0)').html());
		 $('.middle-section').removeClass("new-req-sel");
		// $('.detail-section .form-control').attr('disabled',true);
        chk_viewport_height();
    });
	
    $('.sv-icon').on("click", function(e) {   // summary view
	if( $('.middle-section').hasClass('h-view')|| $('.middle-section').hasClass('m-view')){
		v_cnt=2;
		}
        e.preventDefault();
		$('.lv-icon').removeClass('icon-list-max icon-list-min selected').addClass('icon-list-default');
		$('.mv-icon').removeClass('icon-map-max icon-map-min selected').addClass('icon-map-default');
		$(this).addClass('selected');
       $('.middle-section').addClass('v-view').removeClass('h-view m-view detail-max-height grid-max-height');
        $('.grid-section .tab-content .views').addClass('disp-none').removeClass('disp-block')
        $('.grid-section .tab-content .summary-view').removeClass('disp-none').addClass('disp-block');
        
		/* SUMMARY Toggle is DISABLED on ESS Portal */
		
		if($('#wrapper').hasClass('ess')){
			/* SUMMARY Toggle is DISABLED if ESS class is found on Wrapper*/
		}else{
			
			/* SUMMARY Toggle is ENABLED on portal*/
			
			if (v_cnt == 3) {
				v_cnt = 0;
			}
			v_cnt++;
			switch (v_cnt) {
				case 1:
					$('#mid-0').addClass('detail-max-width').removeClass('grid-max-width'); // detail-section takes full width
					$(this).removeClass('icon-summary-default').addClass('icon-summary-min ');
					break;
				case 2:
				   $('#mid-0').removeClass('detail-max-width').addClass('grid-max-width'); // grid-section takes full width
				$(this).removeClass('icon-summary-min').addClass('icon-summary-max ');
					break;
				case 3:
					$('#mid-0').removeClass('detail-max-width grid-max-width');  // grid and detail section takes half width each
					$(this).removeClass('icon-summary-max ').addClass('icon-summary-default');
					break;
			}
		
		
		}
		detail_open()
		 $('#detail-1 .detail-head').html("&nbsp;" + $('.summary-view .record.selected .rec-heading').html());
		 $('.middle-section').removeClass("new-req-sel");
		// $('.detail-section .form-control').attr('disabled',true);

        chk_viewport_height();
    });
    $('.mv-icon').on("click", function(e) {   // map view
	if( !$('.middle-section').hasClass('m-view')){
		m_cnt=2;
		}
        e.preventDefault();
		$('.sv-icon').removeClass('icon-summary-max icon-summary-min selected').addClass('icon-summary-default');
		$('.lv-icon').removeClass('icon-list-max icon-list-min selected').addClass('icon-list-default');
		$(this).addClass('selected');
        $('.middle-section').addClass('h-view m-view').removeClass('v-view detail-max-width grid-max-width');
        $('.grid-section .tab-content .views').addClass('disp-none').removeClass('disp-block')
        $('.grid-section .tab-content .map-view').removeClass('disp-none').addClass('disp-block');
        if (m_cnt == 3) {
            m_cnt = 0;
        }
        m_cnt++;
        switch (m_cnt) {
            case 1:
                $('#mid-0').addClass('detail-max-height').removeClass('grid-max-height'); // detail-section takes full height
				$(this).removeClass('icon-map-default').addClass('icon-map-min');
                break;
            case 2:
                $('#mid-0').removeClass('detail-max-height').addClass('grid-max-height'); // grid-section takes full height
				$(this).removeClass('icon-map-min').addClass('icon-map-max');
                break;
            case 3:
                $('#mid-0').removeClass('detail-max-height grid-max-height'); // grid and detail section takes half height each
				$(this).removeClass('icon-map-max').addClass('icon-map-default');
                break;
        }
		$('#detail-0').removeClass('detail-block').addClass('detail-close');
			$('#detail-1').addClass('detail-block').removeClass('detail-close');
		 $('#detail-1 .detail-head').html("&nbsp;" + $('.map-summary .record.selected .rec-heading').text());
		 $('.middle-section').removeClass("new-req-sel");
		// $('.detail-section .form-control').attr('disabled',true);
        chk_viewport_height();
        initialize(4);
    });
	
	
	
	function detail_open(){
		$('#detail-0').removeClass('detail-block').addClass('detail-close');
			$('#detail-1').addClass('detail-block').removeClass('detail-close');
		}

    /*switch between detail-sections */
    $('.list-view:eq(0) table tbody tr:eq(0)').addClass('selected');
    $('.list-view:eq(0) table tbody tr').on("click", function(e) {
        $('.list-view:eq(0) table tbody tr').removeClass('selected');
        $(this).addClass('selected');
		var i= $(this).index();	
		$('.summary-view .record').removeClass('selected');		
		$('.summary-view .record').eq(i).addClass('selected');

	   detail_open()
        var detail_head = $(this).children('td:eq(0)').html();
        $('#detail-1 .detail-head').html("&nbsp;" + detail_head);
		 $('.middle-section').removeClass("new-req-sel");
    });
	
	 /*open corresponding detail-section on click of a request item in mobile */
    $('.map-summary .record,.summary-view .record').on("click", function(e) {
       var $width = $(window).width();
        if ($width <= $mobileWidth) {
			$(this).toggleClass('selected');
			
			var len=$(this).closest('.summary-view').find('.record.selected').length;
			//$('.main-wrap').addClass('quick-actions-open');
			if(len >=1){
				if(len>1){
				$('.quick-actions-fixed .quick-actions-count').show();
				$('.quick-actions-fixed .quick-actions-count .sel-count').html(len+"&nbsp;selected");
			}
			else
			$('.quick-actions-fixed .quick-actions-count').hide();
				/*switch(len){
					case 1: $('.quick-actions-fixed ul.quick-act-summ li').slice(-2).hide();break;
					default: $('.quick-actions-fixed ul.quick-act-summ li').slice(-2).show();break;
					}*/
			}
			else{
				
				}
				//$('.main-wrap').removeClass('quick-actions-open');
        }
		else{
		$('.map-summary .record ').removeClass('selected');
			$('.summary-view .record').removeClass('selected');
			$(this).addClass('selected');
		} 
        
					
			if($(this).parents().hasClass('map-summary')){
				//alert(1)
				initialize(18)
						var address ="106 N Central Ave, Phoenix, Arizona, United States";
		var geocoder = new google.maps.Geocoder();
					if (geocoder) {
			  geocoder.geocode( { 'address': address}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
				  if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
				  map.setCenter(results[0].geometry.location);
		
					var marker = new myMarker({
						position: results[0].geometry.location,
						map: map,
						icon: " ",
			  labelClass: "map-label",
			  draggable: true,
			  labelContent: "1st", 
						title:address
					}); 
				 } 
				}
			  });
			}
				
				}
       // $('.toggle-detail').toggle();
        var detail_head = $(this).find('.rec-heading').text();
        $('.m-req-id,#detail-1 .detail-head').html("&nbsp;" + detail_head);
		 $('.middle-section').removeClass("new-req-sel");
    });
	$('.summary-view .record').on("dblclick", function(e) {
		if ($(window).width() <= $mobileWidth) {
        $('.wrapper').addClass('detail-open')
	//detail_open();
		//$('.main-wrap').removeClass('quick-actions-open quick-act-detail-open');
		$('.summary-view .record').removeClass('selected');
		if($('.middle-section').hasClass("new-req-sel")){
			$('#detail-0').removeClass('detail-close').addClass('detail-block');
			$('#detail-1').addClass('detail-close').removeClass('detail-block');
			}
			else{
				detail_open()
				}
		}
	})
	
	$('.quick-actions-fixed .quick-actions-count a.icon-delete').on("click", function(e) {
		if ($(window).width() <= $mobileWidth) {
			$('.summary-view .record').removeClass('selected');
			$('.quick-actions-fixed .quick-actions-count').hide();
			//$('.main-wrap').removeClass('quick-actions-open');
		}
	})
	
	var fixmeTop = $('.table-actions,.quick-access-left').offset().top;
$(window).scroll(function() {
	
    var currentScroll = $(window).scrollTop();
    if (currentScroll >= fixmeTop && $(window).width() <= $mobileWidth) {
        $('.table-actions,.quick-access-left').addClass('fix-top');
    } else {
        $('.table-actions,.quick-access-left').removeClass('fix-top');
    
	}
});
	/*close detail-section and switch back to view in mobile */
    $('.detail-to-sum').on("click", function(e) {
		if($('.rec-mob-det').is(':visible')){
		
		 $('.rec-mob-sum').show();
		 $('.rec-mob-det').hide();
		 if($('#detail-m-edit-icon,#detail-m-save-icon').is(':visible'))
		 	{
		 $('.quick-access-left .m-detail-actions a').hide();
		  $('.quick-access-left .m-detail-actions a#detail-m-add-icon').show();
		   $('#detail-eventlog .rec-mob-det').find('input, textarea').attr('disabled',"");
			}
		 //$('.quick-access-left').show();
			}
			else
        $('.wrapper').removeClass('detail-open');
    })
	
	
	 $('.rec-mob-view .record').on("click", function(e) {
		 if ($(window).width() <= $mobileWidth) {
		 var temp= $(this).closest('.rec-mob-view');
		 temp.find('.rec-mob-sum').hide();
		 temp.find('.rec-mob-det').show();
		 $('.quick-access-left .m-detail-actions a').hide();
		  $('.quick-access-left .m-detail-actions a#detail-m-edit-icon').show();
		 //$('.quick-access-left').hide();
		 }
    })
	$('#detail-m-edit-icon').on("click", function(e) {
		$('.quick-access-left .m-detail-actions a').hide();
		  $('.quick-access-left .m-detail-actions a#detail-m-save-icon').show();
		  $('#detail-eventlog .rec-mob-det').find('input, textarea').removeAttr('disabled')
	})
	$('#detail-m-save-icon').on("click", function(e) {
		$('.quick-access-left .m-detail-actions a').hide();
		  $('.quick-access-left .m-detail-actions a#detail-m-add-icon').show();
		  $('#detail-eventlog .rec-mob-det').find('input, textarea').attr('disabled',"");
		   $('.rec-mob-sum').show();
		 $('.rec-mob-det').hide();
	})

$('.quick-access-left .nav.nav-pills li a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
 $('.quick-access-left .nav.nav-pills li').removeClass('active')
  $(e.target).parent().addClass('active');
  var tar_content = $(e.target).children('.multi-letters').html()
	   $('.detail-sub-header').html(tar_content);
	   if($(e.target).attr('href') == "#detail-eventlog")
	   {
	   $('.detail-view-header .edit-table > a').addClass('hidden');
	   $('.detail-view-header .edit-table > a#detail-add-icon').removeClass('hidden').attr('data-target','#add-event-popup');
	   }
	   else if($(e.target).attr('href') == "#detail-service-provider")
	   {
	   $('.detail-view-header .edit-table > a').removeClass('hidden');
	   $('.detail-view-header .edit-table > a#detail-add-icon').attr('data-target','#add-ser-hours-popup');
	   $('.detail-view-header .edit-table > a#detail-edit-icon').attr('data-target','#edit-ser-hours-popup');
	   $('.detail-view-header .edit-table > a#detail-delete-icon').attr('data-target','#delete-ser-hours-popup');
	   }
	   else if($(e.target).attr('href') == "#detail-attachments")
	   {
	   $('.detail-view-header .edit-table > a').removeClass('hidden');
	   $('.detail-view-header .edit-table > a#detail-add-icon').attr('data-target','#add-attach-popup');
	   $('.detail-view-header .edit-table > a#detail-edit-icon').attr('data-target','#edit-attach-popup');
	   $('.detail-view-header .edit-table > a#detail-delete-icon').attr('data-target','#delete-attach-popup');
	   }
	   else{
			   $('.detail-view-header .edit-table > a').removeClass('hidden').attr('data-target','');

	   }
})
	
	$('.quick-access-left .nav.nav-pills li a[data-toggle="tab"]').on('click', function(e) {
        e.preventDefault();	  
	   $(this).tab('show');
    })

	
	//Expand/Contract detail/Grid Section to Full width in summary view 
    $('.quick-access-icon a').on("click", function(e) {
        e.preventDefault();
        $('.detail-section').toggleClass('quick-access-max');
		$(this).toggleClass('icon-chevron-right icon-chevron-left');
    })
	
	$('.event-desc-toggle').on("click", function(e){
		 $(this).text(function(i, text){
          return text === "[V]" ? "[A]" : "[V]";
     	 })
		$(this).next('.expand-desc').toggle();
	
		})
    //load map in map-view
    var map, marker1, marker2;

    function myMarker(options) {
        if (!options.labelAnchor) {
            options.labelAnchor = new google.maps.Point(10, 10);
        }
        options.map = map;
        return new MarkerWithLabel(options);
    }


  function initialize(zoom1) {
		if($('#workreq-map').length>0){
		
        var pos_center = new google.maps.LatLng(34.8000, -92.2000)
        var pos1 = new google.maps.LatLng(33.4493151, -112.0738464)
        var pos2 = new google.maps.LatLng(41.8819, -87.6278)

        var mapPoints = [{
               lat: 33.4493151,
			   long : -112.0738464,
			   label_content:5,
			   level1: [{lat: 34.4493151,long : -111.0,label_content:2},
						{lat: 32.4493151,long: -111.0,label_content:2},
						{lat: 33.4493151,long: -114.0,label_content:1}]
            },
  			{
			   lat: 41.8819,
			   long : -87.6278,
			   label_content:12,
			   level1: [{lat: 42.8819,long : -86.0,label_content:6},
						{lat: 40.8819,long : -86.8,label_content:4},
						{lat: 40.8819,long : -89.0,label_content:1},
						{lat: 42.8819,long : -89.0,label_content:1}]
            }	
		];
        var mapOptions = {
            center:pos_center,
            zoom: zoom1,
            styles: [{
                featureType: 'water',
                elementType: 'all',
                stylers: [{
                    hue: '#e9ebed'
                }, {
                    saturation: -78
                }, {
                    lightness: 67
                }, {
                    visibility: 'simplified'
                }]
            }, {
                featureType: 'landscape',
                elementType: 'all',
                stylers: [{
                    hue: '#ffffff'
                }, {
                    saturation: -100
                }, {
                    lightness: 100
                }, {
                    visibility: 'simplified'
                }]
            }, {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{
                    hue: '#bbc0c4'
                }, {
                    saturation: -93
                }, {
                    lightness: 31
                }, {
                    visibility: 'simplified'
                }]
            }, {
                featureType: 'poi',
                elementType: 'all',
                stylers: [{
                    hue: '#ffffff'
                }, {
                    saturation: -100
                }, {
                    lightness: 100
                }, {
                    visibility: 'off'
                }]
            }, {
                featureType: 'road.local',
                elementType: 'geometry',
                stylers: [{
                    hue: '#e9ebed'
                }, {
                    saturation: -90
                }, {
                    lightness: -8
                }, {
                    visibility: 'simplified'
                }]
            }, {
                featureType: 'transit',
                elementType: 'all',
                stylers: [{
                    hue: '#e9ebed'
                }, {
                    saturation: 10
                }, {
                    lightness: 69
                }, {
                    visibility: 'on'
                }]
            }, {
                featureType: 'administrative.locality',
                elementType: 'all',
                stylers: [{
                    hue: '#2c2e33'
                }, {
                    saturation: 7
                }, {
                    lightness: 19
                }, {
                    visibility: 'on'
                }]
            }, {
                featureType: 'road',
                elementType: 'labels',
                stylers: [{
                    hue: '#bbc0c4'
                }, {
                    saturation: -93
                }, {
                    lightness: 31
                }, {
                    visibility: 'on'
                }]
            }, {
                featureType: 'road.arterial',
                elementType: 'labels',
                stylers: [{
                    hue: '#bbc0c4'
                }, {
                    saturation: -93
                }, {
                    lightness: -2
                }, {
                    visibility: 'simplified'
                }]
            }]



        };
		
        map = new google.maps.Map(document.getElementById("workreq-map"),
            mapOptions);
  
			
		 var infowindow = new google.maps.InfoWindow({
      content: document.getElementById("map-info"),
	  maxWidth: 200 ,
	  pixelOffset: new google.maps.Size(0,0)
  });
        $(mapPoints).each(function(index, element) {
			var i=index;
			var marker = new myMarker({
				position:new google.maps.LatLng(this.lat,this.long),
				 icon: " ",
                labelClass: "map-label",
                //draggable: true,
                labelStyle: {
                    opacity: 0.75
                },
                labelContent: this.label_content
				});
            google.maps.event.addListener(marker, 'click', function(event) {
				
				 $(mapPoints[i].level1).each(function(index, element) {
						var marker = new myMarker({
						position:new google.maps.LatLng(this.lat,this.long),
						 icon: " ",
						labelClass: "map-label1",
						//draggable: true,
						labelStyle: {
							opacity: 0.75
						},
						labelContent: this.label_content
					});
				 });
				
                $(".map-label").removeClass("active-marker");
                $(event.target).addClass("active-marker");
                $('.map-view').addClass("map-detail-open");
				$('.map-info').addClass('disp-block')
				//infowindow.open(map,marker);
                //$('.map-section').removeClass("width100")
            });
            google.maps.event.addListener(map, 'zoom_changed', function(e) {
				
            })
        });

    }
	}
    google.maps.event.addDomListener(window, 'load', initialize(4));

	
	$(".map-info-close").on("click", function(e) {
        $('.map-info').removeClass('disp-block')

    });
	
    $("#back-to-map").on("click", function(e) {
        $('#workreq-map').toggle();
        $('.map-view').removeClass("map-detail-open");

    });
	
	$(".portal-settings-wrap ul.template-list li a").on("click", function(e) {
        $(".portal-settings-wrap ul.template-list li a").removeClass('selected');
		$(this).addClass('selected');
    });
/*	$(".template-update ul li .form-control,.template-update ul li input[type='file'], .template-update ul li textarea").on("focus",function() {
      var index = $(this).closest('li').index() + 1;
	   $(".template-sel ul li a.selected img").hide();
	  $(".template-sel ul li a.selected img:eq('"+index+"')").show();
    });*/
	$('.quick-act-summ a.dropdown-toggle').on("click", function(e) {
		$(this).next('ul.toggle-div').toggle();
		})

	 //make detail-section nav to an accordion in mobile-view             	
    function add_dropdown() {
        $width = $(window).width();
        if ($width <= $mobileWidth) {
			$('.table-actions .actions-drop ul').addClass('dropdown-menu')
			$('.detail-section .quick-access-left ul.nav').each(function(index){
				if($(this).children('li').length > 1){
            $(this).addClass('dropdown-menu').removeClass('nav-pills');
			$('.dropdown-toggle').dropdown()
				}
				else
				{
					$(this).children('li').children('a').addClass("no-pad")
					$(this).closest(".quick-access-left").find('a[data-toggle="dropdown"]').removeClass('visible-xs').hide();
					}
			})
        } else {
			$('.table-actions .actions-drop ul').removeClass('dropdown-menu')
            $('.detail-section .quick-access-left ul.nav').removeClass('dropdown-menu').addClass('nav-pills').children('li').children('a').removeClass("no-pad");
        }

    }
	
	// check for browser width
    function chk_width() {
		 $width = $(window).width();
        if ($width <= $mobileWidth) {
			$('#mid-1,#mid-2,#mid-3').hide();
       		 $('#mid-0').show();
            $('.grid-section').show();
            $('#detail-section-all').show();
            if ($('.list-view').hasClass('disp-block')) {
                $('.list-view').addClass('disp-off disp-none').removeClass('disp-block');
                $('.summary-view').removeClass('disp-none').addClass('disp-block');
            }
        } else {
            $('.wrapper').removeClass('detail-open');
			//$('.main-wrap').removeClass('quick-actions-open quick-act-detail-open');
            $('.list-view').removeClass('disp-off')
        }
		add_scroll()
    }
	
	// check for vieport height
    function chk_viewport_height() {
        var middle_sec_ht = $(window).height() - 70;
        var resize_height = middle_sec_ht - parseInt($('.table-actions').outerHeight(true)) - parseInt($('.detail-section-header').outerHeight(true))- parseInt($('.detail-section-footer').outerHeight(true));
        var grid_height = middle_sec_ht / 2 - parseInt($('.table-actions').outerHeight(true));
        var details_height = middle_sec_ht / 2 - parseInt($('.detail-section-header').outerHeight(true)) - parseInt($('.detail-section-footer').outerHeight(true));
		if(!$('#adm-portal-link').hasClass('selected')){
		if($('.header-block').is(':visible')){
			$('.fill,#mid-3 .settings-wrap').css({
            'min-height': $(window).height() - 60 
        	});
		}
		else{
			$('.fill,#mid-3 .settings-wrap').css({
            'min-height': $(window).height()
        });
		}}
        
        if ($('#mid-0').hasClass('h-view')) {
            if ($width <= $mobileWidth) {
                $('.grid-section .tab-pane.active').css("height", "auto")
                $('.full-details,.quick-access-left').css("height", "auto")
            } else {
                if ($('#mid-0').hasClass('detail-max-height')) {
                    $('.full-details, .quick-access-left').css("height", resize_height);
                } else if ($('#mid-0').hasClass('grid-max-height')) {
                    $('.grid-section .tab-pane.active .scrollbar-inner').css("height", resize_height)
                } else {
                    $('.grid-section .tab-pane.active .scrollbar-inner').css("height", grid_height)
                    $('.full-details,.quick-access-left,#event-grid').css("height", details_height)
                }
            }
        } else {
            if ($width <= $mobileWidth) {
                $('.grid-section .tab-pane.active').css("height", "auto")
                $('.full-details,.quick-access-left').css("height", "auto")
            } else {
                $('.full-details, .quick-access-left').css("height", resize_height);
                $('.grid-section .tab-pane.active .scrollbar-inner,.v-resize-section,#event-grid').css("height", resize_height + parseInt($('.detail-section-header').outerHeight(true)) + parseInt($('.detail-section-footer').outerHeight(true)))
            }
        }
		var grid_ht = parseInt($('#portal-admin .template-grid').outerHeight(true));
		var adm_detail_height = middle_sec_ht - 2*grid_ht -1;
		$('#portal-admin .scrollbar-inner').css("height", adm_detail_height);

		add_scroll()
    }
    chk_width();
    chk_viewport_height();
    add_dropdown()
	

  
   $('a[data-toggle="tab"]#adm-portal-link').on('shown.bs.tab', function (e) {
 	 chk_viewport_height() 
	})
 	

		$(".mob-attachments .record").on('click',function(e) {
		 e.preventDefault();
		 if ($width <= $mobileWidth) {
			$(this).toggleClass('selected');
			var len=$(this).closest('.mob-attachments').find('.record.selected').length;
			if(len >=1){
				$('.main-wrap').addClass('quick-act-detail-open');
				switch(len){
					case 1: $('.quick-actions-detail-attach ul li').show();break;
					default: $('.quick-actions-detail-attach ul li').slice(0,1).hide();break;
					}
		    }
			else{
				$('.main-wrap').removeClass('quick-act-detail-open');
			}
        }
    });
	
/*    $('.template-grid  table tbody tr').on("click", function(e) {
        $('.template-grid  table tbody tr').removeClass('selected');
        $(this).addClass('selected');
    });*/
/*====On windoe resize====*/	
 	page_load = true;	
    $(window).resize(function(e) {

        if (e.target == window) {

            if (this.resizeTOGlobal) clearTimeout(this.resizeTOGlobal);
            this.resizeTOGlobal = setTimeout(function() {
                add_dropdown()
                $width = $(window).width();
                if ($width <= $mobileWidth && $('.main-wrap').hasClass('nav-resize')) {
                    $('.main-wrap').removeClass('nav-resize', 100)
                }

                page_load = true;
                chk_width()
                chk_viewport_height();
				
            }, 100);
        }
    });

  $( '#keyword-desc').keyup(function() {
var value = $( this ).val();

if (value =="flood")
{
	$('#keyword-desc-critical').removeClass('hidden');
	}else{
	$('#keyword-desc-critical').addClass('hidden');
}


})

	/* update collections dropdown value  */
	$(" .dropdown-menu li a").click(function() {
		if (!$(this).parents().hasClass('edit-table')){
			var selText;
			if($(this).parents().hasClass('quick-access-left')){
				selText = $(this).children('.multi-letters').text();
				$('.main-wrap').removeClass('quick-act-detail-open');
			}
			else{
			  selText = $(this).text();
			}
			 $(this).parents('.dropdown').find('a[data-toggle="dropdown"]').html(selText + ' <span class="caret"></span>');
		}
    });
		

    //NOTIFICATIONS show Hide
    $('#notif-label-alert').click(function() {
        $('.wrapper').addClass('notif-open');
        $('#notif-panel').show();
        $('#pill-alert').click();
        $('#notif-panel').removeClass('notif-panel-info').addClass('notif-panel-alert');
    });
    $('#notif-label-info').click(function() {
        $('.wrapper').addClass('notif-open');
        $('#notif-panel').show();
        $('#pill-info').click();
        $('#notif-panel').removeClass('notif-panel-alert').addClass('notif-panel-info');
    });
    $('#pill-alert').click(function() {
        $('#notif-alert-content').show();
        $('#notif-info-content').hide();
        $('#pill-alert').addClass('active');
        $('#pill-info').removeClass('active');
        $('#notif-panel').removeClass('notif-panel-info').addClass('notif-panel-alert');
    });
    $('#pill-info').click(function() {
        $('#notif-alert-content').hide();
        $('#notif-info-content').show();
        $('#pill-info').addClass('active');
        $('#pill-alert').removeClass('active');
        $('#notif-panel').removeClass('notif-panel-alert').addClass('notif-panel-info');
    });
    $('#notif-close').click(function() {
        $('#notif-panel').hide();
        $('.wrapper').removeClass('notif-open');
    });

	
    // Type Ahead feature - hide and show demo - Work request Name

		$('#typeahead_wr_new_requestor_name,#typeahead_wr_new_gender,#typeahead_wr_new_eq_std').hide();

		$('#wr_new_requestor_name').on("click",function(){
		$('#typeahead_wr_new_requestor_name').toggle();
		});
		
		
});