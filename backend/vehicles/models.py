# backend/vehicles/models.py
from django.db import models
from django.utils import timezone



class Depot(models.Model):
    name = models.CharField(max_length=100)
    latitude = models.FloatField()
    longitude = models.FloatField()
    capacity = models.IntegerField()
    charging_stations = models.IntegerField()
    
    # Track vehicles currently at this depot
    current_vehicles = models.ManyToManyField(
        'Vehicle',  # Reference the model as a string
        related_name='depot',
        blank=True
    )

    def __str__(self):
        return self.name

    def is_full(self):
        return self.current_vehicles.count() >= self.capacity

    def available_charging_stations(self):
        charging_vehicles = self.current_vehicles.filter(state='CHARGING').count()
        return self.charging_stations - charging_vehicles


class Vehicle(models.Model):
    VEHICLE_STATES = [
        ('DOCKED', 'Docked at depot'),
        ('EN_ROUTE_TO_PICKUP', 'En route to pickup'),
        ('AWAITING_PASSENGER', 'Awaiting passenger'),
        ('IN_RIDE', 'In ride'),
        ('RETURNING', 'Returning to depot'),
    ]

    name = models.CharField(max_length=100)
    latitude = models.FloatField()
    longitude = models.FloatField()
    battery_level = models.IntegerField()
    state = models.CharField(
        max_length=20,
        choices=VEHICLE_STATES,
        default='DOCKED'
    )
    
    # Ride tracking
    current_pickup_lat = models.FloatField(null=True, blank=True)
    current_pickup_lng = models.FloatField(null=True, blank=True)
    current_dropoff_lat = models.FloatField(null=True, blank=True)
    current_dropoff_lng = models.FloatField(null=True, blank=True)

    # Additional fields
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    last_maintenance = models.DateTimeField(null=True, blank=True)
    total_rides = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.name} - {self.state}"

    def start_ride(self, pickup_lat, pickup_lng, dropoff_lat, dropoff_lng):
        """Start a new ride"""
        if self.state != 'DOCKED':
            raise ValueError("Vehicle is not available for rides")
        
        self.state = 'EN_ROUTE_TO_PICKUP'
        self.current_pickup_lat = pickup_lat
        self.current_pickup_lng = pickup_lng
        self.current_dropoff_lat = dropoff_lat
        self.current_dropoff_lng = dropoff_lng
        self.save()

    def complete_ride(self):
        """Complete current ride"""
        self.state = 'RETURNING'
        self.total_rides += 1
        self.current_pickup_lat = None
        self.current_pickup_lng = None
        self.current_dropoff_lat = None
        self.current_dropoff_lng = None
        self.save()

    def needs_charging(self):
        """Check if vehicle needs charging"""
        return self.battery_level < 20

    def schedule_maintenance(self):
        """Schedule maintenance for the vehicle"""
        self.last_maintenance = timezone.now()
        self.state = 'DOCKED'
        self.save()