

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

function addToCart(invalidInput) {
	if (selectedItemSubCateg === "potato-fries") {
		if (!$("[name='fries-flavor']:checked").val()) {
			menuModalInvalid();
		}
		else {
			$('#menu-item-modal').modal("hide");
			getModalDetails();
		}
	}
	else {
		$('#menu-item-modal').modal("hide");
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

function quantityChangeCart(quantityBtn, thisQuantity) {
	var oldVal = $(thisQuantity).closest('.quantity-btn-container').find('.cart-product-quantity').val();
	var newVal;
	
	if (quantityBtn == 'quantity-') {
		if (oldVal <= 1) {
			newVal = 1;
		}
		else {
			newVal = parseInt(oldVal) - 1;
		}
	}
	else {
		if (oldVal >= 9) {
			newVal = 9;
		}
		else {
			newVal = parseInt(oldVal) + 1;
		}
	}
	
	$(thisQuantity).closest('.quantity-btn-container').find('.cart-product-quantity').val(newVal);
}