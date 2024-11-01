import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MapPin, Radio, Navigation } from "lucide-react"

export default function RealTimeTrackingPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Real-time Tracking Example</h1>
        <p className="text-lg text-muted-foreground">
          Implement real-time vehicle tracking using WebSocket and mapping libraries.
        </p>
      </div>

      <Alert>
        <MapPin className="h-4 w-4" />
        <AlertDescription>
          This example uses Leaflet for mapping, but you can adapt it to any mapping library.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Complete Implementation</CardTitle>
          <CardDescription>Real-time vehicle tracking with map visualization</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="bg-accent p-4 rounded-lg text-sm">
            {`<!DOCTYPE html>
<html>
<head>
    <title>Vehicle Tracking</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
    <style>
        #map { height: 500px; }
        .vehicle-info { padding: 10px; background: #f0f0f0; }
    </style>
</head>
<body>
    <div id="map"></div>
    <div id="vehicle-info" class="vehicle-info"></div>

    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
    <script>
        class VehicleTracker {
            constructor() {
                // Initialize map
                this.map = L.map('map').setView([34.0522, -118.2437], 13);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
                
                this.vehicles = new Map(); // Store vehicle markers
                this.initializeWebSocket();
            }

            initializeWebSocket() {
                // Change this to your domain
                this.ws = new WebSocket('ws://localhost:8000/ws/vehicles/');
                
                this.ws.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    this.updateVehicles(data.vehicles);
                };

                this.ws.onclose = () => {
                    console.log('WebSocket disconnected');
                    setTimeout(() => this.initializeWebSocket(), 2000);
                };
            }

            updateVehicles(vehicles) {
                vehicles.forEach(vehicle => {
                    const { id, latitude, longitude, state, battery_level } = vehicle;
                    
                    // Create or update marker
                    let marker = this.vehicles.get(id);
                    if (!marker) {
                        marker = L.marker([latitude, longitude]).addTo(this.map);
                        this.vehicles.set(id, marker);
                    } else {
                        marker.setLatLng([latitude, longitude]);
                    }

                    // Update popup content
                    marker.bindPopup(\`
                        <b>Vehicle \${id}</b><br>
                        Status: \${state}<br>
                        Battery: \${battery_level}%
                    \`);

                    // Update info panel
                    document.getElementById('vehicle-info').innerHTML = \`
                        <h3>Vehicle \${id}</h3>
                        <p>Status: \${state}</p>
                        <p>Battery: \${battery_level}%</p>
                        <p>Location: \${latitude.toFixed(4)}, \${longitude.toFixed(4)}</p>
                    \`;
                });
            }
        }

        // Initialize tracker
        const tracker = new VehicleTracker();

        // Clean up on page unload
        window.addEventListener('beforeunload', () => {
            if (tracker.ws) {
                tracker.ws.close();
            }
        });
    </script>
</body>
</html>`}</pre>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Key Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Real-time map updates</li>
              <li>Vehicle status visualization</li>
              <li>Battery level monitoring</li>
              <li>Automatic reconnection</li>
              <li>Popup information windows</li>
              <li>Status panel updates</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Implementation Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Replace WebSocket URL with your domain</li>
              <li>Add error handling as needed</li>
              <li>Consider adding authentication</li>
              <li>Add loading states</li>
              <li>Implement custom markers</li>
              <li>Add route visualization</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Testing the Implementation</CardTitle>
          <CardDescription>Steps to verify the tracking system</CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
            <li>Start your Django development server</li>
            <li>Open the HTML file in a browser</li>
            <li>Send test updates using the Python or JavaScript API client</li>
            <li>Verify markers appear and update on the map</li>
            <li>Check that popups show correct information</li>
            <li>Test WebSocket reconnection by restarting the server</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}