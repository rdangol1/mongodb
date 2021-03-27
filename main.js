const express = require ("express"), app = express(),
homeController = require("./controllers/homecontroller"),
errorController = require("./controllers/errorController"),
subscriberController =  require("./controllers/subscriberController"),
layouts = require("express-ejs-layouts"), mongoose = require("mongoose") ;

mongoose.connect("mongodb://localhost:27017/confetti_cuisine",
    {useNewUrlParse: true});

app.set("port", process.env.PORT || 3000);

app.set("view engine", "ejs");
app.use(layouts);

app.get("/", homeController.showIndex);

app.use(express.static("public"))

app.use(
    express.urlencoded({
        extended:false
    })
)
app.use(express.json());


app.get("/courses", homeController.showCourses);
app.get("/subscibers", subscriberController.getAllSubscribers);
app.get("/contact", subscriberController.getSubscriptionPage);
app.post("subscribe", subscriberController.saveSubscriber);

//app.get("/contact", homeController.showSignUp);
//app.post("/contact", homeController.postedSignUpForm);

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
   console.log(`Server is running on port: ${app.get("port")}`)

});

