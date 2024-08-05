#app.py
import random
from flask import Flask, request, jsonify
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from datetime import timedelta
from flask_cors import CORS, cross_origin

from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity, get_jwt


from models import db, User

bcrypt = Bcrypt()

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})
# app.config['CORS_HEADERS'] = 'Content-Type'


jwt = JWTManager(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config["SECRET_KEY"] = "jdhfvksdjkgh"+ str(random.randint(1, 1000000))
app.config["JWT_SECRET_KEY"] = "evrfsejhfgvret"+ str(random.randint(1, 1000000))
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=1)

migrate = Migrate(app, db)

db.init_app(app)

#Get all Users
@app.route("/users", methods=["GET"])
@jwt_required()
def get_all_users():
    try:
        # Fetch all users from the database
        users = User.query.all()
        # Serialize the user data
        user_list = [
            {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "is_student": user.is_student,
                "is_admin": user.is_admin,
                "is_instructor": user.is_instructor
            }
            for user in users
        ]
        return jsonify(user_list), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


#User Registration - OK
@app.route('/user', methods=['POST'])
def create_user():
    data = request.get_json()

    email = request.json.get("email", None)
    email_exists = User.query.filter_by(email=email).first()
    if email_exists:
        return jsonify({"error": "Email already exists"}), 400
        
    new_user = User(
        name= request.json.get("name", None), 
        email= request.json.get("email", None),
        password= bcrypt.generate_password_hash(request.json.get("password", None)).decode('utf-8') ,

        is_student=data.get('is_student', False),
        is_admin=data.get('is_admin', False),
        is_instructor=data.get('is_instructor', False)
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"success": "User created successfully"}), 201


#User Login - OK
@app.route("/login", methods=["POST"])
def login_user():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email).first()

    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity=user.id)
        return jsonify({"access_token":access_token})

    else:
        return jsonify({"error": "Wrong Details Entered"}), 401


# Current User - OK
@app.route("/current_user", methods=["GET"])
@jwt_required()
def current_user():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    user_data = {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "is_student": user.is_student,
        "is_admin": user.is_admin,
        "is_instructor": user.is_instructor
    }
    return jsonify(user_data), 200


#User Logout - OK
BLACKLIST=set()
@jwt.token_in_blocklist_loader
def check_if_token_in_blocklist(jwt_header, decrypted_token):
    return decrypted_token['jti'] in BLACKLIST

@app.route("/logout", methods=["DELETE"])
@jwt_required()
def logout():
    jti = get_jwt()["jti"]
    BLACKLIST.add(jti)
    return jsonify({"success":"Successfully logged out"}), 200


# Updating Profile(You have to be logged in to update your profile) - OK
@app.route('/user', methods=['PUT'])
@jwt_required()
def update_profile():
    data = request.get_json()

    loggedin_user_id = get_jwt_identity()
    user = User.query.get(loggedin_user_id)
    if user is None:
        return jsonify({"message": "User not found"}), 404
    

    email_exists = User.query.filter_by(email=data['email']).first()
    if email_exists:
        return jsonify({"error": "Email already exists"}), 400

    user.name = data.get('name', user.name)
    user.email = user.email
    user.password = bcrypt.generate_password_hash( data['password'] ).decode('utf-8') 
    user.is_student= data.get('is_student', user.is_student)
    user.is_admin = data.get('is_admin', user.is_admin)
    user.is_instructor = data.get('is_instructor', user.is_instructor)
    db.session.commit()
    return jsonify({"success": "User updated successfully"}), 200


#Delete User - OK
@app.route('/user/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get(id)
    if user is None:
        return jsonify({"message": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted successfully"}), 200