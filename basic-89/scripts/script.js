$(function () {

	//console.log($("strong").eq(0).text("hi"));

	var amountOfPostsToDisplay = 4;
	var charsPerPostToDisplay = 100;

	var changeFrequency = 3000;

	var imagesToDisplay = [
		"http://www.pokepedia.fr/images/thumb/e/ef/Bulbizarre-RFVF.png/250px-Bulbizarre-RFVF.png",
		"http://www.pokepedia.fr/images/thumb/4/44/Herbizarre-RFVF.png/250px-Herbizarre-RFVF.png",
		"http://www.pokepedia.fr/images/thumb/4/42/Florizarre-RFVF.png/250px-Florizarre-RFVF.png"
	];

	var usedImageIndex = 0;

	//console.log(imagesToDisplay[0]);

	/*setInterval(function(){


		if(imagesToDisplay.length == 0) return;

		if(usedImageIndex === imagesToDisplay.length) usedImageIndex = 0;

		$('#carrousel').attr('src', imagesToDisplay[usedImageIndex]);

		usedImageIndex++;


	}, changeFrequency);*/

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

	var postRequest = $.ajax({
		url: "https://jsonplaceholder.typicode.com/posts",
		method: "GET"
	});

	postRequest.done(function(dataPost){

		var textToDisplay;
		//console.log(dataPost);
		for (var i = 0; i < amountOfPostsToDisplay; i++) {
			$('strong').eq(i).text(dataPost[i].title);

			if(dataPost[i].body.length > charsPerPostToDisplay) {
				textToDisplay = dataPost[i].body.substr(0, charsPerPostToDisplay)+"...";
			}

			//console.log(textToDisplay.length);

			$('.postText').eq(i).text(textToDisplay);
			//console.log($('p').eq(i).text().length);
			addEvents();
		}


		function addEvents(){

			$('.more').on('click', function(e){
				e.preventDefault();
				console.log($(this));
				$(this).children().text("Read Less");
				$(this).removeClass("more");
				$(this).addClass("less");

				var currentId = this.id.substr(-1);
				var ajaxId = parseInt(currentId) + 1;
				//console.log(ajaxId);
				//console.log(this.id.substr(-1));

				var requestMore = $.ajax({
					url:"https://jsonplaceholder.typicode.com/posts",
					method:"GET",
					data: {id:ajaxId}
				});

				requestMore.done(function(dataMore){
					//console.log(dataComplete);
					$('.postText').eq(currentId).text(dataMore[0].body);
					//addEvents();
					//console.log(this);
				});
				

			});

			$('.less').on('click', function(e){
				e.preventDefault();
				console.log($(this));
				$(this).children().text("Read More");
				$(this).removeClass("less");
				$(this).addClass("more");

				var currentId = this.id.substr(-1);
				var ajaxId = parseInt(currentId) + 1;
				//console.log(ajaxId);
				//console.log(this.id.substr(-1));

				var requestLess = $.ajax({
					url:"https://jsonplaceholder.typicode.com/posts",
					method:"GET",
					data: {id:ajaxId}
				});

				requestLess.done(function(dataLess){
					//console.log(dataComplete);
					textToDisplay = dataLess[0].body.substr(0, charsPerPostToDisplay)+"..."
					$('.postText').eq(currentId).text(textToDisplay);
					//addEvents();
					//console.log(this);
				});

			});
				
		}
		

	});
});