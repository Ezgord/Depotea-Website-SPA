
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
		elements[i].setAttribute("onclick", "modalUpdate(this.querySelector('p').innerHTML, this.querySelector('p').nextElementSibling.innerHTML, this.querySelector('img').getAttribute('src'))");
	}
}

function modalUpdate(productTitle, productPriceRaw, productImage) {
	$('#menu-item-modal').find('form').trigger('reset');
	$("#modal-product-image").attr('src', productImage);
	$('#modal-product-totalprice').text('₱');
	$('#modal-product-totalprice').text(productPriceRaw);
	document.getElementById("modal-product-name").innerHTML = productTitle;
	
	productPrice = parseInt(productPriceRaw.slice(1));
	
	if($('.menu-item').parents().hasClass('milktea-document')) {
		document.getElementById('modal-span').innerHTML = '(Pearls Included)';
		$('.general-options').show();
		$('.beverage-options').show();
		$('.snacks-options').hide();
		$('.ricemeals-options').hide();
		
		$("#product-size1").attr('value', '0');
		$("#product-size1 + label").text('₱70 - Medium');
		$("#product-size2").attr('value', '10');
		$("#product-size2 + label").text('₱80 - Large');
	}
	else if($('.menu-item').parents().hasClass('fruittea-document')) {
		document.getElementById('modal-span').innerHTML = '(Pearls Included)';
		$('.general-options').show();
		$('.beverage-options').show();
		$('.snacks-options').hide();
		$('.ricemeals-options').hide();
	}
	else if($('.menu-item').parents().hasClass('snacks-document')) {
		document.getElementById('modal-span').innerHTML = '';
		$('.general-options').hide();
		$('.beverage-options').hide();
		$('.snacks-options').show();
		$('.ricemeals-options').hide();
	}
	else if($('.menu-item').parents().hasClass('ricemeals-document')) {
		document.getElementById('modal-span').innerHTML = '[description of meal]';
		$('.general-options').hide();
		$('.beverage-options').hide();
		$('.snacks-options').hide();
		$('.ricemeals-options').show();
	}
}

function productTotalPrice() {
	var productTotalPrice = productPrice;
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
		addonPrice += parseInt($("[name='beverage-addon']:checked").val());
		productTotalPrice = parseInt(productTotalPrice + addonPrice);
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

function ItemSizePriceUpdate(clicked_id){
    var ItemsizeLarge = document.getElementById('flexRadioDefault8')
    var modalParent = ItemsizeLarge.parentElement.parentElement.parentElement.parentElement
    var ActiveID = clicked_id
    console.log(ActiveID)
    switch (ActiveID){
        case "flexRadioDefault7":
        modalParent.getElementsByClassName('shop-item-modal-price')[0].innerText = '₱' + '70'
        break;
        case "flexRadioDefault8":
        modalParent.getElementsByClassName('shop-item-modal-price')[0].innerText = '₱' + '80'
        break;
    }
}