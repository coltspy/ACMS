# backend/vehicles/views.py
from django.db.models import Count
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Depot, Vehicle
from .serializers import VehicleSerializer
from django.db.models import Avg  # Add this for average calculation
from .serializers import DepotSerializer  # Add this for DepotViewSet


class VehicleViewSet(viewsets.ModelViewSet):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer

    @action(detail=True, methods=['POST'])
    def request_ride(self, request, pk=None):
        """
        Request a ride from this vehicle
        """
        vehicle = self.get_object()
        try:
            vehicle.start_ride(
                pickup_lat=request.data.get('pickup_lat'),
                pickup_lng=request.data.get('pickup_lng'),
                dropoff_lat=request.data.get('dropoff_lat'),
                dropoff_lng=request.data.get('dropoff_lng')
            )
            return Response({
                'status': 'Ride started',
                'vehicle': VehicleSerializer(vehicle).data
            })
        except ValueError as e:
            return Response(
                {'error': str(e)}, 
                status=status.HTTP_400_BAD_REQUEST
            )

    @action(detail=True, methods=['POST'])
    def complete_ride(self, request, pk=None):
        """
        Complete the current ride
        """
        vehicle = self.get_object()
        vehicle.complete_ride()
        return Response({
            'status': 'Ride completed',
            'vehicle': VehicleSerializer(vehicle).data
        })

    @action(detail=True, methods=['POST'])
    def schedule_maintenance(self, request, pk=None):
        """
        Schedule maintenance for the vehicle
        """
        vehicle = self.get_object()
        vehicle.schedule_maintenance()
        return Response({
            'status': 'Maintenance scheduled',
            'next_maintenance': vehicle.last_maintenance
        })

    @action(detail=True, methods=['GET'])
    def status(self, request, pk=None):
        """
        Get detailed vehicle status
        """
        vehicle = self.get_object()
        return Response({
            'state': vehicle.state,
            'battery_level': vehicle.battery_level,
            'location': {
                'latitude': vehicle.latitude,
                'longitude': vehicle.longitude
            },
            'current_ride': {
                'pickup': {'lat': vehicle.current_pickup_lat, 'lng': vehicle.current_pickup_lng},
                'dropoff': {'lat': vehicle.current_dropoff_lat, 'lng': vehicle.current_dropoff_lng}
            } if vehicle.state in ['EN_ROUTE_TO_PICKUP', 'AWAITING_PASSENGER', 'IN_RIDE'] else None,
            'total_rides': vehicle.total_rides,
            'needs_charging': vehicle.needs_charging(),
            'last_maintenance': vehicle.last_maintenance
        })
    
class FleetViewSet(viewsets.ViewSet):
    @action(detail=False, methods=['GET'])
    def statistics(self, request):
        """Get fleet-wide statistics"""
        return Response({
            'total_vehicles': Vehicle.objects.count(),
            'active_rides': Vehicle.objects.filter(state='IN_RIDE').count(),
            'available_vehicles': Vehicle.objects.filter(state='DOCKED').count(),
            'average_battery': Vehicle.objects.aggregate(Avg('battery_level'))['battery_level__avg'],
            'vehicles_needs_charging': Vehicle.objects.filter(battery_level__lt=20).count()
        })

    @action(detail=False, methods=['GET'])
    def vehicle_distribution(self, request):
        """Get vehicle distribution across depots"""
        return Response(
            Depot.objects.annotate(
                vehicle_count=count('current_vehicles')
            ).values('name', 'vehicle_count', 'capacity')
        )

    @action(detail=False, methods=['POST'])
    def optimize_distribution(self, request):
        """Redistribute vehicles based on demand"""
        # Add your optimization logic here
        pass

class DepotViewSet(viewsets.ModelViewSet):
    queryset = Depot.objects.all()
    serializer_class = DepotSerializer

    @action(detail=True, methods=['POST'])
    def assign_vehicle(self, request, pk=None):
        depot = self.get_object()
        vehicle = Vehicle.objects.get(id=request.data['vehicle_id'])
        
        if not depot.is_full():
            depot.current_vehicles.add(vehicle)
            vehicle.state = 'DOCKED'
            vehicle.save()
            return Response({'status': 'Vehicle assigned to depot'})
        return Response(
            {'error': 'Depot is full'}, 
            status=status.HTTP_400_BAD_REQUEST
        )