# backend/vehicles/serializers.py
from rest_framework import serializers
from .models import Vehicle, Depot

class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = [
            'id', 'name', 'latitude', 'longitude', 
            'battery_level', 'state', 'current_pickup_lat', 
            'current_pickup_lng', 'current_dropoff_lat', 
            'current_dropoff_lng', 'total_rides', 
            'last_maintenance', 'created_at', 'updated_at'
        ]

class DepotSerializer(serializers.ModelSerializer):
    vehicle_count = serializers.SerializerMethodField()
    available_charging_slots = serializers.SerializerMethodField()

    class Meta:
        model = Depot
        fields = [
            'id', 'name', 'latitude', 'longitude', 
            'capacity', 'charging_stations', 
            'vehicle_count', 'available_charging_slots'
        ]
    
    def get_vehicle_count(self, obj):
        return obj.current_vehicles.count()
    
    def get_available_charging_slots(self, obj):
        return obj.available_charging_stations()