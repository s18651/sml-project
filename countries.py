from flask_restful import Resource, Api
from helpers import countries_raw_data
import pickle
import numpy as np
import sklearn
from flask import request

class CountriesRaw(Resource):
    def get(self, countryId):
        return countries_raw_data(countryId)

class CountriesPredict(Resource):
    def get(self, countryId, year):
        loaded_model = pickle.load(open('models/poland/poland_model.sv', 'rb'))
        result = loaded_model.predict(np.array(year).reshape(-1,1))
        # print(loaded_model.predict_proba(np.array(year).reshape(-1, 1)))
        return result[0][0]