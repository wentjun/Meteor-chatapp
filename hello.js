Msgs = new Mongo.Collection("messages");

if (Meteor.isClient) {
    Meteor.subscribe("topic");

    Template.body.helpers({
        messages: function () {
            return Msgs.find({}, {sort: {time: 1}});
        }
    });

    Template.body.events({
        "keydown #user-input": function(event) {
            if (event.keyCode === 13 && event.shiftKey === false) {
                if (!Meteor.userId()) {
                    throw new Meteor.Error("Invalid user!");
                }
                var msg = event.target.value;
                if (msg !== '' && !/^\s*$/.test(msg)) {
                    Meteor.call("submit", msg);
                    event.target.value = '';
                }
                event.preventDefault();
            }
        },
        "click #send": function() {
            var e = jQuery.Event("keydown", {keyCode:13, shiftKey: false});
            $("#user-input").trigger(e);
        }
    });

    //Template.input.helpers({
    //   //toggleInput: function() {
    //   //    $(document).ready(function() {
    //   //        var userInput = document.getElementById("user-input");
    //   //        var button = document.getElementById("send");
    //   //        console.log(button == null);
    //   //        if (Meteor.userId()) {
    //   //            userInput.placeholder = "Type a message";
    //   //            userInput.disabled = false;
    //   //            button.disabled = false;
    //   //        } else {
    //   //            userInput.placeholder = "Please log in to chat";
    //   //            userInput.disabled = true;
    //   //            button.disabled = true;
    //   //        }
    //   //    });
    //   //}
    //});

    Accounts.ui.config({
        passwordSignupFields: "USERNAME_AND_EMAIL"
    });
}

Meteor.methods({
    submit: function (msg) {
        if (msg == '' || /^\s*$/.test(msg)) {
            return;
        }
        if (!Meteor.userId()) {
            throw new Meteor.Error("Invalid user!");
        }
        Msgs.insert({
            username: Meteor.user().username,
            text: msg,
            time: new Date()
        });
    }

});


if (Meteor.isServer) {
    Meteor.publish("topic", function () {
        return Msgs.find(
            {},
            {username: 1, text: 1}
        );
    });
}

// Make user scroll to bottom of page on load
// Ensure page doesnt need to be scrollable. (only inner div needs to be scrolled)
// Add male and female option
// Support hyperlink
// Sort by date (try find if there is a better method to do this)
// Try to save spaces and newlines into mongo

// Start from bottom
// Try to use dom manipulation instead of 2 separate elements for the submit field
// Change submit button to an icon instead of words
// Output client's msg locally first
// Include user email verification
// Add channels
// Add display pictures
// Enable file sharing
// Make homepage login page
// Create page for 404 errors
// add tab index
