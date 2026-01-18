from django.apps import apps
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import include, path, re_path
from django.views.static import serve
from .views import health, homepage

urlpatterns = [
    path("health/", health),
    path("health", health),  # Support both with and without trailing slash
    path("", homepage, name="home"),
    path("admin/", admin.site.urls),
    path("shop/", include(apps.get_app_config("oscar").urls[0])),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Force media serving in production (since we are using local storage for this demo)
if not settings.DEBUG:
    urlpatterns += [
        re_path(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
    ]
