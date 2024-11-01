# backend/apikeys/serializers.py
from rest_framework import serializers
from .models import GlobalAPIKey

class GlobalAPIKeySerializer(serializers.ModelSerializer):
    class Meta:
        model = GlobalAPIKey
        fields = ['id', 'key', 'name', 'created_at', 'is_active', 'calls_made', 'calls_limit']
        read_only_fields = ['key', 'created_at', 'calls_made', 'calls_limit']