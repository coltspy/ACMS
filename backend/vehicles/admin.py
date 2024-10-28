# backend/vehicles/admin.py
from django.contrib import admin
from .models import Vehicle

@admin.register(Vehicle)
class VehicleAdmin(admin.ModelAdmin):
    list_display = ['name', 'state', 'battery_level']  # Changed 'status' to 'state'
    list_filter = ['state']                            # Changed 'status' to 'state'
    list_editable = ['state']                          # Changed 'status' to 'state'
    search_fields = ['name']