from app.controllers.tasks import register_task_routes
def setup_routes(app):
    register_task_routes(app)

