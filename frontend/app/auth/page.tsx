import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Lock, Key, ShieldCheck, AlertTriangle } from "lucide-react"

export default function AuthenticationPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Authentication</h1>
        <p className="text-lg text-muted-foreground">
          Secure your API requests using token-based authentication.
        </p>
      </div>

      <Alert>
        <Key className="h-4 w-4" />
        <AlertDescription>
          All API requests must include an authentication token in the header.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Getting Started with Authentication</CardTitle>
          <CardDescription>How to authenticate your API requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">1. Obtain API Token</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Request an API token from your dashboard or contact the system administrator.
              </p>
              <pre className="bg-accent p-4 rounded-lg text-sm">
                POST /api/auth/token/
                {JSON.stringify({
                  "username": "your-username",
                  "password": "your-password"
                }, null, 2)}
              </pre>
            </div>

            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">2. Include Token in Requests</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Add the token to your request headers:
              </p>
              <pre className="bg-accent p-4 rounded-lg text-sm">
                Authorization: Bearer your-api-token
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Token Management</CardTitle>
          <CardDescription>Managing your authentication tokens</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Endpoint</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><code>/api/auth/token/</code></TableCell>
                <TableCell><Badge>POST</Badge></TableCell>
                <TableCell>Generate new token</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code>/api/auth/token/refresh/</code></TableCell>
                <TableCell><Badge>POST</Badge></TableCell>
                <TableCell>Refresh existing token</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><code>/api/auth/token/revoke/</code></TableCell>
                <TableCell><Badge>POST</Badge></TableCell>
                <TableCell>Revoke active token</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <CardTitle>Security Best Practices</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Never share your API tokens</li>
              <li>Rotate tokens regularly</li>
              <li>Use environment variables</li>
              <li>Implement token refresh logic</li>
              <li>Monitor token usage</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              <CardTitle>Common Issues</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Invalid token format</li>
              <li>Expired tokens</li>
              <li>Missing Authorization header</li>
              <li>Incorrect token prefix</li>
              <li>Rate limiting issues</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}