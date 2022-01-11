from flask_restful import Resource, Api
from helpers import continents_raw_data
import pickle
import numpy as np
import sklearn
from flask import request

class ContinentsRaw(Resource):
    def get(self, continentId):
        return continents_raw_data(continentId)

class ContinentsPredict(Resource):
    def get(self, continentId, year):
        loaded_model = pickle.load(open('models/poland/poland_model.sv', 'rb'))
        result = loaded_model.predict(np.array(year).reshape(-1,1))
        # print(loaded_model.predict_proba(np.array(year).reshape(-1, 1)))
        return result[0][0]