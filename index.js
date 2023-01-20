const { Readability } = require("@mozilla/readability");
const { JSDOM } = require("jsdom");
const axios = require("axios");

const userAgent =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36";
const googleWebcachePrefix =
  "https://webcache.googleusercontent.com/search?q=cache:";

const getHTML = (url) => {
  return axios({
    method: "get",
    url: googleWebcachePrefix + url,
    headers: { "User-Agent": userAgent },
  })
    .then((res) => {
      // console.log(`statusCode: ${res.status}`);
      // console.log('res', res.data);
      return res.data;
    })
    .catch((error) => {
      // console.error("status,", error.request.res.statusCode);
      if (error.request.res.statusCode == 404) {
        return axios({
          method: "get",
          url: url,
          headers: { "User-Agent": userAgent },
        }).then((res) => {
          // console.log("res", res.status)
          if (res.status == 200) {
            return res.data;
          }
        });
      }
    });
};

// getHTML(
//   "https://www.washingtonpost.com/politics/2022/06/30/supreme-court-epa-climate-change/"
// ).then(console.log);

// https://github.com/mozilla/readability

exports.main = async (args) => {
  const url = args.url;
  const html = args.html || (await getHTML(url));
  // console.log("HT", url, html)
  if (html) {
    const doc = new JSDOM(html, { url });
    const reader = new Readability(doc.window.document);
    const article = reader.parse();
    delete article.content;
    return article;
  }
};

exports
  .main({
    url: "https://twotechievibes.medium.com/free-trials-not-for-you-how-to-get-what-you-want-without-paying-a-dime-10abba944908",
  })
  .then(console.log);

/**
 * JSON OBJECT from ChatGPT given the output.
 * 
 * Prompt:
 * you are a chatbot created with the sole intent to return a summary of text content given a json object.
OUTPUT a new object summarizing the key points of the "textContent" key in a JSON object that looks like this: 
"
{
keyPoints: [Array of Key Points],
bias: String,
tone: String,
summary: String,
trust: rating from 1 to 10, 10 being highest
}
"
Using this JSON object as the INPUT:
"
  INPUT FROM OUTPUT OF THIS CODE
"
 * 
 * 
 * 
 {
keyPoints: [
"The idea for OMORPHO came from experiencing something firsthand and noticing something that could be done better",
"The initial idea was for a comfortable and stylish weight vest for both men and women",
"The creator realized that adding resistance is the key to getting stronger during training",
"OMORPHO started as a prototype design and has now grown into an entire category of weighted fitness gear",
"The brand is called OMORPHO, which means "beautiful" in Greek, and the goal is to design beautiful solutions for athletes and fitness enthusiasts"
],
bias: null,
tone: "Positive and enthusiastic",
summary: "The OMORPHO brand was created by someone who noticed a gap in the market for a comfortable and stylish weight vest for both men and women. They realized that adding resistance is key to getting stronger during training and developed OMORPHO as a prototype design. It has now grown into an entire category of weighted fitness gear, with the goal of designing beautiful solutions for athletes and fitness enthusiasts. The brand is called OMORPHO, which means "beautiful" in Greek.",
trust: 8
}
 */

/**
 * INPUTTING SONG LYRICS (google.com/search?q=song+lyrics+for+jon+bellion+all+time+low&rlz=1C5CHFA_enUS997US997&ei=7uHKY_DML4erptQPt8OaqAo&oq=song+lyrics+for+jon+bellion+all+time&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAxgAMgUIIRCgATIFCCEQqwIyCwghEBYQHhDxBBAdMgsIIRAWEB4Q8QQQHTILCCEQFhAeEPEEEB06CggAEEcQ1gQQsAM6CAghEBYQHhAdSgQIQRgASgQIRhgAUIUMWL4XYIYiaANwAXgAgAF-iAH9BpIBAzcuMpgBAKABAcgBCMABAQ&sclient=gws-wiz-serp)
 * 
 * {
keyPoints: [
"The song is about the singer's feelings of being a ghost and being ignored by a past love",
"The singer expresses feelings of broken pride and isolation",
"The song also includes a repetition of the phrase "low low low"
],
bias: null,
tone: "Sad and reflective",
summary: "The song 'All Time Low' by Jon Bellion is about the singer's feelings of being a ghost and being ignored by a past love. The singer expresses feelings of broken pride and isolation. The song also includes a repetition of the phrase 'low low low'",
trust: 8
}
 */
