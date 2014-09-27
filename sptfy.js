var audio = null;
document.getElementById("submit").addEventListener("click", playSong);

// barely modified from one of Spotify's web api code examples: https://developer.spotify.com/web-api/code-examples/
function playSong() {
    song = document.getElementById("song").value
    artist = document.getElementById("artist").value
    var req = new XMLHttpRequest();
    req.open('GET', 'https://api.spotify.com/v1/search?type=track&q=' + encodeURIComponent(song), true);

    req.onreadystatechange = function() {
        if (req.readyState == 4 && req.status == 200){
            var data = JSON.parse(req.responseText);
            if (data.tracks.items[0]) {
                stop();
                var matchedElement = document.getElementById('matched');
                matchedElement.innerHTML = '<div class="media"><img src="' + data.tracks.items[0].album.images[0].url + '" alt="Cover art of ' + data.tracks.items[0].album.name + '" width="300"><p>Playing ' + data.tracks.items[0].name + ' by ' + data.tracks.items[0].artists[0].name +'</p></div>';
                audio = new Audio(data.tracks.items[0].preview_url);
                audio.play();
            }
        }
    };
    req.send(null);
}

function stop() {
    if (audio) {
        audio.pause();
        audio = null;
    }
}
