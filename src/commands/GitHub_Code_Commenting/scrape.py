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

    formattedSnippet = "```"
    # formattedSnippet += file_type + "\n"

    for line in snippet:
        formattedSnippet += line + '\n'
    
    formattedSnippet += "```"

    print(formattedSnippet)
    # [print(line) for line in snippet]


# input = str(sys.argv[1]).split(" ")
# input = input[0]

jsonstring = sys.argv[1]
# print(type(input))
# print(input)
input = json.loads(jsonstring)

url = input["file_link"]
line = input["line_number"]
margin = input["margin"]
# file_type = input["file_type"]

# print(input)

# print(url)
# print(line)
# print(margin)

scrape(url, line, margin)