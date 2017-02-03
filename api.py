from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from flask_pymongo import PyMongo

app = Flask(__name__)
CORS(app)
app.config['MONGO_DBNAME'] = 'angular2-flask-testing'
app.config['MONGO_URI'] = 'mongodb://cdoyle45:testing@ds139959.mlab.com:39959/angular2-flask-testing'
mongo = PyMongo(app)

@app.route("/")
def hello():
    return "Hello"
@app.route("/people", methods=["GET"])
def get_all():
    people = mongo.db.people
    output = []
    for person in people.find():
        output.append({'name': person['name']})
    return jsonify({'result': output})

@app.route("/people/<name>", methods=["GET"])
def get_data(name):
    people = mongo.db.people
    person = people.find_one({'name': name})
    if person:
        output = {'name': person['name']}
    else:
        output = 'No such name'
    return jsonify({'result': output})

@app.route("/people", methods=["POST"])
def post_data():
    people = mongo.db.people
    name = request.json['name']
    person_id = people.insert({'name': name})
    new_person = people.find_one({'_id': person_id})
    output = {'added': {'name': new_person['name']}}
    return jsonify({'result': output})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5003, debug=True)
