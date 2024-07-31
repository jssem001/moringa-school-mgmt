#models.py
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from dateime import datetime

db = SQLAlchemy()

class User(db.Model, SerializerMixin):
    __tablename__ = 'user'
    id =db.Column(db.Integer, primary_key=True)
    name =db.Column(db.String(100), nullable=False)
    email =db.Column(db.String(100), unique=True, nullable=False)
    password=db.Column(db.String(200), nullable=False)

    reportings= db.relationship('Reporting', back_populate='user', lazy=True)
    tasks=db.relationship('Task', back_populate='user', lazy=True)
    templates=db.relationship('Template', back_populate='user', lazy=True)
    projects=db.relationship('Project', back_populate='user', lazy=True)
    comments=db.relationship('Comment', back_populate='user', lazy=True)

    @validates('email')
    def validate_email(self,key,email):
        assert '@' in email,'Invalid email address'
        return email
    

class Projects(db.Model, SerializerMixin):
    __tablename__ = 'project'
    id =db.Column(db.Integer, primary_key=True)
    name =db.Column(db.String(100), nullable=False)
    description =db.Column(db.Text, nulable=True)
    deadline =db.Column(db.DateTime, nullable=True)
    user_id =db.Column(db.Integer, db.ForeignKey('user.id', nullable=True))
    file_attachemnts =db.Column(db.String, nullable=True)

class Task (db.Model, SerializerMixin):
    __tablename__ = 'task'   
    project_id =db.Column(db.Integer, db.ForeignKey('project.id', nullable=True))
    user_id =db.Column(db.Integer, db.ForeignKey('user.id', nullable=True))
    task_name =db.Column(db.String, nullable=False)
    deadline =db.Column(db.DateTime, nillable=True)
    status =db.Column(db.String, nullable=False)
    file_attachments =db.Column(db.String, nullable=True)

##Relationship
    user = db.relationship("User", back_populates='tasks')
    project = db.relationship("Project", back_populates='tasks')
    reportings= db.relationship('Reporting', back_populates= 'task')
    
class Reporting(db.Model, SerializerMixin):
    __tablename__= 'reporting'
    id = db.Column(db.Integer, primary_key=True)
    user_id =db.Column(db.Integer, db.ForeignKey('user.id', nullable=True))
    project_id =db.Column(db.Integer,db.ForeignKey('project.id', nullable=True))
    task_id =db.Column(db.Integer, db.ForeignKey('task.id', nullable=True))
    task_amount =db.Column(db.Integer,nullable=False)
    ongoing_projects =db.Column(db.Integer, default=0)
    completed_task =db.Column(db.Integer)
    ongoing_tasks =db.Column(db.Integer)
    task_by_user =db.Column(db.Integer)
    deadline =db.Column(db.DateTime, nullable=True)

##Relationship
    user = db.relationship("User", back_populates="reportings")
    project = db.relationship("Project", back_populates="reportings")
    task = db.relationship("Task", back_populates="reportings")

class Comments(db.Model, SerializerMixin):
    __tablename__ ='comment'
    id = db.Column(db.Integer, primary_key=True)  
    user_id =db.Column(db.Integer, db.ForeignKey('user.id', nullable=True))
    name =db.Column(db.String(100), nullable=False)
    Comment =db.Column(db.Text, nullable=False)

      # Relationships
    user = db.relationship('User', back_populates='comments')

class Templates(db.Model, SerializerMixin):
    __tablename__ = 'template'
    id =db.Column(db.Integer, primary_key=True)
    name =db.Column(db.String(100), nullable=False)
    link =db.Column(db.String, nullable=True)

# Relationships
    user = db.relationship('User', back_populates='templates')