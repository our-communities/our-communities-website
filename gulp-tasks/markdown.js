const gulp = require('gulp');
const request = require('request');
var fs = require('fs');


gulp.task('markdown', function() {
  console.log('building markdown');
  return request('https://our-communities-api.herokuapp.com/getData', function(error, response, body) {
  // return request('http://localhost:8080/getData', function(error, response, body) {
        let events = JSON.parse(body);

        // Choose the path wisely
        let dirPath = '';
        if(process.env.CONTEXT){
          dirPath = '/opt/build/repo/_events';
        } else {
          dirPath = '_events';
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

        // Generate the markdown for each event
        events.forEach(evt => {
          let fileTitle = evt.title.toLowerCase().replace(/\s+/g, '-');
          fileTitle = fileTitle.replace(/(\/)/g, '-');
          fileTitle = fileTitle.replace(/(\:)/g, '-');
          fileTitle = fileTitle.replace(/(\#)/g, '');
          fileTitle = fileTitle.replace(/(\")/g, '');
          fileTitle = fileTitle.replace(/(\')/g, '');
          fileTitle += '-';
          fileTitle += evt.id.toLowerCase();

          evt.title = evt.title.replace(/(\:)/g, '-');
          evt.title = evt.title.replace(/(\#)/g, '');
          evt.title = evt.title.replace(/(\")/g, '');

          let logger = fs.createWriteStream(`${dirPath}/${fileTitle}.md`);

          logger.write(`---\n`);
          logger.write(`layout: page\n`);
          logger.write(`title: ${evt.title}\n`);
          logger.write(`start: '${evt.start}'\n`);
          logger.write(`end: '${evt.end}'\n`);
          logger.write(`organiserid: ${evt.organiserID}\n`);
          logger.write(`organiserName: ${evt.orgName}\n`);
          logger.write(`organiserAltName: ${evt.orgAltName}\n`);
          logger.write(`ticketurl: ${evt.ticketURL}\n`);
          logger.write(`venue: ${evt.venue}\n`);
          logger.write(`geographic: ${evt.geographic}\n`);
          logger.write(`lat: ${evt.lat}\n`);
          logger.write(`long: ${evt.long}\n`);

          // Open Graph / SEO Stuff
          logger.write(`image: /assets/img/communities/${evt.orgAltName}_thumb.jpg\n`);

          logger.write(`---\n`);
          logger.write(`${evt.description}\n`);
          logger.end();
        });
    });
});
