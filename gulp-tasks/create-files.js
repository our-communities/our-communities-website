const gulp = require('gulp');
const request = require('request');
var fs = require('fs');


gulp.task('create-files', function() {
  console.log(`LOG: Creating files`);
  return request(`https://our-communities-api.herokuapp.com/getData?API_KEY=${process.env.API_KEY}`, function(error, response, body) {
  // return request(`http://localhost:8080/getData?API_KEY=${process.env.API_KEY}`, function(error, response, body) {
    if (error) {
      console.log('ERROR: ', error);
    }

    let data = JSON.parse(body);

    // Filter out just this regions events
    data.events =  data.events.filter(function( obj ) {
      return obj.region === process.env.LOCATION;
    });

    console.log('LOG: Building Markdown');
    // Choose the path wisely and empty it
    let dirPath = process.env.CONTEXT ? '/opt/build/repo/_events' : '_events';
    emptyDirectory(dirPath);

    // Generate a markdown file for each event
    data.events.forEach(evt => {
      createEventMarkdownFile(evt, dirPath, evt.fileTitle);
    });

    // Generate a markdown file for each location
    dirPath = process.env.CONTEXT ? '/opt/build/repo/_locations' : '_locations';
    emptyDirectory(dirPath);

    data.locations.forEach(loc => {
      let logger = fs.createWriteStream(`${dirPath}/${loc}.md`);
      logger.write('---\n');
      logger.write(`name: ${loc}\n`);
      logger.write('---');
      logger.end();
    });

    // Generate a markdown file for each community
    dirPath = process.env.CONTEXT ? '/opt/build/repo/_communities' : '_communities';
    emptyDirectory(dirPath);

    // Generate a markdown file for each organiser
    data.organisers.forEach(org => {
      createOrganiserMarkdownFile(org, dirPath);
    });

    console.log('LOG: Building API');

    dirPath = process.env.CONTEXT ? '/opt/build/repo/_api/v1' : '_api/v1';
    emptyDirectory(dirPath);

    // Generate API file
    let logger = fs.createWriteStream(`${dirPath}/data.json`);
    logger.write('[');
    logger.write('{');
    logger.write('"events" : [');

    // Generate API entry for each event
    data.events.forEach(evt => {
      createEventAPIEntry(logger, evt);
    });

    // Wrap up the event object
    logger.write('{}');
    logger.write('],');

    // Generate location data for the API file
    let locArray = `[`;
    data.locations.forEach((loc, key, arr) => {
      locArray += '"' + loc + '"';
      if (!Object.is(arr.length - 1, key)) {
        locArray += ',';
      }
    });
    logger.write(`"locations" : ${locArray}`);

    logger.write('],');

    // Add organisers to API file 
    logger.write(`"organisers": ${JSON.stringify(data.organisers)}`);

    // Wrap up the API file
    logger.write('}]');
    logger.end();
  });
});

const createEventMarkdownFile = (evt, path) => {
  let logger = fs.createWriteStream(`${path}/${evt.fileTitle}.md`);

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
  logger.write(`twitter: ${evt.twitter}\n`);
  logger.write(`gCalURL: ${evt.gCalURL}\n`);
  logger.write(`url: https://southwestcommunities.co.uk/calendar/${evt.fileTitle}\n`);

  // Open Graph / SEO Stuff
  logger.write(`image: /assets/img/communities/${evt.orgAltName}_thumb.jpeg\n`);

  logger.write(`---\n`);
  logger.write(`${evt.description}\n`);
  logger.end();
};

const createEventAPIEntry = (logger, evt) => {
  //Escape the nasties
  let description = JSON.stringify(evt.description);

  var regex = /^[0-9][0-9]*$/g;
  var id = evt.id;
  if (!evt.id.match(regex)) {
  	id = Math.floor((Math.random() * 9999999999) + 1000000000);
  }

  Math.floor((Math.random() * 100) + 1);

  logger.write(`  {`);
  logger.write(`    "id": ${id},\n`);
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
  logger.write(`    "image": "/assets/img/communities/${evt.orgAltName}_thumb.jpeg",\n`);
  logger.write(`    "description": ${description},\n`);
  logger.write(`    "url": "https://southwestcommunities.co.uk/events/${evt.fileTitle}",\n`);
  logger.write(`    "twitter": "${evt.twitter}",\n`);
  logger.write(`    "gCalURL": "${evt.gCalURL}"\n`);
  logger.write(`  },`);
};

const createOrganiserMarkdownFile = (community, path) => {
  let logger = fs.createWriteStream(`${path}/${community.altName}.md`);

  logger.write(`---\n`);
  logger.write(`layout: community-page\n`);
  logger.write(`name: ${community.name}\n`);
  logger.write(`dataID: '${community.id}'\n`);
  logger.write(`summary: '${community.summary}'\n`);
  logger.write(`type: ${community.archetype}\n`);
  logger.write(`region: ${community.region}\n`);
  logger.write(`source: ${community.source}\n`);
  logger.write(`altName: ${community.altName}\n\n`);

  if(community.twitter) {
    logger.write(`twitter: ${community.twitter}\n`);
  }
  if(community.facebook) {
    logger.write(`facebook: ${community.facebook}\n`);
  }
  if(community.linkedin) {
    logger.write(`linkedin: ${community.linkedin}\n`);
  }
  if(community.youtube) {
    logger.write(`youtube: ${community.youtube}\n`);
  }
  if(community.website) {
    logger.write(`website: ${community.website}\n`);
  }
  if(community.instagram) {
    logger.write(`instagram: ${community.instagram}\n`);
  }
  if(community.slack) {
    logger.write(`slack: ${community.slack}\n`);
  }

  // Open Graph / SEO Stuff
  logger.write(`image: /assets/img/communities/${community.altName}_thumb.jpeg\n`);

  logger.write(`---\n`);
  logger.write(`${community.description}\n`);
  logger.end();
}

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
  // Create a blank file to prevent the dev folder being untracked
  let logger = fs.createWriteStream(`${path}/file`);
  logger.end();
};
