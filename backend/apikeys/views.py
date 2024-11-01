from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import GlobalAPIKey
from .serializers import GlobalAPIKeySerializer

@api_view(['GET'])
def get_api_key(request):
    # Get or create the global key
    key, created = GlobalAPIKey.objects.get_or_create()
    serializer = GlobalAPIKeySerializer(key)
    return Response(serializer.data)

# backend/apikeys/serializers.py
from rest_framework import serializers
from .models import GlobalAPIKey

class GlobalAPIKeySerializer(serializers.ModelSerializer):
    class Meta:
        model = GlobalAPIKey
        fields = ['key', 'calls_made', 'calls_limit', 'created_at']