from flask import Flask
import http.client
from os import environ
import requests
from pprint import pprint
import json

app = Flask(__name__)
API_FOOTBALL_KEY_1 = environ.get('API_FOOTBALL_KEY_1')


@app.route('/')
def index():
    return "hello world"

@app.route("/updateteams", methods=["GET"])
def update_teams():
    url = "https://api-football-v1.p.rapidapi.com/v2/leagues/country/estonia/2020"

    headers = {
        'x-rapidapi-host': "api-football-v1.p.rapidapi.com",
        'x-rapidapi-key': API_FOOTBALL_KEY_1
        }

    response = requests.request("GET", url, headers=headers).json()

    return "Hello there"

    # conn = http.client.HTTPSConnection("api-football-v1.p.rapidapi.com")
    # headers = {
    #     'x-rapidapi-host': "api-football-v1.p.rapidapi.com",
    #     'x-rapidapi-key': "53ae476b3dmsh69a5085cd429f71p1b67d1jsn42625c81d012"
    #     }
    # response = conn.request("GET", "/v2/leagues/country/estonia/2020", headers=headers)
    # print(type(response))   
    # for i in (response['api']['leagues']):
    #     print (i['name'], i['country'])
    # return "Hello world!"
    # print(API_FOOTBALL_KEY_1)
    # return "Hello world!"

if __name__ == "__main__":
    app.run(debug=True)