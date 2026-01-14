from django.apps import apps
from django.urls import include, path

urlpatterns = [
    path("", include(apps.get_app_config("oscar").urls[0])),
]
