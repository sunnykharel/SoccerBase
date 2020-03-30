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



# connect(db="countrydatabase", alias = 'country')
# connect(db="leaguedatabase", alias = 'default')
#connect(db="Country", alias = 'default')


#connect(db='SoccerBase', host="mongodb://tbidnurkar:abcd1234@teams-igt1c.gcp.mongodb.net/test?retryWrites=true&w=majority")

# connect(
#     db='SoccerBase',
#     username='tbidnurkar',
#     password='abcd1234',
#     host='mongodb://tbidnurkar:abcd1234@teams-igt1c.gcp.mongodb.net/test?retryWrites=true&w=majority'
# )

print("connected to the database")

class Country(Document):
    name = StringField(required=False)
    code = StringField(required=False)
    flag = StringField(required=False)
    population = IntField()
    leaguecount = IntField()
    # meta = {
    #     "db_alias":"Country" 
    # }

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

    # meta = {
    #     "indexes": ["name", "country"],
    #     "ordering": ["name"],
    #     "db_alias":"default"
    # }
    
class Team(Document):
    name = StringField(required=True)
    logo = StringField()
    country = StringField()
    founded = IntField()
    venue_name = StringField()
    venue_surface = StringField()
    venue_city = StringField()
    venue_capacity = IntField()
    # meta = {
    #     "db_alias":"Team"
    # }