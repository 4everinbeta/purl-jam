from django.db import models
from django.utils.translation import gettext_lazy as _

class InstructionalVideo(models.Model):
    title = models.CharField(_("Title"), max_length=255)
    description = models.TextField(_("Description"), blank=True)
    video_file = models.FileField(_("Video File"), upload_to="videos/")
    thumbnail = models.ImageField(_("Thumbnail"), upload_to="videos/thumbnails/", blank=True, null=True)
    duration = models.DurationField(_("Duration"), blank=True, null=True, help_text=_("e.g. 00:05:30"))
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = _("Instructional Video")
        verbose_name_plural = _("Instructional Videos")
        ordering = ["-created_at"]

    def __str__(self):
        return self.title