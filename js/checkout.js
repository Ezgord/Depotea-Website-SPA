
function loadCartModal() {
	var xhttp = new XMLHttpRequest();
	
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("cart-modal-body").innerHTML = this.responseText;
			$('.form-wrapper').hide();
			$('.cart-wrapper.col-sm-7').toggleClass('col-sm-7 col-sm-12')
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
			$('.form-wrapper').show();
			$('.cart-icon-container').hide();
			$('.cart-icon-container-open').hide();
			$('.cart-wrapper.col-sm-12').toggleClass('col-sm-12 col-sm-7')
			
			const targetNode = document.getElementById('index-body-container');
			const config = { attributes: true, childList: true, subtree: true };
			
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

function addToCart() {
	var selectedSize = $("[name='product-size']:checked + label").text();
	var selectedSugar = $("[name='milktea-sugar-button']:checked + label").text();
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
	console.log('Sugar		: ' + selectedSugar);
	console.log('Addon		: ' + selectedAddon);
	console.log('Flavor		: ' + selectedFlavor);
	console.log('RMOption	: ' + selectedRiceMealsOption);
	console.log('Total Price	: ' + modalTotalPrice);
	console.log('Quantity	: ' + productQuantity);
	console.log('Final Price	: ₱' + modalFinalPrice);
}