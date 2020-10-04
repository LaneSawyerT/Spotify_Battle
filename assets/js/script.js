
const baseURL = 'https://api.t4ils.dev/artistInfo?artistid=';
var returnedData;

function getData(artistID, callback) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            // console.log(JSON.parse(this.responseText))
            let timer = setTimeout(callback(JSON.parse(this.responseText)), 200);
        } else if (this.readyState === 4 && this.status === 500) {
            let timer = setTimeout(getData(artistID,callback), 500);
        }
    };

    xhr.open("GET", baseURL + artistID);
    xhr.send();
}

var usedID = [];

var artistID = ['0LcJLqbBmaGUft1e9Mm8HV', '4dpARuHxo51G3z768sgnrY', 						
        '66CXWjxzNUsdJxJ2JdwvnR', '4q3ewBCX7sLwd24euuV69X',
		'6vWDO969PvNqNYHIOW5v0m', '6qqNVTkY8uBg9cP3Jd7DAH',
		'3WrFJ7ztbogyGnTHbHJFl2', '3Nrfpe0tUJi4K4DXYWgMUX',
		'26dSoYclwsYLMAKD3tpOr4', '0du5cEVh5yTK9QJze8zA0C',
		'7CajNmpbOovFoOoasH2HaY', '4kYSro6naA4h99UJvo89HB',
		'25uiPmTg16RbhZWAqwLBy5', '4gzpq5DPGxSnKTe4SA8HAU',
		'0oSGxfWSnnOXhD2fKuz2Gy', '6M2wZ9GZgrQXHCFfjv46we',
		'6eUKZXaKkcviH0Ku9w2n3V', '43ZHCT0cAZBISjO8DG9PnE',
		'3g2kUQ6tHLLbmkV7T4GPtL', '2h93pZq0e7k5yf4dywlkpM',
		'1vyhD5VmyZ7KMfW5gqLgo5', '0hEurMDQu99nJRq8pTxO14',
		'53XhwfbYqKCa1cC15pYq2q', '5K4W6rqBFWDnAN6FQUkS6x',
		'2YZyLoL8N0Wb9xBt1NhZWg', '6LuN9FCkKOj5PcnpouEgny',
		'4BxCuXFJrSWGi1KHcVqaU4', '0VyNiaUWxot9V0efpoi0qt',
		'4RVnAU35WRWra6OZ3CbbMA', '1HY2Jd0NmPuamShAr6KMms',
		'3e7awlrlDSwF3iM0WBjGMp', '6tbjWDEIzxoDsBA1FuhfPW',
		'04gDigrS5kc9YWfZHwBETP', '4iHNK0tOyZPYnBU7nGAgpQ',
        '6olE6TJLqED3rqDCT0FyPh', '2DaxqgrOhkeH0fpeiQq2f4',							
        '246dkjvS1zLTtiykXe5h60', '5a2EaR3hamoenG9rDuVn8j',
		'1dfeR4HaWDbWqFHLkxsg1d', '0C8ZW7ezQVs4URX5aX7Kqx',
		'0EmeFodog0BfCgMzAIvKQp', '4MXUO7sVCaFgFjoTI5ox5c',
		'0uq5PttqEjj3IH1bzwcrXF', '5pKCCKE2ajJHZ9KAiaK11H',
		'22bE4uQ6baNwSHPVcDxLCe', '7ltDVBr6mKbRvohxheJ9h1',
		'06HL4z0CvFAxyc27GXpf02', '1Xyo4u8uXC1ZmMpatF05PJ',
		'51Blml2LZPmy7TTiAg47vQ', '23zg3TcAtWQy7J6upgbUnj',
		];

        // var artistID1 = Math.floor((Math.random() * 50));
        // var artistID2 = Math.floor((Math.random() * 50));

function retrieveAPIData(artist, artistNum) {
    let artistDiv = artistNum === 1 ? "artistImage1" : "artistImage2";
    document.getElementById(artistDiv).src = "./images/loading.png";
    getData(artistID[artist], function(data) {
        returnedData = data;
        displayArtist(data, artistNum);
    });
}

function displayArtist(data, artistNum) {
    let artistID = artistNum === 1 ? "artistImage1" : "artistImage2";
    let artistName = artistNum === 1 ? "artistName1" : "artistName2";
    let artistCount = artistNum === 1 ? "artistCount1" : "artistCount2";
    let counter = artistNum === 1 ? "disCount1" : "disCount2";
    document.getElementById(artistID).src = data["data"]["header_image"]["image"];
    document.getElementById(artistName).innerText = data["data"]["info"]["name"];
    document.getElementById(artistCount).innerText = data["data"]["monthly_listeners"]["listener_count"];
    document.getElementById(counter).style.display = "none";
}

function getNextNumber() {

    if (usedID.length === 50) {
        alert("Game over!");
          return;// put a game over function here
    }

    while(true) {
        var artistID = Math.floor((Math.random() * 50));
        if (!usedID.includes(artistID)) {
            usedID.push(artistID);
            return artistID;
        }
    }


}

retrieveAPIData(getNextNumber(),1);
retrieveAPIData(getNextNumber(),2);

document.getElementById("a1").addEventListener("click", function() {
    let a1count = parseInt(document.getElementById("artistCount1").innerText);
    let a2count = parseInt(document.getElementById("artistCount2").innerText);
    if (a1count > a2count){
        $('#correctModal').modal('show')
        var artistID = getNextNumber();
        dispCount("disCount1", parseInt(document.getElementById("artistCount1").innerText));
        dispCount("disCount2", parseInt(document.getElementById("artistCount2").innerText));
        setTimeout(function() {retrieveAPIData(artistID,2)}, 4000)
    } else {
        $('#falseModal').modal('show')
    }
}); 

document.getElementById("a2").addEventListener("click", function(){
    let a1count = parseInt(document.getElementById("artistCount1").innerText);
    let a2count = parseInt(document.getElementById("artistCount2").innerText);
    if (a2count > a1count){
        $('#correctModal').modal('show')
        var artistID = getNextNumber();
        dispCount("disCount1", parseInt(document.getElementById("artistCount1").innerText));
        dispCount("disCount2", parseInt(document.getElementById("artistCount2").innerText));
        setTimeout(function() {retrieveAPIData(artistID,1)}, 4000)
    } else {
        $('#falseModal').modal('show')
    }
});


function dispCount(textEl, numbers) {
    document.getElementById(textEl).style.display = "block";
    setTimeout(function () {
        document.getElementById(textEl).innerText = numbers.toLocaleString("en-US", { minimumFractionDigits: 0 });
    }, 5000);
    for (let n = 0; n < numbers; n = n + 10000) {
        setTimeout(function () {
            document.getElementById(textEl).innerText = n.toLocaleString("en-US", { minimumFractionDigits: 0 });
        }, 500);
    }
    clearTimeout();
    
}