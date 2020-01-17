

var appRouter = function (app) {
  
  app.get("/", function(req, res) {

    const MongoClient = require('mongodb').MongoClient;

    var data = [];

    MongoClient.connect('mongodb://readonly:turner@ds043348.mongolab.com:43348/dev-challenge', (err, database) => {
      
      if (err) throw err;

      const titleSearchDb = database.db('dev-challenge');
      const mysort = { TitleName: 1 };
 
      titleSearchDb.collection("Titles").find({},{ projection: { TitleId: 1, TitleName: 1, ReleaseYear: 1} }).sort(mysort).toArray(function(err, result) {
        if (err) throw err;

        for (var index = 0; index < result.length; index++) {
          data.push({key: result[index].TitleId, value: result[index].TitleName})
        }
        res.send(data);
      });
    });
  });

  app.get("/title/:id", function(req, res) {

    const MongoClient = require('mongodb').MongoClient;

    var data = [];

    MongoClient.connect('mongodb://readonly:turner@ds043348.mongolab.com:43348/dev-challenge', (err, database) => {
      
      if (err) throw err;

      const titleSearchDb = database.db('dev-challenge');

      titleSearchDb.collection("Titles").find({},{}).toArray(function(err, result) {
        if (err) throw err;

        for (var index = 0; index < result.length; index++) {
          if (result[index].TitleId == req.params.id)
          {
            data.push({genres: result[index].Genres, storyLines: result[index].Storylines})
          }
        }
        res.send(data);

        //data.push({genre: 'Science Fiction', description: 'Best Sci-Fi movie ever made',passedId: req.params.id} )

        //res.send(result);
        
        //res.send(result);
      });
      

      //data.push({genre: 'Science Fiction', description: 'Best Sci-Fi movie ever made',passedId: req.params.id} )

      //res.send(data);
    });
      
      

  });

}

module.exports = appRouter;