import os
import base64
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text, Enum, Table
from sqlalchemy.orm import relationship, validates
from werkzeug.utils import secure_filename

db = SQLAlchemy()

# Helper table for many-to-many relationship between Teams and Users
team_user = Table('team_user', db.Model.metadata,
    Column('team_id', Integer, ForeignKey('team.id'), primary_key=True),
    Column('user_id', Integer, ForeignKey('user.id'), primary_key=True)
)

class User(db.Model):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True)
    name = Column(String(80), nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    role = Column(Enum('Admin', 'Manager', 'Developer', 'Designer', name='user_roles'), nullable=False)
    teams = relationship('Team', secondary=team_user, back_populates='users')

class Project(db.Model):
    __tablename__ = 'project'

    id = Column(Integer, primary_key=True)
    name = Column(String(120), nullable=False)
    description = Column(Text, nullable=False)
    deadline = Column(DateTime, nullable=False)
    attached_files = Column(Text)  # Base64 encoded string

    @validates('attached_files')
    def convert_file_to_base64(self, key, file_data):
        if file_data:
            filename = secure_filename(file_data.filename)
            filepath = os.path.join('uploads', filename)
            file_data.save(filepath)
            
            with open(filepath, "rb") as file:
                file_base64 = base64.b64encode(file.read()).decode('utf-8')
            
            os.remove(filepath)  # Remove the file after converting to base64
            return file_base64
        return None

class Template(db.Model):
    __tablename__ = 'template'

    id = Column(Integer, primary_key=True)
    name = Column(String(120), nullable=False)
    link = Column(String(255), nullable=False)

class Team(db.Model):
    __tablename__ = 'team'

    id = Column(Integer, primary_key=True)
    team_name = Column(String(120), nullable=False)
    users = relationship('User', secondary=team_user, back_populates='teams')
    status = Column(Enum('Active', 'Inactive', name='team_status'), nullable=False)

class Task(db.Model):
    __tablename__ = 'task'

    id = Column(Integer, primary_key=True)
    name = Column(String(120), nullable=False)
    description = Column(Text, nullable=False)
    deadline = Column(DateTime, nullable=False)
    file_attachments = Column(Text)  # Base64 encoded string
    project_id = Column(Integer, ForeignKey('project.id'), nullable=False)
    project = relationship('Project', back_populates='tasks')

    @validates('file_attachments')
    def convert_file_to_base64(self, key, file_data):
        if file_data:
            filename = secure_filename(file_data.filename)
            filepath = os.path.join('uploads', filename)
            file_data.save(filepath)
            
            with open(filepath, "rb") as file:
                file_base64 = base64.b64encode(file.read()).decode('utf-8')
            
            os.remove(filepath)  # Remove the file after converting to base64
            return file_base64
        return None

Project.tasks = relationship('Task', order_by=Task.id, back_populates='project')
