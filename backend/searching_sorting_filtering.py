#to run this code make sure to install the virtual environment: virtualenv
#then do source pythonenv/bin/activate
#to exit venv do the deactivate command to terminal
from flask import Flask, Response, jsonify
from schema import *
from collect_data import *
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

@app.route('/updateall')
def route():
    return update_all()


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

    api_key_val = os.environ.get('API_FOOTBALL_KEY_1')

    newsClient = NewsApiClient(api_key=api_key_val)
    # q is search terms, category for category of news, language is english
    # if possible (foreign news may not be english)
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


if __name__ == "__main__":
    app.run()