const subscriber = require("../models/subscriber");
const Subscriber = require ("../models/subscriber");

exports.getAllSubscribers = (req, res ) => {
    Subscriber.find({})
        .exec()
        .then(subscriber =>{
            res.render("subscribers", {subscriber:subscriber})
        })
        .catch((error)=> {
            console.log(error);
            return [];
        })
        .then(() => {
            console.log("promise complete");
        })

        
};

exports.getSubscriptionPage = (req, res) => {
    res.render("contact");
};

exports.saveSubscriber = (req, res) => {
    let newSubsriber = new Subscriber({
        name: req.body.name,
        email: req.body.email,
        zipCode: req.body.zipCode
    });
    newSubsriber.save()
    .then(() =>{
        res.render("thanks");
    })
    .catch(error => { res.send(error)});

};