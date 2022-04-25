
/* SUMMARY */

function getQuantityCount() {
	var cartItemsLength = $('.cart-item').length;
	var itemQuantityTotal = 0;
	
	for (var i = 0; i < cartItemsLength; i++) {
		var itemQuantity = parseInt($($('.cart-product-quantity')[i]).val());
		itemQuantityTotal += itemQuantity;
	}
	
	$('#checkout-form-cart-quantity').text(itemQuantityTotal);
}

function getCartSubTotal() {
	var cartItemsLength = $('.cart-item').length;
	var subTotal = 0;
	
	for (var i = 0; i < cartItemsLength; i++) {
		var cartItemsPrice = parseInt($($('.cart-item-price')[i]).text().slice(1));
		subTotal += cartItemsPrice;
	}
	
	$('.cart-subtotal').text('₱' + subTotal);
}

function getTotalPrice() {
	var subTotal = parseInt($('.cart-subtotal').text().slice(1));
	var shippingFee = parseInt($('#shipping-fee').text().slice(1));
	var totalPrice = subTotal + shippingFee;
	
	$('#cart-total-price').text('₱' + totalPrice);
}

/* CHECKOUT FORM */

function claimOption() {
	var shippingFee;
	
	if ($('#claim-delivery').is(':checked')) {
		shippingFee = 30;
		$('#shipping-fee').text('₱' + shippingFee);
		
		$('.payment-methods > label').removeAttr("style");
		$('[name="payment-method"]').prop("checked", false);
		
		$('#payment-cod').prop('disabled', false);
		
		$('#payment-gcash').prop('disabled', false);
	}
	else {
		shippingFee = 0;
		$('#shipping-fee').text('₱' + shippingFee);
		
		$('.payment-methods > label').removeAttr("style");
		$('[name="payment-method"]').prop("checked", false);
		
		$('#payment-cod').prop('disabled', true);
		$('#payment-cod:disabled ~ label').css("color", "#bbb");
			
		$('#payment-gcash').prop('disabled', false);
	}
	
	getTotalPrice();
}

function checkoutFormAlert(input) {
	$('#checkout-form-alert').modal("show");
	
	if ($(input).is("[name='claim-option']")){
		$('#checkout-form-alert p').text('Please select a claiming option.');
	}
	else if ($(input).is("[name='payment-method']")){
		$('#checkout-form-alert p').text('Please select a payment method.');
	}
	else if (input === 'lowOrder'){
		$('#checkout-form-alert p').html('Please have a minimum order worth <strong>₱150</strong>.<br><small class="text-secondary fw-normal">(Shipping Fee Not Included)</small>');
	}
}

function contactNoFormat(contactNoInput) {
	var contactNoReplace = $(contactNoInput).val().replace(/\D/g,''); 
	
	if ($(contactNoInput).val() === '(') {
		$(contactNoInput).val('');
	}
	if ($(contactNoInput).val().length > 0) {
		$(contactNoInput).val('(' + contactNoReplace.substring(0,4));
	}
	if ($(contactNoInput).val().length >= 5) {
		$(contactNoInput).val($(contactNoInput).val() + ') ' + contactNoReplace.substring(4,7));
	}
	if ($(contactNoInput).val().length >= 10) {
		$(contactNoInput).val($(contactNoInput).val() + '-' + contactNoReplace.substring(7,11)); 
	}
}

function submitCheckoutForm() {
	var $subTotal = parseInt($('.cart-subtotal').text().slice(1));
	var $checkoutForm = document.getElementById('checkout-form');
	
	if ($subTotal >= 150) {
		if ($checkoutForm.checkValidity()) {
				//modify this block to ajax data to php
			$('#checkout-form').submit();
		}
		else {
			$('[name="claim-option"]').show();
			$('[name="payment-method"]').show();
			$checkoutForm.reportValidity();
			$('[name="claim-option"]').hide();
			$('[name="payment-method"]').hide();
		}
	}
	else {
		checkoutFormAlert('lowOrder');
	}
}