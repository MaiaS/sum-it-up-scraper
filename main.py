from __future__ import unicode_literals
import youtube_dl
import requests 
# https://stackoverflow.com/questions/53659427/python-retrieve-automatic-captions-with-youtube-dl-and-transform-to-transcript/56482709#56482709
def captions_test02(url):
    ydl = youtube_dl.YoutubeDL({'writesubtitles': True, 'allsubtitles': True, 'writeautomaticsub': True})
    res = ydl.extract_info(url, download=False)
    if res['requested_subtitles'] and res['requested_subtitles']['en']:
        print('Grabbing vtt file from ' + res['requested_subtitles']['en']['url'])
        response = requests.get(res['requested_subtitles']['en']['url'], stream=True)
        f1 = open("testfile01.txt", "w")

        f1.write(response.text)
        f1.close()
        if len(res['subtitles']) > 0:
            print('manual captions')
        else:
            print('automatic_captions')
    else:
        print('Youtube Video does not have any english captions')

videoURL = "https://www.youtube.com/watch?v=LMj_g_K_fXQ"

if __name__ == '__main__':
    captions_test02(videoURL) 


# Output fed to chatGPT:
# {
# keyPoints: [
# "A new Logan Paul lawsuit has wild details",
# "Alec Baldwin may face jail time for five years",
# "Diabetics are struggling to access medication due to people using it for weight loss",
# "There is new evidence against Brian Walshe",
# "The video includes updates on accusations of Logan Paul scamming, threatening legal action and apologizing",
# "Logan Paul hires sketchy people"
# ],
# bias: null,
# tone: "Informative and concerned",
# summary: "The video discusses updates on a new Logan Paul lawsuit, Alec Baldwin facing jail time, diabetics struggling to access medication due to misuse for weight loss, and new evidence against Brian Walshe. It also includes updates on accusations of Logan Paul scamming, threatening legal action and apologizing and hiring sketchy people",
# trust: 6
# }