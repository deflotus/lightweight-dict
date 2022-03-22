var newword = document.getElementById("word")
var button = document.getElementById("button")
let result

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function updateDefinition(word) {
    httpGetAsync("https://api.dictionaryapi.dev/api/v2/entries/en/" + word, function(response){
        var parsed = JSON.parse(response)[0]

        result.value = 'origin: ' + parsed.origin + '\n'
        result.value += '\nmeanings :'

        var meanings = parsed.meanings

        for (var i = 0; i < meanings.length; i++) {
            if (i > 0) {
                result.value += '\n\n\n'
            }

            var meaning = meanings[i]
            var definitions = meaning.definitions

            result.value += '\n\tpart of speech: ' + meanings[i].partOfSpeech + '\n'
            result.value += '\n\tdefinitions:' + '\n'

            for (var ii = 0; ii < definitions.length; ii++) {
                var definition = definitions[ii]

                result.value += '\n\t\tdefinition: ' + definition.definition
                result.value += '\n\t\texample: ' + definition.example + '\n'
            }
        }
    })

    result.style.height = "auto"
    result.style.height = result.scrollHeight + 'px'
    result.style.width = '2500px'
}

button.onclick = function(){
    if (result){
        updateDefinition(newword.value)
    }
    else {
        result = document.createElement("textarea")
        result.disabled = true
        result.id = "solution"

	    document.body.insertBefore(document.createElement("br"), button)
        document.body.insertBefore(result, button)
        document.body.insertBefore(document.createElement("br"), button)

        updateDefinition(result.value)
    }
}