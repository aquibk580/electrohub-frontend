import { useState, ReactNode } from "react";
import { useMediaQuery } from "react-responsive";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Shield,
  AlertTriangle,
  UserCheck,
  Globe,
  Lock,
  Key,
  FileText,
  RefreshCcw,
  Search,
  Download,
  AlertCircle
} from "lucide-react";
import { Helmet } from "react-helmet-async";

const LogsAndSecurity = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [timeRange, setTimeRange] = useState("24h");
  const [logType, setLogType] = useState("all");

  interface TableWrapperProps {
    children: ReactNode;
  }

  const TableWrapper = ({ children }: TableWrapperProps) => {
    if (isMobile) {
      return (
        <ScrollArea className="w-[calc(100vw-2rem)] max-w-full rounded-md">
          <div className="min-w-[600px]">{children}</div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      );
    }
    return <>{children}</>;
  };

  const SecurityOverview = () => (
    <div className="grid gap-4  md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <Shield className="w-8 h-8 text-green-500" />
            <div>
              <p className="text-sm text-muted-foreground">Security Status</p>
              <p className="text-2xl font-bold">Good</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <AlertTriangle className="w-8 h-8 text-yellow-500" />
            <div>
              <p className="text-sm text-muted-foreground">Active Alerts</p>
              <p className="text-2xl font-bold">3</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <UserCheck className="w-8 h-8 text-blue-500" />
            <div>
              <p className="text-sm text-muted-foreground">Active Sessions</p>
              <p className="text-2xl font-bold">24</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const SecuritySettings = () => (
    <div className="space-y-6 ">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Authentication Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">
                Require 2FA for all admin users
              </p>
            </div>
            <Switch checked={true} />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Password Expiry</Label>
              <p className="text-sm text-muted-foreground">
                Force password change every 90 days
              </p>
            </div>
            <Switch checked={true} />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Session Timeout</Label>
              <p className="text-sm text-muted-foreground">
                Automatically logout after inactivity
              </p>
            </div>
            <Select defaultValue="30">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select timeout" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">IP Access Control</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>IP Whitelist</Label>
              <p className="text-sm text-muted-foreground">
                Restrict admin access to specific IPs
              </p>
            </div>
            <Switch />
          </div>
          <Input placeholder="Enter IP addresses (comma-separated)" />
        </div>
      </div>
    </div>
  );

  const ActivityLogs = () => (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
          <Select value={logType} onValueChange={setLogType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select log type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Logs</SelectItem>
              <SelectItem value="auth">Authentication</SelectItem>
              <SelectItem value="system">System</SelectItem>
              <SelectItem value="error">Errors</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon">
            <RefreshCcw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <TableWrapper>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>Event</TableHead>
              <TableHead>User</TableHead>
              <TableHead>IP Address</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>2024-02-12 14:23:45</TableCell>
              <TableCell>Login Attempt</TableCell>
              <TableCell>admin@example.com</TableCell>
              <TableCell>192.168.1.1</TableCell>
              <TableCell>
                <Badge variant="destructive">Success</Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2024-02-12 14:20:30</TableCell>
              <TableCell>Settings Changed</TableCell>
              <TableCell>admin@example.com</TableCell>
              <TableCell>192.168.1.1</TableCell>
              <TableCell>
                <Badge>Info</Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2024-02-12 14:15:22</TableCell>
              <TableCell>Failed Login</TableCell>
              <TableCell>unknown@example.com</TableCell>
              <TableCell>192.168.1.100</TableCell>
              <TableCell>
                <Badge variant="destructive">Failed</Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableWrapper>
    </div>
  );

  const SecurityAlerts = () => (
    <div className="space-y-4">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Multiple Failed Login Attempts</AlertTitle>
        <AlertDescription>
          5 failed login attempts detected from IP 192.168.1.100 in the last hour.
        </AlertDescription>
      </Alert>

      <Alert>
        <Key className="h-4 w-4" />
        <AlertTitle>Password Expiring Soon</AlertTitle>
        <AlertDescription>
          3 admin users need to update their passwords within the next 7 days.
        </AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Suspicious Activity Detected</AlertTitle>
        <AlertDescription>
          Unusual number of requests detected from multiple IPs. Consider reviewing security settings.
        </AlertDescription>
      </Alert>
    </div>
  );

  return (
    <>
      <div className="absolute flex z-50 items-center h-full w-full justify-center h-screentext-white overflow-hidden">
        <Helmet
          title="Logs | Admin"
          meta={[
            {
              name: "description",
              content: "Logs of all Operations",
            },
          ]}
        />
       
        {/* Content */}
        <div className="text-center">
          <h1 className=" text-6xl lg:text-7xl font-bold ">
        Coming Soon 
          </h1>
          <p className="text-lg mt-3 opacity-80">Stay tuned for something amazing!</p>
        </div>
      </div>

      <div className="w-full  px-2 py-2 blur-xl sm:px-4 sm:py-4 space-y-4">
        <SecurityOverview />

        <Card className="shadow-md rounded-lg">
          <CardHeader className="px-4 py-2 sm:p-5">
            <CardTitle className="text-xl sm:text-2xl">Logs & Security</CardTitle>
          </CardHeader>
          <CardContent className="p-2 sm:p-4">
            <Tabs defaultValue="activity" className="w-full">
              <TabsList className="w-auto justify-start mb-4">
                <TabsTrigger value="activity">Activity Logs</TabsTrigger>
                <TabsTrigger value="security">Security Settings</TabsTrigger>
                <TabsTrigger value="alerts">Security Alerts</TabsTrigger>
              </TabsList>

              <TabsContent value="activity">
                <ActivityLogs />
              </TabsContent>

              <TabsContent value="security">
                <SecuritySettings />
              </TabsContent>

              <TabsContent value="alerts">
                <SecurityAlerts />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default LogsAndSecurity;