from django.urls import path
from oscar.app import application

urlpatterns = [
    path("", application.urls),
]
