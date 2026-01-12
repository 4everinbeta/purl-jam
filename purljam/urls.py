from django.apps import apps
from django.urls import path

application = apps.get_app_config("oscar")

urlpatterns = [
    path("", application.urls),
]
