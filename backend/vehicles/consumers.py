# backend/vehicles/consumers.py
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from .models import Vehicle

class VehicleUpdateConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add("vehicle_updates", self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("vehicle_updates", self.channel_name)

    async def vehicle_update(self, event):
        """Send vehicle update to WebSocket"""
        await self.send(text_data=json.dumps(event['data']))



class VehicleConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add("vehicles", self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("vehicles", self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        await self.update_vehicles(data['vehicles'])

    @database_sync_to_async
    def update_vehicles(self, vehicles_data):
        for vehicle_data in vehicles_data:
            vehicle = Vehicle.objects.get(id=vehicle_data['id'])
            vehicle.latitude = vehicle_data['latitude']
            vehicle.longitude = vehicle_data['longitude']
            vehicle.battery_level = vehicle_data['battery_level']
            vehicle.status = vehicle_data['state']
            vehicle.save()