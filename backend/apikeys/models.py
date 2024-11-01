# backend/apikeys/models.py
from django.db import models
from django.utils import timezone
import secrets

class GlobalAPIKey(models.Model):
    key = models.CharField(max_length=64, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    calls_made = models.IntegerField(default=0)
    calls_limit = models.IntegerField(default=1000)
    last_reset = models.DateTimeField(default=timezone.now)

    def save(self, *args, **kwargs):
        if not self.key:
            self.key = secrets.token_urlsafe(32)
        
        # Reset counter if it's a new day
        now = timezone.now()
        if (now - self.last_reset).days >= 1:
            self.calls_made = 0
            self.last_reset = now

        super().save(*args, **kwargs)

    def __str__(self):
        return f"Global API Key (Used: {self.calls_made}/{self.calls_limit})"