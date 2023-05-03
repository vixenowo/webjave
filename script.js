var vid = document.getElementById("video");
var i = 0,
minimizedWidth = new Array,
minimizedHeight = new Array,
windowTopPos = new Array,
windowLeftPos = new Array,
panel,
id;

function adjustFullScreenSize() {
	$(".fullSizeWindow .wincontent").css("width", (window.innerWidth - 32));
	$(".fullSizeWindow .wincontent").css("height", (window.innerHeight - 98));
}
function makeWindowActive(thisid) {
	$(".window").each(function() {      
		$(this).css('z-index', $(this).css('z-index') - 1);
	});


	if ($("#window" + thisid).attr("data-title") == "Error"){
		$("#programname").text($("#window" + thisid).attr("data-title"));
		//$("#programname").text("Warning");
		//$("#barslot1").css("display", "none");
		$("#barslot1").text("Waht");
		$("#barslot2").css("display", "none");
		$("#barslot3").css("display", "none");
		$("#barslot4").css("display", "none");
		$("#barslot5").css("display", "none");
		$("#barslot6").css("display", "none");
	} else {
		$("#programname").text($("#window" + thisid).attr("data-title"));
	}


	$("#window" + thisid).css('z-index',1000);
	$(".window").removeClass("activeWindow");
	$("#window" + thisid).addClass("activeWindow");
	
	$(".taskbarPanel").removeClass('activeTab');
	
	$("#minimPanel" + thisid).addClass("activeTab");
}

function minimizeWindow(id){
	windowTopPos[id] = $("#window" + id).css("top");
	windowLeftPos[id] = $("#window" + id).css("left");
	
	$("#window" + id).animate({
	}, 200, function() {		//animation complete
		$("#minimPanel" + id).addClass('minimizedTab');
		//$("#window" + id).addClass('moveout');
		$("#minimPanel" + id).removeClass('activeTab');
		$("#window" + id).addClass('minimizedWindow');
		setTimeout(
			function() 
			{
				//$("#window" + id).addClass('minimizedWindow');
				//$("#window" + id).removeClass('moveout');
			}, 1000);
	});	
}

function openWindow(id) {
	if ($('#window' + id).hasClass("minimizedWindow")) {
		openMinimized(id);
	} else {	
		makeWindowActive(id);
		
		$('.taskbarPanel').addClass("bouncy");
		
		$("#window" + id).removeClass("closed");
		$("#minimPanel" + id).removeClass("closed");
	}
}

function openWindow2(id) {
	setTimeout(function(){
		if ($('#window' + id).hasClass("minimizedWindow")) {
			openMinimized(id);
			$("#window" + id).removeClass('moveout');
		} else {	
			makeWindowActive(id);
			$("#window" + id).removeClass("closed");
			$("#minimPanel" + id).removeClass("closed");
		}
	}, 6000);
}

function closeWindwow(id) {
	$("#window" + id).addClass("closed");
	$("#minimPanel" + id).addClass("closed");
	$('.taskbarPanel').removeClass("bouncy");
}

function openMinimized(id) {
	$('#window' + id).removeClass("minimizedWindow");
	$('#minimPanel' + id).removeClass("minimizedTab");
	makeWindowActive(id);
		
	$('#window' + id).animate({

	}, 200, function() {
	});				
}

$(document).ready(function(){
	$(".window").each(function() {      		// window template
		$(this).css('z-index',1000)
		$(this).attr('data-id', i);
		minimizedWidth[i] = $(this).width();
		minimizedHeight[i] = $(this).height();
		windowTopPos[i] = $(this).css("top");
		windowLeftPos[i] = $(this).css("left");


		$("#taskbar").append('<div style="' + $(this).attr("nobar") + '" class="taskbarPanel" title="'+ $(this).attr("data-title") +'" id="minimPanel' + i + '" data-id="' + i + '"><img src="' + $(this).attr("icon") + '" id="taskicon" class="taskbarico" title="'+ $(this).attr("data-title") +'"></div>');
		if ($(this).hasClass("closed")) {	$("#minimPanel" + i).addClass('closed');	}		
		$(this).attr('id', 'window' + (i++));
		$(this).wrapInner('<div class="wincontent" style=""' + $(this).attr("bgc") + ';"></div>');
		$(this).prepend('<div class="windowHeader" style="display:' + $(this).attr("hidetopbar") + ';"><span title="Close"    style="visibility: ' + $(this).attr("close") + ';" class="winclose">X</span><span title="Minimize" style="visibility: ' + $(this).attr("min") + ';" class="winminimize">—</span><span title="Maximize" style="visibility: ' + $(this).attr("max") + ';" class="winmaximize">	&#x2922;</span></div><strong style="display: '+ $(this).attr("hidetitle") +';">' + $(this).attr("data-title")  + '</strong>');

		if ($(this).attr("allowresize")){
			$(this).find(".wincontent").resizable();	
		}

	});
	
	$("#minimPanel" + (i-1)).addClass('activeTab');
	$("#window" + (i-1)).addClass('activeWindow');
	
	
	$( ".window" ).draggable({ cancel: ".wincontent" });	// draggable
	

    $(".window").mousedown(function(){		// active window on top (z-index 1000)
		makeWindowActive($(this).attr("data-id"));
    });
	
    $(".winclose").click(function(){		// close window
		closeWindwow($(this).parent().parent().attr("data-id"));
    });	

    $(".winminimize").click(function(){		// minimize window
		minimizeWindow($(this).parent().parent().attr("data-id"));
    });	
	
    $(".taskbarPanel").click(function(){		// taskbar click
		id = $(this).attr("data-id");
		if ($(this).hasClass("activeTab")) {	// minimize if active
			minimizeWindow($(this).attr("data-id"));
		} else {
			if ($(this).hasClass("minimizedTab")) {	// open if minimized
				openMinimized(id);
			} else {								// activate if inactive
				makeWindowActive(id);
			}
		}
    });	
	
    $(".openWindow").click(function(){		// open closed window
		openWindow($(this).attr("data-id"));
    });


    $(".openWindow2").click(function(){		// open closed window
			openWindow2($(this).attr("data-id"));
    });

	
    $(".winmaximize").click(function(){
		if ($(this).parent().parent().hasClass('fullSizeWindow')) {	
			$("#taskbar").css("display", "block");		// minimize
			$(this).parent().parent().removeClass('fullSizeWindow');
			$(this).parent().parent().children(".wincontent").height(minimizedHeight[$(this).parent().parent().attr("data-id")]);	
			$(this).parent().parent().children(".wincontent").width(minimizedWidth[$(this).parent().parent().attr("data-id")]);
		} else {															// maximize
			$(this).parent().parent().addClass('fullSizeWindow');
			$("#taskbar").css("display", "none");
			//$('#desktop').addClass('fullscreenslideout');
			//$(this).parent().parent().addClass('fullscreen');
			
			minimizedHeight[$(this).parent().parent().attr('data-id')] = $(this).parent().parent().children(".wincontent").height();
			minimizedWidth[$(this).parent().parent().attr('data-id')] = $(this).parent().parent().children(".wincontent").width();
			
			adjustFullScreenSize();
		}
    });		
	adjustFullScreenSize();	
});

