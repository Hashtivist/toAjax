/**
* toAjax jQuery plugIn by Harold Cohen
* 
* Copyright (c) 2014 Harold Cohen
* licensed under the MIT-License
**/

	//functions run on AJAX success
	var functions_success = {
	
			TOAJAX_demo_1: function (response) { //name according to following : TOAJAX_[id of the form]
				//whatever u wanna do
			},
			
			TOAJAX_demo_2: function (response) { 
				//whatever u wanna do
			}
	
	}

	//functions run on AJAX fail
	var functions_fail = {
	
			TOAJAX_demo_1: function (response) { //name according to following : TOAJAX_[id of the form]
				//whatever u wanna do
			},
			
			TOAJAX_demo_2: function (response) {
				//whatever u wanna do
			}
	
	}

	//functions for statusCode
	function ajax_on_status(status){
		
			//status is passed during AJAX
			//switch function according to status
			
			switch(status){
				
				case 200:
					//whatever u wanna do
				break;
				
				case 302:
					//whatever u wanna do
				break;
				
				case 404:
					//whatever u wanna do
				break;
				
				case 500:
					//whatever u wanna do
				break;
				
				}
		
		}

//plugin

(function($) {
 $.fn.toAjax = function(options) {
	
	//plugin options
	var o = $.extend({
		method: 'POST',
		data_type : 'JSON', //datatype is by default JSON
		cache : false, //cache is false by default
		on_status : false, //enables/disables statusCode in AJAX to trigger function
		status: { //enables/disables or disable statusCode according to status
				
				404 : false,
				200 : false,
				302 : false,
				500 : false
				
			},
		timeout: '', //you can set a timeout, leave undefined for no timeout.
		async: true //by default true
		
		
	}, options );
	
	
	return this.each(function(){

		var $that = $(this); //form as jQuery object
		
		var id = $that.attr("id"); //form ID
		var action = $that.attr("action"); //form action (url)
		var method = $that.attr("method"); //form method (POST...)
		var form_submit = $that.find("input[type*=submit]"); //submit button
		
		var datatype = $that.attr("datatype"); //form datatype can be set in the form itself
		
		o.method = method == null ? o.method : method ; //if method is not set in the form, then set on default options
		o.data_type = datatype == null ? o.data_type : datatype ; //if datatype is not set in the form, then set on default options
		
		var data = {}; //create an object to store the form data that will then be passed by AJAX
		
			form_submit.click(function(event){ //triggers when the form submit button is clicked
				
				event.preventDefault(); //prevents default to avoid redirection
				
				send = false; //doesn't send until * is ok
				
				form_elements = $that.find("input:not([type*=submit]), textarea, select, button, optgroup, fieldset, label");
				
				form_elements.each(function(){ //finds every type of input possible
					
					$this = $(this); //input element as jQuery object
					type = $this.attr("type");
					name = $this.attr("name"); //input name
					value = type != 'checkbox' ? $this.val() : $this.attr("checked"); //input value
					
					data[name] = value; //stores input name : value
					required = $this.attr("required"); //is field mandatory
					send = (required == 'required') ? value != '' ? true : false : true ; //checks if input is required and value set
					
					if( send == false ){ $this.addClass('required_missing').focus().attr({ placeholder : 'field is required' }); } //if false focus element with red outline
					
					return send;
					
				});
				
				if( send == true ) {
				
					$ajax = $.ajax({
					  type		: o.method,
					  url		: action,
					  dataType	: o.data_type,
					  cache		: o.cache,
					  async		: o.async,
					  data		: data,
					  statusCode: {
							
							200 : function(){ o.on_status = true ? o.status[200] = true ? ajax_on_status(200) : '' : '' },
							302 : function(){ o.on_status = true ? o.status[302] = true ? ajax_on_status(302) : '' : '' },
							404 : function(){ o.on_status = true ? o.status[404] = true ? ajax_on_status(404) : '' : '' },
							500 : function(){ o.on_status = true ? o.status[500] = true ? ajax_on_status(500) : '' : '' },
							
						  },
					  fail		: function(response){
							//customize the function by appending one to the functions_fail object
							functions_fail['TOAJAX_' + id](response); 
							
						  },
					  success	: function(response){
							//customize the function by appending one to the functions_success object
							functions_success['TOAJAX_' + id](response); 
							
						}
					});
			
				}
				
			});
	
	});
	
  }
})( $ );
