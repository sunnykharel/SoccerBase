#to run this code make sure to install the virtual environment: virtualenv
#then do source pythonenv/bin/activate
#to exit venv do the deactivate command to terminal
from flask import Flask, Response, jsonify
from schema import *
import http.client
from os import environ
import requests
from pprint import pprint
import json
from mongoengine import *   
from flask_cors import CORS
import time
from newsapi.newsapi_client import NewsApiClient
from datetime import datetime, timedelta
from flask import request

import json
from functools import reduce
from mongoengine import Q
import math
from dotenv import load_dotenv
import os


app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return "hello world"


@app.route('/testconnectiontodb')
def testconnectiontodb():
    tester = Tester( name = 'test').save()
    return "success"

@app.route("/updateall", methods=["GET"])
def update_all():
    client = MongoClient("mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false")
    load_dotenv()
   
    api_key = os.environ.get('API_FOOTBALL_KEY_1')
    
    url = "https://api-football-v1.p.rapidapi.com/v2/countries"
    headers = {
        'x-rapidapi-host': "api-football-v1.p.rapidapi.com",
        'x-rapidapi-key': api_key
    }

    country_url = "https://ajayakv-rest-countries-v1.p.rapidapi.com/rest/v1/all"

    country_headers = {
        "x-rapidapi-host": "ajayakv-rest-countries-v1.p.rapidapi.com",
        "x-rapidapi-key": api_key
    }

    country_response = requests.request("GET", country_url, headers=country_headers).json()

    response = requests.request("GET", url, headers=headers).json()
    
    league_names = []
    country_names = []
    team_names = []
    
    for country_entry in response['api']['countries']:
        country_names.append(country_entry['country'])

        _population = 0
        _demonym = ''
        _area = 0
        _capital = ''
        _region = ''
        _subregion = ''

        for country_entry_2 in country_response:
            if(country_entry_2['name'] == country_entry['country']):
                _region = country_entry_2['region']
                _population = country_entry_2['population']
                _demonym = country_entry_2['demonym']
                _area = country_entry_2['area']
                _capital = country_entry_2['capital']
                _subregion = country_entry_2['subregion']
        
        country = Country(
            name = country_entry['country'],
            code = country_entry['code'],
            flag = country_entry['flag'],
            num_leagues = len(leaguesInCountryResponse['api']['leagues']),
            population = _population,
            demonym = _demonym,
            area = _area,
            capital = _capital,
            region = _region,
            subregion = _subregion
        ).save()
        

        #get all leagues in 2019 in this country
        leaguesInCountry = "https://api-football-v1.p.rapidapi.com/v2/leagues/country/{}/2019".format(country_entry['country'])

        leaguesInCountryResponse = requests.request("GET", leaguesInCountry, headers=headers).json()

        #pprint(leaguesInCountryResponse)

        for league_entry in leaguesInCountryResponse['api']['leagues']:
            league_names.append(league_entry['name'])

            league = League(
                league_id = league_entry['league_id'],
                name = league_entry['name'],
                type_ = league_entry['type'],
                country = league_entry['country'],
                country_code = league_entry['country_code'],
                season = league_entry['season'],
                season_start = league_entry['season_start'],
                season_end = league_entry['season_end'],
                logo = league_entry['logo'],
                flag = league_entry['flag'],
                coverage = league_entry['coverage'],
                num_teams = len(teamsInLeagueResponse['api']['teams'])
            ).save()
            
            #get all teams in this league for 2019 season
            teamsInLeague = "https://api-football-v1.p.rapidapi.com/v2/teams/league/{}".format(league_entry['league_id'])

            teamsInLeagueResponse = requests.request("GET", teamsInLeague, headers=headers).json()

            for team_object in teamsInLeagueResponse['api']['teams']:
                team_names.append(team_object['name'])
                team = Team(
                    team_name = team_object['name'],
                    team_id = team_object['team_id'],
                    team_logo = team_object['logo'],
                    is_national = team_object['is_national'],
                    league_id = league_entry['league_id'],
                    league_name = league_entry['name'],
                    league_logo = league_entry['logo'],
                    country = team_object['country'],
                    country_flag = country_entry['flag'],
                    founded = team_object['founded'],
                    venue_name = team_object['venue_name'],
                    venue_surface = team_object['venue_surface'],
                    venue_city = team_object['venue_city'],
                    venue_capacity = team_object['venue_capacity']
                ).save()

            time.sleep(3)

    return Response(json.dumps({}), status=200, mimetype="application/json")
    


if __name__ == "__main__":
    app.run()