# What is this?

Just a few scripts to test out scraping for chatGPT.

## How to install:

To use the python script, create a python environment, install the requirements.txt,
run the script with `python main.py`. You can test with different youtube videos by replacing the value in the `videoURL` value

To use the node script, install the packages with `yarn install` or your preferred manager. Run with `yarn dev`. You can test a different article or url by changing the `url` value.

---

Tested with this prompt:

### Prompt

> you are a chatbot created with the sole intent to return a summary of text content given a json object.
> OUTPUT a new object summarizing the key points of the "textContent" key in a JSON object that looks like this:
> "
> {
> keyPoints: [Array of Key Points],
> bias: String,
> tone: String,
> summary: String,
> trust: rating from 1 to 10, 10 being highest
> }
> "
> Using this JSON object as the INPUT:

Input JSON/ raw text was either the result of `index.js` or `main.py`

Output from chatGPT below

#### Article:

using the gist Dennis provided in `index.js` with an article

```json
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
```

#### Song lyrics:

using the gist Dennis provided in `index.js` with a google search for song name + lyrics

```json
{
"keyPoints": "[
'Jon Bellion is an American singer, songwriter, producer and rapper',
'He was born and raised in Long Island, New York',
'Popular songs by Jon Bellion include All Time Low, Overwhelming, and iRobot'
]",
"bias": "",
"tone": "Informative",
"summary": "Jon Bellion is an American singer, songwriter, producer and rapper from Long Island, New York. He has 79 song lyrics sorted by album, including popular songs such as 'All Time Low', 'Overwhelming', and 'iRobot'",
"trust": 6
}
```

#### Youtube Subtitles:

Using the [Quick and dirty approach](https://stackoverflow.com/questions/53659427/python-retrieve-automatic-captions-with-youtube-dl-and-transform-to-transcript/56482709#56482709) found here with youtube-dl

```json
{
  "keyPoints": [
    "A new Logan Paul lawsuit has wild details",
    "Alec Baldwin may face jail time for five years",
    "Diabetics are struggling to access medication due to people using it for weight loss",
    "There is new evidence against Brian Walshe",
    "The video includes updates on accusations of Logan Paul scamming, threatening legal action and apologizing",
    "Logan Paul hires sketchy people"
  ],
  "bias": null,
  "tone": "Informative and concerned",
  "summary": "The video discusses updates on a new Logan Paul lawsuit, Alec Baldwin facing jail time, diabetics struggling to access medication due to misuse for weight loss, and new evidence against Brian Walshe. It also includes updates on accusations of Logan Paul scamming, threatening legal action and apologizing and hiring sketchy people",
  "trust": 6
}
```
