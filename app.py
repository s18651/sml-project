from flask import Flask
from flask_restful import Resource, Api
from poland import PolandRaw, PolandPredict

app = Flask(__name__)
api = Api(app)

api.add_resource(PolandRaw, '/api/poland/raw')
api.add_resource(PolandPredict, '/api/poland/predict/<int:year>')

if __name__ == "__main__":
    app.run(debug=True)