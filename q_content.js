// JavaScript Document

//Conf
var q_content = { "_ver" :".1"};
var domain= "https://app.qsearch.cc/";
//var domain= "http://localhost:8888/";


var QS_Handler = {
	receiveMessage:function(event){
		console.log(event);
		if(QS_Handler.LoginHandler)
			QS_Handler.LoginHandler();
	},
	LoginHandler: null,
	LoginBtn:function(){
		$("#qsLoginBtn").click(function(){
			QS.login(function(){
				console.log("Login Successfully");
				QS.getLoginStatus(null,true);
				qs.load();
			});
		});
	}
};

var QS_Service = function(){
	
	var meta = [];
	var preserveData = [];
	this.load = function(){
		if($(".qs_right img").size()>0) return;
		var iconYT = domain + "images/yt_flat.png";
		var iconNS = domain + "images/news_flat.png";
		var iconPT = domain + "images/pt_flat.png";
		var iconMK = domain + "images/map_flat.png";
		
		$(".qs_right").prepend($("<a>").addClass("various").append($("<img>").addClass("qs_trigger").attr("src",iconMK)))
					  .prepend($("<a>").addClass("various").append($("<img>").addClass("qs_trigger").attr("src",iconPT)))
					  .prepend($("<a>").addClass("various").append($("<img>").addClass("qs_trigger").attr("src",iconYT)))
					  .prepend($("<a>").addClass("various").append($("<img>").addClass("qs_trigger").attr("src",iconNS)));
					  
        $("#qsLoginBtn").remove();
		
		qs.BindEvent();
		_TouchGlobal();
		
		var init_y = $(".qs_trigger:eq(0)").offset().top;
		
		
		$(document).bind("scroll",function(){
			var scrollTop = document.body.scrollTop;
			if(init_y > (scrollTop + 40)){
				
				$(".qs_right").removeClass("fixed");
			}else{
				$(".qs_right").addClass("fixed");
			}
			
		});
		
		setInterval(function(){ _TouchGlobal(); },3000);
		
		
		$.get("https://app.qsearch.cc/fbapi/meta",null,null,"json").done(function(data){
			for(var x = 0; x < data["friend"]["data"].length; x++ ){
				var uid = data["friend"]["data"][x]["id"];
				var name = data["friend"]["data"][x]["name"];
				meta[uid] = name;
			}
		});
		
		
	};
	var template = '<div id="myModal" ><div class="qs_content"><div class="qm_left"><div class="qm_menu"><ul></ul><div>QSearch Touch(Beta)<br/>Power by <a target="_blank" href="http://www.qsearch.cc/">QSearch</a></div></div></div><div class="qm_right qc_white"><div class="qm_data"></div></div></div><div class="notiMsg font_zh"><div class="green" style="display:none;"></div></div></div>';
	
	var feedtemplate ='<@ _.each(posts, function(post) { @><@ if (post.actions || post.permalink){ @><div class="u_post type_<@= post.type @>"data-id="<@= post.id @>" ><div style="padding-left:10px; padding-right:10px;"><div class="f_profile"><a target="_blank" href="https://www.facebook.com/<@= post.from.id @>" class="f_picture"><img src="https://graph.facebook.com/<@= post.from.id @>/picture" width="40" height="40" /></a><div><div class="f_name"><a target="_blank" href="https://www.facebook.com/<@= post.from.id @>" ><@= post.from.name @></a></div><div class="f_time"><a target="_blank" href="<@= ((post.permalink)?(post.permalink):(post.actions[0].link)) @>" ><@= formDateTime(new Date(isNaN(post.created_time) ? (post.created_time.substr(0,22)+":00") : (post.created_time * 1000) )) @></a></div></div><div class="f_tofb"><a target="_blank" href="<@= ((post.permalink)?(post.permalink):(post.actions[0].link)) @>" ><img src="' + domain +'images/QSearchtoFB.png"></a></div></div><hr style="margin:2px 0px 8px;"/><@ if (post.message) { @><div class="f_message"><@= post.message.replace(/\\n/ig, "<br />") @></div><@ }else if (post.story){ @> <div class="f_message"><@= post.story.replace(/\\n/ig, "<br />") @></div><@ } @><@ if (post.type=="link" || post.type=="swf"|| post.type== "video") { @><div class="f_link"><div><@ if (post.picture) { @><div class="f_linkpic" ><img src="<@= post.picture @>" /></div><@ } @><div class="f_linkname" ><a target="_blank" href="<@= post.link @>"><@= post.name @></a></div><@ if (post.caption) { @><div class="f_linkcaption"><cite><@= post.caption @></cite></div><@ } @><@ if (post.description) { @><div class="f_linkdesp"><span style="padding: 5px 5px;"><@= post.description @></span></div><@ } @></div></div><@ } @><@ if (post.type=="photo" && post.picture) { @><div class="f_picture"><img src="<@= post.picture.replace("s.png","n.png").replace("s.jpg","n.jpg") @>"/></div><@ } @></div><div class="f_social"> <div style="background-color:rgb(246, 247, 248); padding:5px 0px 5px 15px;border-radius: 0px 0px 5px 5px;"><@ if (post.likes) { @><@ if (post.likes.summary) { @><span class="item like"><i></i><@= post.likes["summary"]["total_count"] @> Likes</span><@ } @><@ if (post.likes.count) { @><span class="item like"><i></i><@= post.likes["count"] @> Likes</span><@ } @><@ } @><@ if (post.comments) { @><@ if (post.comments.summary) { @><span class="item comment"><i></i><@= post.comments["summary"]["total_count"] @> Comments</span><@ } @><@ } @><@ if (post.shares) { @><span class="item share"><i></i><@= post.shares.count @> Shares</span><@ }else{ @><span class="item share"><i></i>Shares</span><@ } @><span class="save qc_lightblue">收藏</span><span class="delete qc_red">刪除</span></div></div><@ if (post.comments) { @><div class="f_comment"><@ _.each(post.comments.data, function(entry) { @><div class="f_item"><div><div class="f_lname"><a target="_blank" href="https://www.facebook.com/<@= entry.from.id @>" class="lfloat f_picture"><img src="https://graph.facebook.com/<@= entry.from.id @>/picture" width="40" height="40" /></a><div><div class="f_mname"><a target="_blank" href="https://www.facebook.com/<@= entry.from.id @>" ><@= entry.from.name @></a><div class="f_mmessage"><@= entry.message.replace(/\\n/ig, "<br />") @></div></div><div class="f_mtime"><a target="_blank" href="<@=post.actions[0].link @>" ><@= formDateTime(new Date(entry.created_time.substr(0,22)+":00")) @></a></div></div></div></div></div><@ }); @></div><@ } @></div><@ } else if (post.category){ @><div class="u_post type_page"> <div class="p_base" style="background-image:url(<@= (("cover"in post)? post.cover.source:"") @>);"> <div class="p_text"> <span class="p_aboutbase"> </span> <span class="p_picture"> <a target="_blank" href="https://www.facebook.com/<@= post.id @>"><img src="https://graph.facebook.com/<@= post.id @>/picture?width=80&height=80"></a> </span> <span class="p_name"><a target="_blank" href="https://www.facebook.com/<@= post.id @>"><@= post.name @></a></span> <span class="p_likes"><@= post.likes @> likes</span> <span class="p_about"> <@= post.about @> </span> </div> </div> </div><@ } @><@ }); @>';
	
	this.BindEvent = function(){
		//Open the global data
		completeitem =$(template.toString());
		if($("body #myModal").size()==0){
			$("body").append(completeitem);
		}
	    _.templateSettings = {
			interpolate: /\<\@\=(.+?)\@\>/gim,
			evaluate: /\<\@(.+?)\@\>/gim,
			escape: /\<\@\-(.+?)\@\>/gim
		};
		
		$("a.various").click(function(e){
		   	_OpenModal($(this).index());
		   	e.preventDefault();
		});
		
	};
	var _TouchGlobal= function(){
		
		
	 	$(".shareRedesignContainer, a.shareLink").each(function () {
			if($(this).data("has_touch") != null) return;
			    $(this).css({"position":"relative"});
			var $obj = $(this).data("has_touch",true);
			var $btn = $("<button class='qc_touchbtn'>探索</button>");
				$obj.append($btn);
			var $tle = $(".uiAttachmentTitle strong:eq(0), .fwb:eq(0)", this).text();
			console.log($tle);	
			$.post("https://app.qsearch.cc/fbapi/global",{"title[]":[$tle], "full":"false" },null,"json").done(function(resp){
				//console.log(resp);
				if(resp["response"]["numFound"]!=0){
					if(resp["response"]["numFound"]>10000){
						$btn.text("探索 ("+ "10000+" +")").show();
					}else if(resp["response"]["numFound"]>1000){
						$btn.text("探索 ("+ "1000+" +")").show();
					}else if(resp["response"]["numFound"]>100){
						$btn.text("探索 ("+ "100+" +")").show();
					}else{
						$btn.text("探索 ("+ resp["response"]["numFound"] +")").show();
					}
					$btn.click(function(){
						_OpenModal(4, $tle);
					});
				}
			});
		});
		
	}
	var keyword = ["news","youtube","photo","checkin"];  
	/*  Idx 0~3 : Friend
	 *  Idx 4~7 : Global
	 *  Idx 8~12: Saved */
	 
	var _OpenModal = function(Idx, $tle){
		$(".qm_right .qm_data").empty();
		$.fancybox({
			padding     : '0px',
			maxWidth	: 800,
			maxHeight	: ($(window).height()*0.9>600?600:$(window).height()*0.9),
			fitToView	: false,
			width		: 800,
			height		: $(window).height(),
			autoSize	: false,
			openEffect	: 'none',
			closeEffect	: 'none',
			content:completeitem,
			afterShow:function(){
				
				
				var tag = ["新聞", "影音", "照片","打卡"];
				var colors = ["green", "red", "blue", "yellow"];
				
					$(".qm_left").addClass("qc_" + colors[Idx]);
					$(".qm_left ul").html("");
					
				if(Idx>=4){
					$(".qm_left ul").append("<li class='qchover_" + colors[Idx%4] + "'>朋友"+tag[Idx%4] + "<span class='count'></span></li>");
					$(".qm_left ul").append("<li class='qchover_"+ colors[Idx%4] +"'>我的收藏" + tag[Idx%4] + "<span class='count'></span></li>");
					$(".qm_left ul").append("<li class='qchover_"+ colors[Idx%4] +" active'>探索社群聲音<span class='count'></span></li>");
				}else{
					$(".qm_left ul").append("<li class='qchover_" + colors[Idx%4] + " active'>朋友"+tag[Idx%4] + "<span class='count'></span></li>");
					$(".qm_left ul").append("<li class='qchover_"+ colors[Idx%4] +"'>我的收藏" + tag[Idx%4] + "<span class='count'></span></li>");
				}
					$.get("https://app.qsearch.cc/storeapi/get", {"tag": keyword[Idx%4],"full":"false" },null,"json")
					 .done(function(resp){
						 $(".qm_left ul li:eq(1) .count").html(" ("+resp["count"]+")");
					  })
				
				setTimeout(function(){
					_LoadInstantElement(Idx,$tle);
					_MenuEvent(Idx);
					_ChangeViewEvent(Idx);
				},100);
				
				$(".qm_left").removeClass( function() { 
					 var toReturn = '',
						 classes = this.className.split(' ');
					 for(var i = 0; i < classes.length; i++ ) {
						 if( /qc_.*/.test( classes[i] ) ) {
							 toReturn += classes[i] +' ';
						 }
					 }
					 return toReturn ; 
				});
				
			}
				  
		  });	
	}
	var _ChangeViewEvent = function(Idx){
		$(".qm_left ul li").click(function(){
			var _Idx = $(this).index();
			if(_Idx ==0){
				_LoadInstantElement(Idx%4);
			}else if(_Idx == 1){
				_OpenSavedElement(Idx+8);
			}else{
				_LoadInstantElement(4);
			}
		});
	}
	
	var _MenuEvent     = function(){
		$(".qm_left ul li").click(function(){
			$(".qm_left ul li").removeClass("active");
			$(this).addClass("active");
		});
	}
	
	var _BindPostEvent = function(Idx){
		
		if(Idx<8){
			$(".qm_right .qm_data .feed0").addClass("qc_load");
		}else{
			$(".qm_right .qm_data .feed0").addClass("qc_save");
		}
		$("div.u_post .f_social span.item.comment").click(function(e){
			$(this).parents("div.u_post").find(".f_comment").show();
		});
		//Save Problem
		$(".qm_right .qm_data .u_post .save").live("click", function(){  
			var _Id = $(this).parents(".u_post").attr("data-id");
			
			$.get("https://app.qsearch.cc/storeapi/put", {"postid": _Id, "tag": keyword[Idx] },null,"json")
			 .done(function(resp){
				 $.notification.setInfo("儲存成功");
			  });
		});
		
		$(".qm_right .qm_data .u_post .delete").live("click", function(){
			var _$parent = $(this).parents(".u_post");
			var _Id = _$parent.attr("data-id");
			
			$.get("https://app.qsearch.cc/storeapi/delete", {"postid": _Id, "tag": keyword[Idx] },null,"json")
			 .done(function(resp){
				 _$parent.fadeOut("fast",function(){ $(this).remove();  });
				 $.notification.setInfo("刪除成功");
			  });
		});
	}
	var _LoadInstantElement = function(Idx,$tle){
		
		try{
			
			if(preserveData[Idx]==null) throw "undefined";
			if((preserveData[Idx]["time"]-new Date)>1800000) throw "undefined";
			if($tle != null) throw "newsearch";
			
			_updateElementCount(preserveData[Idx]["data"].length);
			_RenderElement(preserveData[Idx]["data"], Idx);
			
		}catch(ex){ //The data is not exist
			$(".qm_right .qm_data").html($("<div>").css({ "text-align":"center" }).html($("<img>").css({ "margin-top":"240px" }).attr("src",domain+"images/ajaxloading.gif")));
		  
			if(Idx<=3){
				var requestObj = $.get("https://app.qsearch.cc/fbapi/search",{ "t":"551462328254728", "q":keyword[Idx] }, null,"json");
			}else if(Idx==4){
				var requestObj = $.post("https://app.qsearch.cc/fbapi/global",{"title[]":[$tle] }, null,"json");
			}
			requestObj.done(function(resp){
				
				_updateElementCount(resp.length);
				_RenderElement(resp,Idx);
				
				preserveData[Idx] = {"time": new Date(),"data": resp };
				
			});
		}//End of try catch
	};
	
	var _OpenSavedElement = function(Idx){
		$.get("https://app.qsearch.cc/storeapi/get", {"tag": keyword[Idx%4] },null,"json")
		 .done(function(resp){
			 
			 _updateElementCount(resp.length);
			 _RenderElement(resp,Idx);
			
		 });
	}
	
	var _RenderElement = function(resp, Idx){
			   
			   var result = resp;
			   
			   result.sort(function(a,b){
				   if(a.created_time * 1000 < b.created_time * 1000){
					   return 1;
				   }else if(a.created_time * 1000 > b.created_time * 1000){
					   return -1;
				   }
				   return 0;
			   });
			   
			   for (var x =0 ; x < result.length;x++){
				  if(meta[result[x]["from"]["id"]]!=null)
					result[x]["from"]["name"] = meta[result[x]["from"]["id"]];
			   }
			   
			   var template = feedtemplate.toString();
			   var keylist = _.template(template, { posts : result.slice(0,5) });
			   
			   $(".qm_right .qm_data").html("").html($('<div class="feed0">').html(keylist));
			   $(".f_message, .p_about",$(".qm_right .qm_data > .feed0")).linkify();
			   $(".qm_right .qm_data  .u_post").fadeIn()
			   
			   if(result.length>5){
					var $more = $("<div class='more'>More (" + (result.length-5) + ")</div>");
					$(".feed0").append($more);
					$more.data("st", 5);
					$more.click(function(){
						var $obj = $(this);
						var keylist = _.template(template, { posts : result.slice($more.data("st"),$more.data("st")+50) });
						$more.before(keylist);
						$(".f_message, .p_about",$(".qm_right .qm_data > .feed0 .u_post:gt("+ ($more.data("st")-1)  +")")).linkify();
						$(".qm_right .qm_data > .feed0 .u_post:gt("+ ($more.data("st")-1)  +")").fadeIn(2000);
						$obj.parents(".qm_data").animate({scrollTop: $obj.parents(".qm_data")[0].scrollTop + 450 }, '2000');
						
						$more.data("st", $more.data("st") + 50);
						$more.html("More (" + (result.length - $more.data("st")) + ")")
						
						if($more.data("st")>=result.length) $(this).remove();
						
					});
					
			   }
			   _BindPostEvent(Idx);
			   
	}
	
	var _updateElementCount = function(count){
		$(".qm_left ul li.active .count").html(" ("+ count + ")");
	}
}

var QS = {
	checkload:null,
	logininfo:null,
	login: function(callback){ 
		var h = 100;
		var w = 400;
		var left = (screen.width/2)-(w/2);
 	    var top = (screen.height/2)-(h/2);
		var url = domain + "fblogin?url=OauthCallbak.html";
		var title = 'Connect QSearch';
		window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
		QS_Handler.LoginHandler = null;
		QS_Handler.LoginHandler = callback;
		
	},init:function(){
		window.addEventListener("message", QS_Handler.receiveMessage, false);
		
	},load:function(){
		var loadTemplate = '<div class="qs_right"><br style="clear:both;"/></div>'
		loadTemplate = $(loadTemplate);
		
		if($(".qs_right").size()==0){
			if ($("#rightCol").size()>0){
				$("#rightCol").prepend(loadTemplate);
			}else{
				$(".home_right_column").parent().parent().parent().before(loadTemsplate);
			}
			clearInterval(QS.checkload);
			QS.checkload = setInterval(function(){ 
				QS.load();
				QS.getLoginStatus(function(resp){
					if(resp["error"]){
						if($("#qsLoginBtn").size()>0) return;
						$(".qs_right").append('<button id="qsLoginBtn" class="btn qc_lightblue">連結 QSearch Touch</button>');
						QS_Handler.LoginBtn();
					}else{
						qs.load();
					}
				}); 
			},2000);
		};
		
		
	},getLoginStatus: function(Callback, force){
		if(force == null){
			if(QS.logininfo!=null){
				Callback(QS.logininfo);
				return;
			}
		}
		$.ajax({
			url: domain + "api/getuser",
			async:false,
			dataType:"json"
		}).success(function(resp){
			QS.logininfo = resp;
			Callback(resp);
		}).error(function(){
			
		});
		
	}
};


var qs = new QS_Service();
QS.init();
QS.load();

QS.getLoginStatus(function(resp){
	if(resp["error"]){
		
		$(".qs_right").prepend('<button id="qsLoginBtn" class="btn qc_lightblue">連結QSearch Touch</button>');
		QS_Handler.LoginBtn();
	}else{
		qs.load();
	}
});



/* required 3rd lib */
(function($){

  var url1 = /(^|&lt;|\s)(www\..+?\..+?)(\s|&gt;|$)/g,
      url2 = /(^|&lt;|\s)(((https?|ftp):\/\/|mailto:).+?)(\s|&gt;|$)/g,

      linkifyThis = function () {
        var childNodes = this.childNodes,
            i = childNodes.length;
        while(i--)
        {
          var n = childNodes[i];
          if (n.nodeType == 3) {
            var html = $.trim(n.nodeValue);
            if (html)
            {
              html = html.replace(/&/g, '&amp;')
                         .replace(/</g, '&lt;')
                         .replace(/>/g, '&gt;')
                         .replace(url1, '$1<a target="_blank" href="http://$2">$2</a>$3')
                         .replace(url2, '$1<a target="_blank" href="$2">$2</a>$5');
              $(n).after(html).remove();
            }
          }
          else if (n.nodeType == 1  &&  !/^(a|button|textarea)$/i.test(n.tagName)) {
            linkifyThis.call(n);
          }
        }
      };

  $.fn.linkify = function () {
    return this.each(linkifyThis);
  };

})(jQuery);
/* -- Form Data -- */
function formDateTime(item_time){
	var str = item_time.getFullYear() + '-' + (item_time.getMonth() + 1) + '-' + item_time.getDate() + ' ';
        str += (item_time.getHours() < 10 ? ("0" + item_time.getHours()) : item_time.getHours()) + ":";
        str += (item_time.getMinutes() < 10 ? ("0" + item_time.getMinutes()) : item_time.getMinutes()) + ":";
        str += (item_time.getSeconds() < 10 ? ("0" + item_time.getSeconds()) : item_time.getSeconds());
	return str;
};
/* -- Notification --*/
var NotifacationMsg = function(){
	var timeout = null
	this.setInfo = function(msg){
		clearTimeout(timeout);
		console.log(msg);
		$(".notiMsg > div").addClass("green").fadeIn("fast").html(msg);
		timeout = setTimeout(function(){  $(".notiMsg > div").fadeOut(700);  }, 3200);
	};
	this.setError = function(msg){
		clearTimeout(timeout);
		$(".notiMsg > div").addClass("red").fadeIn("fast").html(msg);
		timeout = setTimeout(function(){  $(".notiMsg > div").fadeOut(700);  }, 3200);
	};
	
};
(function ($){
	$.extend({
		"notification": new NotifacationMsg()
	});
})(jQuery);





