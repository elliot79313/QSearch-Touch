// JavaScript Document
(function ($){
	$.fn.language = function(target, value){
		
		if (!$(this).hasClass("qs_language")){
			$(this).addClass("qs_language");
		}
		$(this).data("language",[target, value]);
		
		
		
		var _template = langData[$.language()][target];
		var _value = {};
		if(typeof(_template)=="object"){
			_value[_template["src"]] = langData[$.language()][_template["src"]][value];	
			_template = _template["data"];
		}
		
		$(this).html(_.template(_template,_value))
		
		
		return this;
	};
	
	$.language = function(){
		if(arguments>0){
			if(langData[arguments[0]] ==null){
				$("body").data("language","en");
			}else{
				$("body").data("language",arguments[0]);
			}
		}else{
			return $("body").data("language");
		}
	}
})(jQuery);
