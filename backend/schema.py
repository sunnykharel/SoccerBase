from datetime import datetime
import os
import json
from app import db

class Country(db.Document):
    name = db.StringField(required=False)
    code = db.StringField(required=False)
    flag = db.StringField(required=False)
    population = db.IntField()
    leaguecount = db.IntField()
    
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
class League(db.Document):
    league_id = db.IntField(required=True)
    name = db.StringField(required=True)
    type_ = db.StringField()
    country = db.StringField(required=True)
    country_code = db.StringField()
    season = db.IntField(required=True)
    season_start = db.StringField()
    season_end = db.StringField()
    logo = db.StringField()
    flag = db.StringField()
    coverage = db.DictField()

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
    
class Team(db.Document):
    name = db.StringField(required=True)
    logo = db.StringField()
    country = db.StringField()
    founded = db.IntField()
    venue_name = db.StringField()
    venue_surface = db.StringField()
    venue_city = db.StringField()
    venue_capacity = db.IntField()
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
    

class Tester(db.Document):
    name = db.StringField()
    meta = {
        "collection": "Test"
    }