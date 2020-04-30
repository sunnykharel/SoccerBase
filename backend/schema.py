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
    demonym = StringField()
    area = IntField()
    capital = StringField()
    region = StringField()
    subregion = StringField()
    num_leagues = IntField()
    
    meta = {
        "db_alias":"country" 
    }
    
    def json(self):
        country_dict = {
            "name": self.name,
            "code": self.code,
            "flag": self.flag,
            "population": self.population,
            "num_leagues": self.num_leagues,
            "demonym": self.demonym,
            "area": self.area,
            "capital":self.capital,
            "region": self.region,
            "subregion": self.subregion
        }
        return country_dict

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
    num_teams = IntField()

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
            "coverage" : self.coverage,
            "num_teams": self.num_teams
        }
        return league_dict

    meta = {
        "collection":"Leagues"
    }

class Team(Document):
    team_name = StringField(required=True)
    team_id = IntField()
    team_logo = StringField()
    is_national = BooleanField()
    league_id = IntField()
    league_name = StringField()
    league_logo = StringField()
    country = StringField()
    country_flag = StringField()
    founded = IntField()
    venue_name = StringField()
    venue_surface = StringField()
    venue_city = StringField()
    venue_capacity = IntField()
    
    def json(self):
        team_dict = {
            "team_name": self.team_name,
            "team_id": self.team_id,
            "team_logo": self.team_logo,
            "is_national" : self.is_national,
            "league_id" : self.league_id,
            "league_name" : self.league_name,
            "league_logo" : self.league_logo,
            "country" : self.country,
            "country_flag" : self.country_flag,
            "founded" : self.founded,
            "venue_name" : self.venue_name,
            "venue_surface" : self.venue_surface,
            "venue_city" : self.venue_city,
            "venue_capacity" : self.venue_capacity
        }
        return team_dict
    
    meta = {
        "collection":"Teams"
    }
    

class Tester(Document):
    name = StringField()
    meta = {
        "collection": "Test"
    }