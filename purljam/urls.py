from django.apps import apps
from django.urls import include, path
from .views import health

urlpatterns = [
    path("health", health),
    path("", include(apps.get_app_config("oscar").urls[0])),
]
