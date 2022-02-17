const fs = require("fs");
const request = require("request");

const times = process.argv.slice(2);
const site = times[0];
const localPath = times[1];

if (!site || !localPath) return;

request(site, (error, response, body) => {
  let siteResponse = body;
  // console.log("error:", error); // Print the error if one occurred
  // console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
  // console.log("body:", body); // Print the HTML for the Google homepage.

  fs.writeFile(localPath, siteResponse, (err) => {
    if (err) {
      console.error(err);
      return;
    }

    //file written successfully
    fs.stat(localPath, (err, stats) => {
      if (err) {
        console.error(err);
        return;
      }

      //we have access to the file stats in `stats`, size in particular
      console.log(`Downloaded and saved ${stats.size} bytes to ${localPath}`);
    });
  });
});
