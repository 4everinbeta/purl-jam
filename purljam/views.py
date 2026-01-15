from django.http import HttpResponse, JsonResponse
from django.db import connection

def health(request):
    """Health check endpoint that verifies database connectivity"""
    try:
        # Test database connection
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")

        return JsonResponse({
            "status": "healthy",
            "database": "connected"
        })
    except Exception as e:
        return JsonResponse({
            "status": "unhealthy",
            "database": "disconnected",
            "error": str(e)
        }, status=503)
