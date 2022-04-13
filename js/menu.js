
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

function modalUpdate(selectedItem, selectedItemModal, productTitleRaw, productPriceRaw, productImage) {
		// RESET ALL
	$('#menu-item-modal').find('form').trigger('reset');
	$('#modal-wrapper *').show();
	$('#modal-wrapper input').prop('disabled', false);
	$('#appended-title').remove();
	$('#modal-span').text('');
	$('#product-size-option input').prop('value', '0');
	$('.product-sizes:eq(2)').hide();
	$('#addon-natadecoco ~ label').text('₱15 - Nata De Coco');
		// SET PRODUCT INFO
	$('#modal-product-image').prop('src', productImage);
	$('#modal-product-name').text(productTitleRaw);
	$('#modal-product-price').text(productPriceRaw)
	$('#modal-product-quantity').val(1);
		// GET INFO FROM PRODUCT INFO
	productPrice = parseInt(productPriceRaw.slice(1));
	productTitle = productTitleRaw;
	selectedItemCateg = selectedItem;
	selectedItemSubCateg = selectedItemModal;
	
	if($(selectedItem).parents().hasClass('milktea-document')) {
		$("#modal-product-name").append('<span id="appended-title"> Milk Tea</span>');
		modalProductMilkTea(selectedItemModal);
	}
	else if($(selectedItem).parents().hasClass('fruittea-document')) {
		$("#modal-product-name").append('<span id="appended-title"> Fruit Tea</span>');
		modalProductFruitTea(selectedItemModal, productPrice);
	}
	else if($(selectedItem).parents().hasClass('snacks-document')) {
		modalProductSnacks(selectedItemModal, productTitle, productPrice);
	}
	else if($(selectedItem).parents().hasClass('ricemeals-document')) {
		modalProductRiceMeals(selectedItemModal, productTitle);
	}
}

function modalProductMilkTea(selectedItemModal) {
	$('.snacks-options').hide();
	$('.ricemeals-options').hide();
	$('.fruittea-addons').hide();
	
	$('#modal-span').text('(Pearls Included)');
	$("#product-size-option > h5").text('Large Size Only');
	
	if ($(selectedItemModal).hasClass('classic-milktea')) {
		$("#product-size-option > h5").text('Size:');
		
		$("#product-size1 + label").text('₱70 - Medium');
		$("#product-size1").prop('checked', true);
		
		$("#product-size2 + label").text('₱80 - Large');
		$("#product-size2").prop('value', '10');
	}
	else if ($(selectedItemModal).hasClass('special-edition')) {
		$("#product-size1 + label").text('Medium');
		$("#product-size1").prop('disabled', true);
		
		$("#product-size2 + label").text('₱95 - Large');
		$("#product-size2").prop('checked', true);
	}
	else if ($(selectedItemModal).hasClass('firstclass-milktea')) {
		$("#product-size1 + label").text('Medium');
		$("#product-size1").prop('disabled', true);
		
		$("#product-size2 + label").text('₱115 - Large');
		$("#product-size2").prop('checked', true);
	}
	else if ($(selectedItemModal).hasClass('creamcheese-series')) {
		$("#product-size1 + label").text('Medium');
		$("#product-size1").prop('disabled', true);
		
		$("#product-size2 + label").text('₱115 - Large');
		$("#product-size2").prop('checked', true);
	}
}

function modalProductFruitTea(selectedItemModal, productPrice) {
	$('.snacks-options').hide();
	$('.ricemeals-options').hide();
	$('.milktea-sugar-option').hide();
	$('.milktea-addons').hide();
	
	$("#product-size-option > h5").text('Large Size Only');
	
	if ($(selectedItemModal).hasClass('classic-fruittea')) {
		$('#modal-span').text('(Nata De Coco Included)');
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
	
	else if ($(selectedItemModal).hasClass('creambased-fruittea')) {
		$('#modal-span').text('(Pearls Included)');
	
		$("#product-size1 + label").text('Medium');
		$("#product-size1").prop('disabled', true);
		
		$("#product-size2 + label").text('₱80 - Large');
		$("#product-size2").prop('checked', true);
	}
	
	else if ($(selectedItemModal).hasClass('lemon-juice')) {
		$("#modal-product-name").append('<span id="appended-title"> Juice</span>');
		
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
	
	else if ($(selectedItemModal).hasClass('yakult-series')) {
		$("#modal-product-name").append('<span id="appended-title"> Yakult</span>');
		$('#modal-span').text('(Nata De Coco Included)');
		$('#addon-natadecoco ~ label').text('₱15 - Extra Nata De Coco');
		
		$("#product-size1 + label").text('Medium');
		$("#product-size1").prop('disabled', true);
		
		$("#product-size2 + label").text('₱119 - Large');
		$("#product-size2").prop('checked', true);
	}
}

function modalProductSnacks(selectedItemModal, productTitle, productPrice) {
	$('.general-options').hide();
	$('.beverage-options').hide();
	$('.snacks-options').hide();
	$('.ricemeals-options').hide();
	
	$("#product-size-option > h5").text('Size:');
	
	if ($(selectedItemModal).hasClass('toasted-bread')) {
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
	
	else if ($(selectedItemModal).hasClass('potato-fries')) {
		$('.general-options').show();
		$('.snacks-options').show();
		
		$("#product-size1 + label").text('₱60 - Medium');
		$("#product-size1").prop('checked', true);
		
		$("#product-size2 + label").text('₱110 - Large');
		$("#product-size2").prop('value', '50');
	}
	
	else if ($(selectedItemModal).hasClass('pancit')) {
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
			
			if (productTitle === "Pancit Guisado") {
				$('#modal-span').text('Good for 2-3 Persons');
			}
			else if (productTitle === "Bihon") {
				$('#modal-span').text('Good for 2-3 Persons');
			}
			else if (productTitle === "Pancit Bihon") {
				$('#modal-span').text('Good for 2-3 Persons');
			}
		}
	}
}

function modalProductRiceMeals(selectedItemModal, productTitle) {
	$('.general-options').hide();
	$('.beverage-options').hide();
	$('.snacks-options').hide();
	
	if ($(selectedItemModal).hasClass('ricemeals')) {
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
	if ($(selectedItemModal).hasClass('breakfastmeals')) {
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
	else if ($(selectedItemModal).hasClass('chickens')) {
		$('.ricemeals-options').hide();
		
		if(productTitle === "Classic Chicken Lollipop") {
			$('#modal-span').text('7 pcs. Classic Fried Chicken Lollipop');
		}
		else if(productTitle === "Buttered Chicken Lollipop") {
			$('#modal-span').text('7 pcs. Buttered Fried Chicken Lollipop');
		}
		else if(productTitle === "Classic Fried Chicken") {
			$('#modal-span').text('Half Cut Classic Fried Chicken');
		}
		else if (productTitle === "Buttered Fried Chicken") {
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
	
function productCalcTotalPrice() {
	var productTotalPrice = productPrice;
	var sizePrice = 0;
	var addonPrice = 0;
	var ricemealsOptionPrice = 0;
	
	if ($("[name='product-size']").is(':checked')) {
		sizePrice += parseInt($("[name='product-size']:checked").val());
		productTotalPrice = parseInt(productTotalPrice + sizePrice);
		
		if (productTitle === "Pancit Guisado") {
			if ($("#product-size1").is(':checked')) {
				$('#modal-span').text('Good for 2-3 Persons');
			}
			else if ($("#product-size2").is(':checked')) {
				$('#modal-span').text('Good for 5-8 Persons');
			}
			else if ($("#product-size3").is(':checked')) {
				$('#modal-span').text('Good for 8-12 Persons');
			}
		}
		else if (productTitle === "Bihon") {
			if ($("#product-size1").is(':checked')) {
				$('#modal-span').text('Good for 2-3 Persons');
			}
			else if ($("#product-size2").is(':checked')) {
				$('#modal-span').text('Good for 5-8 Persons');
			}
			else if ($("#product-size3").is(':checked')) {
				$('#modal-span').text('Good for 8-12 Persons');
			}
		}
		else if (productTitle === "Pancit Bihon") {
			if ($("#product-size1").is(':checked')) {
				$('#modal-span').text('Good for 2-3 Persons');
			}
			else if ($("#product-size2").is(':checked')) {
				$('#modal-span').text('Good for 5-8 Persons');
			}
			else if ($("#product-size3").is(':checked')) {
				$('#modal-span').text('Good for 8-12 Persons');
			}
		}
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
	
	$('#modal-product-price').text('₱' + productTotalPrice);
}

function addToCart() {
	var selectedSize = $("[name='product-size']:checked + label").text();
	var selectedSugar = $("[name='milktea-sugar-button']:checked + label").text();
	var selectedAddon = $("[name='beverage-addon']:checked + label").text();
	var selectedFlavor = $("[name='fries-flavor']:checked + label").text();
	var selectedRiceMealsOption = $("[name='ricemeals-option']:checked + label").text();
	var productQuantity = $('#modal-product-quantity').val();
	var modalTotalPrice = $('#modal-product-price').text();
	
	if ($(selectedItemCateg).parents().hasClass('milktea-document')) {
		console.log('Category	: Milk Tea');
		
		if ($(selectedItemSubCateg).hasClass('classic-milktea')) {
			console.log('Sub-Category: Classic Milk Tea');
		}
		else if ($(selectedItemSubCateg).hasClass('special-edition')) {
			console.log('Sub-Category: Special Edition');
		}
		else if ($(selectedItemSubCateg).hasClass('firstclass-milktea')) {
			console.log('Sub-Category: First Class Milk Tea');
		}
		else if ($(selectedItemSubCateg).hasClass('creamcheese-series')) {
			console.log('Sub-Category: Cream Cheese Series');
		}
	}
	else if ($(selectedItemCateg).parents().hasClass('fruittea-document')) {
		console.log('Category	: Fruit Tea');
		
		if ($(selectedItemSubCateg).hasClass('classic-fruittea')) {
			console.log('Sub-Category: Fruit Tea');
		}
		else if ($(selectedItemSubCateg).hasClass('creambased-fruittea')) {
			console.log('Sub-Category: Cream Based Fruit Tea');
		}
		else if ($(selectedItemSubCateg).hasClass('lemon-juice')) {
			console.log('Sub-Category: Lemon Juice');
		}
		else if ($(selectedItemSubCateg).hasClass('yakult-series')) {
			console.log('Sub-Category: Yakult Series');
		}
	}
	else if ($(selectedItemCateg).parents().hasClass('snacks-document')) {
		console.log('Category	: Snacks');
		
		if ($(selectedItemSubCateg).hasClass('pic-a-snacks')) {
			console.log('Sub-Category: Pic-A Snacks');
		}
		else if ($(selectedItemSubCateg).hasClass('sandwich-hamburger')) {
			console.log('Sub-Category: Sandwich / Hamburger');
		}
		else if ($(selectedItemSubCateg).hasClass('toasted-bread')) {
			console.log('Sub-Category: Toasted Bread');
		}
		else if ($(selectedItemSubCateg).hasClass('potato-fries')) {
			console.log('Sub-Category: Potato Fries');
		}
		else if ($(selectedItemSubCateg).hasClass('pancit')) {
			console.log('Sub-Category: Pancit');
		}
		else if ($(selectedItemSubCateg).hasClass('pasta')) {
			console.log('Sub-Category: Pasta');
		}
	}
	else if ($(selectedItemCateg).parents().hasClass('ricemeals-document')) {
		console.log('Category	: Rice Meals');
		
		if ($(selectedItemSubCateg).hasClass('ricemeals')) {
			console.log('Sub-Category: Rice Meals');
		}
		else if ($(selectedItemSubCateg).hasClass('breakfastmeals')) {
			console.log('Sub-Category: All Day Breakfast Meals');
		}
		else if ($(selectedItemSubCateg).hasClass('chickens')) {
			console.log('Sub-Category: Chicken');
		}
	}
	
	console.log('Product		: ' + productTitle);
	console.log('Base Price	: ' + productPrice);
	console.log('Size		: ' + selectedSize);
	console.log('Sugar		: ' + selectedSugar);
	console.log('Addon		: ' + selectedAddon);
	console.log('Flavor		: ' + selectedFlavor);
	console.log('RMOption	: ' + selectedRiceMealsOption);
	console.log('Quantity	: ' + productQuantity);
	console.log('Total Price	: ' + modalTotalPrice);
}