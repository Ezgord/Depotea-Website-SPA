
// CATEGORIES

function loadMilkTea() {
	var xhttp = new XMLHttpRequest();
	
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("menu-container").innerHTML = this.responseText;
			document.getElementById("milktea-category").checked = true;
			
			addModalAttribute();
		}
	};
	
	xhttp.open("GET", "src/milktea.html", true);
	xhttp.send();
}

function loadFruitTea() {
	var xhttp = new XMLHttpRequest();
	
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("menu-container").innerHTML = this.responseText;
			document.getElementById("fruittea-category").checked = true;
			
			addModalAttribute();
		}
	};
	
	xhttp.open("GET", "src/fruittea.html", true);
	xhttp.send();
}

function loadSnacks() {
	var xhttp = new XMLHttpRequest();
	
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("menu-container").innerHTML = this.responseText;
			document.getElementById("snacks-category").checked = true;
			
			addModalAttribute();
		}
	};
	
	xhttp.open("GET", "src/snacks.html", true);
	xhttp.send();
}

function loadRiceMeals() {
	var xhttp = new XMLHttpRequest();
	
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("menu-container").innerHTML = this.responseText;
			document.getElementById("ricemeals-category").checked = true;
			
			addModalAttribute();
		}
	};
	
	xhttp.open("GET", "src/ricemeals.html", true);
	xhttp.send();
}

// MODAL

function addModalAttribute() {
	var elements = document.querySelectorAll('.menu-item');
	for (var i=0; i < elements.length; i++) {
		elements[i].setAttribute("data-bs-toggle", "modal");
		elements[i].setAttribute("data-bs-target", "#menu-item-modal");
		elements[i].setAttribute("onclick", "modalUpdate($(this), $(this).closest('section'), this.querySelector('p').innerHTML, this.querySelector('p').nextElementSibling.innerHTML, this.querySelector('img').getAttribute('src'))");
	}
}

function modalUpdate(menuItem, selectedItem, productTitle, productPriceRaw, productImage) {
		// RESET ALL
	$('#menu-item-modal').find('form').trigger('reset');
	$('#modal-wrapper *').show();
	$('#modal-wrapper input').prop('disabled', false);
	$('#product-size-option input').prop('value', '0');
		// SET PRODUCT INFO
	$('#modal-product-image').prop('src', productImage);
	$('#modal-product-name').text(productTitle);
	$('#modal-product-totalprice').text('₱');
	$('#modal-product-totalprice').text(productPriceRaw)
	$('#modal-product-quantity').val(1);
		// GET PRICE FROM PRODUCT INFO
	productPrice = parseInt(productPriceRaw.slice(1));
	
	if($(menuItem).parents().hasClass('milktea-document')) {
		console.log("milktea selected");
		$("#modal-product-name").append(' Milk Tea');
		modalProductMilkTea(selectedItem);
	}
	else if($(menuItem).parents().hasClass('fruittea-document')) {
		console.log("fruittea selected");
		$("#modal-product-name").append(' Fruit Tea');
		modalProductFruitTea(selectedItem);
	}
	else if($(menuItem).parents().hasClass('snacks-document')) {
		document.getElementById('modal-span').innerHTML = '';
		$('.general-options').hide();
		$('.beverage-options').hide();
		$('.ricemeals-options').hide();
	}
	else if($(menuItem).parents().hasClass('ricemeals-document')) {
		document.getElementById('modal-span').innerHTML = '[description of meal]';
		$('.general-options').hide();
		$('.beverage-options').hide();
		$('.snacks-options').hide();
	}
}

function modalProductMilkTea(selectedItem) {
	$('.snacks-options').hide();
	$('.ricemeals-options').hide();
	$('.fruittea-addons').hide();
	
	if ($(selectedItem).hasClass('classic-milktea')) {
		console.log("classic milktea selected");
		$('#modal-span').text('(Pearls Included)');
		$("#product-size-option > h5").text('Size:');
		
		$("#product-size1 + label").text('₱70 - Medium');
		$("#product-size1").prop('checked', true);
		
		$("#product-size2 + label").text('₱80 - Large');
		$("#product-size2").prop('value', '10');
	}
	else if ($(selectedItem).hasClass('special-edition')) {
		console.log("special edition selected");
		$('#modal-span').text('(Pearls Included)');
		$("#product-size-option > h5").text('Large Size Only');
		
		$("#product-size1 + label").text('Medium');
		$("#product-size1").prop('disabled', true);
		
		$("#product-size2 + label").text('₱95 - Large');
		$("#product-size2").prop('checked', true);
	}
	else if ($(selectedItem).hasClass('firstclass-milktea')) {
		console.log("firstclass-milktea selected");
		$('#modal-span').text('(Pearls Included)');
		$("#product-size-option > h5").text('Large Size Only');
		
		$("#product-size1 + label").text('Medium');
		$("#product-size1").prop('disabled', true);
		
		$("#product-size2 + label").text('₱115 - Large');
		$("#product-size2").prop('checked', true);
	}
	else if ($(selectedItem).hasClass('creamcheese-series')) {
		console.log("creamcheese-series selected");
		$('#modal-span').text('(Pearls Included)');
		$("#product-size-option > h5").text('Large Size Only');
		
		$("#product-size1 + label").text('Medium');
		$("#product-size1").prop('disabled', true);
		
		$("#product-size2 + label").text('₱115 - Large');
		$("#product-size2").prop('checked', true);
	}
}

function modalProductFruitTea(selectedItem) {
	$('.snacks-options').hide();
	$('.ricemeals-options').hide();
	$('.milktea-sugar-option').hide();
	$('.milktea-addons').hide();
	
	if ($(selectedItem).hasClass('classic-fruittea')) {
		$('#modal-span').text('(Nata de coco Included)');
		$("#product-size-option > h5").text('Large Size Only');
		
		$("#product-size1 + label").text('Medium');
		$("#product-size1").prop('disabled', true);
		
		$("#product-size2 + label").text('₱80 - Large');
		$("#product-size2").prop('checked', true);
	}
}

function quantityChange(quantityBtn) {
	var oldVal = $('#modal-product-quantity').val();
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
	
	$('#modal-product-quantity').val(newVal);
}
	
function productTotalPrice() {
	var productTotalPrice = productPrice;
	var productQuantity;
	var sizePrice = 0;
	var addonPrice = 0;
	var ricemealsOptionPrice = 0;
	
	if ($("[name='product-size']").is(':checked')) {
		sizePrice += parseInt($("[name='product-size']:checked").val());
		productTotalPrice = parseInt(productTotalPrice + sizePrice);
	}
	else {
		productTotalPrice = parseInt(productTotalPrice + sizePrice);
	}
	
	if ($("[name='beverage-addon']").is(':checked')) {
		$("[name='beverage-addon']").prop('disabled', true);
		$("[name='beverage-addon']:checked").prop('disabled', false);
		addonPrice += parseInt($("[name='beverage-addon']:checked").val());
		productTotalPrice = parseInt(productTotalPrice + addonPrice);
	}
	else if ($("[name='beverage-addon']")) {
		$("[name='beverage-addon']").prop('disabled', false);
	}
	else {
		productTotalPrice = parseInt(productTotalPrice + addonPrice);
	}
	
	if ($("[name='ricemeals-option']").is(':checked')) {
		ricemealsOptionPrice += parseInt($("[name='ricemeals-option']:checked").val());
		productTotalPrice = parseInt(productTotalPrice + ricemealsOptionPrice);
	}
	else {
		productTotalPrice = parseInt(productTotalPrice + ricemealsOptionPrice);
	}
	
	$('#modal-product-totalprice').text('₱' + productTotalPrice);
}