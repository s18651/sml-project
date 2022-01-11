from flask import Flask
from flask_restful import Resource, Api
from poland import PolandRaw, PolandPredict
from continents import ContinentsRaw, ContinentsPredict

app = Flask(__name__)
api = Api(app)

api.add_resource(PolandRaw, '/api/poland/raw')
api.add_resource(PolandPredict, '/api/poland/predict/<int:year>')
api.add_resource(ContinentsRaw, '/api/continents/<string:continentId>/raw')
api.add_resource(ContinentsPredict, '/api/continents/<string:continentId>/predict/<int:year>')

if __name__ == "__main__":
    app.run(debug=True)