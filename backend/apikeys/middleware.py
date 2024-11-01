# backend/apikeys/middleware.py
from django.http import JsonResponse
from .models import GlobalAPIKey

class APIKeyMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Skip middleware for admin and key endpoint
        if request.path.startswith('/admin') or request.path == '/api/key/':
            return self.get_response(request)

        # Get API key from header
        api_key_header = request.headers.get('X-API-Key')
        
        if not api_key_header:
            return JsonResponse({
                'error': 'No API key provided. Get one from /api/key/'
            }, status=403)

        try:
            key = GlobalAPIKey.objects.get(key=api_key_header)
            
            if key.calls_made >= key.calls_limit:
                return JsonResponse({
                    'error': 'API call limit reached'
                }, status=429)

            # Increment call count
            key.calls_made += 1
            key.save()

            # Add headers to response
            response = self.get_response(request)
            response['X-RateLimit-Limit'] = str(key.calls_limit)
            response['X-RateLimit-Remaining'] = str(key.calls_limit - key.calls_made)
            return response

        except GlobalAPIKey.DoesNotExist:
            return JsonResponse({
                'error': 'Invalid API key'
            }, status=403)