from ..models import Task
from ..database import db

def get_all_tasks():
    return Task.query.all()

def get_task_by_id(task_id):
    return Task.query.get(task_id)

def add_task(title, description=None):
    new_task = Task(title=title, description=description)
    db.session.add(new_task)
    db.session.commit()
    return new_task

def update_task(task_id, **kwargs):
    task = Task.query.get(task_id)
    if task:
        for key, value in kwargs.items():
            setattr(task, key, value)
        db.session.commit()
    return task

def delete_task(task_id):
    task = Task.query.get(task_id)
    if task:
        db.session.delete(task)
        db.session.commit()
        return True
    return False