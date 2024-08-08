from app import app, db  # Import your Flask app instance and SQLAlchemy object
from models import User, Project, Task, Activities, Comment, Template
from flask_bcrypt import Bcrypt
from datetime import datetime

bcrypt = Bcrypt(app)

def seed_data():
    try:
        # Clear existing data (if any)
        db.drop_all()
        db.create_all()

        # Seed users
        users = [
            User(name='Alice', email='alice@example.com', password=bcrypt.generate_password_hash('password1').decode('utf-8'), is_admin=False, is_instructor=False, is_student=True),
            User(name='Bob', email='bob@example.com', password=bcrypt.generate_password_hash('password2').decode('utf-8'), is_admin=True, is_instructor=False, is_student=False),
            User(name='Charlie', email='charlie@example.com', password=bcrypt.generate_password_hash('password3').decode('utf-8'), is_admin=False, is_instructor=True, is_student=False),
            User(name='David', email='david@example.com', password=bcrypt.generate_password_hash('password4').decode('utf-8'), is_admin=False, is_instructor=False, is_student=True),
            User(name='Eve', email='eve@example.com', password=bcrypt.generate_password_hash('password5').decode('utf-8'), is_admin=False, is_instructor=False, is_student=True)
        ]
        db.session.add_all(users)
        db.session.commit()

        # Get user IDs after commits
        user_ids = [user.id for user in users]

        # Seed projects
        projects = [
            Project(name='Project Alpha', description='First project description', status='Completed', user_id=user_ids[0]),
            Project(name='Project Beta', description='Second project description', status='In Progress', user_id=user_ids[1]),
            Project(name='Project Gamma', description='Third project description', status='Completed', user_id=user_ids[2]),
        ]
        db.session.add_all(projects)
        db.session.commit()

        # Get project IDs after commits
        project_ids = [project.id for project in projects]

        # Seed tasks
        tasks = [
            Task(task_name='Task 1', project_id=project_ids[0], user_id=user_ids[0], status='In Progress', deadline=datetime.utcnow()),
            Task(task_name='Task 2', project_id=project_ids[1], user_id=user_ids[1], status='Completed', deadline=datetime.utcnow()),
            Task(task_name='Task 3', project_id=project_ids[2], user_id=user_ids[2], status='Pending', deadline=datetime.utcnow()),
        ]
        db.session.add_all(tasks)
        db.session.commit()

        # Get task IDs after commits
        task_ids = [task.id for task in tasks]

        # Seed activities
        activities = [
            Activities(user_id=user_ids[0], project_id=project_ids[0], task_id=task_ids[0], activity="Added 5 tasks", timestamp=datetime.utcnow()),
            Activities(user_id=user_ids[1], project_id=project_ids[1], task_id=task_ids[1], activity="Added a new task", timestamp=datetime.utcnow()),
        ]
        db.session.add_all(activities)
        db.session.commit()

        # Seed comments
        comments = [
            Comment(user_id=user_ids[0], name='Alice', content='This is a comment from Alice.'),
            Comment(user_id=user_ids[1], name='Bob', content='This is a comment from Bob.'),
        ]
        db.session.add_all(comments)
        db.session.commit()

        # Seed templates
        templates = [
            Template(name='Template 1', link='http://example.com/template1'),
            Template(name='Template 2', link='http://example.com/template2'),
        ]
        db.session.add_all(templates)
        db.session.commit()

        print("Database seeded successfully!")

    except Exception as e:
        print(f"An error occurred: {str(e)}")
        db.session.rollback()

if __name__ == '__main__':
    with app.app_context():
        seed_data()