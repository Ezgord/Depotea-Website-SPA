
// ONLOAD FUNCTIONS

function checkCartLocalStorage() {
	//localStorage.length === 0
	if (!localStorage.getItem('savedCartItems')) {
		cartIsEmpty();
	}
	else {
		var cartItems = localStorage.getItem('savedCartItems');
		
		$('.cart-items-container').html(cartItems);
		$('div').remove('.empty-cart-wrapper');
	}
	if ($('.cart-item').length === 0) {
		cartIsEmpty();
		localStorage.removeItem('savedCartItems');
	}
	getCartItemCount();
	getQuantityCount();
	getCartSubTotal();
	getTotalPrice();
}

function cartIsEmpty() {
	var emptyCart =
`<div class="empty-cart-wrapper row justify-content-center">
	<div class="empty-cart-icon-container col-12 d-flex justify-content-center">
		<img src="assets/img/icon/svg/empty-shopping-bag.svg">
	</div>
	<div class="col-12 my-3 text-center">
		<h1>Oh no! It's empty!</h1>
	</div>
</div>`;
	$('.cart-items').html(emptyCart);
}

// ADD TO CART FUNCTION

function addToCart() {
	if (!$("[name='fries-flavor']:checked").val() && !$("[name='fries-flavor']").is(':hidden')) {
		$('#menu-modal-alert').modal("show");
		$('#menu-modal-alert p').text('Please select a flavor.');
	}
	else {
		$('#menu-item-modal').modal("hide");
		showAlertToast();
		getModalDetails();
	}
}

function showAlertToast() {
	var productName = $('#modal-product-name').text();
	var itemAddedToast =
`<div class="toast fade hide align-items-center text-white bg-dark border-0 mb-2" role="alert" aria-live="assertive" aria-atomic="true">
	<div class="d-flex">
		<div class="toast-body">
			<span><strong>${productName}</strong> has been added to cart.<span>
		</div>
		<button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
	</div>
</div>`;
	var toastLength = $('.toast').length;
	for (var i = 0; i <= toastLength; i++) {
		if (i == toastLength) {
			$('.toast-container').append(itemAddedToast);
			$($('.toast')[i]).toast("show");
		}
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
	var selectedRiceMealsOption = $("[name='ricemeals-option']:checked + label").text().substring(6);
	var productQuantity = $('#modal-product-quantity').val();
	var modalTotalPrice = $('#modal-product-price').text().slice(1);
	var cartProductPrice = modalTotalPrice * productQuantity;
	
	if (selectedAddon === '') {
	}
	else {
		selectedAddon = '• ' + selectedAddon;
	}
	if (selectedFlavor === '') {
	}
	else {
		selectedFlavor = '• ' + selectedFlavor;
	}
	
	if (selectedItemCateg === 'milktea') {
		addMilkTeaToCart(productImage, productTitle, selectedSize, selectedSugarLevel, selectedAddon, productQuantity, cartProductPrice);
	}
	else if (selectedItemCateg === 'fruittea') {
		addFruitTeaToCart(productImage, productTitle, selectedSize, selectedAddon, productQuantity, cartProductPrice);
	}
	else if (selectedItemCateg === 'snacks') {
		if (selectedItemSubCateg === 'potato-fries' || selectedItemSubCateg === 'toasted-bread' || selectedItemSubCateg === 'pancit') {
			if (productTitle === "Special Lomi") {
				addSnacksToCart2(productImage, productTitle, productQuantity, cartProductPrice);
			}
			else {
				addSnacksToCart(productImage, productTitle, selectedSize, selectedFlavor, productQuantity, cartProductPrice);
			}
		}
		else {
			addSnacksToCart2(productImage, productTitle, productQuantity, cartProductPrice);
		}
	}
	else if (selectedItemCateg === 'ricemeals') {
		if (productTitle === 'Buttered Fried Chicken') {
			addRiceMealToCart2(productImage, productTitle, selectedSize, productQuantity, cartProductPrice);
		}
		else {
			addRiceMealToCart(productImage, productTitle, selectedRiceMealsOption, productQuantity, cartProductPrice);
		}
	}
}
	
function addMilkTeaToCart(productImage, productTitle, selectedSize, selectedSugarLevel, selectedAddon, productQuantity, cartProductPrice) {
	var cartItem =
`<div class="cart-item row mb-3">
	<div class="col-auto d-flex align-items-center">
		<div class="row-auto row-cols-1">
			<div class="col d-flex justify-content-center">
				<input class="my-3" name="cart-item-checkbox" type="checkbox" oninput="selectCartItem()">
			</div>
			<div class="col">
				<button class="btn" type="button" onclick="removeCartItem(this)"><i class="fa-solid fa-trash-can"></i></button>
			</div>
		</div>
	</div>
	<div class="cart-item-img-container col-auto d-flex align-items-center p-0">
		<img src="${productImage}" style="object-fit: contain; height: 100px; width: auto;"/>
	</div>
	<div class="cart-item-img-container-after col">
		<div class="row my-3">
			<div class="col-12 col-sm d-flex justify-content-center align-items-stretch">
				<div class="row row-cols-1">
					<div class="col text-center d-flex justify-content-center align-items-center">
						<span id="cart-item-product-name">${productTitle}</span>
					</div>
					<div class="col text-center text-secondary d-flex justify-content-center align-items-center">
						<span id="cart-item-product-desc">${selectedSize + ' • ' + selectedSugarLevel + ' Sugar ' + selectedAddon}</span>
					</div>
				</div>
			</div>
			<div class="col-12 col-sm-auto d-flex justify-content-center align-items-center">
				<div class="row-auto row-cols-1">
					<div class="col text-center fw-bold">
						<p class="cart-item-price">${'₱' + cartProductPrice}</p>
					</div>
					<div class="quantity-btn-container col">
						<button class="quantity-btn down btn btn-link px-2" onclick="quantityChangeCart('quantity-', this)">
							<i class="fa-solid fa-circle-minus" style="color: #000;"></i>
						</button>
						
						<input class="cart-product-quantity form-control-sm" type="number" value="${productQuantity}" disabled readonly>
						
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

function addFruitTeaToCart(productImage, productTitle, selectedSize, selectedAddon, productQuantity, cartProductPrice) {
	var cartItem =
`<div class="cart-item row mb-3">
	<div class="col-auto d-flex align-items-center">
		<div class="row-auto row-cols-1">
			<div class="col d-flex justify-content-center">
				<input class="my-3" name="cart-item-checkbox" type="checkbox" oninput="selectCartItem()">
			</div>
			<div class="col">
				<button class="btn" type="button" onclick="removeCartItem(this)"><i class="fa-solid fa-trash-can"></i></button>
			</div>
		</div>
	</div>
	<div class="cart-item-img-container col-auto d-flex align-items-center p-0">
		<img src="${productImage}" style="object-fit: contain; height: 100px; width: auto;"/>
	</div>
	<div class="cart-item-img-container-after col">
		<div class="row my-3">
			<div class="col-12 col-sm d-flex justify-content-center align-items-stretch">
				<div class="row row-cols-1">
					<div class="col text-center d-flex justify-content-center align-items-center">
						<span id="cart-item-product-name">${productTitle}</span>
					</div>
					<div class="col text-center text-secondary d-flex justify-content-center align-items-center">
						<span id="cart-item-product-desc">${selectedSize + ' ' + selectedAddon}</span>
					</div>
				</div>
			</div>
			<div class="col-12 col-sm-auto d-flex justify-content-center align-items-center">
				<div class="row-auto row-cols-1">
					<div class="col text-center fw-bold">
						<p class="cart-item-price">${'₱' + cartProductPrice}</p>
					</div>
					<div class="quantity-btn-container col">
						<button class="quantity-btn down btn btn-link px-2" onclick="quantityChangeCart('quantity-', this)">
							<i class="fa-solid fa-circle-minus" style="color: #000;"></i>
						</button>
						
						<input class="cart-product-quantity form-control-sm" type="number" value="${productQuantity}" disabled readonly>
						
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

function addSnacksToCart(productImage, productTitle, selectedSize, selectedFlavor, productQuantity, cartProductPrice) {
	var cartItem =
`<div class="cart-item row mb-3">
	<div class="col-auto d-flex align-items-center">
		<div class="row-auto row-cols-1">
			<div class="col d-flex justify-content-center">
				<input class="my-3" name="cart-item-checkbox" type="checkbox" oninput="selectCartItem()">
			</div>
			<div class="col">
				<button class="btn" type="button" onclick="removeCartItem(this)"><i class="fa-solid fa-trash-can"></i></button>
			</div>
		</div>
	</div>
	<div class="cart-item-img-container col-auto d-flex align-items-center p-0">
		<img src="${productImage}" style="object-fit: contain; height: 100px; width: auto;"/>
	</div>
	<div class="cart-item-img-container-after col">
		<div class="row my-3">
			<div class="col-12 col-sm d-flex justify-content-center align-items-stretch">
				<div class="row row-cols-1">
					<div class="col text-center d-flex justify-content-center align-items-center">
						<span id="cart-item-product-name">${productTitle}</span>
					</div>
					<div class="col text-center text-secondary d-flex justify-content-center align-items-center">
						<span id="cart-item-product-desc">${selectedSize + ' ' + selectedFlavor}</span>
					</div>
				</div>
			</div>
			<div class="col-12 col-sm-auto d-flex justify-content-center align-items-center">
				<div class="row-auto row-cols-1">
					<div class="col text-center fw-bold">
						<p class="cart-item-price">${'₱' + cartProductPrice}</p>
					</div>
					<div class="quantity-btn-container col">
						<button class="quantity-btn down btn btn-link px-2" onclick="quantityChangeCart('quantity-', this)">
							<i class="fa-solid fa-circle-minus" style="color: #000;"></i>
						</button>
						
						<input class="cart-product-quantity form-control-sm" type="number" value="${productQuantity}" disabled readonly>
						
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

function addSnacksToCart2(productImage, productTitle, productQuantity, cartProductPrice) {
	var cartItem =
`<div class="cart-item row mb-3">
	<div class="col-auto d-flex align-items-center">
		<div class="row-auto row-cols-1">
			<div class="col d-flex justify-content-center">
				<input class="my-3" name="cart-item-checkbox" type="checkbox" oninput="selectCartItem()">
			</div>
			<div class="col">
				<button class="btn" type="button" onclick="removeCartItem(this)"><i class="fa-solid fa-trash-can"></i></button>
			</div>
		</div>
	</div>
	<div class="cart-item-img-container col-auto d-flex align-items-center p-0">
		<img src="${productImage}" style="object-fit: contain; height: 100px; width: auto;"/>
	</div>
	<div class="cart-item-img-container-after col">
		<div class="row my-3">
			<div class="col-12 col-sm d-flex justify-content-center align-items-stretch">
				<div class="row row-cols-1">
					<div class="col text-center d-flex justify-content-center align-items-center">
						<span id="cart-item-product-name">${productTitle}</span>
					</div>
					<div class="col text-center text-secondary d-flex justify-content-center align-items-center">
						<span id="cart-item-product-desc"></span>
					</div>
				</div>
			</div>
			<div class="col-12 col-sm-auto d-flex justify-content-center align-items-center">
				<div class="row-auto row-cols-1">
					<div class="col text-center fw-bold">
						<p class="cart-item-price">${'₱' + cartProductPrice}</p>
					</div>
					<div class="quantity-btn-container col">
						<button class="quantity-btn down btn btn-link px-2" onclick="quantityChangeCart('quantity-', this)">
							<i class="fa-solid fa-circle-minus" style="color: #000;"></i>
						</button>
						
						<input class="cart-product-quantity form-control-sm" type="number" value="${productQuantity}" disabled readonly>
						
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

function addRiceMealToCart(productImage, productTitle, selectedRiceMealsOption, productQuantity, cartProductPrice) {
	var cartItem =
`<div class="cart-item row mb-3">
	<div class="col-auto d-flex align-items-center">
		<div class="row-auto row-cols-1">
			<div class="col d-flex justify-content-center">
				<input class="my-3" name="cart-item-checkbox" type="checkbox" oninput="selectCartItem()">
			</div>
			<div class="col">
				<button class="btn" type="button" onclick="removeCartItem(this)"><i class="fa-solid fa-trash-can"></i></button>
			</div>
		</div>
	</div>
	<div class="cart-item-img-container col-auto d-flex align-items-center p-0">
		<img src="${productImage}" style="object-fit: contain; height: 100px; width: auto;"/>
	</div>
	<div class="cart-item-img-container-after col">
		<div class="row my-3">
			<div class="col-12 col-sm d-flex justify-content-center align-items-stretch">
				<div class="row row-cols-1">
					<div class="col text-center d-flex justify-content-center align-items-center">
						<span id="cart-item-product-name">${productTitle}</span>
					</div>
					<div class="col text-center text-secondary d-flex justify-content-center align-items-center">
						<span id="cart-item-product-desc">${selectedRiceMealsOption}</span>
					</div>
				</div>
			</div>
			<div class="col-12 col-sm-auto d-flex justify-content-center align-items-center">
				<div class="row-auto row-cols-1">
					<div class="col text-center fw-bold">
						<p class="cart-item-price">${'₱' + cartProductPrice}</p>
					</div>
					<div class="quantity-btn-container col">
						<button class="quantity-btn down btn btn-link px-2" onclick="quantityChangeCart('quantity-', this)">
							<i class="fa-solid fa-circle-minus" style="color: #000;"></i>
						</button>
						
						<input class="cart-product-quantity form-control-sm" type="number" value="${productQuantity}" disabled readonly>
						
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

function addRiceMealToCart2(productImage, productTitle, selectedSize, productQuantity, cartProductPrice) {
	var cartItem =
`<div class="cart-item row mb-3">
	<div class="col-auto d-flex align-items-center">
		<div class="row-auto row-cols-1">
			<div class="col d-flex justify-content-center">
				<input class="my-3" name="cart-item-checkbox" type="checkbox" oninput="selectCartItem()">
			</div>
			<div class="col">
				<button class="btn" type="button" onclick="removeCartItem(this)"><i class="fa-solid fa-trash-can"></i></button>
			</div>
		</div>
	</div>
	<div class="cart-item-img-container col-auto d-flex align-items-center p-0">
		<img src="${productImage}" style="object-fit: contain; height: 100px; width: auto;"/>
	</div>
	<div class="cart-item-img-container-after col">
		<div class="row my-3">
			<div class="col-12 col-sm d-flex justify-content-center align-items-stretch">
				<div class="row row-cols-1">
					<div class="col text-center d-flex justify-content-center align-items-center">
						<span id="cart-item-product-name">${productTitle}</span>
					</div>
					<div class="col text-center text-secondary d-flex justify-content-center align-items-center">
						<span id="cart-item-product-desc">${selectedSize}</span>
					</div>
				</div>
			</div>
			<div class="col-12 col-sm-auto d-flex justify-content-center align-items-center">
				<div class="row-auto row-cols-1">
					<div class="col text-center fw-bold">
						<p class="cart-item-price">${'₱' + cartProductPrice}</p>
					</div>
					<div class="quantity-btn-container col">
						<button class="quantity-btn down btn btn-link px-2" onclick="quantityChangeCart('quantity-', this)">
							<i class="fa-solid fa-circle-minus" style="color: #000;"></i>
						</button>
						
						<input class="cart-product-quantity form-control-sm" type="number" value="${productQuantity}" disabled readonly>
						
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

function getCartItemCount() {
	var cartItemCount = $('.cart-item').length;
	$('#cart-item-count').text(cartItemCount);
	$('.cart-header-item-count').text(cartItemCount);
}

function selectAllCartItem(selectAllInput) {
	if ($(selectAllInput).is(':checked')) {
		$("[name='cart-item-checkbox']").prop('checked', true);
	}
	else {
		$("[name='cart-item-checkbox']").prop('checked', false);
	}
}

function selectCartItem() {
	if ($("[name='cart-item-checkbox']:checked").length == $("[name='cart-item-checkbox']").length) {
		$('#cart-select-all').prop('checked', true);
	}
	else {
		$('#cart-select-all').prop('checked', false);
	}
}

function deleteSelectedCartItem() {
	if ($("[name='cart-item-checkbox']").is(':checked')) {
		$("[name='cart-item-checkbox']:checked").closest('.cart-item').remove();
		saveCartItems();
	}
}

function removeCartItem(thisCartItem) {
	$(thisCartItem).closest('.cart-item').remove();
	saveCartItems();
}

function quantityChangeCart(quantityBtn, thisQuantity) {
	var oldVal = $(thisQuantity).closest('.quantity-btn-container').find('.cart-product-quantity').val();
	var newVal;
	
	var cartItemPrice = parseInt($(thisQuantity).closest('.row-auto').find('.cart-item-price').text().slice(1));
	var productQuantity = $(thisQuantity).closest('.quantity-btn-container').find('.cart-product-quantity').val();
	var productBasePrice = cartItemPrice / productQuantity;
	
	if (quantityBtn == 'quantity-') {
		if (oldVal <= 1) {
			newVal = 1;
		}
		else {
			newVal = parseInt(oldVal) - 1;
			cartItemPrice = cartItemPrice - productBasePrice;
		}
	}
	else {
		if (oldVal >= 9) {
			newVal = 9;
		}
		else {
			newVal = parseInt(oldVal) + 1;
			cartItemPrice = cartItemPrice + productBasePrice;
		}
	}
	//document.getElementsByClassName("cart-product-quantity").value = newVal;
	
	$(thisQuantity).closest('.quantity-btn-container').find('.cart-product-quantity').attr('value', newVal);
	$(thisQuantity).closest('.row-auto').find('.cart-item-price').text('₱' + cartItemPrice);
	saveCartItems();
}