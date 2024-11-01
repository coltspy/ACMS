import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Building2, Battery, ParkingCircle } from "lucide-react"

export default function DepotsAPIPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Depots API</h1>
        <p className="text-lg text-muted-foreground">
          Complete reference for the Depots API endpoints, including depot management, vehicle assignments, and capacity tracking.
        </p>
      </div>

      <Alert>
        <Building2 className="h-4 w-4" />
        <AlertDescription>
          Base URL for all depot endpoints: <code className="text-sm">/api/depots/</code>
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Endpoints</CardTitle>
          <CardDescription>Available API endpoints for depot management</CardDescription>
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
                <TableCell><code>/api/depots/</code></TableCell>
                <TableCell>List all depots</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Badge>POST</Badge>
                </TableCell>
                <TableCell><code>/api/depots/</code></TableCell>
                <TableCell>Create a new depot</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Badge>GET</Badge>
                </TableCell>
                <TableCell><code>/api/depots/{'{id}'}/</code></TableCell>
                <TableCell>Get depot details</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Badge>POST</Badge>
                </TableCell>
                <TableCell><code>/api/depots/{'{id}'}/assign_vehicle/</code></TableCell>
                <TableCell>Assign vehicle to depot</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <ParkingCircle className="h-5 w-5 text-primary" />
              <CardTitle>Capacity Management</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Monitor and manage depot capacity and vehicle assignments.
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Total capacity tracking</li>
              <li>Current vehicle count</li>
              <li>Space availability checks</li>
              <li>Capacity alerts</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Battery className="h-5 w-5 text-primary" />
              <CardTitle>Charging Stations</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Manage charging stations and monitor their availability.
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Charging station status</li>
              <li>Available stations tracking</li>
              <li>Charging queue management</li>
              <li>Station maintenance status</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Response Format</CardTitle>
          <CardDescription>Example depot response object</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="bg-accent p-4 rounded-lg overflow-x-auto">
            {JSON.stringify({
              id: 1,
              name: "Downtown Depot",
              latitude: 34.0522,
              longitude: -118.2437,
              capacity: 50,
              charging_stations: 10,
              vehicle_count: 42,
              available_charging_slots: 4
            }, null, 2)}
          </pre>
        </CardContent>
      </Card>
    </div>
  )
}