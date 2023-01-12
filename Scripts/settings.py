import json
from os import path

def readSettings():
    basepath = path.dirname(__file__)
    filepath = path.abspath(path.join(basepath, "..", "settings.json"))
    f = open(filepath, "r")
    data= json.load(f)
    return(data)

def saveSettings(obj):
    basepath = path.dirname(__file__)
    filepath = path.abspath(path.join(basepath, "..", "settings.json"))
    f = open(filepath, "r")
    data = json.load(f)
    if obj.metric is not None:
        data['metric']=obj.metric
    # Serializing json
    json_object = json.dumps(data, indent=4)
    # Writing to sample.json
    with open(filepath, "w") as outfile:
        outfile.write(json_object)
    print(obj.metric)