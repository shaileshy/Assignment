var app =  require('express')();
var axios = require('axios');
app.set('port', (process.env.PORT || 4000));

app.get('/', function(req,res){
    res.setHeader('Content-Type', 'text/html');
    res.sendFile('index.html',{root: __dirname });
});


app.get('/searchArtist/:searchText', function(req,res){
   var searchText  = req.params.searchText;
    searchArtist(searchText).then(function(searchresult){
        getSimilarArtists(searchText).then(function(similarArtist){
                var hello =  {
                    "searchResult" :getArtistNameList(searchresult.data),
                    "similarArtists":similarArtist.data.similarartists.artist
                };
              res.send(hello);
            }
        );
    });
});

app.get('/searchTrack/:searchText', function(req,res){
    var searchText  = req.params.searchText;
    searchTracks(searchText).then(function(result){
       res.send(getTrackList(result.data));
    });
});










app.get('/getArtist/:name', function(req,res){
    var name = req.params.name;
    console.log(name);
    getArtist(name).then(function(result){
        console.log('hello');
        console.log(result.data);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(result.data));
    })
});


function getArtistNameList(data){
    var names = [];
     data.results.artistmatches.artist.forEach(function(element){
        names.push(element.name);
    });
    return data.results.artistmatches.artist;
}


function getTrackList(result){
    var tracks = [];
    result.results.trackmatches.track.forEach(function(element){
        tracks.push(element.name);
    });
   return  result.results.trackmatches.track;
}

function getArtist(artist){
    var githubEndpoint = 'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist='+artist+'&api_key=36e606575cf4709ed9254e103e9f94c4&format=json';
    return axios.get(githubEndpoint);
}

function getSimilarArtists(artist){
    console.log('getSimilarArtist');
    var githubEndpoint = 'http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist='+artist+'&api_key=36e606575cf4709ed9254e103e9f94c4&format=json';
    return axios.get(githubEndpoint);
}


function searchArtist(searchElement) {
    var githubEndpoint =  'http://ws.audioscrobbler.com/2.0/?method=artist.search&artist='+searchElement+'&api_key=36e606575cf4709ed9254e103e9f94c4&format=json';
    return axios.get(githubEndpoint);
}

function searchTracks(searchText){
    var githubEndpoint =  'http://ws.audioscrobbler.com/2.0/?method=track.search&track='+searchText+'&api_key=36e606575cf4709ed9254e103e9f94c4&format=json';
    return axios.get(githubEndpoint);
}


function getNames(namesList){
    var nameList = [];
    namesList.forEach(function(element, index){

    })
}


app.listen(app.get('port'), function(){
    console.log('Server listening on port:', app.get('port'));
});



