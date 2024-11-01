import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { FileCode, Terminal, PackageCheck } from "lucide-react"

export default function PythonSDKPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Python SDK Examples</h1>
        <p className="text-lg text-muted-foreground">
          Code examples for interacting with the ACMS API using Python.
        </p>
      </div>

      <Alert>
        <PackageCheck className="h-4 w-4" />
        <AlertDescription>
          Install required packages: <code className="text-sm">pip install requests websockets asyncio</code>
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Basic Setup</CardTitle>
          <CardDescription>Initialize the API client</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="bg-accent p-4 rounded-lg text-sm">
            {`import requests

class ACMSClient:
    def __init__(self, base_url, api_token):
        self.base_url = base_url  # e.g. "http://localhost:8000" or "https://api.yourdomain.com"
        self.headers = {
            "Authorization": f"Bearer {api_token}",
            "Content-Type": "application/json"
        }
    
    def get_vehicles(self):
        response = requests.get(f"{self.base_url}/api/vehicles/", headers=self.headers)
        return response.json()
    
    def get_vehicle_status(self, vehicle_id):
        response = requests.get(
            f"{self.base_url}/api/vehicles/{vehicle_id}/status/", 
            headers=self.headers
        )
        return response.json()

# Initialize client
client = ACMSClient(
    base_url="http://localhost:8000",  # Change this to your domain
    api_token="your-api-token"
)`}</pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Real-time Vehicle Updates</CardTitle>
          <CardDescription>WebSocket connection for vehicle tracking</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="bg-accent p-4 rounded-lg text-sm">
            {`import asyncio
import websockets
import json

async def connect_vehicle_updates():
    # Use ws:// for local development, wss:// for production
    uri = "ws://localhost:8000/ws/vehicles/"  # Change to your domain
    
    async with websockets.connect(uri) as websocket:
        # Send vehicle updates
        update = {
            "vehicles": [{
                "id": 123,
                "latitude": 34.0522,
                "longitude": -118.2437,
                "battery_level": 85,
                "state": "DOCKED"
            }]
        }
        await websocket.send(json.dumps(update))
        
        # Listen for updates
        while True:
            try:
                message = await websocket.recv()
                data = json.loads(message)
                print(f"Received update: {data}")
            except websockets.exceptions.ConnectionClosed:
                print("Connection closed")
                break

# Run the WebSocket client
asyncio.get_event_loop().run_until_complete(connect_vehicle_updates())`}</pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Vehicle Operations</CardTitle>
          <CardDescription>Common vehicle management tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="bg-accent p-4 rounded-lg text-sm">
            {`# Request a ride
def request_ride(self, vehicle_id, pickup_lat, pickup_lng, dropoff_lat, dropoff_lng):
    response = requests.post(
        f"{self.base_url}/api/vehicles/{vehicle_id}/request_ride/",
        headers=self.headers,
        json={
            "pickup_lat": pickup_lat,
            "pickup_lng": pickup_lng,
            "dropoff_lat": dropoff_lat,
            "dropoff_lng": dropoff_lng
        }
    )
    return response.json()

# Complete a ride
def complete_ride(self, vehicle_id):
    response = requests.post(
        f"{self.base_url}/api/vehicles/{vehicle_id}/complete_ride/",
        headers=self.headers
    )
    return response.json()

# Schedule maintenance
def schedule_maintenance(self, vehicle_id):
    response = requests.post(
        f"{self.base_url}/api/vehicles/{vehicle_id}/schedule_maintenance/",
        headers=self.headers
    )
    return response.json()`}</pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Fleet Management</CardTitle>
          <CardDescription>Fleet-wide operations and statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="bg-accent p-4 rounded-lg text-sm">
            {`# Get fleet statistics
def get_fleet_stats(self):
    response = requests.get(
        f"{self.base_url}/api/fleet/statistics/",
        headers=self.headers
    )
    return response.json()

# Get vehicle distribution
def get_vehicle_distribution(self):
    response = requests.get(
        f"{self.base_url}/api/fleet/vehicle_distribution/",
        headers=self.headers
    )
    return response.json()`}</pre>
        </CardContent>
      </Card>
    </div>
  )
}