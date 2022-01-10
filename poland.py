from flask_restful import Resource, Api
from helpers import import_poland_data
import pickle
import numpy as np
import sklearn
from flask import request

class PolandRaw(Resource):
    def get(self):
        return import_poland_data()

class PolandPredict(Resource):
    def get(self, year):
        loaded_model = pickle.load(open('models/poland/poland_model.sv', 'rb'))
        result = loaded_model.predict(np.array(year).reshape(-1,1))
        # print(loaded_model.predict_proba(np.array(year).reshape(-1, 1)))
        return result[0][0]