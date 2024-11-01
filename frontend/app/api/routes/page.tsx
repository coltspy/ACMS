import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Route, MapPin, Clock, Navigation } from "lucide-react"

export default function RoutesAPIPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Routes API</h1>
        <p className="text-lg text-muted-foreground">
          Complete reference for the Routes API endpoints, including route planning, optimization, and real-time tracking.
        </p>
      </div>

      <Alert>
        <Route className="h-4 w-4" />
        <AlertDescription>
          Base URL for all route endpoints: <code className="text-sm">/api/routes/</code>
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Route Parameters</CardTitle>
          <CardDescription>Required parameters for route planning</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                param: "pickup_location",
                type: "Object",
                description: "Pickup coordinates (latitude, longitude)"
              },
              {
                param: "dropoff_location",
                type: "Object",
                description: "Dropoff coordinates (latitude, longitude)"
              },
              {
                param: "vehicle_id",
                type: "Integer",
                description: "ID of the assigned vehicle"
              },
              {
                param: "estimated_duration",
                type: "Integer",
                description: "Estimated trip duration in minutes"
              }
            ].map(({ param, type, description }) => (
              <div key={param} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <code className="text-sm font-semibold">{param}</code>
                  <Badge variant="outline">{type}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Endpoints</CardTitle>
          <CardDescription>Available API endpoints for route management</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Method</TableHead>
                <TableHead>Endpoint</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Badge>POST</Badge>
                </TableCell>
                <TableCell><code>/api/routes/plan</code></TableCell>
                <TableCell>Create a new route plan</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Badge>GET</Badge>
                </TableCell>
                <TableCell><code>/api/routes/{'{id}'}</code></TableCell>
                <TableCell>Get route details</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Badge>POST</Badge>
                </TableCell>
                <TableCell><code>/api/routes/{'{id}'}/update</code></TableCell>
                <TableCell>Update route progress</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Badge>GET</Badge>
                </TableCell>
                <TableCell><code>/api/routes/active</code></TableCell>
                <TableCell>List all active routes</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Badge>POST</Badge>
                </TableCell>
                <TableCell><code>/api/routes/{'{id}'}/optimize</code></TableCell>
                <TableCell>Optimize existing route</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Navigation className="h-5 w-5 text-primary" />
              <CardTitle>Route Planning</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Intelligent route planning with real-time optimization.
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Traffic-aware routing</li>
              <li>Multiple waypoint support</li>
              <li>Alternative route suggestions</li>
              <li>Battery-aware planning</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <CardTitle>Real-time Updates</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Live tracking and route progress monitoring.
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Live location tracking</li>
              <li>ETA updates</li>
              <li>Route deviation alerts</li>
              <li>Progress notifications</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Example Request</CardTitle>
          <CardDescription>Sample route planning request</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="bg-accent p-4 rounded-lg overflow-x-auto">
            {JSON.stringify({
              pickup_location: {
                latitude: 34.0522,
                longitude: -118.2437
              },
              dropoff_location: {
                latitude: 34.0689,
                longitude: -118.4452
              },
              vehicle_id: 123,
              preferences: {
                avoid_highways: false,
                minimize_charging_stops: true
              }
            }, null, 2)}
          </pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>WebSocket Updates</CardTitle>
          <CardDescription>Real-time route updates via WebSocket</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Connect to the WebSocket endpoint to receive real-time updates:
          </p>
          <code className="block bg-accent p-4 rounded-lg">
            ws://your-domain/ws/routes/{'{route_id}'}
          </code>
          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium">Update Types:</p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Location updates</li>
              <li>ETA changes</li>
              <li>Route modifications</li>
              <li>Status changes</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}