
// ONLOAD FUNCTIONS

function checkCartLocalStorage() {
	if (localStorage.length === 0) {
		$('.cart-items').html('<p class="no-items">NO ITEMS</p>');
	}
	else {
		var cartItems = localStorage.getItem('savedCartItems');
		
		$('.cart-items-container').html(cartItems);
		$('p').remove('.no-items');
	}
	if ($('.cart-item').length === 0) {
		$('.cart-items').html('<p class="no-items">NO ITEMS</p>');
		localStorage.clear();
	}
}

function loadCartModal() {
	var xhttp = new XMLHttpRequest();
	
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("cart-modal-body").innerHTML = this.responseText;
			$('.checkout-form-wrapper').remove();
			$('.cart-wrapper.col-sm-8').toggleClass('col-sm-8 col-sm-12');
			checkCartLocalStorage();
			getCartItemCount();
		}
	};
	
	xhttp.open("GET", "src/checkout.html", true);
	xhttp.send();
}

function getCartItemCountModal() {
	var cartItemCountModal = $('.col-sm-12').find('.cart-item').length;
	$('.cart-header-item-count').text(cartItemCountModal);
}

// ADD TO CART FUNCTION

function addToCartClick(invalidInput) {
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
	selectedItemCateg = selectedItemCateg.split('-')[0];
	var productImage = $("#modal-product-image").prop("src");
	var productTitle = $("#modal-product-name").text();
	var selectedSize = $("[name='product-size']:checked + label").text().split(' ')[2];
	var selectedSugarLevel = $('#milktea-sugar-slider').val() + '%';
	var selectedAddon = $("[name='beverage-addon']:checked + label").text().substring(6);
	var selectedFlavor = $("[name='fries-flavor']:checked + label").text();
	var selectedRiceMealsOption = $("[name='ricemeals-option']:checked + label").text();
	var productQuantity = $('#modal-product-quantity').val();
	var modalTotalPrice = $('#modal-product-price').text().slice(1);
	var modalFinalPrice = parseInt(productQuantity * modalTotalPrice.slice(1));
	
	if (selectedAddon === '') {
	}
	else {
		selectedAddon = '- ' + selectedAddon;
	}
	/*
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
	*/
	
	if (selectedItemCateg === 'milktea') {
		addMilkTeaToCart(productImage, productTitle, selectedSize, selectedSugarLevel, selectedAddon, productQuantity, modalTotalPrice);
	}
	else if (selectedItemCateg === 'fruittea') {
		
	}
	else if (selectedItemCateg === 'snacks') {
		
	}
	else if (selectedItemCateg === 'ricemeals') {
		
	}
}
	
function addMilkTeaToCart(productImage, productTitle, selectedSize, selectedSugarLevel, selectedAddon, productQuantity, modalTotalPrice) {
	var cartItem = `
		<div class="cart-item row mb-3">
			<div class="col-auto d-flex align-items-center">
				<div class="row-auto row-cols-1">
					<div class="col d-flex justify-content-center">
						<input class="my-3" type="checkbox">
					</div>
					<div class="col">
						<button class="btn" type="button" onclick="removeCartItem(this)"><i class="fa-solid fa-trash-can"></i></button>
					</div>
				</div>
			</div>
			<div class="col-auto d-flex align-items-center p-0">
				<img src="${productImage}" style="object-fit: contain; height: 100px; width: auto;"/>
			</div>
			<div class="col">
				<div class="row my-3">
					<div class="col-12 col-sm d-flex justify-content-center align-items-stretch">
						<div class="row row-cols-1">
							<div class="col text-center d-flex justify-content-center align-items-center">
								<span id="cart-item-product-name">${productTitle}</span>
							</div>
							<div class="col text-center text-secondary d-flex justify-content-center align-items-center">
								<span id="cart-item-product-desc">${selectedSize + ' - ' + selectedSugarLevel + ' Sugar ' + selectedAddon}</span>
							</div>
						</div>
					</div>
					<div class="col-12 col-sm-auto d-flex justify-content-center align-items-center">
						<div class="row-auto row-cols-1">
							<div class="col text-center fw-bold">
								<p>${'₱' + modalTotalPrice}</p>
							</div>
							<div class="quantity-btn-container col">
								<button class="quantity-btn down btn btn-link px-2" onclick="quantityChangeCart('quantity-', this)">
									<i class="fa-solid fa-circle-minus" style="color: #000;"></i>
								</button>
								
								<input class="cart-product-quantity form-control-sm" type="number" value="${productQuantity}" min="1" max="9" disabled readonly>
								
								<button class="quantity-btn up btn btn-link px-2" onclick="quantityChangeCart('quantity+', this)">
									<i class="fa-solid fa-circle-plus" style="color: #000;"></i>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>`;
		
	$('.cart-items').append(cartItem);
	saveCartItems();
}

function saveCartItems() {
	var saveCartItem = $('.cart-items-container').html();
	localStorage.setItem('savedCartItems', saveCartItem);
	checkCartLocalStorage();
}

// CART ITEM FUNCTIONS

function removeCartItem(thisCartItem) {
	$(thisCartItem).closest('.cart-item').remove();
	saveCartItems();
	getCartItemCount();
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