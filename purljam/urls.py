from django.apps import apps
from django.contrib import admin
from django.urls import include, path
from .views import health, homepage

urlpatterns = [
    path("health/", health),
    path("health", health),  # Support both with and without trailing slash
    path("", homepage, name="home"),
    path("admin/", admin.site.urls),
    path("shop/", include(apps.get_app_config("oscar").urls[0])),
]
