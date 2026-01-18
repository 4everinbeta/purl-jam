from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.db import connection
from classes.models import InstructionalVideo
import logging

logger = logging.getLogger(__name__)


def homepage(request):
    """Render the custom Purl Jam homepage"""
    videos = InstructionalVideo.objects.all()
    return render(request, 'oscar/index.html', {'videos': videos})


def health(request):
    """Health check endpoint that verifies database connectivity"""
    logger.info(f"Health check request received from {request.META.get('REMOTE_ADDR')}")

    try:
        # Test database connection
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
            result = cursor.fetchone()

        response = JsonResponse({
            "status": "healthy",
            "database": "connected",
            "check": "passed"
        })
        logger.info("Health check: OK")
        return response

    except Exception as e:
        logger.error(f"Health check failed: {e}", exc_info=True)
        return JsonResponse({
            "status": "unhealthy",
            "database": "disconnected",
            "error": str(e)
        }, status=503)
