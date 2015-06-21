Msgs = new Mongo.Collection("messages");

if (Meteor.isClient) {
    Meteor.subscribe("topic");

    Template.body.helpers({
        messages: function () {
            return Msgs.find({}, {sort: {time: 1}});
        }
    });



    // Text methods
    Template.text.helpers({
        isOwner: function() {
            return Meteor.userId() === this.userId;
        },
        getTime: function() {
            return this.time.toLocaleTimeString().replace(/:\d+ /, ' ');
        }
    });

    Template.text.onRendered(function() {
        $("#chat-area").scrollTop(document.getElementById("chat-area").scrollHeight);
    });

    Template.input.events({
        "keydown #user-input": function (event) {
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
        "click #send": function () {
            var e = jQuery.Event("keydown", {keyCode: 13, shiftKey: false});
            $("#user-input").trigger(e);
        }
    });



    // Input methods
    Template.input.helpers({
        setInput: function() {
            var htmlInput = "<textarea rows='1' class='form-control' id='user-input' placeholder=";
            if (Meteor.userId()) {
                return htmlInput + "'Type a message'></textarea>";
            } else {
                return htmlInput + "'Please log in to chat' disabled></textarea>";
            }
        },
        setButton: function() {
            var htmlButton = "<button id='send' class='btn btn-default' type='button'";
            if (Meteor.userId()) {
                return htmlButton + ">Send!</button>";
            } else {
                return htmlButton + " disabled>Send!</button>";

            }
        }
    });

    Accounts.ui.config({
        passwordSignupFields: "USERNAME_ONLY"
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
            userId: Meteor.userId(),
            username: Meteor.user().username,
            text: msg,
            time: new Date()
        });
    }
});


if (Meteor.isServer) {
    Meteor.publish("topic", function () {
        return Msgs.find(
            //{},
            //{ fields: {userId: 1, username: 1, text: 1, time:1} }
        );
    });
}

// Add animation and color
// Add male and female option
// Support hyperlink
// Try to save spaces and newlines into mongo
// Ensure page doesnt need to be scrollable. (only inner div needs to be scrolled) (may need to use flex box)


// Try to add a loading screen
// On phone enter doesnt make new line, it sends msgs
// Sort by date (try find if there is a better method to do this)
// Make user scroll to bottom of page on load (make it more efficient)
// Start new output from bottom of the msg-output div
// Change submit button to an icon instead of words
// Output client's msg locally first
// Include user email verification
// Add channels
// Add display pictures
// Enable file sharing
// Make homepage login page
// Create page for 404 errors
// add tab index (ie pressing tab brings user to the next useful div)
// Add login logout display message feature

//Tidy up code