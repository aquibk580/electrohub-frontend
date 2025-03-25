import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, ExternalLink } from "lucide-react"

export default function IdeasGuides() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Ideas & Guides</h1>
        <p className="text-muted-foreground text-lg">
          Discover helpful guides, creative ideas, and expert advice to make the most of your electronics and
          technology.
        </p>
      </div>

      <Tabs defaultValue="how-to" className="w-full">
        <TabsList className="w-full grid grid-cols-3 h-auto p-0 bg-transparent gap-2">
          <TabsTrigger
            value="how-to"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3"
          >
            How-To
          </TabsTrigger>
          <TabsTrigger
            value="tech-tips"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3"
          >
            Tech Tips
          </TabsTrigger>
          <TabsTrigger
            value="comparisons"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3"
          >
            Comparisons
          </TabsTrigger>
        </TabsList>

        <TabsContent value="how-to" className="pt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="overflow-hidden border-primary/20">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="bg-primary/5">
                    Beginner
                  </Badge>
                  <Badge variant="outline" className="bg-primary/5">
                    15 min
                  </Badge>
                </div>
                <CardTitle className="text-xl">How to Set Up a Smart Home Hub</CardTitle>
                <CardDescription>Step-by-step instructions for beginners</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                  <li>Choose the right smart home hub for your needs</li>
                  <li>Connect the hub to your home network</li>
                  <li>Download and set up the companion app</li>
                  <li>Add compatible devices to your network</li>
                  <li>Create rooms and scenes for automated control</li>
                </ol>
              </CardContent>
              <CardFooter className="border-t bg-muted/50">
                <Button variant="outline" className="gap-1">
                  View Full Guide
                  <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden border-primary/20">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="bg-primary/5">
                    Intermediate
                  </Badge>
                  <Badge variant="outline" className="bg-primary/5">
                    20 min
                  </Badge>
                </div>
                <CardTitle className="text-xl">How to Back Up Your Digital Life</CardTitle>
                <CardDescription>Protect your important data and memories</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                  <li>Identify what needs to be backed up</li>
                  <li>Choose between cloud and local backup options</li>
                  <li>Set up automated backup schedules</li>
                  <li>Verify your backups are working properly</li>
                  <li>Create a disaster recovery plan</li>
                </ol>
              </CardContent>
              <CardFooter className="border-t bg-muted/50">
                <Button variant="outline" className="gap-1">
                  View Full Guide
                  <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden border-primary/20">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="bg-primary/5">
                    Advanced
                  </Badge>
                  <Badge variant="outline" className="bg-primary/5">
                    30 min
                  </Badge>
                </div>
                <CardTitle className="text-xl">How to Build a Custom Gaming PC</CardTitle>
                <CardDescription>Create your dream gaming rig</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                  <li>Select compatible components</li>
                  <li>Prepare your workspace and tools</li>
                  <li>Install the CPU, memory, and cooler</li>
                  <li>Mount the motherboard and connect power</li>
                  <li>Install storage and graphics card</li>
                  <li>Cable management and final assembly</li>
                  <li>Install operating system and drivers</li>
                </ol>
              </CardContent>
              <CardFooter className="border-t bg-muted/50">
                <Button variant="outline" className="gap-1">
                  View Full Guide
                  <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden border-primary/20">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="bg-primary/5">
                    Beginner
                  </Badge>
                  <Badge variant="outline" className="bg-primary/5">
                    10 min
                  </Badge>
                </div>
                <CardTitle className="text-xl">How to Secure Your Home Wi-Fi Network</CardTitle>
                <CardDescription>Protect your digital privacy</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                  <li>Change default router login credentials</li>
                  <li>Create a strong, unique Wi-Fi password</li>
                  <li>Enable WPA3 encryption if available</li>
                  <li>Update router firmware regularly</li>
                  <li>Set up a guest network for visitors</li>
                  <li>Enable firewall and other security features</li>
                </ol>
              </CardContent>
              <CardFooter className="border-t bg-muted/50">
                <Button variant="outline" className="gap-1">
                  View Full Guide
                  <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tech-tips" className="pt-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="pb-3">
                <Badge className="w-fit mb-2 bg-primary/10 text-primary">Productivity</Badge>
                <CardTitle>10 Hidden Smartphone Features You Should Be Using</CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-muted-foreground mb-4">
                  Unlock the full potential of your device with these lesser-known but incredibly useful features.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  <li>Screen recording for tutorials</li>
                  <li>Built-in document scanners</li>
                  <li>Advanced text selection gestures</li>
                  <li>Focus modes for productivity</li>
                  <li>And more...</li>
                </ul>
              </CardContent>
              <CardFooter className="border-t bg-muted/50">
                <Button variant="outline" className="gap-1">
                  Read More
                  <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="pb-3">
                <Badge className="w-fit mb-2 bg-primary/10 text-primary">Security</Badge>
                <CardTitle>Essential Steps to Protect Your Digital Identity</CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-muted-foreground mb-4">
                  Safeguard your personal information and accounts with these critical security practices.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  <li>Use a password manager</li>
                  <li>Enable two-factor authentication</li>
                  <li>Recognize phishing attempts</li>
                  <li>Secure your devices with updates</li>
                  <li>And more...</li>
                </ul>
              </CardContent>
              <CardFooter className="border-t bg-muted/50">
                <Button variant="outline" className="gap-1">
                  Read More
                  <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="pb-3">
                <Badge className="w-fit mb-2 bg-primary/10 text-primary">Optimization</Badge>
                <CardTitle>Speed Up Your Computer in 5 Simple Steps</CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-muted-foreground mb-4">
                  Improve your computer's performance without expensive upgrades using these optimization techniques.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  <li>Clean up startup programs</li>
                  <li>Manage background processes</li>
                  <li>Optimize storage usage</li>
                  <li>Update drivers and software</li>
                  <li>And more...</li>
                </ul>
              </CardContent>
              <CardFooter className="border-t bg-muted/50">
                <Button variant="outline" className="gap-1">
                  Read More
                  <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="pb-3">
                <Badge className="w-fit mb-2 bg-primary/10 text-primary">Photography</Badge>
                <CardTitle>Smartphone Photography: Pro Tips for Amazing Shots</CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-muted-foreground mb-4">
                  Take your mobile photography to the next level with these professional techniques and settings.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  <li>Master HDR and night mode</li>
                  <li>Composition techniques</li>
                  <li>Editing with built-in tools</li>
                  <li>Using manual camera controls</li>
                  <li>And more...</li>
                </ul>
              </CardContent>
              <CardFooter className="border-t bg-muted/50">
                <Button variant="outline" className="gap-1">
                  Read More
                  <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="pb-3">
                <Badge className="w-fit mb-2 bg-primary/10 text-primary">Connectivity</Badge>
                <CardTitle>Troubleshooting Wi-Fi Issues: The Complete Guide</CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-muted-foreground mb-4">
                  Solve common wireless network problems and optimize your home Wi-Fi performance.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  <li>Identify interference sources</li>
                  <li>Optimal router placement</li>
                  <li>Channel selection tips</li>
                  <li>Mesh network considerations</li>
                  <li>And more...</li>
                </ul>
              </CardContent>
              <CardFooter className="border-t bg-muted/50">
                <Button variant="outline" className="gap-1">
                  Read More
                  <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="pb-3">
                <Badge className="w-fit mb-2 bg-primary/10 text-primary">Maintenance</Badge>
                <CardTitle>Extend the Life of Your Electronics: Maintenance Tips</CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-muted-foreground mb-4">
                  Proper care and maintenance can significantly extend the lifespan of your valuable devices.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  <li>Cleaning best practices</li>
                  <li>Battery preservation techniques</li>
                  <li>Storage recommendations</li>
                  <li>Heat management solutions</li>
                  <li>And more...</li>
                </ul>
              </CardContent>
              <CardFooter className="border-t bg-muted/50">
                <Button variant="outline" className="gap-1">
                  Read More
                  <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="comparisons" className="pt-6">
          <div className="space-y-8">
            <Card className="overflow-hidden border-primary/20">
              <CardHeader className="bg-primary/5 border-b">
                <CardTitle>OLED vs QLED: Which Display Technology Is Right for You?</CardTitle>
                <CardDescription className="flex items-center mt-1">
                  <CalendarIcon className="mr-1 h-3.5 w-3.5" />
                  <span>Updated March 1, 2025</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 font-medium">Feature</th>
                        <th className="text-left p-2 font-medium">OLED</th>
                        <th className="text-left p-2 font-medium">QLED</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Black Levels</td>
                        <td className="p-2 text-muted-foreground">Perfect blacks (self-emitting pixels)</td>
                        <td className="p-2 text-muted-foreground">Very good (backlit technology)</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Brightness</td>
                        <td className="p-2 text-muted-foreground">Good</td>
                        <td className="p-2 text-muted-foreground">Excellent (higher peak brightness)</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Color Accuracy</td>
                        <td className="p-2 text-muted-foreground">Excellent</td>
                        <td className="p-2 text-muted-foreground">Excellent</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Viewing Angles</td>
                        <td className="p-2 text-muted-foreground">Excellent</td>
                        <td className="p-2 text-muted-foreground">Good</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Lifespan</td>
                        <td className="p-2 text-muted-foreground">Good (potential burn-in over time)</td>
                        <td className="p-2 text-muted-foreground">Excellent</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Energy Efficiency</td>
                        <td className="p-2 text-muted-foreground">Excellent</td>
                        <td className="p-2 text-muted-foreground">Good</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-medium">Price Range</td>
                        <td className="p-2 text-muted-foreground">Higher</td>
                        <td className="p-2 text-muted-foreground">More affordable options</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-6">
                  <p className="font-semibold mb-3">Best for:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/50 rounded-lg border">
                      <p className="font-semibold mb-2">OLED</p>
                      <ul className="list-disc pl-5 text-sm space-y-1 text-muted-foreground">
                        <li>Movie enthusiasts</li>
                        <li>Dark room viewing</li>
                        <li>Gaming with fast response times</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg border">
                      <p className="font-semibold mb-2">QLED</p>
                      <ul className="list-disc pl-5 text-sm space-y-1 text-muted-foreground">
                        <li>Bright room environments</li>
                        <li>HDR content viewing</li>
                        <li>Longer-term use without burn-in concerns</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/50">
                <Button variant="outline" className="gap-1">
                  Read Full Comparison
                  <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden border-primary/20">
              <CardHeader className="bg-primary/5 border-b">
                <CardTitle>Wireless vs Wired Headphones: Pros and Cons</CardTitle>
                <CardDescription className="flex items-center mt-1">
                  <CalendarIcon className="mr-1 h-3.5 w-3.5" />
                  <span>Updated February 15, 2025</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-5 border rounded-lg bg-background shadow-sm">
                      <h3 className="font-semibold mb-3">Wireless Headphones</h3>
                      <div className="space-y-4">
                        <div>
                          <p className="font-medium text-sm text-green-600 dark:text-green-400 mb-2">Pros:</p>
                          <ul className="list-disc pl-5 text-sm space-y-1 text-muted-foreground">
                            <li>Freedom of movement without cables</li>
                            <li>Convenient for exercise and commuting</li>
                            <li>No cable tangling or wear</li>
                            <li>Often include additional features (ANC, touch controls)</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium text-sm text-red-600 dark:text-red-400 mb-2">Cons:</p>
                          <ul className="list-disc pl-5 text-sm space-y-1 text-muted-foreground">
                            <li>Require regular charging</li>
                            <li>Typically more expensive</li>
                            <li>Potential for connection issues</li>
                            <li>Slight audio quality compromise (improving with technology)</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg border">
                      <p className="font-semibold mb-2">Best for:</p>
                      <ul className="list-disc pl-5 text-sm space-y-1 text-muted-foreground">
                        <li>Active lifestyles</li>
                        <li>Commuters</li>
                        <li>Those who value convenience</li>
                        <li>Multi-device users</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-5 border rounded-lg bg-background shadow-sm">
                      <h3 className="font-semibold mb-3">Wired Headphones</h3>
                      <div className="space-y-4">
                        <div>
                          <p className="font-medium text-sm text-green-600 dark:text-green-400 mb-2">Pros:</p>
                          <ul className="list-disc pl-5 text-sm space-y-1 text-muted-foreground">
                            <li>Generally better audio quality at same price point</li>
                            <li>No charging required</li>
                            <li>No latency issues</li>
                            <li>Often more affordable</li>
                            <li>Longer lifespan (no battery degradation)</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium text-sm text-red-600 dark:text-red-400 mb-2">Cons:</p>
                          <ul className="list-disc pl-5 text-sm space-y-1 text-muted-foreground">
                            <li>Limited mobility due to cables</li>
                            <li>Cables can tangle or break</li>
                            <li>Less convenient for exercise</li>
                            <li>Compatibility issues with newer phones (no headphone jack)</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg border">
                      <p className="font-semibold mb-2">Best for:</p>
                      <ul className="list-disc pl-5 text-sm space-y-1 text-muted-foreground">
                        <li>Audiophiles</li>
                        <li>Studio/professional use</li>
                        <li>Gaming (zero latency)</li>
                        <li>Budget-conscious buyers</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/50">
                <Button variant="outline" className="gap-1">
                  Read Full Comparison
                  <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2 mt-8">
        <Card className="overflow-hidden">
          <CardHeader className="bg-muted/50 border-b">
            <CardTitle>Popular Topics</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="px-3 py-1 hover:bg-secondary/80 cursor-pointer">
                Smart Home
              </Badge>
              <Badge variant="secondary" className="px-3 py-1 hover:bg-secondary/80 cursor-pointer">
                Smartphones
              </Badge>
              <Badge variant="secondary" className="px-3 py-1 hover:bg-secondary/80 cursor-pointer">
                Gaming
              </Badge>
              <Badge variant="secondary" className="px-3 py-1 hover:bg-secondary/80 cursor-pointer">
                Laptops
              </Badge>
              <Badge variant="secondary" className="px-3 py-1 hover:bg-secondary/80 cursor-pointer">
                Headphones
              </Badge>
              <Badge variant="secondary" className="px-3 py-1 hover:bg-secondary/80 cursor-pointer">
                Photography
              </Badge>
              <Badge variant="secondary" className="px-3 py-1 hover:bg-secondary/80 cursor-pointer">
                Home Theater
              </Badge>
              <Badge variant="secondary" className="px-3 py-1 hover:bg-secondary/80 cursor-pointer">
                Wearables
              </Badge>
              <Badge variant="secondary" className="px-3 py-1 hover:bg-secondary/80 cursor-pointer">
                Streaming
              </Badge>
              <Badge variant="secondary" className="px-3 py-1 hover:bg-secondary/80 cursor-pointer">
                Productivity
              </Badge>
              <Badge variant="secondary" className="px-3 py-1 hover:bg-secondary/80 cursor-pointer">
                Security
              </Badge>
              <Badge variant="secondary" className="px-3 py-1 hover:bg-secondary/80 cursor-pointer">
                Networking
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="bg-muted/50 border-b">
            <CardTitle>Expert Contributors</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold">JD</span>
                </div>
                <div>
                  <p className="font-medium">James Davis</p>
                  <p className="text-xs text-muted-foreground">Smart Home Expert</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold">SL</span>
                </div>
                <div>
                  <p className="font-medium">Sarah Lee</p>
                  <p className="text-xs text-muted-foreground">Photography Specialist</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold">MJ</span>
                </div>
                <div>
                  <p className="font-medium">Michael Johnson</p>
                  <p className="text-xs text-muted-foreground">Gaming Editor</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold">AT</span>
                </div>
                <div>
                  <p className="font-medium">Aisha Thomas</p>
                  <p className="text-xs text-muted-foreground">Tech Reviewer</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-8 rounded-xl mt-8 border border-primary/10">
        <div className="md:flex items-center justify-between">
          <div className="mb-6 md:mb-0 md:mr-6">
            <h3 className="text-xl font-semibold mb-2">Subscribe to Our Newsletter</h3>
            <p className="text-muted-foreground">
              Get the latest guides, tips, and product recommendations delivered to your inbox.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex h-10 w-full md:w-auto rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <Button className="sm:w-auto">Subscribe</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

