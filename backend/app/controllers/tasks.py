from flask import request, jsonify
from app.models import Task
from app.services.task_services import add_task, delete_task, update_task, get_all_tasks

def register_routes(app):
    @app.route('/tasks', methods=['GET'])
    def get_tasks():
        tasks = get_all_tasks()
        return jsonify([{'id': task.id, 'title': task.title, 'description': task.description, 'completed': task.completed} for task in tasks]), 200

    @app.route('/tasks/<int:task_id>', methods=['GET'])
    def get_single_task(task_id):
        task = Task.query.get(task_id)
        if task:
            return jsonify({'id': task.id, 'title': task.title, 'description': task.description, 'completed': task.completed}), 200
        else:
            return jsonify({'message': 'Task not found'}), 404

    @app.route('/tasks', methods=['POST'])
    def create_task():
        data = request.json
        task = add_task(title=data['title'], description=data.get('description'))
        return jsonify({'id': task.id, 'title': task.title, 'description': task.description, 'completed': task.completed}), 201

    @app.route('/tasks/<int:task_id>', methods=['DELETE'])
    def delete_single_task(task_id):
        success = delete_task(task_id)
        if success:
            return jsonify({'message': 'Task deleted successfully'}), 200
        else:
            return jsonify({'message': 'Task not found'}), 404

    @app.route('/tasks/<int:task_id>', methods=['PUT'])
    def update_single_task(task_id):
        data = request.json
        task = update_task(task_id, **data)
        if task:
            return jsonify({'id': task.id, 'title': task.title, 'description': task.description, 'completed': task.completed}), 200
        else:
            return jsonify({'message': 'Task not found'}), 404
