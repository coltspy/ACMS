import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { FileCode, Terminal, PackageCheck } from "lucide-react"

export default function JavaScriptPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">JavaScript Examples</h1>
        <p className="text-lg text-muted-foreground">
          Code examples for interacting with the ACMS API using JavaScript.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>API Client Class</CardTitle>
          <CardDescription>Basic API client implementation</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="bg-accent p-4 rounded-lg text-sm">
            {`class ACMSClient {
  constructor(baseUrl, apiToken) {
    this.baseUrl = baseUrl;  // e.g. "http://localhost:8000" or "https://api.yourdomain.com"
    this.headers = {
      'Authorization': \`Bearer \${apiToken}\`,
      'Content-Type': 'application/json'
    };
  }

  // Fetch wrapper with error handling
  async fetchAPI(endpoint, options = {}) {
    try {
      const response = await fetch(\`\${this.baseUrl}\${endpoint}\`, {
        ...options,
        headers: { ...this.headers, ...options.headers }
      });

      if (!response.ok) {
        throw new Error(\`API error: \${response.status}\`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Get all vehicles
  async getVehicles() {
    return this.fetchAPI('/api/vehicles/');
  }

  // Get vehicle status
  async getVehicleStatus(vehicleId) {
    return this.fetchAPI(\`/api/vehicles/\${vehicleId}/status/\`);
  }

  // Request a ride
  async requestRide(vehicleId, pickupLat, pickupLng, dropoffLat, dropoffLng) {
    return this.fetchAPI(\`/api/vehicles/\${vehicleId}/request_ride/\`, {
      method: 'POST',
      body: JSON.stringify({
        pickup_lat: pickupLat,
        pickup_lng: pickupLng,
        dropoff_lat: dropoffLat,
        dropoff_lng: dropoffLng
      })
    });
  }

  // Complete a ride
  async completeRide(vehicleId) {
    return this.fetchAPI(\`/api/vehicles/\${vehicleId}/complete_ride/\`, {
      method: 'POST'
    });
  }

  // Get fleet statistics
  async getFleetStats() {
    return this.fetchAPI('/api/fleet/statistics/');
  }
}`}</pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>WebSocket Connection</CardTitle>
          <CardDescription>Real-time vehicle updates using WebSocket</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="bg-accent p-4 rounded-lg text-sm">
            {`class VehicleWebSocket {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;  // e.g. "ws://localhost:8000/ws/vehicles/"
    this.socket = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
  }

  connect() {
    this.socket = new WebSocket(this.wsUrl);

    this.socket.onopen = () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
    };

    this.socket.onclose = () => {
      console.log('WebSocket disconnected');
      this.handleReconnect();
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Received update:', data);
      // Handle the update in your application
    };
  }

  handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(\`Reconnecting... Attempt \${this.reconnectAttempts}\`);
      setTimeout(() => this.connect(), 2000 * this.reconnectAttempts);
    }
  }

  sendVehicleUpdate(vehicles) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ vehicles }));
    } else {
      console.error('WebSocket is not connected');
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }
}`}</pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Usage Example</CardTitle>
          <CardDescription>Implementing the API client and WebSocket</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="bg-accent p-4 rounded-lg text-sm">
            {`// Initialize API client
const client = new ACMSClient(
  'http://localhost:8000',  // Change to your domain
  'your-api-token'
);

// Initialize WebSocket
const ws = new VehicleWebSocket(
  'ws://localhost:8000/ws/vehicles/'  // Change to your domain
);

// Connect to WebSocket
ws.connect();

// Example: Get vehicles and send update
async function updateVehicleLocation() {
  try {
    // Get vehicles
    const vehicles = await client.getVehicles();
    
    // Send location update for first vehicle
    ws.sendVehicleUpdate([{
      id: vehicles[0].id,
      latitude: 34.0522,
      longitude: -118.2437,
      battery_level: 85,
      state: 'DOCKED'
    }]);

  } catch (error) {
    console.error('Error:', error);
  }
}

// Clean up on page unload
window.addEventListener('beforeunload', () => {
  ws.disconnect();
});`}</pre>
        </CardContent>
      </Card>
    </div>
  )
}