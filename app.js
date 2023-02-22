const express = require("express");

const bodyParser = require("body-parser");

const request = require("request");

const https = require("https");

const port = process.env.PORT;

const app = express();

app.use(express.static("public"))

app.use(bodyParser.urlencoded({ extended: true}));

app.get("/", function(req, res){
	res.sendFile(__dirname + "/signup.html")
});

app.post("/", function(req, res){
	const theFirst = req.body.firstName
	const theLast = req.body.lastName
	// const theBirth = req.body.birthday
	const email = req.body.email
	// const result = theFirst + " " + theLast

	const data = {
		members: [
			{
				email_address: email,
				status: "subscribed",
				merge_fields:{
					FNAME: theFirst,
					LNAME: theLast
				}
			}
		]
	};

	const jsonData = JSON.stringify(data);

	const url = "https://us12.api.mailchimp.com/3.0/lists/7d16383d15"

	const option = {
		method: "POST",
		auth: "lasc:a0b34e0a8a66ab1f3eb929a0d1d5a5cf-us12"
	}

	const request = https.request(url, option, function(response){
		
		if (res.statusCode === 200){
		res.sendFile(__dirname + "/success.html")
	}
		else{
			res.sendFile(__dirname + "/failure.html")
		}
		
		response.on("data", function(data){
			console.log(JSON.parse(data));
		});
	})
	
	request.write(jsonData);
	request.end();
});

app.post("/failure", function(req, res){
	res.redirect("/")
});

app.listen(port || 3000, function(){
	console.log("Server is up and running")
});


// a0b34e0a8a66ab1f3eb929a0d1d5a5cf-us12

// 7d16383d15
