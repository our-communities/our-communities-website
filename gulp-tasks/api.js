const gulp = require('gulp');
const request = require('request');
var fs = require('fs');


gulp.task('api-v1', function() {
  console.log('building json data');
  return request('https://our-communities-api.herokuapp.com/getData', function(error, response, body) {
  // return request('http://localhost:8080/getData', function(error, response, body) {
        let events = JSON.parse(body);

        // Choose the path wisely
        let dirPath = '';
        if(process.env.CONTEXT){
          dirPath = '/opt/build/repo/_api/v1';
        } else {
          dirPath = '_api/v1';
        }

        // Empty the events directory
        try {
          var files = fs.readdirSync(dirPath);
        } catch(e) {
          return;
        }
        if (files.length > 0){
          for (let i = 0; i < files.length; i++) {
            var filePath = dirPath + '/' + files[i];
            if (fs.statSync(filePath).isFile()){
              fs.unlinkSync(filePath);
            }
            else{
              rmDir(filePath);
            }
          }
        }

        // Create a blank file to prevent the dev folder being untracked
        let logger = fs.createWriteStream(`${dirPath}/file`);
        logger.end();

        logger = fs.createWriteStream(`${dirPath}/data.json`);
        logger.write('[');

        // Generate the markdown for each event
        events.forEach(evt => {
          //Escape the nasties
          let description = JSON.stringify(evt.description);

          logger.write(`  {`);
          logger.write(`    "id": "${evt.id}",\n`);
          logger.write(`    "title": "${evt.title}",\n`);
          logger.write(`    "start": "${evt.start}",\n`);
          logger.write(`    "end": "${evt.end}",\n`);
          logger.write(`    "organiserid": "${evt.organiserID}",\n`);
          logger.write(`    "organiserName": "${evt.orgName}",\n`);
          logger.write(`    "organiserAltName": "${evt.orgAltName}",\n`);
          logger.write(`    "ticketurl": "${evt.ticketURL}",\n`);
          logger.write(`    "venue": "${evt.venue}",\n`);
          logger.write(`    "geographic": "${evt.geographic}",\n`);
          logger.write(`    "lat": "${evt.lat}",\n`);
          logger.write(`    "long": "${evt.long}",\n`);
          logger.write(`    "image": "/assets/img/communities/${evt.orgAltName}_thumb.jpg",\n`);
          logger.write(`    "description": ${description}\n`);
          logger.write(`  },`);
        });

        logger.write('{}');
        logger.write(']');
        logger.end();
    });
});
