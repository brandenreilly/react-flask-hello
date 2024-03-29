"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('createuser', methods=['POST'])
def handle_create_user():
    sent = request.json
    check_user = User.query.filter_by(username=sent['username']).first()
    check_email = User.query.filter_by(email=sent['email']).first()
    if check_user or check_email:
        return 'Account already exists with this username or email.', 409
    else:
        new_user = User(username=sent['username'], first_name=sent['first_name'], last_name=sent['last_name'], email=sent['email'], password=sent['password'], postal_code=sent['postal_code'])
        db.session.add(new_user)
        db.session.commit()
        query_user = User.query.filter_by(username=sent['username']).first()
        serailize_user = query_user.serialize()
        return jsonify(serailize_user), 200