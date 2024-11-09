import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Waves, Zap, AlertCircle } from "lucide-react"

export default function WebSocketPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">WebSocket Events</h1>
        <p className="text-lg text-muted-foreground">
          Real-time vehicle updates using WebSocket connections.
        </p>
      </div>

      <Alert>
        <Waves className="h-4 w-4" />
        <AlertDescription>
          WebSocket endpoint: <code className="text-sm">ws://your-domain/ws/vehicles/</code>
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Vehicle Updates Format</CardTitle>
          <CardDescription>Expected message format for vehicle updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Update Vehicle Data</h3>
              <pre className="bg-accent p-4 rounded-lg text-sm">
                {JSON.stringify({
                  "vehicles": [{
                    "id": 123,
                    "latitude": 34.0522,
                    "longitude": -118.2437,
                    "battery_level": 85,
                    "state": "DOCKED"
                  }]
                }, null, 2)}
              </pre>
            </div>

            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Valid Vehicle States</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>DOCKED - Vehicle is at depot</li>
                <li>EN_ROUTE_TO_PICKUP - Vehicle heading to pickup</li>
                <li>AWAITING_PASSENGER - Vehicle waiting for passenger</li>
                <li>IN_RIDE - Vehicle in active ride</li>
                <li>RETURNING - Vehicle returning to depot</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              <CardTitle>Connection Example</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">JavaScript</p>
                <pre className="bg-accent p-4 rounded-lg text-sm">
                  {`const socket = new WebSocket(
  'ws://your-domain/ws/vehicles/'
);

// Send vehicle updates
socket.send(JSON.stringify({
  vehicles: [{
    id: 123,
    latitude: 34.0522,
    longitude: -118.2437,
    battery_level: 85,
    state: "DOCKED"
  }]
}));`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-primary" />
              <CardTitle>Implementation Notes</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Updates are processed asynchronously</li>
              <li>Each message can update multiple vehicles</li>
              <li>All fields (latitude, longitude, battery_level, state) are required</li>
              <li>Vehicle must exist in database (valid id required)</li>
              <li>State must be one of the valid vehicle states</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Broadcast Updates</CardTitle>
          <CardDescription>Receiving vehicle update broadcasts</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            To receive broadcasts about vehicle updates, connect to the vehicle updates WebSocket:
          </p>
          <pre className="bg-accent p-4 rounded-lg text-sm">
            {`const updates = new WebSocket(
  'ws://your-domain/ws/vehicle_updates/'
);

updates.onmessage = (event) => {
  const update = JSON.parse(event.data);
  console.log('Vehicle update received:', update);
};`}
          </pre>
          <p className="text-sm text-muted-foreground mt-4">
            Broadcasts will be sent whenever vehicle data is updated through the main WebSocket connection.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}