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

#country endpoint - includes searching, sorting, and filtering
@app.route('/country')
def country():
    #cpp is the number of countries to display on each page
    cpp = 12
    args = request.args
    #print(args)
    query = Country.objects()
    search_subqueries = Q()
    if 'search_parameters' in args:
        search_parameters = args['search_parameters'].split(' ')
        print(search_parameters)
        for word in search_parameters:
            search_subqueries = search_subqueries | (
                Q(name__icontains=word)| 
                Q(code__icontains=word) | 
                Q(flag__icontains=word) | 
                Q(demonym__icontains=word) | 
                Q(capital__icontains=word) | 
                Q(region__icontains=word) |  
                Q(subregion__icontains=word)
            )

        print(search_subqueries)
        query = Country.objects(search_subqueries)
   
    supported_filters = ['area', 'population', 'region', 'subregion', 'num_leagues', 'name']
    filters = {}
    for filter_name in supported_filters:
        if filter_name in args:
            for operation, value in json.loads(args[filter_name]).items():
                filters[ '{}__{}'.format(filter_name, operation) ] = value
    
    query = query.filter(**filters)
    
    #now to sort the query
    sort1 = ''
    sort2 = ''
    sort3 = ''  
    if 'sort1' in args:
        sort1 = args['sort1']
    if 'sort2' in args:
        sort2 = args['sort2']
    if 'sort3' in args:
        sort3 = args['sort3']
    query = query.order_by(sort1, sort2, sort3)
    
    first = 0
    last = len(query)
    if 'page' in args:
        first = cpp * int(args['page']) - cpp 
        last = cpp * int(args['page'])


    countries_list = [country.json() for country in query[first : last]]
    countries_list_dict = {}
    countries_list_dict['countries_list'] = countries_list
    countries_list_dict['num_entries'] = len(query)
    countries_list_dict['num_pages'] = math.ceil(len(query)/cpp)
    return json.dumps(countries_list_dict)

#team endpoint - includes searching, sorting, and filtering
@app.route('/team')
def teams():
    #cpp is the number of teams to display on each page
    cpp = 12
    args = request.args
    supported_filters = ['founded', 'venue_capacity', 'is_national', 'team_name', 'league_name', 'league_id', 'country', 'venue_name', 'venue_surface', 'venue_city']
    filters = {}
    query = Team.objects()

    search_subqueries = Q()
    if 'search_parameters' in args:
        search_parameters = args['search_parameters'].split(' ')
        print(search_parameters)
        for word in search_parameters:
            search_subqueries = search_subqueries | (        
                Q(team_name__icontains=word) | 
                Q(team_logo__icontains=word) | 
                Q(league_name__icontains=word) | 
                Q(league_logo__icontains=word) | 
                Q(country__icontains=word) | 
                Q(country_flag__icontains=word) |  
                Q(venue_name__icontains=word) |  
                Q(venue_surface__icontains=word) |  
                Q(venue_city__icontains=word)  
            )  
        query = Team.objects(search_subqueries) 
    
    for filter_name in supported_filters:
        if filter_name in args:
            for operation, value in json.loads(args[filter_name]).items():
                filters[ '{}__{}'.format(filter_name, operation) ] = value
    print(filters)
    
    query = query.filter(**filters)    
    sort1 = ''
    sort2 = ''
    sort3 = ''  
    if 'sort1' in args:
        sort1 = args['sort1']
    if 'sort2' in args:
        sort2 = args['sort2']
    if 'sort3' in args:
        sort3 = args['sort3']

    first = 0
    last = len(query)
    if 'page' in args:
        first = cpp * int(args['page']) - cpp 
        last = cpp * int(args['page'])


    query = query.order_by(sort1, sort2, sort3)
    teams_list = [team.json() for team in query[first: last]]
    teams_list_dict = {}
    teams_list_dict['teams_list'] = teams_list
    teams_list_dict['num_entries'] = len(query)
    teams_list_dict['num_pages'] = math.ceil(len(query)/cpp)
    return json.dumps(teams_list_dict)

#league endpoint - includes searching, sorting, and filtering
@app.route('/league')
def league():
    #cpp is the number of leagues to display on each page
    cpp = 12
    args = request.args
    supported_filters = ['num_teams', 'league_id', 'name', 'country', 'league_id', 'type_', 'season', 'season_start', 'season_end']
    filters = {}
    query = League.objects()

    search_subqueries = Q()
    if 'search_parameters' in args:
        search_parameters = args['search_parameters'].split(' ')
        print(search_parameters)
        for word in search_parameters:
            search_subqueries = search_subqueries | (        
                Q(name__icontains=word) | 
                Q(type___icontains=word) | 
                Q(country__icontains=word) | 
                Q(country_code__icontains=word) | 
                Q(season_start__icontains=word) | 
                Q(season_end__icontains=word) |  
                Q(logo__icontains=word) |  
                Q(flag__icontains=word)  
            )  
        query = League.objects(search_subqueries) 
    
    for filter_name in supported_filters:
        if filter_name in args:
            for operation, value in json.loads(args[filter_name]).items():
                filters[ '{}__{}'.format(filter_name, operation) ] = value
    
    #print(filters)
    
    query = query.filter(**filters)    
    sort1 = ''
    sort2 = ''
    sort3 = ''  
    if 'sort1' in args:
        sort1 = args['sort1']
    if 'sort2' in args:
        sort2 = args['sort2']
    if 'sort3' in args:
        sort3 = args['sort3']


    first = 0
    last = len(query)
    if 'page' in args:
        first = cpp * int(args['page']) - cpp 
        last = cpp * int(args['page'])


    query = query.order_by(sort1, sort2, sort3)
    teams_list = [league.json() for league in query[ first : last]]
    teams_list_dict = {}
    teams_list_dict['leagues_list'] = teams_list
    teams_list_dict['num_entries'] = len(query)
    teams_list_dict['num_pages'] = math.ceil(len(query)/cpp)
    return json.dumps(teams_list_dict)


@app.route("/getnews/<topic>", methods=["GET"])
def get_news(topic):

    newsClient = NewsApiClient(api_key="bad068d6ce6c4ccfb30eb5785c360efe")
    #                                              q is search terms, category for category of news, language is english
    #                                              if possible (foreign news may not be english)
    keyWords = topic + " soccer"
    sportsSources = newsClient.get_sources(category="sports")
    sourceIds = ''
    for i in range(len(sportsSources['sources'])):
        if (i == len(sportsSources['sources']) - 1):
            sourceIds = sourceIds = sourceIds + sportsSources['sources'][i]['id']
        else:
            sourceIds = sourceIds + sportsSources['sources'][i]['id'] + ","
    threeDaysAgo = datetime.date(datetime.now()) - timedelta(3) #date 3 days ago
    topHeadlines = newsClient.get_everything(q=keyWords, sources=sourceIds, language='en', sort_by='relevancy', from_param=threeDaysAgo)
    articles = topHeadlines['articles'][:3]
    return json.dumps(articles)

@app.route('/testing/')
def testing():
    load_dotenv()
    return os.environ.get('API_FOOTBALL_KEY_1')


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