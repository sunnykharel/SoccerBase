#to run this code make sure to install the virtual environment: virtualenv
#then do source pythonenv/bin/activate
#to exit venv do the deactivate command to terminal
from flask import Flask, Response
from schema import *
import http.client
from os import environ
import requests
from pprint import pprint
import json
from mongoengine import *   
from flask_cors import CORS
import time

import pymongo
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

app.config['MONGODB_SETTINGS'] = [
    {
     "ALIAS": "default",
     "DB":    'business',
     "HOST": 'localhost',
     "PORT": 27017
    },
    {
     "ALIAS": "league",
     "DB": 'leaguedatabase',
     "HOST": 'localhost',
     "PORT": 27017
    }
]

API_FOOTBALL_KEY_1 = environ.get('API_FOOTBALL_KEY_1')

@app.route('/')
def index():
    return "hello world"

@app.route("/updateteams", methods=["GET"])
def update_teams():
    url = "https://api-football-v1.p.rapidapi.com/v2/teams/league/154"
    headers = {
         'x-rapidapi-host': "api-football-v1.p.rapidapi.com",
         'x-rapidapi-key': API_FOOTBALL_KEY_1
         }
    response = requests.request("GET", url, headers=headers).json()
    
    #league_objects = League.objects()
    
    for team_object in response['api']['teams']:
        team = Team(
            name = team_object['name'],
            logo = team_object['logo'],
            country = team_object['country'],
            founded = team_object['founded'],
            venue_name = team_object['venue_name'],
            venue_surface = team_object['venue_surface'],
            venue_city = team_object['venue_city'],
            venue_capacity = team_object['venue_capacity']
        ).save()
    return "team successfully saved"


@app.route("/updatecountries", methods=["GET"])
def update_countries():
    url = "https://api-football-v1.p.rapidapi.com/v2/countries"
    headers = {
        'x-rapidapi-host': "api-football-v1.p.rapidapi.com",
        'x-rapidapi-key': "c114e8403emsh6c4e6c8d45757cbp131072jsn941330efea5f"
        }
    response = requests.request("GET", url, headers=headers).json()

    for country_entry in response['api']['countries']:
        #country_db_instance = Country.objects(country=country_entry['country'])
        #print(len(country_db_instance) == 0)
        #if(  country_db_instance == None):
        country = Country(
            name = country_entry['country'],
            code = country_entry['code'],
            flag = country_entry['flag']
        ).save()
        

    return Response(json.dumps({}), status=200, mimetype="application/json")



@app.route("/updateleagues", methods=["GET"])
def update_leagues():
    url = "https://api-football-v1.p.rapidapi.com/v2/leagues/country/spain"
    headers = {
        'x-rapidapi-host': "api-football-v1.p.rapidapi.com",
        'x-rapidapi-key': "c114e8403emsh6c4e6c8d45757cbp131072jsn941330efea5f"
        }
    print('now updating leagues')
    response = requests.request("GET", url, headers=headers).json()

    #pprint(response)

    for league_entry in response['api']['leagues']:
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
            coverage = league_entry['coverage']
        ).save()

    return Response(json.dumps({}), status=200, mimetype="application/json")


@app.route("/test", methods=["GET"])
def test():

    client = MongoClient("mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false")
    
    #removing duplicate countries
    db = client.countrydatabase

    all_countries = db.country.find()

    for country in all_countries:
        duplicates = db.country.count({'name':country['name']})

        if(duplicates > 1):
            duplicate_entries = db.country.find({'name':country['name']})
            index = 0
            for duplicate_entry in duplicate_entries:
                if(index>0):
                    db.country.remove({'_id':duplicate_entry['_id']})
                index = index+1

    

    #removing duplicate leagues
    db = client.leaguedatabase

    all_leagues = db.league.find()

    for league in all_leagues:
        duplicates = db.league.count({'league_id':league['league_id']})

        if(duplicates > 1):
            duplicate_entries = db.league.find({'league_id':league['league_id']})
            index = 0
            for duplicate_entry in duplicate_entries:
                if(index>0):
                    db.league.remove({'league_id':league['league_id']})
                index = index+1


    #removing duplicate teams
    db = client.teamdatabase

    all_teams = db.team.find()

    for team in all_teams:
        duplicates = db.team.count({'team_id':team['team_id']})

        if(duplicates > 1):
            duplicate_entries = db.team.find({'team_id':team['team_id']})
            index = 0
            for duplicate_entry in duplicate_entries:
                if(index>0):
                    db.team.remove({'team_id':team['team_id']})
                index = index+1


    return "done"












@app.route("/updateall", methods=["GET"])
def update_all():

    client = MongoClient("mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false")
   
    country_db = client.countrydatabase
    league_db = client.leaguedatabase
    team_db = client.teamdatabase


    #api_key = "c114e8403emsh6c4e6c8d45757cbp131072jsn941330efea5f"
    api_key = "53ae476b3dmsh69a5085cd429f71p1b67d1jsn42625c81d012"

    #country api to get more attributes about a country
    country_url = "https://ajayakv-rest-countries-v1.p.rapidapi.com/rest/v1/all"

    country_headers = {
        "x-rapidapi-host": "ajayakv-rest-countries-v1.p.rapidapi.com",
        "x-rapidapi-key": api_key
    }

    country_response = requests.request("GET", country_url, headers=country_headers).json()

    #api endpoint to get all countries in soccer database
    url = "https://api-football-v1.p.rapidapi.com/v2/countries"
    headers = {
        'x-rapidapi-host': "api-football-v1.p.rapidapi.com",
        'x-rapidapi-key': api_key
        }
    response = requests.request("GET", url, headers=headers).json()

    for country_entry in response['api']['countries']:

        #country_db_instance = Country.objects(country=country_entry['country'])
        #print(len(country_db_instance) == 0)
        #if(  country_db_instance == None):
        
        # country = Country(
        #     name = country_entry['country'],
        #     code = country_entry['code'],
        #     flag = country_entry['flag']
        # ).save()

        

        _population = 0#IntField()
        _demonym = ''#StringField()
        _area = 0#IntField()
        _capital = ''#StringField()
        _region = ''#StringField()
        _subregion = ''#StringField()

        for country_entry_2 in country_response:
            if(country_entry_2['name'] == country_entry['country']):
                _region = country_entry_2['region']
                _population = country_entry_2['population']
                _demonym = country_entry_2['demonym']
                _area = country_entry_2['area']
                _capital = country_entry_2['capital']
                _subregion = country_entry_2['subregion']
        

        #get all leagues in 2019 in this country
        leaguesInCountry = "https://api-football-v1.p.rapidapi.com/v2/leagues/country/{}/2019".format(country_entry['country'])

        leaguesInCountryResponse = requests.request("GET", leaguesInCountry, headers=headers).json()

        num_countries = country_db.country.count({'name':country_entry['country']})
        if(num_countries == 0):
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

        #pprint(leaguesInCountryResponse)
        

        for league_entry in leaguesInCountryResponse['api']['leagues']:
          
            teamsInLeague = "https://api-football-v1.p.rapidapi.com/v2/teams/league/{}".format(league_entry['league_id'])

            teamsInLeagueResponse = requests.request("GET", teamsInLeague, headers=headers).json()

            num_leagues = league_db.league.count({'league_id':league_entry['league_id']})
            if(num_leagues == 0):
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
  

            for team_object in teamsInLeagueResponse['api']['teams']:    
                time.sleep(1)
                num_teams = team_db.team.count({'team_id':team_object['team_id']})
                if(num_teams == 0):
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
            

    return Response(json.dumps({}), status=200, mimetype="application/json")


if __name__ == "__main__":
    app.run()