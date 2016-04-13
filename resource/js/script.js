var streamers = ["ESL_LOL", "Voyboy", "freecodecamp", "JoshOG", "DreamhackCS", "AtheneLIVE", "rewinside", "aypierre", "FORMAL", "Crimsix", "followKudes", "Meteos"]

function buildList() {
    streamers.forEach(function(streamer) {
        $.getJSON('https://api.twitch.tv/kraken/streams/' + streamer + '?callback=?', function(data) {

            var url;
            var name;
            var viewers;
            var livePreview = "";
            var livePreviewHTML = livePreview;
            var currentGame;

            if (data.stream === null) {
                currentGame = "Stream is Offline";
                livePreview = "http://s18.postimg.org/626nis1c9/rsz_1offlinetwitchbanner.png";
                livePreviewHTML = "<img class='img-responsive livePreview' src='" + livePreview + "'>";
                viewers = "No";
            } else if (data.stream === undefined) {
                currentGame = "Account Closed";
            } else {
                viewers = data.stream.viewers;
                currentGame = data.stream.game;
                livePreview = data.stream.preview.large;
                livePreviewHTML = "<img class='img-responsive livePreview' src='" + livePreview + "'>";
            };

            $.getJSON('https://api.twitch.tv/kraken/channels/' + streamer + '?callback=?', function(data) {

                if (data.name === undefined) {
                    name = "";
                } else {
                    name = data.name;
                    url = data.url;
                };

                var html = "<div class='img-responsive'>";
                html += "<div class='twitchview col-md-4'>";
                html += "<p><a target='_blank' href='" + url + "'>" + livePreviewHTML + "</a></p>";
                html += currentGame + "<br>";
                html += "<p><span class='grayText'>" + viewers + " viewers on " + name + "</span></p>";
                html += "</div></div>";

                $('#testContainer').append(html);

            });
        });
    });
};

$(document).ready(function() {
    buildList();
});