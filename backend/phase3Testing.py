import unittest
from app import *
from flask import Flask
import json

#from flask_pytest_example.handlers.routes import configure_routes

class TestBackendAPIPhase3(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()


    #testing countries----------------------------------------------------------------------------------------------------------
    def test_countries_200(self):
        rv = self.app.get('/country?page=1')
        self.assertEqual(rv.status, '200 OK')


    def test_countries_page_1(self):
        rv = self.app.get('/country?page=1')
        list = rv.json
        self.assertEqual(len(list.get('countries_list')), 12)

    def test_countries_page_4(self):
        rv = self.app.get('/country?page=4')
        list = rv.json
        self.assertEqual(len(list.get('countries_list')), 12)

    def test_countries_page_10(self):
        rv = self.app.get('/country?page=10')
        list = rv.json
        self.assertEqual(len(list.get('countries_list')), 12)

    def test_countries_numpages(self):
        rv = self.app.get('/country?page=1')
        list = rv.json
        self.assertEqual((list.get('num_pages')), 11)

    def test_countries_sort1plus(self):
        rv = self.app.get('/country?page=1&sort1=name')
        list = rv.json
        self.assertEqual(list['countries_list'][0]['name'],"Albania")

    def test_countries_sort1minus(self):
        rv = self.app.get('/country?page=1&sort1=-name')
        list = rv.json
        self.assertEqual(list['countries_list'][0]['name'],"Zimbabwe")

    def test_countries_sort2plus(self):
        rv = self.app.get('/country?page=1&sort1=-area&sort2=name')
        list = rv.json
        self.assertEqual(list['countries_list'][0]['name'],"World")

    def test_countries_sort2minus(self):
        rv = self.app.get('/country?page=1&sort1=-population&sort2=-area')
        list = rv.json
        self.assertEqual(list['countries_list'][0]['name'],"China")

    def test_countries_sort3plus(self):
        rv = self.app.get('/country?page=1&sort1=-population&sort2=name&sort3=num_leagues')
        list = rv.json
        self.assertEqual(list['countries_list'][0]['name'],"China")

    def test_countries_filter1(self):
        rv = self.app.get('/country?page=1&sort1=-area&sort2=name&area={"gt":5000}')
        list = rv.json
        self.assertEqual(list['countries_list'][1]['name'],"Russia")

    def test_countries_filter2(self):
        rv = self.app.get('/country?page=1&sort1=-area&sort2=name&population={"gt":100000000}')
        list = rv.json
        self.assertEqual(list['countries_list'][1]['name'],"USA")

    def test_countries_filter3(self):
        rv = self.app.get('/country?page=1&sort1=-area&sort2=name&population={"gt":100000000}&area={"gt":5000000}')
        list = rv.json
        self.assertEqual(list['countries_list'][1]['name'],"USA")

    def test_countries_filter4(self):
        rv = self.app.get('/country?page=1&sort1=-area&sort2=name&population={"gt":100000000}&area={"gt":0}')
        list = rv.json
        self.assertEqual(list['countries_list'][1]['name'],"USA")

    def test_countries_search1(self):
        rv = self.app.get('/country?page=1&sort1=-area&sort2=name&population={"gt":100000000}&area={"gt":0}&search_parameters=nothing returned')
        list = rv.json
        self.assertEqual(list['num_entries'], 0)

    def test_countries_search2(self):
        rv = self.app.get('/country?page=1&sort1=-area&sort2=name&population={"gt":100000000}&area={"gt":0}&search_parameters=nothing returned')
        list = rv.json
        self.assertEqual(list['num_pages'], 0)


    #testing leagues-----------------------------------------------------------------------------------------------------------
    def test_leagues_pages1(self):
        rv = self.app.get('/league?page=1')
        list = rv.json
        self.assertEqual(list['num_entries'], 420)

    def test_leagues_pages2(self):
        rv = self.app.get('/league?page=1')
        list = rv.json
        self.assertEqual(list['num_pages'], 35)

    def test_leagues_page1(self):
        rv = self.app.get('/league?page=1')
        list = rv.json
        self.assertEqual(list['leagues_list'][0]['name'], 'Primera D')

    def test_leagues_sort1(self):
        rv = self.app.get('/league?page=1&sort1=name')
        list = rv.json
        self.assertEqual(list['leagues_list'][0]['name'], '1 Lyga')

    def test_leagues_sort2(self):
        rv = self.app.get('/league?page=1&sort1=-name')
        list = rv.json
        self.assertEqual(list['leagues_list'][0]['name'], 'Youth Championship')

    def test_leagues_sort3(self):
        rv = self.app.get('/league?page=1&sort1=country&sort2=-name')
        list = rv.json
        self.assertEqual(list['leagues_list'][0]['name'], 'Superliga')

    def test_leagues_sort4(self):
        rv = self.app.get('/league?page=1&sort1=-country&sort2=+name')
        list = rv.json
        self.assertEqual(list['leagues_list'][0]['name'], 'CAF Champions League')

    def test_leagues_sort5(self):
        rv = self.app.get('/league?page=1&sort1=-num_leagues&sort2=+name&sort3=country')
        list = rv.json
        self.assertEqual(list['leagues_list'][0]['name'], 'Superliga')

    def test_leagues_sort6(self):
        rv = self.app.get('/league?page=1&sort1=+num_leagues&sort2=-name&sort3=-country')
        list = rv.json
        self.assertEqual(list['leagues_list'][0]['name'], 'Youth Championship')

    def test_leagues_filter1(self):
        rv = self.app.get('/league?page=1&sort1=country&num_teams={"gt":80}')
        list = rv.json
        self.assertEqual(list['leagues_list'][0]['name'], 'Copa Argentina')

    def test_leagues_filter2(self):
        rv = self.app.get('/league?page=1&sort1=country&country={"iexact":"China"}')
        list = rv.json
        self.assertEqual(list['leagues_list'][0]['name'], 'Super League')

    def test_leagues_filter3(self):
        rv = self.app.get('/league?page=1&sort1=league_id&sort2=-name&country={"iexact":"Nigeria"}')
        list = rv.json
        self.assertEqual(list['leagues_list'][0]['name'], 'NPFL')

    def test_leagues_search1(self):
        rv = self.app.get('/league?page=1&sort1=league_id&sort2=-name&search_parameters=jkwnekj nqw&y3y')
        list = rv.json
        self.assertEqual(list['num_pages'], 0)


    #testing teams--------------------------------------------------------------------------------------------------------
    def test_teams_page1(self):
        rv = self.app.get('/team?page=1')
        list = rv.json
        self.assertEqual(list['num_entries'], 5209)

    def test_teams_page2(self):
        rv = self.app.get('/team?page=1')
        list = rv.json
        self.assertEqual(list['num_pages'], 435)

    def test_teams_page3(self):
        rv = self.app.get('/team?page=1')
        list = rv.json
        self.assertEqual(list['teams_list'][0]['team_name'], 'Egnatia Rrogozhinë')

    def test_teams_sort1(self):
        rv = self.app.get('/team?page=1&sort1=team_name')
        list = rv.json
        self.assertEqual(list['teams_list'][0]['team_name'], '1 de Marzo Fernando Mora')

    def test_teams_sort2(self):
        rv = self.app.get('/team?page=1&sort1=-team_name')
        list = rv.json
        self.assertEqual(list['teams_list'][0]['team_name'], 'Șoimii Lipova')

    def test_teams_sort3(self):
        rv = self.app.get('/team?page=1&sort1=-country&sort2=team_name')
        list = rv.json
        self.assertEqual(list['teams_list'][0]['team_name'], 'Harare City')

    def test_teams_sort4(self):
        rv = self.app.get('/team?page=1&sort1=venue_city&sort2=team_name&sort2=-country')
        list = rv.json
        self.assertEqual(list['teams_list'][0]['team_name'], '1 de Marzo Fernando Mora')

    def test_teams_sort5(self):
        rv = self.app.get('/team?page=1&sort1=-venue_name&sort2=-team_name&sort2=country')
        list = rv.json
        self.assertEqual(list['teams_list'][0]['team_name'], 'MOIK')

    def test_teams_filter1(self):
        rv = self.app.get('/team?page=1&sort1=-venue_name&sort2=-team_name&country={"iexact":"Mexico"}')
        list = rv.json
        self.assertEqual(list['teams_list'][0]['team_name'], 'Necaxa')

    def test_teams_filter2(self):
        rv = self.app.get('/team?page=1&sort1=venue_city&country={"iexact":"France"}')
        list = rv.json
        self.assertEqual(list['teams_list'][0]['team_name'], 'Stade de Reims W')

    def test_teams_filter3(self):
        rv = self.app.get('/team?page=1&sort1=venue_capacity&country={"iexact":"Germany"}&venue_capacity={"gt":60000}')
        list = rv.json
        self.assertEqual(list['teams_list'][0]['team_name'], 'VfB Stuttgart')

    def test_teams_filter4(self):
        rv = self.app.get('/team?page=1&sort1=venue_city&country={"iexact":"Japan"}&venue_capacity={"lt":6000}')
        list = rv.json
        self.assertEqual(list['teams_list'][0]['team_name'], 'Vanraure Hachinohe')

    def test_teams_search1(self):
        rv = self.app.get('/team?page=1&sort1=venue_city&search_parameters=kwej lkwqpok')
        list = rv.json
        self.assertEqual(list['num_pages'], 0)



if __name__ == '__main__':
    unittest.main()