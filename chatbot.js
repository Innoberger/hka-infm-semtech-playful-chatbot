var bot = new RiveScript();
var username = "";

// Load a list of files all at once (the best alternative to loadDirectory
// for the web!)
bot.loadFile([
  "brain/not_our_eliza.rive"
]).then(loading_done).catch(loading_error);

// All file loading operations are asynchronous, so you need handlers
// to catch when they've finished. If you use loadDirectory (or loadFile
// with multiple file names), the success function is called only when ALL
// the files have finished loading.
function loading_done() {
    console.log("Bot has finished loading!");
    document.getElementById("bot").style.visibility = "visible";

    // Now the replies must be sorted!
    bot.sortReplies();

    // Set the username to be the local user
    username = "local-user";
}

function clickPress(event, element) {
    if (event.keyCode != 13) {
        return;
    }

    if (element.value.trim() == "") {
        return;
    }

    askTheBot(element.value);
    element.value = "";
}


function askTheBot(input) {
    var question = document.createElement("div");
    var answer = document.createElement("div");

    question.innerHTML = "You: " + input
    document.getElementById("messages").appendChild(question);

    // NOTE: the API has changed in v2.0.0 and returns a Promise now.
    bot.reply(username, input).then(function(reply) {
        answer.innerHTML = "Bot: " + reply
        document.getElementById("messages").appendChild(answer);
    });
}

// It's good to catch errors too!
function loading_error(error, filename, lineno) {
  console.log("Error when loading files: " + error);
}