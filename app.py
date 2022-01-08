from flask import Flask
from flask_restful import Resource, Api
from poland import PolandRaw

app = Flask(__name__)
api = Api(app)

api.add_resource(PolandRaw, '/poland/raw')

if __name__ == "__main__":
    app.run(debug=True)