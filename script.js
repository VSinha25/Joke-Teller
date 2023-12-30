const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enable Button
function toggleButton(){
    button.disabled = !button.disabled;
}

//Passing the joke to VoiceRSS API
function tellMe(joke){
    VoiceRSS.speech({
        key: <API_KEY>,
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

//Get Joke from Joke API
async function getJokes() {
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,explicit';
    try {
        let joke = '';
        const response = await fetch(apiUrl);
        const data = await response.json();
        if(data.setup){
            joke = `${data.setup} ... ${data.delivery}`;
        }
        else{
            joke = data.joke;
        }
        //Text-to-Speech
        tellMe(joke);
        //Disable the button
        toggleButton();
    } catch (error) {
        //Catch errors
        console.log('whoops', error);
    }
}

//Event Listeners 
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);