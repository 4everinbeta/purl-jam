from django.apps import apps
from django.urls import include, path
from .views import health

urlpatterns = [
    path("health", health),
    # Temporarily override root to return 200 OK for health checks
    path("", health),
    path("shop/", include(apps.get_app_config("oscar").urls[0])),
]
