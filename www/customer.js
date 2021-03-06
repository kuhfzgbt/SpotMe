// This will probably control a popup in the future that appeares on
// Map html instead of a separate info.html

var config = {
	apiKey: "AIzaSyCUjMnWd8szLkDenWZV58BWfmRq0Sm7dMI",
	authDomain: "spotme-a2502.firebaseapp.com",
	databaseURL: "https://spotme-a2502.firebaseio.com",
	projectId: "spotme-a2502",
	storageBucket: "spotme-a2502.appspot.com",
	messagingSenderId: "1041315357650"
};
firebase.initializeApp(config);

var ETA = 0;
function init_customer(id, position) {

	destId = id;
	firebase.database().ref('/users/' + destId).once('value').then(function(user) {
		//Make this display properly instead of raw json.
		console.log(JSON.stringify(user));

        ETA = Math.ceil(getDistance(origin1, position)/100);

        $("#name").text(user.child("personal_info").val().first_name + " " + user.child("personal_info").val().last_name);

		firebase.database().ref("orders/" + destId).once("value").then(function(order){
			$("#amt_needed").val(order.val().amount_needed);
			$("#dist").val(ETA);
		});
	});
}

function accept() {
	var userId = firebase.auth().currentUser.uid;
	firebase.database().ref("deliverers/" + userId).set(destId);
	firebase.database().ref("orders/" + destId).update({ETA: ETA, started:true, deliverer:userId}); //Eta, gotten from distance
	firebase.database().ref("users/" + userId).update({ordering: false}); //Just to makes sure
	window.location.href = "info.html";
}

