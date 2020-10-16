function displayActivity(json) {
  mainH1 = document.getElementById("largeText")
  mainH1.innerHTML = json.activity;
  if (json.activity.length > 60) {
    mainH1.style.fontSize = "3rem";
  }
  else if (json.activity.length > 40) {
    mainH1.style.fontSize = "4rem";
  }
  else {
    mainH1.style.fontSize = "5rem";
  }

  let descriptions = "<h4>Participants required: " + json.participants + "</h4>"
  descriptions += "<h4>Estimated price: $" + (json.price * 100).toFixed(2) + "</h4>"
  descriptions += "<h4>Category: " + json.type + "</h4>"
  document.getElementById("description").innerHTML = descriptions;
}

document.getElementById("random").addEventListener("click", function(event) {
  event.preventDefault();
  document.getElementById("categories-wrapper").style.display = "none";
  const url = "http://www.boredapi.com/api/activity/";
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json);
      console.log(json.activity.length);

      displayActivity(json)
    });
});

document.getElementById("category").addEventListener("click", function(event) {
  event.preventDefault();
  document.getElementById("categories-wrapper").style.display = "block";

  for (let i = 0; i < document.getElementsByClassName("btn-danger").length; i++) {
    document.getElementsByClassName("btn-danger")[i].addEventListener("click", function(event) {
      event.preventDefault();
      let category = event.target.innerHTML;
      // console.log(category);
      const url = "http://www.boredapi.com/api/activity?type=" + category;
      fetch(url)
       .then(function(response) {
         return response.json();
       }).then(function(json) {
         console.log(json);

         displayActivity(json);

       });
    });
  }
});
