from flask_sqlalchemy import SQLAlchemy
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

    reportings = db.relationship('Reporting', back_populates='user', lazy=True)
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
    deadline = db.Column(db.DateTime, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    file_attachments = db.Column(db.String, nullable=True)  

    # Relationships
    user = db.relationship("User", back_populates="projects")
    tasks = db.relationship("Task", back_populates="project")
    reportings = db.relationship("Reporting", back_populates="project")

class Task(db.Model, SerializerMixin):
    __tablename__ = 'task'
    id = db.Column(db.Integer, primary_key=True)  
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    task_name = db.Column(db.String, nullable=False)
    deadline = db.Column(db.DateTime, nullable=True)
    status = db.Column(db.String, nullable=False)
    file_attachments = db.Column(db.String, nullable=True)

    # Relationships
    user = db.relationship("User", back_populates='tasks')
    project = db.relationship("Project", back_populates='tasks')
    reportings = db.relationship('Reporting', back_populates='task')

class Reporting(db.Model, SerializerMixin):
    __tablename__ = 'reporting'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=True)
    task_id = db.Column(db.Integer, db.ForeignKey('task.id'), nullable=True)
    task_amount = db.Column(db.Integer, nullable=False)
    ongoing_projects = db.Column(db.Integer, default=0)
    completed_tasks = db.Column(db.Integer, default=0) 
    ongoing_tasks = db.Column(db.Integer, default=0)
    task_by_user = db.Column(db.Integer, default=0)
    deadline = db.Column(db.DateTime, nullable=True)

    # Relationships
    user = db.relationship("User", back_populates="reportings")
    project = db.relationship("Project", back_populates="reportings")
    task = db.relationship("Task", back_populates="reportings")

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
