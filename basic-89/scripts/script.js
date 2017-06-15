$(function () {

	var changeFrequency = 3000;

	var imagesToDisplay = [
		"http://www.pokepedia.fr/images/thumb/e/ef/Bulbizarre-RFVF.png/250px-Bulbizarre-RFVF.png",
		"http://www.pokepedia.fr/images/thumb/4/44/Herbizarre-RFVF.png/250px-Herbizarre-RFVF.png",
		"http://www.pokepedia.fr/images/thumb/4/42/Florizarre-RFVF.png/250px-Florizarre-RFVF.png"
	];

	var usedImageIndex = 0;

	//console.log(imagesToDisplay[0]);

	setInterval(function(){


		if(imagesToDisplay.length == 0) return;

		if(usedImageIndex === imagesToDisplay.length) usedImageIndex = 0;

		$('#carrousel').attr('src', imagesToDisplay[usedImageIndex]);

		usedImageIndex++;


	}, changeFrequency);

	var request = $.ajax({
		url:"https://jsonplaceholder.typicode.com/users",
		method:"GET",
		dataType:"json"
	});

	request.done(function(data) {
		for (var i = data.length - 1; i >= 0; i--) {
			$('#names').append("<li id='"+data[i].id+"'>" + data[i].name + "</li>");
		}

		$('#names li').on('click', function(){
			//console.log(this.id);
			var infosRequest = $.ajax({
				url:"https://jsonplaceholder.typicode.com/users",
				method:"GET",
				data: {id: this.id},
				dataType:"json"
			});

			infosRequest.done(function(dataInfos){
				//console.log(data[0].username);
				console.info("Username : " + dataInfos[0].username);
				console.info("Email : " + dataInfos[0].email);
			});
		});

		/*data.forEach(function(x){
			console.log(x.name);
		});*/
	});
});