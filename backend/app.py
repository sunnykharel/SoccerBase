#to run this code make sure to install the virtual environment: virtualenv
#then do source pythonenv/bin/activate
#to exit venv do the deactivate command to terminal


from flask import Flask
from schema import *
import http.client
from os import environ
import requests
from pprint import pprint
import json
from mongoengine import *

app = Flask(__name__)

API_FOOTBALL_KEY_1 = environ.get('API_FOOTBALL_KEY_1')


@app.route('/')
def index():
    return "hello world"

@app.route("/updateteams", methods=["GET"])
def update_teams():
    # url = "https://api-football-v1.p.rapidapi.com/v2/leagues/country/estonia/2020"
    # headers = {
    #     'x-rapidapi-host': "api-football-v1.p.rapidapi.com",
    #     'x-rapidapi-key': API_FOOTBALL_KEY_1
    #     }
    # response = requests.request("GET", url, headers=headers).json()
    return "Hello there"

@app.route("/updatecountries", methods=["GET"])
def update_countries():
    return "hello there"

@app.route("/updateleagues", methods=["GET"])
def update_leagues():

    # url = "https://api-football-v1.p.rapidapi.com/v2/leagues/2020"
    # headers = {
    #     'x-rapidapi-host': "api-football-v1.p.rapidapi.com",
    #     'x-rapidapi-key': API_FOOTBALL_KEY_1
    #     }
    # response = requests.request("GET", url, headers=headers).json()
    league = League(
        name ="sample league",
        logo = "logo.png",
        country = "sample country",
        season = "sample year",
    )
    print("made a league")
    print(type(league))
    league.save()
    print("saved the league")
    return "Hello there"



if __name__ == "__main__":
    app.run(debug=True)