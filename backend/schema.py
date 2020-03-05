from mongoengine import *
from datetime import datetime
import os
import json

# 
# Here you insert the connection.
# you can insert multiple connections, 
# so that we can have many connections per each database.
# you specify the name of the specific database you want a 
# document object to connecet to in the "meta" parameter of the object

# 



connect("coutrydatabase", alias = 'country')
connect("leaguedatabase", alias = 'league')
connect("teamdatabase", alias = 'team')

print("connected to the database")

class Country(Document):
    name = StringField(unique=True, required=True)
    code = StringField(required=True)
    flag = StringField(required=True)
    population = IntField()
    leaguecount = IntField()
    meta = {
        "db_alias":"country" 
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
            "name": self.name,
            "logo": self.logo,
            "country": self.country,
            "season": self.season,
        }
        return json.dumps(league_dict)

    meta = {
        "indexes": ["name", "country"],
        "ordering": ["name"],
        "db_alias":"league"
    }
    
class Team(Document):
    name = StringField(required=True)
    meta = {
        "db_alias":"team"
    }
