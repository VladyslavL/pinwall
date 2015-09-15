$('.DropDown').click(function() {
  $(this).toggleClass('opened');
});

$('.DropDown ul li').find('p').click(function() {
  var item_text = $(this).clone(),
    tree = $(this).parents();

  $(tree[2]).find('.currentItem').html(item_text);

  $(this).parents('.fieldWrap').addClass('selected').removeClass('invalid_child');
  $(this).parents('#lp_form').addClass('selected').removeClass('invalid');
});

$('.menu_toggle_button').on('click', function() {
	$(this).parents('header').toggleClass('nav_opened');
});

$('input.zip').bind("change keyup input click", function() {
    if (this.value.match(/[^0-9]/g)) {
        this.value = this.value.replace(/[^0-9]/g, '');
    }
});

$.validator.addMethod('zip', function(value, element, options) {
	var el = $("input.zip"),
			listOfZips = [1111,2222,3333,4444],
			req;

	// console.log(el.val());

	for (var i = 0; i < listOfZips.length; i++ ) {
		if(el.val() == listOfZips[i]) {
			req = true;
			el.removeClass('error');
			break;
		}

		else{
			req = false;
			el.addClass('error');
		}
	}

	return req;

});

$('#lp_form').submit(function () {
	var form = $('#lp_form');

	if(form.hasClass('selected')) {

	}
	else{
		form.addClass('invalid');
		event.preventDefault();
	}
});

$(document).ready(function(){
	$('#small_form input.zip').bind("change keyup input click", function() {
    var el = $("input.zip"),
			listOfZips = [1111,2222,3333,4444];

		for (var i = 0; i < listOfZips.length; i++ ) {
			if(el.val() == listOfZips[i]) {
				el.parents('#small_form').removeClass('zip_error').addClass('valid').removeClass('invalid');
				el.removeClass('error');
				break;
			}

			else{
				el.parents('#small_form').addClass('zip_error').removeClass('valid').removeClass('invalid');
				el.addClass('error');
			}
		}
	});

	$('#small_form .DropDown ul li').find('p').click(function() {
	  var item_text = $(this).clone(),
	    tree = $(this).parents();

	  $(tree[2]).find('.currentItem').html(item_text);

	  $(this).parents('#small_form').addClass('selected').removeClass('invalid');
	});

	$('#small_form').submit(function() {

		var el = $('#small_form');

		if( el.hasClass('selected') && el.hasClass('valid') ) {

		}
		else{
			el.addClass('invalid');
			event.preventDefault();
		}
	});
});

$('.lookfor').validate({
	rules: {
		fw: {
			required: true,
			minlength: 5
		}
	}
});

$('.fp_email').validate({
	rules: {
		email: {
			required: true,
			email: true
		},
		fname: {
			required: true,
			minlength: 2
		},
		phone: {
			required: true,
			number: true
		}
	}
});

$('.otherform').validate({
	rules: {
		jafw: {
			required: true,
			minlength: 5
		},
		zip: {
			zip: true
		}
	}
});

$(document).ready(function(){
	var form = $(".mainForm");


	form.find('input[type=checkbox], input[type=radio]').on('change', function(){
		var thisWrap = $(this).parents('.fieldWrap'),
				inputText = thisWrap.find('input[type=text]').hasClass('valid'),
				textarea = thisWrap.find('textarea.anytext').hasClass('valid'),
				checkedInput = thisWrap.find('input').is(":checked");

		if (checkedInput >= 1 || inputText || textarea) {
			thisWrap.addClass('selected').removeClass('invalid_child');
		}
		else{
			thisWrap.removeClass('selected');
		}
	});

	form.find('input[type=text], textarea').on('keydown', function(){
		var thisWrap = $(this).parents('.fieldWrap'),
				inputText = $(this).hasClass('valid');

		if (inputText || $(this).val().length >= 1) {
			thisWrap.addClass('selected').removeClass('invalid_child');
		}
		else{
			thisWrap.removeClass('selected');
		}
	});

	form.validate({
		rules: {
			jfw: {
				required: true,
				minlength: 5
			},
			area: {
				required: true,
				minlength: 5
			},
			fname: {
				required: true,
				minlength: 2
			},
			lname: {
				required: true,
				minlength: 5
			},
			email: {
				required: true,
				email: true
			},
			number: {
				required: true,
				number: true,
				minlength: 5
			}
		}
	});

	form.submit(function(){
		var child = form.find('.fieldWrap');

		child.each(function() {
			if($(this).hasClass('selected')){

			}
			else{
				$(this).addClass('invalid_child');
				// return false;
				event.preventDefault();
			}
		});
	});
});