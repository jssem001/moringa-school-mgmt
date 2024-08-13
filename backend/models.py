# import os
# import base64
# from flask_sqlalchemy import SQLAlchemy
# from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text, Enum, Table
# from sqlalchemy.orm import relationship, validates
# from werkzeug.utils import secure_filename

# db = SQLAlchemy()

# # Helper table for many-to-many relationship between Teams and Users
# team_user = Table('team_user', db.Model.metadata,
#     Column('team_id', Integer, ForeignKey('team.id'), primary_key=True),
#     Column('user_id', Integer, ForeignKey('user.id'), primary_key=True)
# )

# class User(db.Model):
#     __tablename__ = 'user'

#     id = Column(Integer, primary_key=True)
#     name = Column(String(80), nullable=False)
#     email = Column(String(120), unique=True, nullable=False)
#     role = Column(Enum('Admin', 'Manager', 'Developer', 'Designer', name='user_roles'), nullable=False)
#     teams = relationship('Team', secondary=team_user, back_populates='users')

# class Project(db.Model):
#     __tablename__ = 'project'
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(100), nullable=False)
#     description = db.Column(db.Text, nullable=True)
#     deadline = db.Column(db.String, nullable=True)
#     status = db.Column(db.String, nullable=False)
#     user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
#     file_attachments = db.Column(db.String, nullable=True)  

#     # Relationships
#     user = db.relationship("User", back_populates="projects")
#     tasks = db.relationship("Task", back_populates="project")

# class Task(db.Model, SerializerMixin):
#     __tablename__ = 'task'
#     id = db.Column(db.Integer, primary_key=True)  
#     project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
#     task_name = db.Column(db.String, nullable=False)
#     # deadline = db.Column(db.Date, nullable=True)
#     status = db.Column(db.String, nullable=False)
#     file_attachments = db.Column(db.String, nullable=True)

#     # Relationships
#     user = db.relationship("User", back_populates='tasks')
#     project = db.relationship("Project", back_populates='tasks')


# class Comment(db.Model, SerializerMixin):
#     __tablename__ = 'comment'
#     id = db.Column(db.Integer, primary_key=True)  
#     user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
#     name = db.Column(db.String(100), nullable=False)
#     content = db.Column(db.Text, nullable=False)  # Changed 'Comment' to 'content'

#     # Relationships
#     user = db.relationship('User', back_populates='comments')

# class Template(db.Model):
#     __tablename__ = 'template'

#     id = Column(Integer, primary_key=True)
#     name = Column(String(120), nullable=False)
#     link = Column(String(255), nullable=False)

# class Team(db.Model):
#     __tablename__ = 'team'

#     id = Column(Integer, primary_key=True)
#     team_name = Column(String(120), nullable=False)
#     users = relationship('User', secondary=team_user, back_populates='teams')
#     status = Column(Enum('Active', 'Inactive', name='team_status'), nullable=False)

# class Task(db.Model):
#     __tablename__ = 'task'

#     id = Column(Integer, primary_key=True)
#     name = Column(String(120), nullable=False)
#     description = Column(Text, nullable=False)
#     deadline = Column(DateTime, nullable=False)
#     file_attachments = Column(Text)  # Base64 encoded string
#     project_id = Column(Integer, ForeignKey('project.id'), nullable=False)
#     project = relationship('Project', back_populates='tasks')

#     @validates('file_attachments')
#     def convert_file_to_base64(self, key, file_data):
#         if file_data:
#             filename = secure_filename(file_data.filename)
#             filepath = os.path.join('uploads', filename)
#             file_data.save(filepath)
            
#             with open(filepath, "rb") as file:
#                 file_base64 = base64.b64encode(file.read()).decode('utf-8')
            
#             os.remove(filepath)  # Remove the file after converting to base64
#             return file_base64
#         return None

# Project.tasks = relationship('Task', order_by=Task.id, back_populates='project')
# import os
# import base64
# from flask_sqlalchemy import SQLAlchemy
# from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text, Enum, Table
# from sqlalchemy.orm import relationship, validates
# from werkzeug.utils import secure_filename

# db = SQLAlchemy()

# # Helper table for many-to-many relationship between Teams and Users
# team_user = Table('team_user', db.Model.metadata,
#     Column('team_id', Integer, ForeignKey('team.id'), primary_key=True),
#     Column('user_id', Integer, ForeignKey('user.id'), primary_key=True)
# )

# class User(db.Model):
#     __tablename__ = 'user'

#     id = Column(Integer, primary_key=True)
#     name = Column(String(80), nullable=False)
#     email = Column(String(120), unique=True, nullable=False)
#     role = Column(Enum('Admin', 'Manager', 'Developer', 'Designer', name='user_roles'), nullable=False)
#     teams = relationship('Team', secondary=team_user, back_populates='users')

# class Project(db.Model):
#     __tablename__ = 'project'
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(100), nullable=False)
#     description = db.Column(db.Text, nullable=True)
#     deadline = db.Column(db.String, nullable=True)
#     status = db.Column(db.String, nullable=False)
#     user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
#     file_attachments = db.Column(db.String, nullable=True)  

#     # Relationships
#     user = db.relationship("User", back_populates="projects")
#     tasks = db.relationship("Task", back_populates="project")

# class Task(db.Model, SerializerMixin):
#     __tablename__ = 'task'
#     id = db.Column(db.Integer, primary_key=True)  
#     project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
#     task_name = db.Column(db.String, nullable=False)
#     # deadline = db.Column(db.Date, nullable=True)
#     status = db.Column(db.String, nullable=False)
#     file_attachments = db.Column(db.String, nullable=True)

#     # Relationships
#     user = db.relationship("User", back_populates='tasks')
#     project = db.relationship("Project", back_populates='tasks')


# class Comment(db.Model, SerializerMixin):
#     __tablename__ = 'comment'
#     id = db.Column(db.Integer, primary_key=True)  
#     user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
#     name = db.Column(db.String(100), nullable=False)
#     content = db.Column(db.Text, nullable=False)  # Changed 'Comment' to 'content'

#     # Relationships
#     user = db.relationship('User', back_populates='comments')

# class Template(db.Model):
#     __tablename__ = 'template'

#     id = Column(Integer, primary_key=True)
#     name = Column(String(120), nullable=False)
#     link = Column(String(255), nullable=False)

# class Team(db.Model):
#     __tablename__ = 'team'

#     id = Column(Integer, primary_key=True)
#     team_name = Column(String(120), nullable=False)
#     users = relationship('User', secondary=team_user, back_populates='teams')
#     status = Column(Enum('Active', 'Inactive', name='team_status'), nullable=False)

# class Task(db.Model):
#     __tablename__ = 'task'

#     id = Column(Integer, primary_key=True)
#     name = Column(String(120), nullable=False)
#     description = Column(Text, nullable=False)
#     deadline = Column(DateTime, nullable=False)
#     file_attachments = Column(Text)  # Base64 encoded string
#     project_id = Column(Integer, ForeignKey('project.id'), nullable=False)
#     project = relationship('Project', back_populates='tasks')

#     @validates('file_attachments')
#     def convert_file_to_base64(self, key, file_data):
#         if file_data:
#             filename = secure_filename(file_data.filename)
#             filepath = os.path.join('uploads', filename)
#             file_data.save(filepath)
            
#             with open(filepath, "rb") as file:
#                 file_base64 = base64.b64encode(file.read()).decode('utf-8')
            
#             os.remove(filepath)  # Remove the file after converting to base64
#             return file_base64
#         return None

# Project.tasks = relationship('Task', order_by=Task.id, back_populates='project')
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from datetime import datetime
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from datetime import datetime

db = SQLAlchemy()


class User(db.Model, SerializerMixin):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    is_student = db.Column(db.Boolean, default=False)
    is_instructor = db.Column(db.Boolean, default=False) 
    is_admin = db.Column(db.Boolean, default=False)

    tasks = db.relationship('Task', back_populates='user', lazy=True)
    templates = db.relationship('Template', back_populates='user', lazy=True)
    projects = db.relationship('Project', back_populates='user', lazy=True)
    comments = db.relationship('Comment', back_populates='user', lazy=True)

    @validates('email')
    def validate_email(self, key, email):
        assert '@' in email, 'Invalid email address'
        return email
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    is_student = db.Column(db.Boolean, default=False)
    is_instructor = db.Column(db.Boolean, default=False) 
    is_admin = db.Column(db.Boolean, default=False)

    tasks = db.relationship('Task', back_populates='user', lazy=True)
    templates = db.relationship('Template', back_populates='user', lazy=True)
    projects = db.relationship('Project', back_populates='user', lazy=True)
    comments = db.relationship('Comment', back_populates='user', lazy=True)

    @validates('email')
    def validate_email(self, key, email):
        assert '@' in email, 'Invalid email address'
        return email

  
class Project(db.Model, SerializerMixin):  
    __tablename__ = 'project'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    deadline = db.Column(db.String, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    file_attachments = db.Column(db.String, nullable=True)  

    # Relationships
    user = db.relationship("User", back_populates="projects")
    tasks = db.relationship("Task", back_populates="project")

class Task(db.Model, SerializerMixin):
    __tablename__ = 'task'
    id = db.Column(db.Integer, primary_key=True)  
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    task_name = db.Column(db.String, nullable=False)
    deadline = db.Column(db.Date, nullable=True)
    status = db.Column(db.String, nullable=False)
    file_attachments = db.Column(db.String, nullable=True)

    # Relationships
    user = db.relationship("User", back_populates='tasks')
    project = db.relationship("Project", back_populates='tasks')


class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comment'
    id = db.Column(db.Integer, primary_key=True)  
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    name = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)  # Changed 'Comment' to 'content'

    # Relationships
    user = db.relationship('User', back_populates='comments')


class Template(db.Model, SerializerMixin):
    __tablename__ = 'template'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    link = db.Column(db.String, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)

    # Relationships
    user = db.relationship('User', back_populates='templates')


class Activities(db.Model):
    __tablename__ = 'activities'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=True)
    task_id = db.Column(db.Integer, db.ForeignKey('task.id'), nullable=True)
    activity = db.Column(db.String(255), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship("User", backref="activities")
    project = db.relationship("Project", backref="activities")
    task = db.relationship("Task", backref="activities")
