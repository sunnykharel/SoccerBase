import unittest
from app import *

class TestBackendAPI(unittest.TestCase):

    def test_countries_notempty(self):
        list = get_all_countries()
        #print(type(list)
        self.assertNotEqual(list['countries_list'], {})

    def test_countries_size(self):
        list = get_all_countries()
        #print(type(list)
        self.assertEqual(len(list['countries_list']), 129)

    def test_countries_albania_name(self):
        list = get_all_countries()
        #print(type(list))
        self.assertEqual(list['countries_list'][0]['name'], 'Albania')
        
    def test_countries_albania_code(self):
        list = get_all_countries()
        #print(type(list))
        self.assertEqual(list['countries_list'][0]['code'], 'AL')

    def test_countries_albania_flag(self):
        list = get_all_countries()
        #print(type(list))
        self.assertNotEqual(list['countries_list'][0]['flag'], '')


#pick a random index 1

    def test_countries_random1_name(self):
        list = get_all_countries()
        #print(type(list))
        self.assertNotEqual(list['countries_list'][34]['name'], '')
        
    def test_countries_random1_code(self):
        list = get_all_countries()
        #print(type(list))
        self.assertNotEqual(list['countries_list'][34]['code'], '')

    def test_countries_random1_flag(self):
        list = get_all_countries()
        #print(type(list))
        self.assertNotEqual(list['countries_list'][34]['flag'], '')

#pick a random index 2

    def test_countries_random2_name(self):
        list = get_all_countries()
        #print(type(list))
        self.assertNotEqual(list['countries_list'][76]['name'], '')
        
    def test_countries_random2_code(self):
        list = get_all_countries()
        #print(type(list))
        self.assertNotEqual(list['countries_list'][76]['code'], '')

    def test_countries_random2_flag(self):
        list = get_all_countries()
        #print(type(list))
        self.assertNotEqual(list['countries_list'][76]['flag'], '')

#pick a random index

    def test_countries_random3_name(self):
        list = get_all_countries()
        #print(type(list))
        self.assertNotEqual(list['countries_list'][108]['name'], '')
        
    def test_countries_random3_code(self):
        list = get_all_countries()
        #print(type(list))
        self.assertNotEqual(list['countries_list'][108]['code'], '')

    def test_countries_random3_flag(self):
        list = get_all_countries()
        #print(type(list))
        self.assertNotEqual(list['countries_list'][108]['flag'], '')







#--------------------------------------------------------------------------------------testing leagues---------------------

    #basic tests--------------------------------------------------
    def test_leagues_notempty(self):
        list = get_all_leagues()
        #print(type(list)
        self.assertNotEqual(list['leagues_list'], {})

    def test_leagues_size(self):
        list = get_all_leagues()
        #print(type(list)
        self.assertEqual(len(list['leagues_list']), 514)

    
    #first entry------------------------------------------------------
    def test_leagues_first_name(self):
        list = get_all_leagues()
        #print(type(list))
        self.assertEqual(list['leagues_list'][0]['name'], 'Superliga')
    
    def test_leagues_first_id(self):
        list = get_all_leagues()
        #print(type(list))
        self.assertEqual(list['leagues_list'][0]['league_id'], 907)

    def test_leagues_first_country(self):
        list = get_all_leagues()
        #print(type(list))
        self.assertEqual(list['leagues_list'][0]['country'], 'Albania')

    def test_leagues_first_season(self):
        list = get_all_leagues()
        #print(type(list))
        self.assertEqual(list['leagues_list'][0]['season'], 2019)

    def test_leagues_first_logo(self):
        list = get_all_leagues()
        #print(type(list))
        self.assertNotEqual(list['leagues_list'][0]['logo'], '')

    def test_leagues_first_season_start(self):
        list = get_all_leagues()
        #print(type(list))
        self.assertNotEqual(list['leagues_list'][0]['season_start'], '')

    def test_leagues_first_coverage(self):
        list = get_all_leagues()
        #print(type(list))
        self.assertNotEqual(list['leagues_list'][0]['coverage'], {})

    #last entry-----------------------------------------------------------------
    def test_leagues_last_name(self):
        list = get_all_leagues()
        #print(type(list))
        self.assertEqual(list['leagues_list'][513]['name'], 'Premier Soccer League')

    def test_leagues_last_id(self):
        list = get_all_leagues()
        #print(type(list))
        self.assertEqual(list['leagues_list'][513]['league_id'], 806)

    def test_leagues_last_country(self):
        list = get_all_leagues()
        #print(type(list))
        self.assertEqual(list['leagues_list'][513]['country'], 'Zimbabwe')

    def test_leagues_last_season(self):
        list = get_all_leagues()
        #print(type(list))
        self.assertEqual(list['leagues_list'][513]['season'], 2019)

    def test_leagues_last_logo(self):
        list = get_all_leagues()
        #print(type(list))
        self.assertNotEqual(list['leagues_list'][513]['logo'], '')

    def test_leagues_last_season_start(self):
        list = get_all_leagues()
        #print(type(list))
        self.assertNotEqual(list['leagues_list'][513]['season_start'], '')

    def test_leagues_last_coverage(self):
        list = get_all_leagues()
        #print(type(list))
        self.assertNotEqual(list['leagues_list'][513]['coverage'], {})
    

    #pick a random index-------------------------------------------------------------------
    def test_leagues_name_random1(self):
        list = get_all_leagues()
        #print(type(list))
        self.assertNotEqual(list['leagues_list'][163]['name'], '')

    def test_leagues_id_random1(self):
        list = get_all_leagues()
        #print(type(list))
        self.assertNotEqual(list['leagues_list'][163]['league_id'], 0)

    def test_leagues_country_random1(self):
        list = get_all_leagues()
        #print(type(list))
        self.assertNotEqual(list['leagues_list'][163]['country'], '')

    def test_leagues_season_random1(self):
        list = get_all_leagues()
        #print(type(list))
        self.assertEqual(list['leagues_list'][163]['season'], 2019)

    def test_leagues_logo_random1(self):
        list = get_all_leagues()
        #print(type(list))
        self.assertNotEqual(list['leagues_list'][163]['logo'], '')

    def test_leagues_start_random1(self):
        list = get_all_leagues()
        #print(type(list))
        self.assertNotEqual(list['leagues_list'][163]['season_start'], '')

    def test_leagues_coverage_random1(self):
        list = get_all_leagues()
        #print(type(list))
        self.assertNotEqual(list['leagues_list'][163]['coverage'], {})


    #pick a random index-------------------------------------------------------------------
    def test_leagues_name_random2(self):
        list = get_all_leagues()
        #print(type(list))
        self.assertNotEqual(list['leagues_list'][213]['name'], '')

    def test_leagues_id_random2(self):
        list = get_all_leagues()
        #print(type(list))
        self.assertNotEqual(list['leagues_list'][213]['league_id'], 0)

    def test_leagues_country_random2(self):
        list = get_all_leagues()
        #print(type(list))
        self.assertNotEqual(list['leagues_list'][213]['country'], '')

    def test_leagues_season_random2(self):
        list = get_all_leagues()
        #print(type(list))
        self.assertEqual(list['leagues_list'][213]['season'], 2019)

    def test_leagues_logo_random2(self):
        list = get_all_leagues()
        #print(type(list))
        self.assertNotEqual(list['leagues_list'][213]['logo'], '')

    def test_leagues_start_random2(self):
        list = get_all_leagues()
        #print(type(list))
        self.assertNotEqual(list['leagues_list'][213]['season_start'], '')

    def test_leagues_coverage_random2(self):
        list = get_all_leagues()
        #print(type(list))
        self.assertNotEqual(list['leagues_list'][213]['coverage'], {})


#testing teams-----------------------------------------------------------------------------------------------------------

    #basic tests--------------------------------------------------
    def test_teams_notempty(self):
        list = get_all_teams()
        #print(type(list)
        self.assertNotEqual(list['teams_list'], {})

    def test_teams_size(self):
        list = get_all_teams()
        #print(type(list)
        self.assertEqual(len(list['teams_list']), 467)


    #first entry------------------------------------------------------
    def test_teams_first_name(self):
        list = get_all_teams()
        #print(type(list))
        self.assertEqual(list['teams_list'][0]['name'], 'FK Kukesi')

    def test_teams_first_logo(self):
        list = get_all_teams()
        #print(type(list))
        self.assertNotEqual(list['teams_list'][0]['logo'], '')
    
    def test_teams_first_country(self):
        list = get_all_teams()
        #print(type(list))
        self.assertEqual(list['teams_list'][0]['country'], 'Albania')

    def test_teams_first_venue_name(self):
        list = get_all_teams()
        #print(type(list))
        self.assertEqual(list['teams_list'][0]['venue_name'], 'Elbasan Arena')

    def test_teams_first_venue_city(self):
        list = get_all_teams()
        #print(type(list))
        self.assertEqual(list['teams_list'][0]['venue_city'], 'Elbasan')


    #last entry------------------------------------------------------
    def test_teams_last_name(self):
        list = get_all_teams()
        #print(type(list))
        self.assertEqual(list['teams_list'][466]['name'], 'Rosario Central')

    def test_teams_last_logo(self):
        list = get_all_teams()
        #print(type(list))
        self.assertNotEqual(list['teams_list'][466]['logo'], '')
    
    def test_teams_last_country(self):
        list = get_all_teams()
        #print(type(list))
        self.assertEqual(list['teams_list'][466]['country'], 'Argentina')

    def test_teams_last_venue_name(self):
        list = get_all_teams()
        #print(type(list))
        self.assertEqual(list['teams_list'][466]['venue_name'], 'Estadio Dr. Lisandro de la Torre')

    def test_teams_last_venue_city(self):
        list = get_all_teams()
        #print(type(list))
        self.assertEqual(list['teams_list'][466]['venue_city'], 'Rosario, Provincia de Santa Fe')



    #random index 1------------------------------------------------------
    def test_teams_random_name1(self):
        list = get_all_teams()
        #print(type(list))
        self.assertNotEqual(list['teams_list'][333]['name'], '')

    def test_teams_random_logo1(self):
        list = get_all_teams()
        #print(type(list))
        self.assertNotEqual(list['teams_list'][333]['logo'], '')
    
    def test_teams_random_country1(self):
        list = get_all_teams()
        #print(type(list))
        self.assertNotEqual(list['teams_list'][333]['country'], '')

    def test_teams_random_venue_name1(self):
        list = get_all_teams()
        #print(type(list))
        self.assertNotEqual(list['teams_list'][333]['venue_name'], '')

    def test_teams_random_venue_city1(self):
        list = get_all_teams()
        #print(type(list))
        self.assertNotEqual(list['teams_list'][333]['venue_city'], '')


     #random index 2------------------------------------------------------
    def test_teams_random_name2(self):
        list = get_all_teams()
        #print(type(list))
        self.assertNotEqual(list['teams_list'][194]['name'], '')

    def test_teams_random_logo2(self):
        list = get_all_teams()
        #print(type(list))
        self.assertNotEqual(list['teams_list'][194]['logo'], '')
    
    def test_teams_random_country2(self):
        list = get_all_teams()
        #print(type(list))
        self.assertNotEqual(list['teams_list'][194]['country'], '')

    def test_teams_random_venue_name2(self):
        list = get_all_teams()
        #print(type(list))
        self.assertNotEqual(list['teams_list'][194]['venue_name'], '')

    def test_teams_random_venue_city2(self):
        list = get_all_teams()
        #print(type(list))
        self.assertNotEqual(list['teams_list'][194]['venue_city'], '')


if __name__ == '__main__':
    unittest.main()