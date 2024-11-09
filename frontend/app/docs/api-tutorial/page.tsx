import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Code2, Wrench, BookOpen, Terminal } from "lucide-react"

export default function DocumentationPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Documentation</h1>
        <p className="text-lg text-muted-foreground">
          Everything you need to integrate with the Autonomous Car Management System.
        </p>
      </div>

      <Tabs defaultValue="getting-started">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
          <TabsTrigger value="installation">Installation</TabsTrigger>
          <TabsTrigger value="best-practices">Best Practices</TabsTrigger>
        </TabsList>

        <TabsContent value="getting-started" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Start Guide</CardTitle>
              <CardDescription>Get up and running with ACMS API</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Prerequisites</h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Python 3.8 or higher</li>
                  <li>Django 5.0 or higher</li>
                  <li>Redis (for WebSocket support)</li>
                  <li>Virtual environment (recommended)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Basic Concepts</h3>
                <div className="grid gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Vehicles</h4>
                    <p className="text-sm text-muted-foreground">
                      Autonomous vehicles with real-time tracking, battery management, and ride handling capabilities.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Depots</h4>
                    <p className="text-sm text-muted-foreground">
                      Physical locations where vehicles can dock, charge, and undergo maintenance.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Fleet Management</h4>
                    <p className="text-sm text-muted-foreground">
                      System-wide operations including vehicle distribution and performance monitoring.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>First Steps</CardTitle>
              <CardDescription>Essential API operations to get started</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-accent rounded-lg">
                  <p className="text-sm font-medium mb-2">1. List all vehicles</p>
                  <pre className="text-sm">
                    GET /api/vehicles/
                  </pre>
                </div>
                
                <div className="p-4 bg-accent rounded-lg">
                  <p className="text-sm font-medium mb-2">2. Get fleet statistics</p>
                  <pre className="text-sm">
                    GET /api/fleet/statistics/
                  </pre>
                </div>

                <div className="p-4 bg-accent rounded-lg">
                  <p className="text-sm font-medium mb-2">3. Request a ride</p>
                  <pre className="text-sm">
                    POST /api/vehicles/{'{id}'}/request_ride/
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="installation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Installation Guide</CardTitle>
              <CardDescription>Step-by-step setup instructions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">1. Clone the Repository</h3>
                  <pre className="bg-accent p-4 rounded-lg text-sm">
                    git clone https://github.com/coltspy/acms.git
                    cd acms
                  </pre>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">2. Set Up Virtual Environment</h3>
                  <pre className="bg-accent p-4 rounded-lg text-sm">
                    python -m venv venv
                    source venv/bin/activate  # On Windows: venv\Scripts\activate
                  </pre>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">3. Install Dependencies</h3>
                  <pre className="bg-accent p-4 rounded-lg text-sm">
                    pip install -r requirements.txt
                  </pre>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">4. Database Setup</h3>
                  <pre className="bg-accent p-4 rounded-lg text-sm">
                    python manage.py migrate
                  </pre>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">5. Start Development Server</h3>
                  <pre className="bg-accent p-4 rounded-lg text-sm">
                    python manage.py runserver
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="best-practices" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Best Practices</CardTitle>
              <CardDescription>Recommended patterns and approaches</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Vehicle Management</h3>
                  <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                    <li>Regularly poll vehicle status for up-to-date information</li>
                    <li>Implement proper error handling for ride requests</li>
                    <li>Monitor battery levels and schedule charging proactively</li>
                    <li>Handle maintenance schedules during off-peak hours</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Depot Operations</h3>
                  <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                    <li>Track depot capacity to prevent overcrowding</li>
                    <li>Maintain optimal charging station availability</li>
                    <li>Balance vehicle distribution across depots</li>
                    <li>Regular maintenance of charging infrastructure</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">WebSocket Usage</h3>
                  <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                    <li>Implement reconnection logic for WebSocket connections</li>
                    <li>Handle connection errors gracefully</li>
                    <li>Process real-time updates efficiently</li>
                    <li>Consider message queuing for high-traffic scenarios</li>
                  </ul>
                </div>

                <Alert>
                  <Terminal className="h-4 w-4" />
                  <AlertDescription>
                    Remember to implement proper error handling and follow REST API best practices for all endpoints.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}