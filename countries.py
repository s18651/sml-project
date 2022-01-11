from flask_restful import Resource, Api
from helpers import import_poland_data
import pickle
import numpy as np
import sklearn
from flask import request

class CountriesRaw(Resource):
    def get(self, countryId):
        return import_poland_data()

class CountriesPredict(Resource):
    def get(self, countryId, year):
        loaded_model = pickle.load(open('models/poland/poland_model.sv', 'rb'))
        result = loaded_model.predict(np.array(year).reshape(-1,1))
        # print(loaded_model.predict_proba(np.array(year).reshape(-1, 1)))
        return result[0][0]