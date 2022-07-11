import sys
import requests
import json


def scrape(url, line, margin):
    url = url[:8] + 'raw.' + url[8:]
    url = url[:18] + 'usercontent' + url[18:]
    blobIndex = url.find('blob')
    url = url[:blobIndex] + '' + url[(blobIndex + 5):]

    lines = requests.get(url).text.splitlines()

    snippet = []
    for i in range((line-1)-margin, (line-1)+margin+1):
        snippet.append(lines[i])

    print(snippet)


# input = str(sys.argv[1]).split(" ")
# input = input[0]

print(dict(sys.argv[1]))
input = json.load(sys.argv[1])

url = input["file_link"]
line = input["line_number"]
margin = input["margin"]

print(input)
print(url)
print(line)
print(margin)

scrape(url, line, margin)