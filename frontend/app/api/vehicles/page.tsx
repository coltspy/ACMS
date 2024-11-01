import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Car, Battery, MapPin } from "lucide-react"

export default function VehiclesAPIPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Vehicles API</h1>
        <p className="text-lg text-muted-foreground">
          Complete reference for the Vehicles API endpoints, including vehicle management, status updates, and ride operations.
        </p>
      </div>

      <Alert>
        <Car className="h-4 w-4" />
        <AlertDescription>
          Base URL for all vehicle endpoints: <code className="text-sm">/api/vehicles/</code>
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Vehicle States</CardTitle>
          <CardDescription>Available vehicle states in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {[
              { state: "DOCKED", description: "Vehicle is docked at a depot" },
              { state: "EN_ROUTE_TO_PICKUP", description: "Vehicle is heading to pickup location" },
              { state: "AWAITING_PASSENGER", description: "Vehicle is waiting for passenger" },
              { state: "IN_RIDE", description: "Vehicle is currently in a ride" },
              { state: "RETURNING", description: "Vehicle is returning to depot" }
            ].map(({ state, description }) => (
              <div key={state} className="flex items-start gap-2 p-4 border rounded-lg">
                <Badge variant="outline">{state}</Badge>
                <span className="text-sm text-muted-foreground">{description}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Endpoints</CardTitle>
          <CardDescription>Available API endpoints for vehicle management</CardDescription>
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
                  <Badge>GET</Badge>
                </TableCell>
                <TableCell><code>/api/vehicles/</code></TableCell>
                <TableCell>List all vehicles</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Badge>POST</Badge>
                </TableCell>
                <TableCell><code>/api/vehicles/</code></TableCell>
                <TableCell>Create a new vehicle</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Badge>GET</Badge>
                </TableCell>
                <TableCell><code>/api/vehicles/{'{id}'}/</code></TableCell>
                <TableCell>Get vehicle details</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Badge>POST</Badge>
                </TableCell>
                <TableCell><code>/api/vehicles/{'{id}'}/request_ride/</code></TableCell>
                <TableCell>Request a ride from vehicle</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Badge>POST</Badge>
                </TableCell>
                <TableCell><code>/api/vehicles/{'{id}'}/complete_ride/</code></TableCell>
                <TableCell>Complete current ride</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Badge>POST</Badge>
                </TableCell>
                <TableCell><code>/api/vehicles/{'{id}'}/schedule_maintenance/</code></TableCell>
                <TableCell>Schedule vehicle maintenance</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Battery className="h-5 w-5 text-primary" />
              <CardTitle>Battery Management</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Vehicles automatically monitor battery levels and request charging when below 20%.
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Battery level monitoring</li>
              <li>Automatic charging requests</li>
              <li>Charging status updates</li>
              <li>Low battery alerts</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <CardTitle>Maintenance</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Schedule and track vehicle maintenance through the API.
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Maintenance scheduling</li>
              <li>Service history tracking</li>
              <li>Maintenance alerts</li>
              <li>Service status updates</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}