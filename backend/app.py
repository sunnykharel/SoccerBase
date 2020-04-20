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
#from newsapi.newsapi_client import NewsApiClient
import datetime
from flask import request

import json
from functools import reduce
from mongoengine import Q
import math





app = Flask(__name__)
CORS(app)

'''
supported filters:
area: numeric
population: numeric
region: alphabetical
subregion: alphabetical 
num_leagues: numeric

example request ?area={'gt': 30}&sort={country: '-'}

Type this to test the request:
http://127.0.0.1:5000/country?area={"gt":5000}&sort={"region":"-"}



args = {}

'area' in args

area{
    "gt":5000,
    "lt":20000
}

area__gt = value


for key, value in dict.items():


**kwargs

filters = {
    'area__gt': 5000,
    'region_iexact': "Africa",

}



'''

@app.route('/country')
def country():
    #cpp is the number of countries to display on each page
    cpp = 12
    args = request.args
    print (args)
    supported_filters = ['area', 'population', 'region', 'subregion', 'num_leagues']
    supported_sorts = ['area', 'population', 'region', 'subregion', 'num_leagues', 'name']
    filters = {}
    
    
    for filter_name in supported_filters:
        if filter_name in args:
            for operation, value in json.loads(args[filter_name]).items():
                filters[ '{}__{}'.format(filter_name, operation) ] = value

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

    # order_bys = ['']
    # if 'sort' in args:
    #     print(args['sort'])
    #     sort_json = json.loads(args['sort'])
    #     sort_value = next(iter(sort_json))
    #     if sort_value in supported_sorts:

    #         direction = sort_json[sort_value]
    #         sort_string = '{}{}'.format(direction, sort_value)
    #         order_bys.append(sort_string)    

    query = Country.objects().filter(**filters).order_by(sort1, sort2, sort3)#.skip((cpp*int(args['page']))-cpp).limit(cpp)
    countries_list = [country.json() for country in query]

    countries_list_dict = {}
    countries_list_dict['countries_list'] = countries_list[cpp * int(args['page']) - cpp : cpp * int(args['page'])]
    countries_list_dict['num_entries'] = len(countries_list)
    countries_list_dict['num_pages'] = math.ceil(len(countries_list)/cpp)
    return json.dumps(countries_list_dict)

'''
supported filters:
    area: numeric
    population: numeric
    region: alphabetical
    subregion: alphabetical 
    num_leagues: numeric
'''

@app.route('/team')
def teams():
    #cpp is the number of countries to display on each page
    cpp = 12
    args = request.args
    print (args)
    supported_filters = ['founded', 'venue_capacity', 'is_national']
    filters = {}
    
    
    for filter_name in supported_filters:
        if filter_name in args:
            for operation, value in json.loads(args[filter_name]).items():
                filters[ '{}__{}'.format(filter_name, operation) ] = value

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


    query = Team.objects().filter(**filters).order_by(sort1, sort2, sort3)
    teams_list = [team.json() for team in query]

    teams_list_dict = {}
    teams_list_dict['teams_list'] = teams_list[cpp * int(args['page']) - cpp : cpp * int(args['page'])]
    teams_list_dict['num_entries'] = len(teams_list)
    teams_list_dict['num_pages'] = math.ceil(len(teams_list)/cpp)
    return json.dumps(teams_list_dict)



@app.route('/league')
def league():
    #cpp is the number of countries to display on each page
    cpp = 12
    args = request.args
    print (args)
    supported_filters = ['num_teams', 'league_id', 'name', 'country', 'league_id', 'type_', 'season', 'season_start', 'season_end']
    filters = {}
    
    
    for filter_name in supported_filters:
        if filter_name in args:
            for operation, value in json.loads(args[filter_name]).items():
                filters[ '{}__{}'.format(filter_name, operation) ] = value

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


    query = League.objects().filter(**filters).order_by(sort1, sort2, sort3)
    leagues_list = [league.json() for league in query]

    leagues_list_dict = {}
    leagues_list_dict['leagues_list'] = leagues_list[cpp * int(args['page']) - cpp : cpp * int(args['page'])]
    leagues_list_dict['num_entries'] = len(leagues_list)
    leagues_list_dict['num_pages'] = math.ceil(len(leagues_list)/cpp)
    return json.dumps(leagues_list_dict)




@app.route('/')
def index():
    return "hello world"

@app.route('/yahh')
def yahh():
    docs = [Team, League, Country]
    teams_list = [team.json() for team in docs[1].objects()]
    teams_list_dict = {}
    teams_list_dict['teams_list'] = teams_list
    return json.dumps(teams_list_dict)


@app.route('/testconnectiontodb')
def testconnectiontodb():
    tester = Tester( name = 'test').save()
    return "success"

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

@app.route("/getallteams", methods=["GET"])
def get_all_teams():
    teams_list = [team.json() for team in Team.objects()]
    teams_list_dict = {}
    teams_list_dict['teams_list'] = teams_list
    return json.dumps(teams_list_dict)

@app.route("/getallleagues", methods=["GET"])
def get_all_leagues():
    leagues_list = [league.json() for league in League.objects()]
    #print(teams_list)
    leagues_list_dict = {}
    leagues_list_dict['leagues_list'] = leagues_list
    return (leagues_list_dict)

@app.route("/getallcountries", methods=["GET"])
def get_all_countries():
    countries_list = [country.json() for country in Country.objects()]
    #print(teams_list)
    countries_list_dict = {}
    countries_list_dict['countries_list'] = countries_list
    return (countries_list_dict)


    


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

@app.route("/getnews/<topic>", methods=["GET"])
def get_news(topic):

    newsClient = NewsApiClient(api_key="bad068d6ce6c4ccfb30eb5785c360efe")
    #                                              q is search terms, category for category of news, language is english
    #                                              if possible (foreign news may not be english)
    topHeadlines = newsClient.get_top_headlines(q = topic, category="sports", language="en")

    articles = topHeadlines['articles'][:3]
    return json.dumps(articles)
    
    """
    news = News(
    topic_name = topic,
    headline_1 = articles[0]['title'],
    description_1 = articles[0]['description'],
    img_url_1 = articles[0]['urlToImage'],
    url_1 = articles[0]['url'],
    headline_2 = articles[1]['title'],
    description_2 = articles[1]['description'],
    img_url_2 = articles[1]['urlToImage'],
    url_2 = articles[1]['url'],
    headline_3 = articles[2]['title'],
    description_3 = articles[2]['description'],
    img_url_3 = articles[2]['urlToImage'],
    url_3 = articles[2]['url']
    ).json()
    return news
    """



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


#not going to use unless we plan to populate database with news, unlikely.
#DO NOT USE METHOD W/O READING8
@app.route("/updatenews", methods=["GET"])
def update_news():
    newsClient = NewsApiClient(api_key="bad068d6ce6c4ccfb30eb5785c360efe")
    url = "https://api-football-v1.p.rapidapi.com/v2/leagues/country/spain"
    headers = {
        'x-rapidapi-host': "api-football-v1.p.rapidapi.com",
        'x-rapidapi-key': "c114e8403emsh6c4e6c8d45757cbp131072jsn941330efea5f"
        }
    print('now updating leagues')
    response = requests.request("GET", url, headers=headers).json()

    league_names = []
    country_names = []
    team_names = []
    for league_entry in response['api']['leagues']:
        league_names.append(league_entry['name'])
    for country_entry in response['api']['leagues']:
        country_names.append(country_entry['country'])
    for team_entry in response['api']['teams']:
        team_names.append(team_entry['name'])
    for i in range(len(league_names)):
        topLeagueHeadlines = newsClient.get_top_headlines(q = league_names[i], category="sports", language="en")
        articles = topLeagueHeadlines['articles'][:3]
        news = News(
            topic_name = league_names[i],
            headline_1 = articles[0]['title'],
            description_1 = articles[0]['description'],
            img_url_1 = articles[0]['urlToImage'],
            url_1 = articles[0]['url'],

            headline_2 = articles[1]['title'],
            description_2 = articles[1]['description'],
            img_url_2 = articles[1]['urlToImage'],
            url_2 = articles[1]['url'],

            headline_3 = articles[2]['title'],
            description_3 = articles[2]['description'],
            img_url_3 = articles[2]['urlToImage'],
            url_3 = articles[2]['url']
        ).save()
    for i in range(len(country_names)):
        topCountryHeadlines = newsClient.get_top_headlines(q = country_names[i] + " soccer", category="sports", language="en")
        articles = topCountryHeadlines['articles'][:3]
        news = News(
            topic_name = country_names[i],
            headline_1 = articles[0]['title'],
            description_1 = articles[0]['description'],
            img_url_1 = articles[0]['urlToImage'],
            url_1 = articles[0]['url'],

            headline_2 = articles[1]['title'],
            description_2 = articles[1]['description'],
            img_url_2 = articles[1]['urlToImage'],
            url_2 = articles[1]['url'],

            headline_3 = articles[2]['title'],
            description_3 = articles[2]['description'],
            img_url_3 = articles[2]['urlToImage'],
            url_3 = articles[2]['url']
        ).save()
        for i in range(len(team_names)):
            topTeamHeadlines = newsClient.get_top_headlines(q = team_names[i], category="sports", language="en")
            articles = topTeamHeadlines['articles'][:3]
            news = News(
                topic_name = team_names[i],
                headline_1 = articles[0]['title'],
                description_1 = articles[0]['description'],
                img_url_1 = articles[0]['urlToImage'],
                url_1 = articles[0]['url'],

                headline_2 = articles[1]['title'],
                description_2 = articles[1]['description'],
                img_url_2 = articles[1]['urlToImage'],
                url_2 = articles[1]['url'],

                headline_3 = articles[2]['title'],
                description_3 = articles[2]['description'],
                img_url_3 = articles[2]['urlToImage'],
                url_3 = articles[2]['url']
            ).save()

        return Response(json.dumps({}), status=200, mimetype="application/json")

    



@app.route("/updateall", methods=["GET"])
def update_all():
    newsClient = NewsApiClient(api_key="bad068d6ce6c4ccfb30eb5785c360efe")
    url = "https://api-football-v1.p.rapidapi.com/v2/countries"
    headers = {
        'x-rapidapi-host': "api-football-v1.p.rapidapi.com",
        'x-rapidapi-key': "c114e8403emsh6c4e6c8d45757cbp131072jsn941330efea5f"
        }
    response = requests.request("GET", url, headers=headers).json()
    league_names = []
    country_names = []
    team_names = []
    for country_entry in response['api']['countries']:
        #country_db_instance = Country.objects(country=country_entry['country'])
        #print(len(country_db_instance) == 0)
        #if(  country_db_instance == None):

        country_names.append(country_entry['country'])
        
        """
        country = Country(
            name = country_entry['country'],
            code = country_entry['code'],
            flag = country_entry['flag']
        ).save()
        """

        #get all leagues in 2019 in this country
        leaguesInCountry = "https://api-football-v1.p.rapidapi.com/v2/leagues/country/{}/2019".format(country_entry['country'])

        leaguesInCountryResponse = requests.request("GET", leaguesInCountry, headers=headers).json()

        #pprint(leaguesInCountryResponse)

        for league_entry in leaguesInCountryResponse['api']['leagues']:
            league_names.append(league_entry['name'])
            """
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
            """

            teamsInLeague = "https://api-football-v1.p.rapidapi.com/v2/teams/league/{}".format(league_entry['league_id'])

            teamsInLeagueResponse = requests.request("GET", teamsInLeague, headers=headers).json()

            for team_object in teamsInLeagueResponse['api']['teams']:
                team_names.append(team_object['name'])
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

            time.sleep(3)
    for i in range(len(league_names)):
        topLeagueHeadlines = newsClient.get_top_headlines(q = league_names[i], category="sports", language="en")
        articles = topLeagueHeadlines['articles'][:3]
        news = News(
            topic_name = league_names[i],
            headline_1 = articles[0]['title'],
            description_1 = articles[0]['description'],
            img_url_1 = articles[0]['urlToImage'],
            url_1 = articles[0]['url'],

            headline_2 = articles[1]['title'],
            description_2 = articles[1]['description'],
            img_url_2 = articles[1]['urlToImage'],
            url_2 = articles[1]['url'],

            headline_3 = articles[2]['title'],
            description_3 = articles[2]['description'],
            ima9og_url_3 = articles[2]['urlToImage'],
            url_3 = articles[2]['url']
        ).save()
    for i in range(len(country_names)):
        topCountryHeadlines = newsClient.get_top_headlines(q = country_names[i] + " soccer", category="sports", language="en")
        articles = topCountryHeadlines['articles'][:3]
        news = News(
            topic_name = country_names[i],
            headline_1 = articles[0]['title'],
            description_1 = articles[0]['description'],
            img_url_1 = articles[0]['urlToImage'],
            url_1 = articles[0]['url'],

            headline_2 = articles[1]['title'],
            description_2 = articles[1]['description'],
            img_url_2 = articles[1]['urlToImage'],
            url_2 = articles[1]['url'],

            headline_3 = articles[2]['title'],
            description_3 = articles[2]['description'],
            img_url_3 = articles[2]['urlToImage'],
            url_3 = articles[2]['url']
        ).save()
        for i in range(len(team_names)):
            topTeamHeadlines = newsClient.get_top_headlines(q = team_names[i], category="sports", language="en")
            articles = topTeamHeadlines['articles'][:3]
            news = News(
                topic_name = team_names[i],
                headline_1 = articles[0]['title'],
                description_1 = articles[0]['description'],
                img_url_1 = articles[0]['urlToImage'],
                url_1 = articles[0]['url'],

                headline_2 = articles[1]['title'],
                description_2 = articles[1]['description'],
                img_url_2 = articles[1]['urlToImage'],
                url_2 = articles[1]['url'],

                headline_3 = articles[2]['title'],
                description_3 = articles[2]['description'],
                img_url_3 = articles[2]['urlToImage'],
                url_3 = articles[2]['url']
            ).save()

    return Response(json.dumps({}), status=200, mimetype="application/json")
    


if __name__ == "__main__":
    app.run()