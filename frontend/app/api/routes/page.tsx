'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clipboard, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const CodeBlock = ({ children, language }: { children: string; language: string }) => (
  <div className="relative">
    <pre className={`language-${language} rounded-md bg-gray-800 p-4 text-sm text-white overflow-x-auto`}>
      <code>{children}</code>
    </pre>
    <Button
      variant="outline"
      size="icon"
      className="absolute right-2 top-2"
      onClick={() => navigator.clipboard.writeText(children)}
    >
      <Clipboard className="h-4 w-4" />
      <span className="sr-only">Copy code</span>
    </Button>
  </div>
)

const EndpointCard = ({ method, endpoint, description, requestExample, responseExample }: {
  method: string;
  endpoint: string;
  description: string;
  requestExample: string;
  responseExample: string;
}) => (
  <Card className="mt-6">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <span className={`px-2 py-1 rounded-md text-white ${method === 'GET' ? 'bg-blue-500' : 'bg-green-500'}`}>
          {method}
        </span>
        <span>{endpoint}</span>
      </CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <Tabs defaultValue="request">
        <TabsList>
          <TabsTrigger value="request">Request</TabsTrigger>
          <TabsTrigger value="response">Response</TabsTrigger>
        </TabsList>
        <TabsContent value="request">
          <CodeBlock language="bash">{requestExample}</CodeBlock>
        </TabsContent>
        <TabsContent value="response">
          <CodeBlock language="json">{responseExample}</CodeBlock>
        </TabsContent>
      </Tabs>
    </CardContent>
  </Card>
)

export default function RoutesAPI() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Routes API</h1>
      <p className="text-gray-600 mb-6">
        Manage and track vehicle routes, including start and end locations.
      </p>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Authentication Required</AlertTitle>
        <AlertDescription>
          All API requests require a valid API key to be included in the header.
        </AlertDescription>
      </Alert>

      <EndpointCard
        method="GET"
        endpoint="/api/routes"
        description="Retrieve a list of all routes, including start and end locations."
        requestExample={`
GET /api/routes
Authorization: Bearer YOUR_API_KEY`}
        responseExample={`
{
  "routes": [
    {
      "id": 1,
      "start_location": "Depot A",
      "end_location": "Depot B"
    },
    {
      "id": 2,
      "start_location": "Depot C",
      "end_location": "Depot D"
    }
  ]
}`}
      />

      <EndpointCard
        method="POST"
        endpoint="/api/routes"
        description="Create a new route by specifying start and end locations."
        requestExample={`
POST /api/routes
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json

{
  "start_location": "Depot A",
  "end_location": "Depot E"
}`}
        responseExample={`
{
  "id": 3,
  "start_location": "Depot A",
  "end_location": "Depot E"
}`}
      />
    </div>
  )
}