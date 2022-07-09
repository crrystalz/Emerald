import requests

def scrape(url, line, margin):
    url = url[:8] + 'raw.' + url[8:]
    url = url[:18] + 'usercontent' + url[18:]
    blobIndex = url.find('blob')
    url = url[:blobIndex] + '' + url[(blobIndex + 5):]

    lines = requests.get(url).text.splitlines()

    snippet = []
    for i in range((line-1)-margin, (line-1)+margin+1):
        snippet.append(lines[i])

    return snippet

print(scrape("https://github.com/crrystalz/Emerald/blob/main/.gitignore", 2, 1))
