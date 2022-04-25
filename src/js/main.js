
//HAMBURGER MENU TOGGLER

$(document).ready(function(){
	$(".navbarMenuToggle").click(function() {
		$(".fullnavBtn").toggleClass("active");
		$("#fullnav").toggleClass("open");
	});
	
	$(".navbarMenuClose").click(function() {
		$(".fullnavBtn").removeClass("active");
		$("#fullnav").removeClass("open");
	});
		//INITIAL LOAD
    $.ajax({url: "src/doc/mainpage.html", success: function(result){
		$("#index-body-container").html(result);
		loadDoc('src/doc/checkout.html', docCartModal);
    }});
		//INDEX BODY LOAD
	$('a.navbar-icon-container').on('click', function () {
		loadDoc('src/doc/mainpage.html', docMainPage);
	});
	$('.navbar').on('click', 'a.cart-icon-container, a.cart-icon-container-open', function () {
		loadDoc('src/doc/checkout.html', docCartModal);
	});
	$('button.checkout-btn').on('click', function () {
		loadDoc('src/doc/checkout.html', docCheckout);
	});
	$('.navbar').on('click', 'a.beverage-icon, a.food-icon', function () {
		if ($(this).attr('class') === 'beverage-icon') {
			loadDoc('src/doc/menu.html', docMenuMilkTea);
		}
		else if ($(this).attr('class') === 'food-icon') {
			loadDoc('src/doc/menu.html', docMenuSnacks);
		}
	});
});

//AJAX DOCUMENT LOADER

function loadDoc(url, callDocFunction) {
	const xhttp = new XMLHttpRequest();
	xhttp.onload = function() {callDocFunction(this);}
	xhttp.open("GET", url, true);
	xhttp.send();
}

function docMainPage(xhttp) {
	if (xhttp.readyState == 4 && xhttp.status == 200) {
		$("#index-body-container").html(xhttp.responseText);
	}
}

function docMenuMilkTea(xhttp) {
	if (xhttp.readyState == 4 && xhttp.status == 200) {
		$("#index-body-container").html(xhttp.responseText);
		$('#milktea-category').prop('checked', true);
		loadDoc('src/doc/milktea.html', docCategory);
	}
}

function docMenuSnacks(xhttp) {
	if (xhttp.readyState == 4 && xhttp.status == 200) {
		$("#index-body-container").html(xhttp.responseText);
		$('#snacks-category').prop('checked', true);
		loadDoc('src/doc/snacks.html', docCategory);
	}
}

function docCategory(xhttp) {
	if (xhttp.readyState == 4 && xhttp.status == 200) {
		$("#menu-container").html(xhttp.responseText);
		addModalAttribute();
	}
}

function docCartModal(xhttp) {
	if (xhttp.readyState == 4 && xhttp.status == 200) {
		$("#cart-modal-body").html(xhttp.responseText);
		$('.checkout-form-wrapper').remove();
		$('.cart-wrapper.col-sm-8').toggleClass('col-sm-8 col-sm-12');
		checkCartLocalStorage();
	}
}

function docCheckout(xhttp) {
	if (xhttp.readyState == 4 && xhttp.status == 200) {
		$("#index-body-container").html(xhttp.responseText);
		$('.cart-icon-container').hide();
		$('.cart-icon-container-open').hide();
		$('#cart-modal-body').empty();
		checkCartLocalStorage();
		
		const targetNode = document.getElementById('index-body-container');
		const config = { childList: true };
		
		let observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				let oldValue = mutation.oldValue;
				let newValue = mutation.target.textContent;
				if (oldValue !== newValue) {
					$('.cart-icon-container').show();
					$('.cart-icon-container-open').show();
					loadDoc('src/doc/checkout.html', docCartModal);
					observer.disconnect();
				}
			});
		});
		
		observer.observe(targetNode, config);
	}
}