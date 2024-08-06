#app.py
import random
from flask import Flask, request, jsonify
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from datetime import timedelta
from flask_cors import CORS, cross_origin

from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity, get_jwt


from models import db, User,Task

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


#CRUD FOR PROJECTS

#1. ADDING A PROJECT
@app.route('/project', methods=['POST'])
@jwt_required()
def create_event():
    current_user_id = get_jwt_identity()

    current_user = User.query.get(current_user_id)

    if current_user:
       data = request.get_json()
       new_event = Project(
          name=data['name'],
          description=data['description'],
          deadline=data['deadline'],
          file_attachments=data['file_attachments'],
          user_id=current_user_id
    )
    db.session.add(new_event)
    db.session.commit()
    return jsonify({"success": "Project created successfully"}), 201


#2. GETTING ALL PROJECTS BY THE USER
@app.route('/project', methods=['GET'])
@jwt_required()
def get_projects():
    current_user_id = get_jwt_identity()

    user = User.query.get(current_user_id)

    if user is None:
        return jsonify({"message": "You are not authorized to access this resource"}), 404
    
    projects = Project.query.filter_by(user_id=current_user_id).all()
    project_data = []
    for project in projects:
        project_data.append({
            "id": project.id,
            "name": project.name,
            "description": project.description,
            "deadline": project.deadline,
            "file_attachments": project.file_attachments
        })
    return jsonify(project_data), 200


#3. VIEWING PROJECT DETAILS
@app.route('/project/<int:id>', methods=['GET'])
def get_project(id):
    project = Project.query.get(id)
    if project is None:
        return jsonify({"message": "Project not found"}), 404
    project_data = {
        "id": project.id,
        "name": project.name,
        "description": project.description,
        "deadline": project.deadline,
        "file_attachments": project.file_attachments
    }
    return jsonify(project_data), 200

#4. EDITING DETAILS OF A PROJECT
@app.route('/project/<int:id>', methods=['PUT'])
@jwt_required()
def update_project(id):
    data = request.get_json()

    project = Project.query.get(id)

    if project is None:
        return jsonify({"message": "Project not found"}), 404

    current_user_id = get_jwt_identity()
    if project.user_id != current_user_id:
        return jsonify({"message": "You are not authorized to access this resource"}), 404
    
    project.name = data.get('name', project.name)
    project.description = data.get('description', project.description)
    project.deadline = data.get('deadline', project.deadline)
    project.file_attachments = data.get('file_attachments', project.file_attachments)
    db.session.commit()
    return jsonify({"success": "Project updated successfully"}), 200

#5. DELETING A PROJECT
@app.route('/project/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_project(id):
    project = Project.query.get(id)
    if project is None:
        return jsonify({"message": "Project not found"}), 404
    db.session.delete(project)
    db.session.commit()
    return jsonify({"message": "Project deleted successfully"}), 200



#CRUD FOR TASK


# Create a new task
@app.route('/tasks', methods=['POST'])
def create_task():
    data = request.get_json()
    title = data.get('task_name')
    project_id = data.get('project_id')
    user_id = data.get('user_id')
    # deadline = data.get('deadline')
    status = data.get('status', 'Pending')

    task = Task(
        task_name=title,
        project_id=project_id,
        user_id=user_id,
        #deadline=deadline,
        status=status
    )
    db.session.add(task)
    db.session.commit()

    return jsonify({'message': 'Task created successfully'}), 201

# Get all tasks
@app.route('/tasks', methods=['GET'])
def get_tasks():
    try:
        tasks = Task.query.all()
        task_list = []

        for task in tasks:
            task_data = {
                'id': task.id,
                'task_name': task.task_name,
                'project_id': task.project_id,
                'user_id': task.user_id,
                'deadline': task.deadline.isoformat() if task.deadline else None,
                'status': task.status
            }
            task_list.append(task_data)

        return jsonify(task_list), 200
    except Exception as e:
        return jsonify({'message': 'Failed to fetch tasks', 'error': str(e)}), 500

# Get single task
@app.route('/tasks/<int:id>', methods=['GET'])
def get_task(id):
    task = Task.query.get_or_404(id)
    if not task:
        return jsonify({'message': 'Task not found'}), 404
    
    task_data = {
        'id': task.id,
        'task_name': task.task_name,
        'project_id': task.project_id,
        'user_id': task.user_id,
        'deadline': task.deadline.isoformat() if task.deadline else None,
        'status': task.status
    }
    return jsonify(task_data), 200

# Update task
@app.route('/tasks/<int:id>', methods=['PATCH'])
def update_task(id):
    data = request.get_json()
    task = Task.query.get(id)

    if not task:
        return jsonify({'message': 'Task not found'}), 404

    if 'task_name' in data:
        task.task_name = data['task_name']
    if 'project_id' in data:
        task.project_id = data['project_id']
    if 'user_id' in data:
        task.user_id = data['user_id']
    if 'deadline' in data:
        task.deadline = data['deadline']
    if 'status' in data:
        task.status = data['status']

    db.session.commit()
    return jsonify({'message': 'Task updated successfully'}), 200

# Delete task
@app.route('/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    task = Task.query.get_or_404(id)

    if not task:
        return jsonify({'message': 'Task not found'}), 404

    db.session.delete(task)
    db.session.commit()
    return jsonify({'message': 'Task deleted successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True) 