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
					//if(element == null){
						//const yourstring = "/html/body";
						//element = document.evaluate(yourstring, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;	
					//}
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