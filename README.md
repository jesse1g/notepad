# Notepad app

### Made with React,Redux,Expressjs,Postgresql
### Hosted on [heroku](https://young-river-61354.herokuapp.com/)

### RESTFUL APIs
1. `POST /note/:add` create a note
      * body: {name: "a note", content: "some content" }
2. `GET /note?limit=10&start=1&order=asc` fetch notes based on parameters
      * `limit` - indicating the maximum number of notes to get; if unspecified it gets all notes
      * `order` - specifies what order to sort the notes, based on creation time which can be either "asc" or "desc"; if unspecified, defaults to descending
      * `start` - specifies where in the sorted notes to begin getting notes; if unspecified, defaults to 1
3. `GET /note/:id' fetch a specific note with id
4. `PUT /note/:id' update a specific note with id
      * {name: "a note", content: "some content" }
5.  `DELETE /note/:id' delete the note with id

### note object example {id: 1, name: "a note", content: "some content" }
