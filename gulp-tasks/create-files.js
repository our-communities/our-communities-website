const gulp = require('gulp');
const request = require('request');
var fs = require('fs');


gulp.task('create-files', function() {
  console.log(`LOG: Creating files - ${process.env.API_KEY}`);
  return request(`https://our-communities-api.herokuapp.com/getData?API_KEY=${process.env.API_KEY}`, function(error, response, body) {
  // return request(`http://localhost:8080/getData?API_KEY=${process.env.API_KEY}`, function(error, response, body) {
        let events = JSON.parse(body);

        console.log('LOG: Building Markdown');
        // Choose the path wisely and empty it
        let dirPath = process.env.CONTEXT ? '/opt/build/repo/_events' : '_events';
        emptyDirectory(dirPath);

        // Create a blank file to prevent the dev folder being untracked
        let logger = fs.createWriteStream(`${dirPath}/file`);
        logger.end();

        // Generate the markdown for each event
        events.forEach(evt => {
          let fileTitle = createFileTitle(evt);
          createMarkdownFile(evt, dirPath, fileTitle);
        });

        console.log('LOG: Building API');
        // Generate the API data
        dirPath = process.env.CONTEXT ? '/opt/build/repo/_api/v1' : '_api/v1';
        emptyDirectory(dirPath);

        // Create a blank file to prevent the dev folder being untracked
        logger = fs.createWriteStream(`${dirPath}/file`);
        logger.end();

        // Generate API file
        logger = fs.createWriteStream(`${dirPath}/data.json`);
        logger.write('[');

        events.forEach(evt => {
          createAPIEntry(logger, evt);
        });

        logger.write('{}');
        logger.write(']');
        logger.end();
    });
});

const createFileTitle = (evt) => {
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
  return fileTitle;
};

const createMarkdownFile = (evt, path, fileTitle) => {
  let logger = fs.createWriteStream(`${path}/${fileTitle}.md`);

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
};

const createAPIEntry = (logger, evt) => {
  //Escape the nasties
  let description = JSON.stringify(evt.description);

  logger.write(`  {`);
  logger.write(`    "id": ${evt.id},\n`);
  logger.write(`    "title": "${evt.title}",\n`);
  logger.write(`    "start": "${evt.start}",\n`);
  logger.write(`    "end": "${evt.end}",\n`);
  logger.write(`    "organiserid": ${evt.organiserID},\n`);
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
};

const emptyDirectory = (path) => {
  var files;
  try {
    files = fs.readdirSync(path);
  } catch(e) {
    return;
  }
  if (files.length > 0){
    for (let i = 0; i < files.length; i++) {
      var filePath = path + '/' + files[i];
      if (fs.statSync(filePath).isFile()){
        fs.unlinkSync(filePath);
      }
      else{
        rmDir(path);
      }
    }
  }
};
