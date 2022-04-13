
//HAMBURGER MENU TOGGLER

$(function () {
	$(".navbarMenuToggle").click(function() {
		$(".fullnavBtn").toggleClass("active");
		$("#fullnav").toggleClass("open");
	});
	
	$(".navbarMenuClose").click(function() {
		$(".fullnavBtn").removeClass("active");
		$("#fullnav").removeClass("open");
	});

	jQuery.extend( jQuery.fn, {
		// Name of our method & one argument (the parent selector)
		within: function( pSelector ) {
			// Returns a subset of items using jQuery.filter
			return this.filter(function(){
				// Return truthy/falsey based on presence in parent
				return $(this).closest( pSelector ).length;
			});
		}
	});
});

//VIDEO SLIDESHOW data-bs-toggle="modal" data-bs-target="#menu-item-modal"


//AJAX PAGE LOADER

var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		document.getElementById("index-body-container").innerHTML = this.responseText;
		
		linktoRiceMeals();
	}
};

xhttp.open("GET", "src/mainpage.html", true);
xhttp.send();

function loadMainPage() {
	var xhttp = new XMLHttpRequest();
	
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("index-body-container").innerHTML = this.responseText;
		}
	};
	
	xhttp.open("GET", "src/mainpage.html", true);
	xhttp.send();
}

function loadCartModal() {
	var xhttp = new XMLHttpRequest();
	
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("cart-modal-body").innerHTML = this.responseText;
		}
	};
	
	xhttp.open("GET", "src/cart.html", true);
	xhttp.send();
}

function loadCart() {
	var xhttp = new XMLHttpRequest();
	
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("index-body-container").innerHTML = this.responseText;
		}
	};
	
	xhttp.open("GET", "src/cart.html", true);
	xhttp.send();
}

function linktoMilkTea() {
	var xhttp = new XMLHttpRequest();
	
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("index-body-container").innerHTML = this.responseText;
	
			loadMilkTea();
		}
	};
	
	xhttp.open("GET", "src/menu.html", true);
	xhttp.send();
}
function linktoFruitTea() {
	var xhttp = new XMLHttpRequest();
	
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("index-body-container").innerHTML = this.responseText;
	
			loadFruitTea();
		}
	};
	
	xhttp.open("GET", "src/menu.html", true);
	xhttp.send();
}

function linktoSnacks() {
	var xhttp = new XMLHttpRequest();
	
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("index-body-container").innerHTML = this.responseText;
	
			loadSnacks();
		}
	};
	
	xhttp.open("GET", "src/menu.html", true);
	xhttp.send();
}
function linktoRiceMeals() {
	var xhttp = new XMLHttpRequest();
	
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("index-body-container").innerHTML = this.responseText;
	
			loadRiceMeals();
		}
	};
	
	xhttp.open("GET", "src/menu.html", true);
	xhttp.send();
}