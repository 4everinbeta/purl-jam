from django.contrib import admin
from .models import InstructionalVideo

@admin.register(InstructionalVideo)
class InstructionalVideoAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at', 'duration')
    search_fields = ('title', 'description')