#app.py
import random
import os
import logging
from flask import Flask, request, jsonify
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from datetime import datetime, timedelta
from flask_cors import CORS, cross_origin

from flask_mail import Mail, Message
from werkzeug.security import generate_password_hash, check_password_hash

from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity, get_jwt


from models import db, User, Project, Task, Activities, Template, Comment

bcrypt = Bcrypt()

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins":"*"}}, supports_credentials=True)
# app.config['CORS_HEADERS'] = 'Content-Type'


jwt = JWTManager(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config["SECRET_KEY"] = "jdhfvksdjkgh"+ str(random.randint(1, 1000000))
app.config["JWT_SECRET_KEY"] = "evrfsejhfgvret"+ str(random.randint(1, 1000000))
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=1)

migrate = Migrate(app, db)

db.init_app(app)

# Ensure CORS headers in response
@app.after_request
def add_cors_headers(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response

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
    # data = request.get_json()

    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email).first()

    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity=user.id)
        return jsonify({"access_token":access_token})

    else:
        return jsonify({"error": "Wrong Details Entered"}), 401
    


# RESETTING PASSWORD WHEN USER FORGETS
app.config['MAIL_SERVER'] = 'sandbox.smtp.mailtrap.io'  # Replace with your mail server
app.config['MAIL_PORT'] = 2525 # Replace with your mail server port
app.config['MAIL_USERNAME'] = "83cd77f3e10577"  # Replace with your email address
app.config['MAIL_PASSWORD'] = '605ba9440905c8'  # Replace with your email password
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False

mail = Mail(app)

def send_email(to, subject, template):
    msg = Message(subject,
                  recipients=[to],
                  html=template,
                  sender=app.config['MAIL_USERNAME'])
    mail.send(msg)


@app.route('/forgot_password', methods=['POST'])
def forgot_password():
    data = request.get_json()

    your_email = data.get('email')
    new_password = data.get('new_password')

    print(f"Received email: {your_email}")

    user = User.query.filter_by(email=your_email).first()

    if user:
        # Generate new password hash
        hashed_password = bcrypt.generate_password_hash(new_password).decode('utf-8')
        user.password = hashed_password
        db.session.commit()

        mail_message = Message(
         subject='Password Reset Confirmation',  # Subject of the email
            sender='nimrodnjau@student.moringaschool.com',
            recipients=[your_email],
            body="\n frontend/MoringaLogo.png" f'\n Hello {user.name},\n \nYour new password is: {new_password}\n  \nBest regards,\nMoringa School')
        mail.send(mail_message)


        return jsonify({"success": "Password changed successfully and email sent"}), 200
    else:
        return jsonify({"error": "User not found"}), 404


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

    # Only check for existing email if the email is being changed
    if 'email' in data and data['email'] != user.email:
        email_exists = User.query.filter_by(email=data['email']).first()
        if email_exists:
            return jsonify({"error": "Email already exists"}), 400

    # Update name and email
    user.name = data.get('name', user.name)
    user.email = data.get('email', user.email)

    db.session.commit()
    return jsonify({"success": "User updated successfully"}), 200

#Update User Role- OK 
@app.route('/user/<int:user_id>/role', methods=['PUT'])
def update_user_role(user_id):
    data = request.get_json()

    user = User.query.get(user_id)
    if user is None:
        return jsonify({"message": "User not found"}), 404
    
    new_role = data.get('role')
    if new_role not in ['admin', 'instructor', 'student']:
        return jsonify({"message": "Invalid role"}), 400
    
    # Update the role
    user.is_admin = (new_role == 'admin')
    user.is_instructor = (new_role == 'instructor')
    user.is_student = (new_role == 'student')
    db.session.commit()

    return jsonify({"success": "User role updated successfully"}), 200



#Delete User - OK
@app.route('/user/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get(id)
    if user is None:
        return jsonify({"message": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted successfully"}), 200

#fetching all users- OK
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
    
#fetching user by id- OK  
@app.route("/users/<int:id>", methods=["GET"])
def get_user_by_id(id):
        user = User.query.get(id)
        if user is None:
            return jsonify({"message": "User not found"}), 404
        user_data = {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "is_student": user.is_student,
            "is_admin": user.is_admin,
            "is_instructor": user.is_instructor
        }
        return jsonify(user_data), 200

#fetch user by name- OK
@app.route("/users", methods=["GET"])
def get_user_by_name():
    name = request.args.get('name')
    if not name:
        return jsonify({"message": "Name parameter is required"}), 400
    
    user = User.query.filter_by(name=name).first()
    if user is None:
        return jsonify({"message": "User not found"}), 404
    
    user_data = {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "is_student": user.is_student,
        "is_admin": user.is_admin,
        "is_instructor": user.is_instructor
    }
    return jsonify([user_data]), 200
 


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

    activity = Activities(user_id=current_user_id, project_id=new_event.id, activity="Added a new project")
    db.session.add(activity)
    
    db.session.commit()
    return jsonify({"success": "Project created successfully"}), 201


#2. GETTING ALL PROJECTS BY THE USER
@app.route('/project', methods=['GET'])
@jwt_required()
def get_projects():
    current_user_id = get_jwt_identity()
    logging.info(f"Current User ID: {current_user_id}")

    user = User.query.get(current_user_id)

    if user is None:
        return jsonify({"message": "You are not authorized to access this resource"}), 404
    
    projects = Project.query.filter_by(user_id=current_user_id).all()
    project_data = []
    for project in projects:
        logging.info(f"Processing project: {project.name}")
        project_data.append({
            "id": project.id,
            "name": project.name,
            "description": project.description,
            "deadline": project.deadline,
            
            "file_attachments": project.file_attachments
        })
    return jsonify(project_data), 200

#GET ALL PROJECTS***************
@app.route('/projects', methods=['GET'])
def get_all_projects():
    projects = Project.query.all()
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
# ****************


# GETTING ONGOING PROJECTS - THIS SHOULD BE DEPENDENT ON THE STATUS OF THE PROJECT('IN PROGRESS' OR 'COMPLETED')
@app.route('/ongoing', methods=['GET'])
@jwt_required()
def get_ongoing_projects():
    current_user_id = get_jwt_identity()

    user = User.query.get(current_user_id)

    if user is None:
        return jsonify({"message": "You are not authorized to access this resource"}), 404
    
    projects = Project.query.filter_by(user_id=current_user_id, status='In Progress').all()
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

# COMPLETED PROJECTS - THIS SHOULD BE DEPENDENT ON THE STATUS OF THE PROJECT('IN PROGRESS' OR 'COMPLETED')
@app.route('/completed', methods=['GET'])
@jwt_required()
def get_completed_projects():
    current_user_id = get_jwt_identity()

    user = User.query.get(current_user_id)

    if user is None:
        return jsonify({"message": "You are not authorized to access this resource"}), 404
    
    projects = Project.query.filter_by(user_id=current_user_id, status='Completed').all()
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
    # project.status = data.get('status', project.status)
    project.file_attachments = data.get('file_attachments', project.file_attachments)

    activity = Activities(user_id=current_user_id, project_id=project.id, activity="Updated project details")
    db.session.add(activity)

    db.session.commit()
    return jsonify({"success": "Project updated successfully"}), 200

#5. DELETING A PROJECT
@app.route('/project/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_project(id):
    project = Project.query.get(id)
    if project is None:
        return jsonify({"message": "Project not found"}), 404
    
    current_user_id = get_jwt_identity()
    if project.user_id != current_user_id:
        if current_user_id is None:
          return jsonify({"message": "User not authenticated"}), 401

    # Log the activity
    activity = Activities(user_id=current_user_id, project_id=project.id, activity="Deleted a project")
    db.session.add(activity)

    db.session.delete(project)
    db.session.commit()
    return jsonify({"message": "Project deleted successfully"}), 200





#CRUD FOR TASK


def send_email(to, subject, template,):
    msg = Message(subject,
                  recipients=[to],
                  html=template,
                  sender=app.config['MAIL_USERNAME'])
    mail.send(msg)
# Create a new task
@app.route('/tasks', methods=['POST'])
# @jwt_required()
def create_task():
    data = request.get_json()

    # current_user_id = get_jwt_identity()
    # user_id = current_user_id

    title = data.get('task_name')
    project_id = data.get('project_id')
    user_id = data.get('user_id')
    # deadline_str = data.get('deadline')
    status = data.get('status', 'Pending')

    # try:
    #     deadline = datetime.strptime(deadline_str, '%Y-%m-%d').date()  # Convert to date object
    # except ValueError:
    #     return jsonify({'error': 'Invalid date format. Please use YYYY-MM-DD.'}), 400

 
    task = Task(
        task_name=title,
        project_id=project_id,
        user_id=user_id,
        # deadline=deadline,
        status=status
    )
    db.session.add(task)

    # Log the activity
    # current_user_id = get_jwt_identity()
    # activity = Activities(user_id=current_user_id, task_id=task.id, activity="Created a new task")
    # db.session.add(activity)


    db.session.commit()

    # Send email notification
    user = User.query.get(user_id)
    if user and user.email:
        send_email(
            user.email,
            'New Task Assigned',
            f"<p>Hello {user.name},</p><p>You have been assigned a new task: {title}.</p><p>Thank you,</p><p>Moringa School Management</p>"
        )


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
                # 'deadline': task.deadline.isoformat() if task.deadline else None,
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
        # 'deadline': task.deadline.isoformat() if task.deadline else None,
        'status': task.status
    }
    return jsonify(task_data), 200

# Update task
@app.route('/tasks/<int:id>', methods=['PATCH'])
# @jwt_required()
def update_task(id):
    data = request.get_json()
    task = Task.query.get(id)

    # current_user_id = get_jwt_identity()
    # if task.user_id != current_user_id:
    #     return jsonify({'message': 'You are not authorized to access this resource'}), 404
    

    if not task:
        return jsonify({'message': 'Task not found'}), 404

    if 'task_name' in data:
        task.task_name = data['task_name']
    if 'project_id' in data:
        task.project_id = data['project_id']
    if 'user_id' in data:
        task.user_id = data['user_id']
    # if 'deadline' in data:
    #     try:
    #         task.deadline = datetime.strptime(data['deadline'], '%Y-%m-%d').date()
    #     except ValueError:
    #         return jsonify({'error': 'Invalid date format. Please use YYYY-MM-DD.'}), 400
    if 'status' in data:
        task.status = data['status']

    # Log the activity
    # current_user_id = get_jwt_identity()
    # activity = Activities(user_id=current_user_id, project_id=task.project_id, activity="Updated a task")
    # db.session.add(activity)


    db.session.commit()
    return jsonify({'message': 'Task updated successfully'}), 200

# Delete task
@app.route('/tasks/<int:id>', methods=['DELETE'])
# @jwt_required()
def delete_task(id):
    task = Task.query.get_or_404(id)

    # current_user_id = get_jwt_identity()
    # if task.user_id != current_user_id:
    #     return jsonify({'message': 'You are not authorized to access this resource'}), 404
    
    if not task:
        return jsonify({'message': 'Task not found'}), 404


    # Log the activity
    # current_user_id = get_jwt_identity()
    # activity = Activities(user_id=current_user_id, project_id=task.id, activity="Deleted a task")
    # db.session.add(activity)

    db.session.delete(task)
    db.session.commit()
    return jsonify({'message': 'Task deleted successfully'}), 200



##CRUD FOR TEMPLATES 

# Create a new template
@app.route('/templates', methods=['POST'])
@jwt_required()
def create_template():
    data = request.get_json()

    current_user_id = get_jwt_identity()
    user_id = current_user_id

    name = data.get('name')
    link = data.get('link')
    

    template = Template(
        name=name,
        link=link,
        user_id=user_id
    )
    db.session.add(template)

    # Log the activity
    current_user_id = get_jwt_identity()
    activity = Activities(user_id=current_user_id, activity="New Template Created")
    db.session.add(activity)

    db.session.commit()

    return jsonify({'message': 'Template created successfully'}), 201

# Get all templates
@app.route('/templates', methods=['GET'])
def get_templates():
    try:
        templates = Template.query.all()
        template_list = []

        for template in templates:
            template_data = {
                'id': template.id,
                'name': template.name,
                'link': template.link,
                'user_id': template.user_id
            }
            template_list.append(template_data)

        return jsonify(template_list), 200
    except Exception as e:
        return jsonify({'message': 'Failed to fetch templates', 'error': str(e)}), 500

# Get a single template
@app.route('/templates/<int:id>', methods=['GET'])
def get_template(id):
    try:
        template = Template.query.get(id)
        template_data = {
            'id': template.id,
            'name': template.name,
            'link': template.link,
            'user_id': template.user_id
        }
        return jsonify(template_data), 200
    except Exception as e:
        return jsonify({'message': 'Failed to fetch template', 'error': str(e)}), 500

# Update a template
@app.route('/templates/<int:id>', methods=['PATCH'])
@jwt_required()
def update_template(id):
    data = request.get_json()
    template = Template.query.get(id)

    current_user_id = get_jwt_identity()
    if template.user_id != current_user_id:
        return jsonify({'message': 'You are not authorized to access this resource'}), 404

    if not template:
        return jsonify({'message': 'Template not found'}), 404

    if 'name' in data:
        template.name = data['name']
    if 'link' in data:
        template.link = data['link']
    

    # Log the activity
    current_user_id = get_jwt_identity()
    activity = Activities(user_id=current_user_id, activity=" Updated A Template")
    db.session.add(activity)

    db.session.commit()
    return jsonify({'message': 'Template updated successfully'}), 200

# Delete a template
@app.route('/templates/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_template(id):
     
    current_user_id = get_jwt_identity()
    if template.user_id != current_user_id:
        return jsonify({'message': 'You are not authorized to access this resource'}), 404

    template = Template.query.get(id)

    if not template:
        return jsonify({'message': 'Template not found'}), 404

    db.session.delete(template)

    # Log the activity
    current_user_id = get_jwt_identity()
    activity = Activities(user_id=current_user_id, activity="Deleted A Template")
    db.session.add(activity)

    db.session.commit()
    return jsonify({'message': 'Template deleted successfully'}), 200

#CRUD FOR COMMENTS

# Create a new comment
@app.route('/comments', methods=['POST'])
@jwt_required()
def create_comment():
    data = request.get_json()

    current_user_id = get_jwt_identity()
    user_id = current_user_id

    name = data.get('name')
    content = data.get('content')

    comment = Comment(
        user_id=user_id,
        name=name,
        content=content
    )
    db.session.add(comment)

    # Log the activity
    current_user_id = get_jwt_identity()
    activity = Activities(user_id=current_user_id, activity="Added a Comment")
    db.session.add(activity)

    db.session.commit()

    return jsonify({'message': 'Comment created successfully'}), 201

# Get all comments
@app.route('/comments', methods=['GET'])
def get_comments():
    try:
        comments = Comment.query.all()
        comment_list = []

        for comment in comments:
            comment_data = {
                'id': comment.id,
                'user_id': comment.user_id,
                'name': comment.name,
                'content': comment.content
            }
            comment_list.append(comment_data)

        return jsonify(comment_list), 200
    except Exception as e:
        return jsonify({'message': 'Failed to fetch comments', 'error': str(e)}), 500

# Get a single comment
@app.route('/comments/<int:id>', methods=['GET'])
def get_comment(id):
    try:
        comment = Comment.query.get(id)
        comment_data = {
            'id': comment.id,
            'user_id': comment.user_id,
            'name': comment.name,
            'content': comment.content
        }
        return jsonify(comment_data), 200
    except Exception as e:
        return jsonify({'message': 'Failed to fetch comment', 'error': str(e)}), 500

# Update a comment
@app.route('/comments/<int:id>', methods=['PATCH'])
@jwt_required()
def update_comment(id):
    data = request.get_json()
    comment = Comment.query.get(id)

    current_user_id = get_jwt_identity()
    if comment.user_id != current_user_id:
        return jsonify({'message': 'You are not authorized to access this resource'}), 404

    if not comment:
        return jsonify({'message': 'Comment not found'}), 404

    if 'name' in data:
        comment.name = data['name']
    if 'content' in data:
        comment.content = data['content']
    
     # Log the activity
    current_user_id = get_jwt_identity()
    activity = Activities(user_id=current_user_id, activity="Updated a Comment")
    db.session.add(activity)

    db.session.commit()
    return jsonify({'message': 'Comment updated successfully'}), 200

# Delete a comment
@app.route('/comments/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_comment(id):
    comment = Comment.query.get(id)

    if not comment:
        return jsonify({'message': 'Comment not found'}), 404

    current_user_id = get_jwt_identity()
    if comment.user_id != current_user_id:
        return jsonify({'message': 'You are not authorized to access this resource'}), 404
    
    if not comment:
        return jsonify({'message': 'Comment not found'}), 404

    db.session.delete(comment)

    # Log the activity
    current_user_id = get_jwt_identity()
    activity = Activities(user_id=current_user_id, activity="Deleted a Comment")
    db.session.add(activity)

    db.session.commit()
    return jsonify({'message': 'Comment deleted successfully'}), 200


if __name__ == '__main__':
    app.run(debug=True) 
