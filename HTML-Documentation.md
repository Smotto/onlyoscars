# CSC 131 - Pied Piper

## Movie Data

A JSON file containing the movie data is stored locally. Each movie has five keys if additional information is not found
using the OMDB API: category, winner, entity, year, and onlyOscarsID.

```json
{
  "category": string,
  "entity": string,
  "winner": boolean,
  "year": number,
  "onlyOscarsID": number
}
```

If additional movie data is found using the OMDB API, the object contains an additional nested object: omdbDATA,
containing the keys Tile, Year, Rated, Released, Runtime, Genre, Director, Writer, Actors, Plot, Language, Country,
Awards, Poster, an array of objects, Ratings, where each array contains object keys Source and Value, Metascore,
imdbRating, imdbVotes, imdbID, Type, DVD, BoxOffice, Production, Website, and Response.

```json
{
  "category": string,
  "entity": string,
  "winner": boolean,
  "year": number,
  "onlyOscarsID": number,
  "omdbData": {
    "Title": string,
    "Year": string,
    "Rated": string,
    "Released": string,
    "Runtime": string,
    "Genre": string,
    "Director": string,
    "Writer": string,
    "Actors": string,
    "Plot": string,
    "Language": string,
    "Country": string,
    "Awards": string,
    "Poster": string,
    "Ratings": [
      {
        "Source": string,
        "Value": string
      }
    ],
    "Metascore": string,
    "imdbRating": string,
    "imdbVotes": string,
    "imdbID": string,
    "Type": string,
    "DVD": string,
    "BoxOffice": string,
    "Production": string,
    "Website": string,
    "Response": string
  }
}
```

In some cases, if additional movie information is not found using the OMDB API, the object contains an additional nested
object, omdbData, containing a Response and Error key.

```json
{
  "category": string,
  "entity": string,
  "winner": boolean,
  "year": number,
  "onlyOscarsID": number,
  "omdbData": {
    "Response": boolean,
    "Error": string
  }
}
```

# Root URL is `http://localhost:3000`

## Movie Data: winner

### GET `/api/json/?winner=true`

This route returns every movie that is a winner by adding `/api/json/?winner=true` after the root URL. This collection
query returns the movies in a JSON format.

Example: `/api/json/?winner=true`

```json
  {
    "category":"SOUND RECORDING",
    "entity":"The Bells of St. Mary's",
    "winner":true,
    "year":1945,
    "onlyOscarsID":2012,
    "omdbData":{
      "Title":"The Bells of St. Mary's",
      "Year":"1945",
      "Rated":"Unrated",
      "Released":"21 Feb 1946",
      "Runtime":"126 min",
      "Genre":"Drama",
      "Director":"Leo McCarey",
      "Writer":"Dudley Nichols (screenplay), Leo McCarey (story)",
      "Actors":"Bing Crosby, Ingrid Bergman, Henry Travers, William Gargan",
      "Plot":"At a big city Catholic school, Father O'Malley and Sister Benedict indulge in friendly rivalry, and succeed in extending the school through the gift of a building.",
      "Language":"English",
      "Country":"USA",
      "Awards":"Won 1 Oscar. Another 4 wins & 8 nominations.",
      "Poster":"https://m.media-amazon.com/images/M/MV5BYWYyZjk5OGEtZTFhNS00OTg0LWJjNWEtYjlkOTQ1MjM1N2ZkXkEyXkFqcGdeQXVyMDI2NDg0NQ@@._V1_SX300.jpg",
      "Ratings":[
        {
          "Source":"Internet Movie Database",
          "Value":"7.3/10"
        },
        {
          "Source":"Rotten Tomatoes",
          "Value":"85%"
        }
      ],
      "Metascore":"N/A",
      "imdbRating":"7.3",
      "imdbVotes":"7,295",
      "imdbID":"tt0037536",
      "Type":"movie",
      "DVD":"09 Aug 2020",
      "BoxOffice":"$21,333,333",
      "Production":"Rainbow Productions",
      "Website":"N/A",
      "Response":"True"
    }
  },
  {
    "category":"SPECIAL EFFECTS",
    "entity":"Wonder Man",
    "winner":true,
    "year":1945,
    "onlyOscarsID":2028,
    "omdbData":{
      "Title":"Wonder Man",
      "Year":"1945",
      "Rated":"Approved",
      "Released":"N/A",
      "Runtime":"98 min",
      "Genre":"Comedy, Fantasy, Musical",
      "Director":"H. Bruce Humberstone",
      "Writer":"Don Hartman (screenplay), Melville Shavelson (screenplay), Philip Rapp (screenplay), Jack Jevne (adaptation), Eddie Moran (adaptation), Arthur Sheekman (original story)",
      "Actors":"Danny Kaye, Virginia Mayo, Vera-Ellen, Donald Woods",
      "Plot":"After being murdered by gangsters, an exuberant nightclub entertainer returns as a ghost to persuade his meek twin brother to help bring his killers to justice.",
      "Language":"English, French",
      "Country":"USA",
      "Awards":"Won 1 Oscar. Another 4 nominations.",
      "Poster":"https://m.media-amazon.com/images/M/MV5BNGQ3ODUzNGEtNDRhNS00ZmZiLTk0YWYtZDJlYTExZmU1MGQ3XkEyXkFqcGdeQXVyNjMwMjk0MTQ@._V1_SX300.jpg",
      "Ratings":[
        {
          "Source":"Internet Movie Database",
          "Value":"7.0/10"
        },
        {
          "Source":"Rotten Tomatoes",
          "Value":"100%"
        }
      ],
      "Metascore":"N/A",
      "imdbRating":"7.0",
      "imdbVotes":"1,963",
      "imdbID":"tt0038260",
      "Type":"movie",
      "DVD":"N/A",
      "BoxOffice":"N/A",
      "Production":"Samuel Goldwyn Company",
      "Website":"N/A",
      "Response":"True"
    }
  }
```

## Movie Data: category

### GET `/api/json/?category=`

This route returns every movie of a category by adding `/api/json/?category=CATEGORY%HERE`, replacing `CATEGORY%20HERE`
with the chosen category, (`%20` for spaces), after the root URL. This collection query returns the movies in a JSON
format.

Example: `/api/json/?category=ACTRESS%20IN%20A%20SUPPORTING%20ROLE`

  ```json
  {
    "category":"ACTRESS IN A SUPPORTING ROLE",
    "entity":"Beulah Bondi",
    "winner":false,
    "year":1936,
    "onlyOscarsID":453,
    "omdbData":{
      "Response":"False",
      "Error":"Movie not found!"
    }
  },
  {
    "category":"ACTRESS IN A SUPPORTING ROLE",
    "entity":"Kate Winslet",
    "winner":false,
    "year":2001,
    "onlyOscarsID":8804,
    "omdbData":{
      "Title":"Kate Winslet: What If",
      "Year":"2001",
      "Rated":"N/A",
      "Released":"14 Sep 2001",
      "Runtime":"4 min",
      "Genre":"Short, Music",
      "Director":"Paul Donnellon",
      "Writer":"N/A",
      "Actors":"Kate Winslet",
      "Plot":"N/A",
      "Language":"N/A",
      "Country":"UK",
      "Awards":"N/A",
      "Poster":"https://m.media-amazon.com/images/M/MV5BZGE4ZmNjNDQtYmE2My00MTg3LTg3NDEtZTA2MzhhMTk2MDlmXkEyXkFqcGdeQXVyNTgzNDU0ODY@._V1_SX300.jpg",
      "Ratings":[
        {
          "Source":"Internet Movie Database",
          "Value":"8.2/10"
        }
      ],
      "Metascore":"N/A",
      "imdbRating":"8.2",
      "imdbVotes":"25",
      "imdbID":"tt5617492",
      "Type":"movie",
      "DVD":"N/A",
      "BoxOffice":"N/A",
      "Production":"N/A",
      "Website":"N/A",
      "Response":"True"
    }
  }
  ```

## Movie Data: year

### GET `/api/?year=`

This route returns every movie of a year by adding `/api/json/?year=0000`, replacing `0000` with the chosen year after
the root URL. This collection query returns the movies in a JSON format.

Example: `/api/year/?year=1945`

```json
  {
    "category":"ACTOR",
    "entity":"Bing Crosby",
    "winner":false,
    "year":1945,
    "onlyOscarsID":1888
  },
  {
    "category":"ACTOR",
    "entity":"Gene Kelly",
    "winner":false,
    "year":1945,
    "onlyOscarsID":1889
  },
  {
    "category":"ACTOR",
    "entity":"Ray Milland",
    "winner":true,
    "year":1945,
    "onlyOscarsID":1890
  }
```

## Movie Data: category and winner

### GET `/api/?category=0000&winner=true`

This route returns every movie by the category and winner by adding `/api/?category=0000&winner=true`, replacing `0000`
with appropriate category and `true` indicating Oscar winners. This collection query returns the movies in a JSON
format.

Example: `/api/?category=WRITING&winner=true`

```json
  {
    "category":"WRITING",
    "entity":"Hans Kraly",
    "winner":true,
    "year":1928,
    "onlyOscarsID":70
  },
  {
    "category":"WRITING",
    "entity":"The Big House",
    "winner":true,
    "year":1929,
    "onlyOscarsID":111
  }
```

## Movie Data: category and not winner

### GET `/api/?category=0000&winner=false`

This route returns every movie by the category and not winner by adding `/api/?category=0000&winner=false`,
replacing `0000` with appropriate category and `false` indicating Oscars that did not win. This collection query returns
the movies in a JSON format.

Example: `/api/?category=DIRECTING&winner=false`

```json
  {
    "category":"DIRECTING",
    "entity":"Lionel Barrymore",
    "winner":false,
    "year":1928,
    "onlyOscarsID":56
  },
  {
    "category":"DIRECTING",
    "entity":"Harry Beaumont",
    "winner":false,
    "year":1928,
    "onlyOscarsID":57
  },
  {
    "category":"DIRECTING",
    "entity":"Irving Cummings",
    "winner":false,
    "year":1928,
    "onlyOscarsID":58
  }
```

## Movie Data: category and year

### GET `/api/category/0000/year/----`

This route returns every movie by the category and year by adding `/api/category/0000/year/---`, replacing `0000` with
appropriate category and `----` with year. This collection query returns the movies in a JSON format.

Example: `/api/category/DIRECTING/year/1930`

```json
  {
    "category":"DIRECTING",
    "entity":"Cimarron",
    "winner":false,
    "year":1930,
    "onlyOscarsID":135
  },
  {
    "category":"DIRECTING",
    "entity":"A Free Soul",
    "winner":false,
    "year":1930,
    "onlyOscarsID":136
  },
  {
    "category":"DIRECTING",
    "entity":"The Front Page",
    "winner":false,
    "year":1930,
    "onlyOscarsID":137
  }
```

## Movie Data: category, year, and winner

### GET `/api/category/0000/year/----/winner/true`

This route returns a movie by the category, year and winner by adding `/api/category/0000/year/----/winner/true`,
replacing `0000` with appropriate category, `----` with year and `true` which indicates Oscar winners. This singleton
parameterized search returns the movie in a JSON format.

Example: `/api/category/CINEMATOGRAPHY/year/1931/winner/true`

```json
{
  "category": "CINEMATOGRAPHY",
  "entity": "Shanghai Express",
  "winner": true,
  "year": 1931,
  "onlyOscarsID": 176
}
```

## Movie Data: category, year, and not winner

### GET `/api/category/0000/year/----/winner/false`

This route returns every movie by the category, year and not winner by
adding ``/api/category/0000/year/----/winner/false``, replacing `0000` with appropriate category, `----` with year
and `false` which indicates Oscars that did not win. This returns a collection of movies in a JSON format.

Example: `/api/category/DIRECTING/year/1935/winner/false`

```json
  {
    "category":"DIRECTING",
    "entity":"Captain Blood",
    "winner":false,
    "year":1935,
    "onlyOscarsID":373
  },
  {
    "category":"DIRECTING",
    "entity":"The Lives of a Bengal Lancer",
    "winner":false,
    "year":1935,
    "onlyOscarsID":375
  },
  {
    "category":"DIRECTING",
    "entity":"Mutiny on the Bounty",
    "winner":false,
    "year":1935,
    "onlyOscarsID":376
  }
```

## Movie Data: year and winner

### GET `/api/?year=----&winner=true`

This route returns every movie by the year and winner by adding `/api/?year=----&winner=true`, replacing `----` with
year and `true` indicating Oscar winners. This collection query returns the movies in a JSON format.

Example: `/api/?year=1935&winner=true`

```json
  {
    "category":"ACTOR",
    "entity":"Victor McLaglen",
    "winner":true,
    "year":1935,
    "onlyOscarsID":346
  },
  {
    "category":"ACTRESS",
    "entity":"Bette Davis",
    "winner":true,
    "year":1935,
    "onlyOscarsID":351
  },
  {
    "category":"ART DIRECTION",
    "entity":"The Dark Angel",
    "winner":true,
    "year":1935,
    "onlyOscarsID":355
  },
  {
    "category":"ASSISTANT DIRECTOR",
    "entity":"The Lives of a Bengal Lancer",
    "winner":true,
    "year":1935,
    "onlyOscarsID":360
  }
```

## Movie Data: year and not winner

### GET `/api/?year=----&winner=false`

This route returns every movie by the year and not winner by adding `/api/?year=----&winner=false`, replacing `----`
with year and `false` indicating Oscar not winners. This collection query returns the movies in a JSON format.

Example: `/api/?year=1941&winner=false`

```json
  {
    "category":"ACTOR",
    "entity":"Cary Grant",
    "winner":false,
    "year":1941,
    "onlyOscarsID":1141
  },
  {
    "category":"ACTOR",
    "entity":"Walter Huston",
    "winner":false,
    "year":1941,
    "onlyOscarsID":1142
  },
  {
    "category":"ACTOR",
    "entity":"Robert Montgomery",
    "winner":false,
    "year":1941,
    "onlyOscarsID":1143
  }
```



