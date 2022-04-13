
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
		elements[i].setAttribute("onclick", "modalUpdate($(this),  $(this).closest('section'), this.querySelector('p').innerHTML, this.querySelector('p').nextElementSibling.innerHTML, this.querySelector('img').getAttribute('src'))");
	}
}

function modalUpdate(menuItem, selectedItem, productTitle, productPriceRaw, productImage) {
		// RESET ALL
	$('#menu-item-modal').find('form').trigger('reset');
	$('#modal-wrapper *').show();
	$('#modal-wrapper input').prop('disabled', false);
	$('#appended-title').remove();
	$('#product-size-option input').prop('value', '0');
	$('.product-sizes:eq(2)').hide();
	$('#addon-natadecoco ~ label').text('₱15 - Nata De Coco');
		// SET PRODUCT INFO
	$('#modal-product-image').prop('src', productImage);
	$('#modal-product-name').text(productTitle);
	$('#modal-product-totalprice').text(productPriceRaw)
	$('#modal-product-quantity').val(1);
		// GET PRICE FROM PRODUCT INFO
	productPrice = parseInt(productPriceRaw.slice(1));
			console.log(productPrice);
	
	if($(menuItem).parents().hasClass('milktea-document')) {
		$("#modal-product-name").append('<span id="appended-title"> Milk Tea</span>');
		modalProductMilkTea(selectedItem);
	}
	else if($(menuItem).parents().hasClass('fruittea-document')) {
		$("#modal-product-name").append('<span id="appended-title"> Fruit Tea</span>');
		modalProductFruitTea(selectedItem, productPrice);
	}
	else if($(menuItem).parents().hasClass('snacks-document')) {
		modalProductSnacks(selectedItem, productTitle, productPrice);
	}
	else if($(menuItem).parents().hasClass('ricemeals-document')) {
		modalProductRiceMeals(selectedItem, productTitle);
	}
}

function modalProductMilkTea(selectedItem) {
	$('.snacks-options').hide();
	$('.ricemeals-options').hide();
	$('.fruittea-addons').hide();
	
	$('#modal-span').text('(Pearls Included)');
	$("#product-size-option > h5").text('Large Size Only');
	
	if ($(selectedItem).hasClass('classic-milktea')) {
		$("#product-size-option > h5").text('Size:');
		
		$("#product-size1 + label").text('₱70 - Medium');
		$("#product-size1").prop('checked', true);
		
		$("#product-size2 + label").text('₱80 - Large');
		$("#product-size2").prop('value', '10');
	}
	else if ($(selectedItem).hasClass('special-edition')) {
		$("#product-size1 + label").text('Medium');
		$("#product-size1").prop('disabled', true);
		
		$("#product-size2 + label").text('₱95 - Large');
		$("#product-size2").prop('checked', true);
	}
	else if ($(selectedItem).hasClass('firstclass-milktea')) {
		$("#product-size1 + label").text('Medium');
		$("#product-size1").prop('disabled', true);
		
		$("#product-size2 + label").text('₱115 - Large');
		$("#product-size2").prop('checked', true);
	}
	else if ($(selectedItem).hasClass('creamcheese-series')) {
		$("#product-size1 + label").text('Medium');
		$("#product-size1").prop('disabled', true);
		
		$("#product-size2 + label").text('₱115 - Large');
		$("#product-size2").prop('checked', true);
	}
}

function modalProductFruitTea(selectedItem, productPrice) {
	$('.snacks-options').hide();
	$('.ricemeals-options').hide();
	$('.milktea-sugar-option').hide();
	$('.milktea-addons').hide();
	
	$('#modal-span').text('(Nata De Coco Included)');
	$("#product-size-option > h5").text('Large Size Only');
	
	if ($(selectedItem).hasClass('classic-fruittea')) {
		$('#addon-natadecoco ~ label').text('₱15 - Extra Nata De Coco');
		
		$("#product-size1 + label").text('Medium');
		$("#product-size1").prop('disabled', true);
		
		if (productPrice == 80) {
			$("#product-size2 + label").text('₱80 - Large');
			$("#product-size2").prop('checked', true);
		}
		else if (productPrice == 90) {
			$("#product-size2 + label").text('₱90 - Large');
			$("#product-size2").prop('checked', true);
		}
	}
	
	else if ($(selectedItem).hasClass('creambased-fruittea')) {
		$('#modal-span').text('(Pearls Included)');
	
		$("#product-size1 + label").text('Medium');
		$("#product-size1").prop('disabled', true);
		
		$("#product-size2 + label").text('₱80 - Large');
		$("#product-size2").prop('checked', true);
	}
	
	else if ($(selectedItem).hasClass('lemon-juice')) {
		$("#modal-product-name").append('<span id="appended-title"> Juice</span>');
		$('#modal-span').text('');
		
		if (productPrice == 70) {
			$("#product-size-option > h5").text('Size:');
			
			$("#product-size1 + label").text('₱70 Medium');
			$("#product-size1").prop('checked', true);
			
			$("#product-size2 + label").text('₱80 Large');
			$("#product-size2").prop('value', '10');
		}
		else if (productPrice == 80) {
			$("#product-size1 + label").text('Medium');
			$("#product-size1").prop('disabled', true);
			
			$("#product-size2 + label").text('₱80 - Large');
			$("#product-size2").prop('checked', true);
		}
		else if (productPrice == 85) {
			$("#product-size1 + label").text('Medium');
			$("#product-size1").prop('disabled', true);
			
			$("#product-size2 + label").text('₱85 - Large');
			$("#product-size2").prop('checked', true);
		}
	}
	
	else if ($(selectedItem).hasClass('yakult-series')) {
		$("#modal-product-name").append('<span id="appended-title"> Yakult</span>');
		$('#addon-natadecoco ~ label').text('₱15 - Extra Nata De Coco');
		
		$("#product-size1 + label").text('Medium');
		$("#product-size1").prop('disabled', true);
		
		$("#product-size2 + label").text('₱119 - Large');
		$("#product-size2").prop('checked', true);
	}
}

function modalProductSnacks(selectedItem, productTitle, productPrice) {
	$('#modal-span').text('');
	$('.general-options').hide();
	$('.beverage-options').hide();
	$('.snacks-options').hide();
	$('.ricemeals-options').hide();
	
	$("#product-size-option > h5").text('Size:');
	
	if ($(selectedItem).hasClass('toasted-bread')) {
		$('.general-options').show();
		
		if(productTitle === "Classic Butter") {
			$("#product-size1 + label").text('₱70 - Solo');
			$("#product-size1").prop('checked', true);
			
			$("#product-size2 + label").text('₱130 - Family');
			$("#product-size2").prop('value', '60');
		}
		else if (productTitle === "Garlic Bread") {
			$("#product-size1 + label").text('₱80 - Solo');
			$("#product-size1").prop('checked', true);
			
			$("#product-size2 + label").text('₱140 - Family');
			$("#product-size2").prop('value', '60');
		}
	}
	
	else if ($(selectedItem).hasClass('potato-fries')) {
		$('.general-options').show();
		$('.snacks-options').show();
		
		$("#product-size1 + label").text('₱60 - Medium');
		$("#product-size1").prop('checked', true);
		
		$("#product-size2 + label").text('₱110 - Large');
		$("#product-size2").prop('value', '50');
	}
	
	else if ($(selectedItem).hasClass('pancit')) {
		$('.general-options').show();
		$('.product-sizes:eq(2)').show();
		
		if (productTitle === "Special Lomi") {
			$('.general-options').hide();
			$('.product-sizes:eq(2)').hide();
		}
		else if (productPrice >= 190 && productPrice <= 200) {
			$("#product-size1 + label").text('₱' + productPrice + ' - Regular');
			$("#product-size1").prop('checked', true);
			
			$("#product-size2 + label").text('₱650 - Medium');
			
			$("#product-size3 + label").text('₱950 - Large');
			
			if (productPrice == 190) {
				$("#product-size2").prop('value', '460');
				
				$("#product-size3").prop('value', '760');	
			}
			else if (productPrice == 200) {
				$("#product-size2").prop('value', '450');
				
				$("#product-size3").prop('value', '750');	
			}
		}
	}
}

function modalProductRiceMeals(selectedItem, productTitle) {
	$('.general-options').hide();
	$('.beverage-options').hide();
	$('.snacks-options').hide();
	
	if ($(selectedItem).hasClass('ricemeals')) {
		if(productTitle === "Grilled Liempo") {
			$('#modal-span').text('Grilled Pork with Rice');
		}
		else if(productTitle === "Lechon Kawali") {
			$('#modal-span').text('Fried Pork Belly with Rice');
		}
		else if(productTitle === "Honey Butter Glazed Fried Chicken") {
			$('#modal-span').text('2 pc. Fried Chicken with Honey Butter Sauce, Veggies and Rice');
		}
		else if(productTitle === "2 pc. Fried Chicken") {
			$('#modal-span').text('2 pc. Fried Chicken with Rice');
		}
		else if(productTitle === "Chicken Lollipop") {
			$('#modal-span').text('3 pc. Classic Chicken Lollipop with Rice');
		}
	}
	if ($(selectedItem).hasClass('breakfastmeals')) {
		if(productTitle === "Spam and Egg") {
			$('#modal-span').text('2 pc. Spam, Egg and Rice');
		}
		else if(productTitle === "Longganisa and Egg") {
			$('#modal-span').text('2 pc. Longganisa, Egg and Rice');
		}
		else if(productTitle === "Hotdog and Egg") {
			$('#modal-span').text('2 pc. Tender Juicy Hotdog, Egg and Rice');
		}
		else if(productTitle === "Tocino and Egg") {
			$('#modal-span').text('Tocino, Egg and Rice');
		}
		else if(productTitle === "Corned Beef and Egg") {
			$('#modal-span').text('Corned Beef, Egg and Rice');
		}
	}
	else if ($(selectedItem).hasClass('chickens')) {
		$('.ricemeals-options').hide();
		
		if (productTitle === "Buttered Fried Chicken") {
			$('.general-options').show();
			
			$("#product-size1 + label").text('₱259 - Half');
			$("#product-size1").prop('checked', true);
			
			$("#product-size2 + label").text('₱489 - Whole');
			$("#product-size2").prop('value', '230');
		}
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