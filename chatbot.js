var bot = new RiveScript();
var username = "";

// Load a list of files all at once (the best alternative to loadDirectory
// for the web!)
bot.loadFile([
  "brain/our_eliza.rive"
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

function chatElement(isBot, message) {
    let author = isBot ? "Bot" : "You";
    let wrapperClass = isBot ? "bot" : "self"

    let wrapper = document.createElement("div");
    let authorElement = document.createElement("p")
    let messageElement = document.createElement("p")

    wrapper.className = wrapperClass;

    authorElement.className = "author"
    authorElement.innerHTML = author;

    messageElement.className = "message"
    messageElement.innerHTML = message;

    wrapper.appendChild(authorElement);
    wrapper.appendChild(messageElement);

    return wrapper;
}

function askTheBot(input) {
    let question = chatElement(false, input);

    document.getElementById("messages").appendChild(question)
    if(input.includes("init")) input = "init " + Math.floor(Math.random() * 10001);
    // NOTE: the API has changed in v2.0.0 and returns a Promise now.
    bot.reply(username, input).then(function(reply) {
        let answer = chatElement(true, reply);
        let messages = document.getElementById("messages")
        messages.appendChild(answer);
        document.getElementById("bot").scrollTop = messages.scrollHeight;
    });
}

// It's good to catch errors too!
function loading_error(error, filename, lineno) {
  console.log("Error when loading files: " + error);
}