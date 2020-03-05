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
    name = StringField(required=True)
    meta = {
        "db_alias":"country" 
    }

class League(Document):
    name = StringField(required=True)
    logo = StringField(required=True)
    country = StringField(required=True)
    season = StringField(required=True)

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
