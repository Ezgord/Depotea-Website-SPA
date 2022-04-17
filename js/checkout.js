
/* LOAD PAGE AND MODAL */

function loadCartModal() {
	var xhttp = new XMLHttpRequest();
	
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("cart-modal-body").innerHTML = this.responseText;
			$('.checkout-form-wrapper').remove();
			$('.cart-wrapper.col-sm-8').toggleClass('col-sm-8 col-sm-12');
		}
	};
	
	xhttp.open("GET", "src/checkout.html", true);
	xhttp.send();
}

function loadCheckout() {
	var xhttp = new XMLHttpRequest();
	
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("index-body-container").innerHTML = this.responseText;
			$('.cart-icon-container').hide();
			$('.cart-icon-container-open').hide();
			
			const targetNode = document.getElementById('index-body-container');
			const config = { childList: true };
			
			let observer = new MutationObserver((mutations) => {
				mutations.forEach((mutation) => {
					let oldValue = mutation.oldValue;
					let newValue = mutation.target.textContent;
					if (oldValue !== newValue) {
						$('.cart-icon-container').show();
						$('.cart-icon-container-open').show();
						observer.disconnect();
					}
				});
			});
			
			observer.observe(targetNode, config);
		}
	};
	
	xhttp.open("GET", "src/checkout.html", true);
	xhttp.send();
}

/* MODALS */

function addToCart() {
	var menuItemModal = document.getElementById('menu-item-modal');
	var modal = bootstrap.Modal.getInstance(menuItemModal);
	
	if (selectedItemSubCateg === "potato-fries") {
		if (!$("[name='fries-flavor']:checked").val()) {
			alert('no flavor selected');
		}
		else {
			modal.hide();
			getModalDetails();
		}
	}
	else {
		modal.hide();
		getModalDetails();
	}
}

function getModalDetails() {
	var selectedSize = $("[name='product-size']:checked + label").text();
	var selectedSugarLevel = $('#milktea-sugar-slider').val() + '%';
	var selectedAddon = $("[name='beverage-addon']:checked + label").text();
	var selectedFlavor = $("[name='fries-flavor']:checked + label").text();
	var selectedRiceMealsOption = $("[name='ricemeals-option']:checked + label").text();
	var productQuantity = $('#modal-product-quantity').val();
	var modalTotalPrice = $('#modal-product-price').text();
	var modalFinalPrice = parseInt(productQuantity * modalTotalPrice.slice(1));
	
	console.log('Category	: ' + selectedItemCateg.split('-')[0]);
	console.log('SubCategory	: ' + selectedItemSubCateg);
	console.log('Product		: ' + productTitle);
	console.log('Base Price	: ' + productPrice);
	console.log('Size		: ' + selectedSize);
	console.log('Sugar		: ' + selectedSugarLevel);
	console.log('Addon		: ' + selectedAddon);
	console.log('Flavor		: ' + selectedFlavor);
	console.log('RMOption	: ' + selectedRiceMealsOption);
	console.log('Total Price	: ' + modalTotalPrice);
	console.log('Quantity	: ' + productQuantity);
	console.log('Final Price	: ₱' + modalFinalPrice);
}

/* CHECKOUT FORM */
function getSubTotal() {
	
}

function getTotalPrice(subTotal, shippingFee) {
	return subTotal + shippingFee;
}

function claimOption() {
	const shippingFee = 150;
	
	if ($('#claim-delivery').is(':checked')) {
		$('#shipping-fee span').text('₱' + shippingFee);
		
		$('.payment-options > label').removeAttr("style");
		
		$('#payment-cod').prop('disabled', false);
		
		$('#payment-gcash').prop('disabled', false);
	}
	else {
		$('#shipping-fee span').text('₱0');
		
		$('.payment-options > label').removeAttr("style");
		
		$('#payment-cod').prop('disabled', true);
		$('#payment-cod:disabled ~ label').css("color", "#bbb");
			
		$('#payment-gcash').prop('disabled', false);
		$('#payment-gcash').prop('checked', true);
	}
}

function paymentOption() {
}

function contactNoFormat(contactNoInput) {
	var contactNoVal = $(contactNoInput).val();
	var contactNoReplace = $(contactNoInput).val().replace(/\D/g,''); 
	
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