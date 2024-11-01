from rest_framework import authentication
from rest_framework import exceptions
from .models import APIKey
from django.utils import timezone

class APIKeyAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        api_key = request.META.get('HTTP_AUTHORIZATION', '')
        
        if not api_key:
            return None

        try:
            if not api_key.startswith('Bearer '):
                raise exceptions.AuthenticationFailed('Invalid API key format')
            
            key = api_key.split(' ')[1]
            api_key_obj = APIKey.objects.get(key=key, is_active=True)
            
            # Update last used timestamp
            api_key_obj.last_used = timezone.now()
            api_key_obj.save()
            
            return (api_key_obj.user, None)
        except APIKey.DoesNotExist:
            raise exceptions.AuthenticationFailed('Invalid API key')