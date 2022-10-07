//SHOP PAGE START

var shopAddToCartButtons = document.querySelectorAll(".add_to_cart_button");
shopAddToCartButtons.forEach((addToCart)=>{
	addToCart.addEventListener("click",function(e){
		var description = e.target.closest(".wd-bottom-actions").previousElementSibling;
		if(description.querySelector("li")){
			description = description.querySelector("li").textContent;	
		}
		else{
			description = description.querySelector(".woodmart-more-desc-inner").textContent;	
		}
		
		var price = e.target.closest(".fade-in-block").previousElementSibling;
		var discount = e.target.closest(".fade-in-block").previousElementSibling;
		var percent = e.target.closest(".fade-in-block").previousElementSibling;
		if(price.querySelector("ins")){
			price = price.querySelector("ins").querySelector("bdi").textContent;	
			discount = discount.querySelector("del").querySelector("bdi").textContent;	
			percent = percent.closest(".product-information").previousElementSibling.querySelector(".onsale").textContent;	
		}
		else{
			price = price.querySelector("bdi").textContent;	
			discount = "€ 0";
			percent = "0%";
		}
		
		var title = e.target.closest(".fade-in-block").previousElementSibling.previousElementSibling;
		title = title.querySelector("a").textContent;
		
		var cart = {
			"title":title,
			"description":description,
			"price":price,
			"discountedPrice":discount,
			"discountedPercent":percent
		};
		console.log(cart);
	});
});

// SHOP PAGE END

// PRODUCT DETAIL PAGE START

var addToCartButton = document.querySelector(".single_add_to_cart_button");
if(addToCartButton){
	addToCartButton.addEventListener("click",function(e){
		var description = e.target.closest(".summary-inner").querySelector(".woocommerce-product-details__short-description");
		if(description){
			description = description.querySelectorAll("li");
			if(description.length > 0){
				var desc = [];
				description.forEach((des)=>{
					desc.push(des.textContent);
				});
			}
		}
		
		var price = e.target.closest(".summary-inner").querySelector("p.price");
		var discount = e.target.closest(".summary-inner").querySelector("p.price");
		if(price){
			if(price.querySelector("del")){
				discount = discount.querySelector("del").querySelector("bdi").textContent;	
				price = price.querySelector("ins").querySelector("bdi").textContent;	
			}
			else{
				discount = "€ 0";
				price = price.querySelector("bdi").textContent;
			}
		}
		
		var title = e.target.closest(".summary-inner").querySelector("h1.product_title");
		if(title){
			title = title.textContent;
		}
		
		var stock = e.target.closest(".summary-inner").querySelector("p.stock");
		if(stock){
			stock = stock.textContent;
		}
		
		var color = e.target.closest(".summary-inner").querySelector("div.active-swatch");
		if(color){
			color = color.textContent;
		}
		
		var size = e.target.closest(".summary-inner").querySelector("select#pa_sizes");
		if(size){
			size = size.value;
		}
		
		var quantity = e.target.closest(".summary-inner").querySelector("input.qty");
		if(quantity){
			quantity = quantity.value;
		}
		
		var cart = {
			"title":title,
			"description":desc,
			"price":price,
			"discountedPrice":discount,
			"stock":stock,
			"color":color,
			"size":size,
			"quantity":quantity
		};
		console.log(cart);
	});	
}

// PRODUCT DETAIL PAGE END

// BANNER LIST WORK START

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
		var response = this.response;
		if(typeof response == "string"){
			response = JSON.parse(response);
		}
		var url = window.location.pathname;
		appendOrPrependData(url, response);
    }
};
xhttp.open("GET", "https://raw.githubusercontent.com/tashif900/banner-list/master/banner-list.json", true);
xhttp.send();

function appendOrPrependData(url, response) {
	for(let i = 0; i < response.bannerList.length; i++){
		var matchRegex = url.match(response.bannerList[i].urlRegex);
	  	if(matchRegex){
		  	if(response.bannerList[i].type == "LIVE"){
			  	window.addEventListener('load', (event) => {
				  	var element = document.querySelector(response.bannerList[i].targetElement);
					if(element == null){
						const yourstring = response.bannerList[i].targetElement;
						element = document.evaluate(yourstring, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;	
					}
					console.log(response.bannerList[i].targetElement, element);
				  	if(response.bannerList[i].position == "BEFORE"){
						var tag = document.createElement("div");
					  	tag.append(response.bannerList[i].text);
					  	element.before(tag);
				  	}
					else if(response.bannerList[i].position == "AFTER"){
						var tag = document.createElement("div");
					  	tag.append(response.bannerList[i].text);
					  	element.after(tag);
				  	}
					else if(response.bannerList[i].position == "REPLACE"){
						var tag = document.createElement("div");
					  	tag.append(response.bannerList[i].text);
					  	element.innerHTML = tag.innerHTML;
				  	}
			  	});
		  	}
	  	}
  	}
}

// BANNER LIST WORK END
