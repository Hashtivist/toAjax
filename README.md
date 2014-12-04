toAjax
======

jQuery plugin that prevents regular forms actions and uses AJAX instead.

1. Why did I decide to come up with this plug in?

Coding is about optimization. This plugin saves me time and allows a cleaner html output (less code).

2. How does this plugin work ?

For each form you use this plugin with, the following steps occur :

  1. Collects the form parameters (action, method...)
  2. For each field, collects the value and name attributes.
  3. Validates each field (if required and empty, notify user with focus on the field)
  4. Stores each value and name in object.
  5. Prevents default action (when clicking the submit button of the form)
  6. Performs AJAX request using the data collected
  7. Triggers success of fail functions

3. But here's the awesome part...

You can create separate success and fail functions for each form.
To do that, simply append a new function to either functions_success or functions_fail by naming them according to this model :

'TOAJAX_' + the id of the form

	var functions_success = {
	
			TOAJAX_demo_1: function (response) {
					   //whatever u wanna do
			},
			
			TOAJAX_demo_2: function (response) { 
					   //whatever u wanna do
			},
			
			TOAJAX_myformid: function (response) {
					   //whatever u wanna do
			}
	
	}
