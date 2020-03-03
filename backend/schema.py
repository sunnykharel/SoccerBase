from mongoengine import *


class LeagueSchema(Document):
    name = StringField(required=True)
    logo = StringField(required=True)
    country = StringField(required=True)
    season = StringFiled(required=True)
    coverage = DictField(required=True)

class CountrySchema(Document):
    name = StringFiled(required=True)

class TeamSchema(Document):
    name = StringField(required=True)
