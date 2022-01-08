from flask_restful import Resource, Api
from helpers import import_poland_data

class PolandRaw(Resource):
    def get(self):
        return import_poland_data()