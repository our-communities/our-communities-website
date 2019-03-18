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
        logger.write(`  {`);
        logger.write(`"id": "53543387714"`);
    logger.write(`"title": "Digital Plymouth Meetup",`);
    logger.write(`"start": "2019-11-07T19:00:00",`);
    logger.write(`"end": "2019-11-07T22:00:00",`);
    logger.write(`"organiserid": "8225401568",`);
    logger.write(`"organiserName": "Digital Plymouth",`);
    logger.write(`"organiserAltName": "digital-plymouth",`);
    logger.write(`"ticketurl": "https://www.eventbrite.co.uk/e/digital-plymouth-meetup-tickets-53543387714",`);
    logger.write(`"venue": "The Loft",`);
    logger.write(`"geographic": "Plymouth",`);
    logger.write(`"lat": "50.369008",`);
    logger.write(`"long": "-4.134078000000045",`);
    logger.write(`"image": "/assets/img/communities/digital-plymouth_thumb.jpg",`);
    logger.write(`"description": "<P>Keep an eye on <A HREF=\"https://www.facebook.com/digitalplymouth/\" TARGET=\"_blank\" REL=\"nofollow noopener noreferrer\">Facebook</A> and <A HREF=\"https://twitter.com/DigitalPlymouth\" TARGET=\"_blank\" REL=\"nofollow noopener noreferrer\">Twitter</A> for more details.</P>\n<P><STRONG>Digital Plymouth </STRONG>is supported by <A HREF=\"http://www.bromheadco.co.uk/\" TARGET=\"_blank\" REL=\"nofollow noopener noreferrer\">Bromhead Chartered Accountants</A>. Tickets are limited so make sure to book yours now.</P>\n<P><STRONG>Digital Plymouth</STRONG> is possible thanks to <A HREF=\"http://www.brilliantworking.com/\" TARGET=\"_blank\" REL=\"nofollow noopener noreferrer\">Brilliant Working</A>, <A HREF=\"https://www.controlledfrenzy.co.uk/\" TARGET=\"_blank\" REL=\"nofollow noopener noreferrer\">Controlled Frenzy</A>, <A HREF=\"https://www.elixel.co.uk/\" TARGET=\"_blank\" REL=\"nofollow noopener noreferrer\">Elixel</A>, <A HREF=\"https://createwithloli.com/\" TARGET=\"_blank\" REL=\"nofollow noopener noreferrer\">Loli</A>, <A HREF=\"http://supersocialiseme.com/\" TARGET=\"_blank\" REL=\"nofollow noopener noreferrer\">Super Socialise Me</A> and <A HREF=\"http://thinqtanq.spaces.nexudus.com/en\" TARGET=\"_blank\" REL=\"nofollow noopener noreferrer\">THINQTANQ</A>.</P>"`);
    logger.write(`  }`);

        // Generate the markdown for each event
        // events.forEach(evt => {
        //   //Escape the nasties
        //   let description = JSON.stringify(evt.description);
        //
        //   logger.write(`  {`);
        //   logger.write(`    "id": "${evt.id}",\n`);
        //   logger.write(`    "title": "${evt.title}",\n`);
        //   logger.write(`    "start": "${evt.start}",\n`);
        //   logger.write(`    "end": "${evt.end}",\n`);
        //   logger.write(`    "organiserid": "${evt.organiserID}",\n`);
        //   logger.write(`    "organiserName": "${evt.orgName}",\n`);
        //   logger.write(`    "organiserAltName": "${evt.orgAltName}",\n`);
        //   logger.write(`    "ticketurl": "${evt.ticketURL}",\n`);
        //   logger.write(`    "venue": "${evt.venue}",\n`);
        //   logger.write(`    "geographic": "${evt.geographic}",\n`);
        //   logger.write(`    "lat": "${evt.lat}",\n`);
        //   logger.write(`    "long": "${evt.long}",\n`);
        //   logger.write(`    "image": "/assets/img/communities/${evt.orgAltName}_thumb.jpg",\n`);
        //   logger.write(`    "description": ${description}\n`);
        //   logger.write(`  },`);
        // });
        //
        // logger.write('{}');
        logger.write(']');
        logger.end();
    });
});
