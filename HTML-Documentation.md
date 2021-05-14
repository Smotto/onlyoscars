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

If additional movie data is found using the OMDB API, the object contains an additional nested object: omdbDATA, containing the keys Tile, Year, Rated, Released, Runtime, Genre, Director, Writer, Actors, Plot, Language, Country, Awards, Poster, an array of objects, Ratings, where each array contains object keys Source and Value, Metascore, imdbRating, imdbVotes, imdbID, Type, DVD, BoxOffice, Production, Website, and Response.   .

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
