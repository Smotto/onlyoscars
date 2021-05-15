# CSC 131 - Pied Piper

## Movie Data

A JSON file containing the movie data is stored locally. 
Each movie has five keys if additional information is not found using the OMDB API: category, winner, entity, year, and onlyOscarsID.

```json
{
  "category": string,
  "entity": string,
  "winner": boolean,
  "year": number,
  "onlyOscarsID": number
}
```

If additional movie data is found using the OMDB API, the object contains an additional nested object: omdbDATA, containing the keys Tile, Year, Rated, Released, Runtime, Genre, Director, Writer, Actors, Plot, Language, Country, Awards, Poster, an array of objects, Ratings, where each array contains object keys Source and Value, Metascore, imdbRating, imdbVotes, imdbID, Type, DVD, BoxOffice, Production, Website, and Response.   

```json
{
  "category": string,
  "entity": string,
  "winner": boolean,
  "year": number,
  "onlyOscarsID": number,
  "omdbData":{
      "Title": string,
      "Year": string",
      "Rated": string,
      "Released": string,
      "Runtime": string,
      "Genre": string,
      "Director": string,
      "Writer": string,
      "Actors": string,
      "Plot": string,
      "Language": string,
      "Country": string",
      "Awards": string,
      "Poster": string,
      "Ratings":[
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

In some cases, if additional movie information is not found using the OMDB API the object contains an additional nested object, omdbData

```json
{
  "category": string,
  "entity": string,
  "winner": boolean,
  "year": number,
  "onlyOscarsID": number,
  "omdbData":{
     "Response": boolean,
     "Error": string
  }
}
```

# Root URL is `http://localhost:3000`

## Movie Data: winner 

### GET `/api/json/?winner=true`

This route returns every movie that is a winner by adding `/api/json/?winner=true` after the root URL. This collection query returns the movies in a JSON format.

Example: 

```json
{
   "category":"DIRECTING",
   "entity":"Frank Lloyd",
   "winner":true,
   "year":1928,
   "onlyOscarsID":59,
   "omdbData":{
      "Title":"Frank Lloyd Wright",
      "Year":"1998",
      "Rated":"TV-PG",
      "Released":"23 Jan 1998",
      "Runtime":"146 min",
      "Genre":"Documentary, Biography, History",
      "Director":"Ken Burns, Lynn Novick",
      "Writer":"Geoffrey C. Ward",
      "Actors":"Edward Herrmann, Philip Bosco, Julie Harris, Sab Shimono",
      "Plot":"A biography of the life and work of the American architect.",
      "Language":"English",
      "Country":"USA",
      "Awards":"Nominated for 1 Primetime Emmy. Another 3 wins & 1 nomination.",
      "Poster":"https://m.media-amazon.com/images/M/MV5BMTI2MzkyMDU5OV5BMl5BanBnXkFtZTcwNjc4MzgxMQ@@._V1_SX300.jpg",
      "Ratings":[
         {
            "Source":"Internet Movie Database",
            "Value":"7.7/10"
         }
      ],
      "Metascore":"N/A",
      "imdbRating":"7.7",
      "imdbVotes":"772",
      "imdbID":"tt0144937",
      "Type":"movie",
      "DVD":"29 Jul 2008",
      "BoxOffice":"N/A",
      "Production":"N/A",
      "Website":"N/A",
      "Response":"True"
   }
}
```

## Movie Data: category

  ### GET `/api/json/?category=`

  This route returns every movie of a category by adding `/api/json/?category=CATEGORY%HERE`, replacing `CATEGORY%20HERE` with the chosen category, (`%20` for spaces), after the root URL. This collection query returns the movies in a JSON format.

  Example: GET `/api/json/?category=ACTRESS%20IN%20A%20SUPPORTING%20ROLE`

  ```json
  {
      "category": "ACTRESS IN A SUPPORTING ROLE",
      "entity": "Beulah Bondi",
      "winner": false,
      "year": 1936,
      "onlyOscarsID": 453,
      "omdbData": {
        "Response": "False",
        "Error": "Movie not found!"
      }
    },
    {
      "category": "ACTRESS IN A SUPPORTING ROLE",
      "entity": "Alice Brady",
      "winner": false,
      "year": 1936,
      "onlyOscarsID": 454,
      "omdbData": {
        "Title": "Alice Brady in a Liberty Loan Appeal",
        "Year": "1918",
        "Rated": "N/A",
        "Released": "01 Oct 1918",
        "Runtime": "N/A",
        "Genre": "Short",
        "Director": "N/A",
        "Writer": "N/A",
        "Actors": "Alice Brady",
        "Plot": "Alice Brady shows women how their contributions help provide soldiers' uniforms.",
        "Language": "English",
        "Country": "USA",
        "Awards": "N/A",
        "Poster": "N/A",
        "Ratings": [],
        "Metascore": "N/A",
        "imdbRating": "N/A",
        "imdbVotes": "N/A",
        "imdbID": "tt0486256",
        "Type": "movie",
        "DVD": "N/A",
        "BoxOffice": "N/A",
        "Production": "N/A",
        "Website": "N/A",
        "Response": "True"
      }
    }
  ```

## Movie Data: year

### GET `/api/?year=`

This route returns every movie of a year by adding `/api/json/?year=0000`, replacing `0000` with the chosen year after the root URL. This collection query returns the movies in a JSON format.

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

This route returns every movie by the category and winner by adding `/api/?category=0000&winner=true`, replacing `0000` with appropriate category and `true` indicating Oscar winners. This collection query returns the movies in a JSON format.

Example: `/api/?category=WRITING&winner=true`

```json
{
  ***************JSON HERE************** 
}
```
## Movie Data: category and not winner

### GET `/api/?category=0000&winner=false`

This route returns every movie by the category and not winner by adding `/api/?category=0000&winner=false`, replacing `0000` with appropriate category and `false` indicating Oscars that did not win. This collection query returns the movies in a JSON format.

Example: `/api/?category=DIRECTING&winner=false`
```json
{
  ***************JSON HERE**************
}
```
## Movie Data: category and year
### GET `/api/category/0000/year/----`

This route returns every movie by the category and year by adding `/api/category/0000/year/---`, replacing `0000` with appropriate category and `----` with year. This collection query returns the movies in a JSON format.

Example: `/api/category/DIRECTING/year/1930`

```json
{
  ***************JSON HERE**************
}
```
## Movie Data: category, year, and winner
### GET `/api/category/0000/year/----/winner/true`

This route returns every movie by the category, year and winner by adding `/api/category/0000/year/----/winner/true`, replacing `0000` with appropriate category, `----` with year and `true` which indicates Oscar winners. This collection query returns the movies in a JSON format.

Example: `/api/category/CINEMATOGRAPHY/year/1931/winner/true`

```json
{
***************JSON HERE**************
}
```
## Movie Data: category, year, and not winner
### GET `/api/category/0000/year/----/winner/false`

This route returns every movie by the category, year and not winner by adding ``/api/category/0000/year/----/winner/false``, replacing `0000` with appropriate category, `----` with year and `false` which indicates Oscars that did not win. This collection query returns the movies in a JSON format.

Example: `/api/category/DIRECTING/year/1935/winner/false`

```json
{
  ***************JSON HERE**************
}
```

## Movie Data: year and winner
### GET `/api/?year=----&winner=true`

This route returns every movie by the year and winner by adding `/api/?year=----&winner=true`, replacing `----` with year and `true` indicating Oscar winners. This collection query returns the movies in a JSON format.

Example: `/api/?year=1935&winner=true`

```json
{
  ***************JSON HERE**************
}
```

## Movie Data: year and not winner
### GET `/api/?year=----&winner=false`

This route returns every movie by the year and not winner by adding `/api/?year=----&winner=false`, replacing `----` with year and `false` indicating Oscar not winners. This collection query returns the movies in a JSON format.

Example: `/api/?year=1941&winner=false`

```json
{
  ***************JSON HERE**************
}
```



