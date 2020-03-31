from datetime import datetime
import os
import json
from mongoengine import *


connect(host='mongodb+srv://tbidnurkar:abcd1234@teams-igt1c.gcp.mongodb.net/SoccerBase?retryWrites=true&w=majority')
print('connect to the database')

class Country(Document):
    name = StringField(required=False)
    code = StringField(required=False)
    flag = StringField(required=False)
    population = IntField()
    leaguecount = IntField()
    
    def json(self):
        country_dict = {
            "name": self.name,
            "code": self.code,
            "flag": self.flag,
            "population": self.population,
            "leagecount": self.leaguecount
        }
        return country_dict
        #return json.dumps(country_dict)

    meta = {
            "collection":"Countries" 
        }
class League(Document):
    league_id = IntField(required=True)
    name = StringField(required=True)
    type_ = StringField()
    country = StringField(required=True)
    country_code = StringField()
    season = IntField(required=True)
    season_start = StringField()
    season_end = StringField()
    logo = StringField()
    flag = StringField()
    coverage = DictField()

    def json(self):
        league_dict = {
            "league_id" : self.league_id,
            "name" : self.name,
            "type" : self.type_,
            "country" : self.country,
            "country_code" : self.country_code,
            "season" : self.season,
            "season_start" : self.season_start,
            "season_end" : self.season_end,
            "logo" : self.logo,
            "flag" : self.flag,
            "coverage" : self.coverage
        }
        return league_dict
        #return json.dumps(league_dict)

    meta = {
        "collection":"Leagues"
    }
    
class Team(Document):
    name = StringField(required=True)
    logo = StringField()
    country = StringField()
    founded = IntField()
    venue_name = StringField()
    venue_surface = StringField()
    venue_city = StringField()
    venue_capacity = IntField()
    def json(self):
        team_dict = {
            "name": self.name,
            "logo": self.logo,
            "country": self.country,
            "founded": self.founded,
            "venue_name": self.venue_name,
            "venue_surface": self.venue_surface,
            "venue_city":self.venue_city,
            "venue_capacity":self.venue_capacity
        }
        return team_dict
        #return json.dumps(team_dict)
    meta = {
        "collection":"Teams"
    }
    

class Tester(Document):
    name = StringField()
    meta = {
        "collection": "Test"
    }