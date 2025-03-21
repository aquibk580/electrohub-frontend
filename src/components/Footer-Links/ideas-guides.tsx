import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
// import Image from "next/image"

export default function IdeasGuides() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Ideas & Guides</h2>

      <p>
        Discover helpful guides, creative ideas, and expert advice to make the most of your electronics and technology.
      </p>

      <Tabs defaultValue="featured">
        <TabsList className="grid w-full grid-cols-5">
          {/* <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="buying-guides">Buying Guides</TabsTrigger> */}
          <TabsTrigger value="how-to">How-To</TabsTrigger>
          <TabsTrigger value="tech-tips">Tech Tips</TabsTrigger>
          <TabsTrigger value="comparisons">Comparisons</TabsTrigger>
        </TabsList>

        <TabsContent value="featured" className="pt-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="md:col-span-2">
              <div className="md:grid md:grid-cols-2">
                <div className="relative h-48 md:h-full">
                  <img
                    src="/placeholder.svg"
                    alt="Featured article image"
                    className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
                  />

                </div>
                <div className="p-6">
                  <Badge className="mb-2">Featured Guide</Badge>
                  <h3 className="text-xl font-bold mb-2">Setting Up the Ultimate Home Office</h3>
                  <p className="text-sm text-muted-foreground mb-2">March 15, 2025 • 12 min read</p>
                  <p className="mb-4">
                    Create a productive and comfortable workspace with our comprehensive guide to home office
                    essentials, from ergonomic furniture to the right tech setup.
                  </p>
                  <Button>Read Guide</Button>
                </div>
              </div>
            </Card>

            <Card>
              <div className="relative h-48">
                {/* <Image src="/placeholder.svg" alt="Article image" fill className="object-cover rounded-t-lg" /> */}
                <img src="/placeholder.svg" alt="Article image" className="w-full h-full object-cover rounded-t-lg" />
              </div>
              <CardHeader>
                <Badge className="w-fit mb-2">Buying Guide</Badge>
                <CardTitle>Choosing the Right Smart TV in 2025</CardTitle>
                <CardDescription>March 10, 2025 • 8 min read</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Navigate the complex world of smart TVs with our expert advice on display technology, smart features,
                  and connectivity options.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Read More</Button>
              </CardFooter>
            </Card>

            <Card>
              <div className="relative h-48">
                {/* <Image src="/placeholder.svg" alt="Article image" fill className="object-cover rounded-t-lg" /> */}
                <img src="/placeholder.svg" alt="Article image" className="w-full h-full object-cover rounded-t-lg" />
              </div>
              <CardHeader>
                <Badge className="w-fit mb-2">How-To</Badge>
                <CardTitle>Extend Your Device's Battery Life</CardTitle>
                <CardDescription>March 5, 2025 • 6 min read</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Simple yet effective strategies to maximize battery performance and longevity for your smartphones,
                  laptops, and tablets.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Read More</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="buying-guides" className="pt-4">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <div className="relative h-40">
                {/* <Image src="/placeholder.svg" alt="Buying guide image" fill className="object-cover rounded-t-lg" /> */}
                <img src="/placeholder.svg" alt="Buying guide image" className="w-full h-full object-cover rounded-t-lg" />
              </div>
              <CardHeader>
                <CardTitle>Laptop Buying Guide 2025</CardTitle>
                <CardDescription>Updated March 1, 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Everything you need to know about processors, memory, storage, and display options to find the perfect
                  laptop for your needs.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Read Guide</Button>
              </CardFooter>
            </Card>

            <Card>
              <div className="relative h-40">
                {/* <Image src="/placeholder.svg" alt="Buying guide image" fill className="object-cover rounded-t-lg" /> */}
                <img src="/placeholder.svg" alt="Buying guide image" className="w-full h-full object-cover rounded-t-lg" />
              </div>
              <CardHeader>
                <CardTitle>Wireless Headphones: What to Look For</CardTitle>
                <CardDescription>Updated February 15, 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  From sound quality and noise cancellation to battery life and comfort, our comprehensive guide to
                  choosing wireless headphones.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Read Guide</Button>
              </CardFooter>
            </Card>

            <Card>
              <div className="relative h-40">
                {/* <Image src="/placeholder.svg" alt="Buying guide image" fill className="object-cover rounded-t-lg" /> */}
                <img src="/placeholder.svg" alt="Buying guide image" className="w-full h-full object-cover rounded-t-lg" />
              </div>
              <CardHeader>
                <CardTitle>Smart Home Starter Guide</CardTitle>
                <CardDescription>Updated February 1, 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Begin your smart home journey with our guide to essential devices, compatibility considerations, and
                  setup tips.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Read Guide</Button>
              </CardFooter>
            </Card>

            <Card>
              <div className="relative h-40">
                {/* <Image src="/placeholder.svg" alt="Buying guide image" fill className="object-cover rounded-t-lg" /> */}
                <img src="/placeholder.svg" alt="Buying guide image" className="w-full h-full object-cover rounded-t-lg" />
              </div>
              <CardHeader>
                <CardTitle>Gaming Console Comparison</CardTitle>
                <CardDescription>Updated January 20, 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Compare the latest gaming consoles with our detailed breakdown of performance, game libraries, and
                  exclusive features.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Read Guide</Button>
              </CardFooter>
            </Card>

            <Card>
              <div className="relative h-40">
                {/* <Image src="/placeholder.svg" alt="Buying guide image" fill className="object-cover rounded-t-lg" /> */}
                <img src="/placeholder.svg" alt="Buying guide image" className="w-full h-full object-cover rounded-t-lg" />
              </div>
              <CardHeader>
                <CardTitle>Smartphone Camera Guide</CardTitle>
                <CardDescription>Updated January 10, 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Understand smartphone camera specifications and features to choose the best phone for photography and
                  video.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Read Guide</Button>
              </CardFooter>
            </Card>

            <Card>
              <div className="relative h-40">
                {/* <Image src="/placeholder.svg" alt="Buying guide image" fill className="object-cover rounded-t-lg" /> */}
            <img src="/placeholder.svg" alt="Buying guide image" className="w-full h-full object-cover rounded-t-lg" />
              </div>
              <CardHeader>
                <CardTitle>4K vs 8K TVs: Worth the Upgrade?</CardTitle>
                <CardDescription>Updated January 5, 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  An in-depth analysis of resolution differences, content availability, and price considerations to help
                  you decide.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Read Guide</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="how-to" className="pt-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">Beginner</Badge>
                  <Badge variant="outline">15 min</Badge>
                </div>
                <CardTitle>How to Set Up a Smart Home Hub</CardTitle>
                <CardDescription>Step-by-step instructions for beginners</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal pl-5 space-y-2 text-sm">
                  <li>Choose the right smart home hub for your needs</li>
                  <li>Connect the hub to your home network</li>
                  <li>Download and set up the companion app</li>
                  <li>Add compatible devices to your network</li>
                  <li>Create rooms and scenes for automated control</li>
                </ol>
              </CardContent>
              <CardFooter>
                <Button variant="outline">View Full Guide</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">Intermediate</Badge>
                  <Badge variant="outline">20 min</Badge>
                </div>
                <CardTitle>How to Back Up Your Digital Life</CardTitle>
                <CardDescription>Protect your important data and memories</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal pl-5 space-y-2 text-sm">
                  <li>Identify what needs to be backed up</li>
                  <li>Choose between cloud and local backup options</li>
                  <li>Set up automated backup schedules</li>
                  <li>Verify your backups are working properly</li>
                  <li>Create a disaster recovery plan</li>
                </ol>
              </CardContent>
              <CardFooter>
                <Button variant="outline">View Full Guide</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">Advanced</Badge>
                  <Badge variant="outline">30 min</Badge>
                </div>
                <CardTitle>How to Build a Custom Gaming PC</CardTitle>
                <CardDescription>Create your dream gaming rig</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal pl-5 space-y-2 text-sm">
                  <li>Select compatible components</li>
                  <li>Prepare your workspace and tools</li>
                  <li>Install the CPU, memory, and cooler</li>
                  <li>Mount the motherboard and connect power</li>
                  <li>Install storage and graphics card</li>
                  <li>Cable management and final assembly</li>
                  <li>Install operating system and drivers</li>
                </ol>
              </CardContent>
              <CardFooter>
                <Button variant="outline">View Full Guide</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">Beginner</Badge>
                  <Badge variant="outline">10 min</Badge>
                </div>
                <CardTitle>How to Secure Your Home Wi-Fi Network</CardTitle>
                <CardDescription>Protect your digital privacy</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal pl-5 space-y-2 text-sm">
                  <li>Change default router login credentials</li>
                  <li>Create a strong, unique Wi-Fi password</li>
                  <li>Enable WPA3 encryption if available</li>
                  <li>Update router firmware regularly</li>
                  <li>Set up a guest network for visitors</li>
                  <li>Enable firewall and other security features</li>
                </ol>
              </CardContent>
              <CardFooter>
                <Button variant="outline">View Full Guide</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tech-tips" className="pt-4">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <Badge className="w-fit mb-2">Productivity</Badge>
                <CardTitle>10 Hidden Smartphone Features You Should Be Using</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  Unlock the full potential of your device with these lesser-known but incredibly useful features.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Screen recording for tutorials</li>
                  <li>Built-in document scanners</li>
                  <li>Advanced text selection gestures</li>
                  <li>Focus modes for productivity</li>
                  <li>And more...</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Read More</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <Badge className="w-fit mb-2">Security</Badge>
                <CardTitle>Essential Steps to Protect Your Digital Identity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  Safeguard your personal information and accounts with these critical security practices.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Use a password manager</li>
                  <li>Enable two-factor authentication</li>
                  <li>Recognize phishing attempts</li>
                  <li>Secure your devices with updates</li>
                  <li>And more...</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Read More</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <Badge className="w-fit mb-2">Optimization</Badge>
                <CardTitle>Speed Up Your Computer in 5 Simple Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  Improve your computer's performance without expensive upgrades using these optimization techniques.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Clean up startup programs</li>
                  <li>Manage background processes</li>
                  <li>Optimize storage usage</li>
                  <li>Update drivers and software</li>
                  <li>And more...</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Read More</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <Badge className="w-fit mb-2">Photography</Badge>
                <CardTitle>Smartphone Photography: Pro Tips for Amazing Shots</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  Take your mobile photography to the next level with these professional techniques and settings.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Master HDR and night mode</li>
                  <li>Composition techniques</li>
                  <li>Editing with built-in tools</li>
                  <li>Using manual camera controls</li>
                  <li>And more...</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Read More</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <Badge className="w-fit mb-2">Connectivity</Badge>
                <CardTitle>Troubleshooting Wi-Fi Issues: The Complete Guide</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  Solve common wireless network problems and optimize your home Wi-Fi performance.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Identify interference sources</li>
                  <li>Optimal router placement</li>
                  <li>Channel selection tips</li>
                  <li>Mesh network considerations</li>
                  <li>And more...</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Read More</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <Badge className="w-fit mb-2">Maintenance</Badge>
                <CardTitle>Extend the Life of Your Electronics: Maintenance Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  Proper care and maintenance can significantly extend the lifespan of your valuable devices.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Cleaning best practices</li>
                  <li>Battery preservation techniques</li>
                  <li>Storage recommendations</li>
                  <li>Heat management solutions</li>
                  <li>And more...</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Read More</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="comparisons" className="pt-4">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>OLED vs QLED: Which Display Technology Is Right for You?</CardTitle>
                <CardDescription>Updated March 1, 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Feature</th>
                        <th className="text-left p-2">OLED</th>
                        <th className="text-left p-2">QLED</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Black Levels</td>
                        <td className="p-2">Perfect blacks (self-emitting pixels)</td>
                        <td className="p-2">Very good (backlit technology)</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Brightness</td>
                        <td className="p-2">Good</td>
                        <td className="p-2">Excellent (higher peak brightness)</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Color Accuracy</td>
                        <td className="p-2">Excellent</td>
                        <td className="p-2">Excellent</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Viewing Angles</td>
                        <td className="p-2">Excellent</td>
                        <td className="p-2">Good</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Lifespan</td>
                        <td className="p-2">Good (potential burn-in over time)</td>
                        <td className="p-2">Excellent</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Energy Efficiency</td>
                        <td className="p-2">Excellent</td>
                        <td className="p-2">Good</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-medium">Price Range</td>
                        <td className="p-2">Higher</td>
                        <td className="p-2">More affordable options</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4">
                  <p className="text-sm">
                    <strong>Best for:</strong>
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="font-medium">OLED</p>
                      <ul className="list-disc pl-5 text-sm mt-1">
                        <li>Movie enthusiasts</li>
                        <li>Dark room viewing</li>
                        <li>Gaming with fast response times</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="font-medium">QLED</p>
                      <ul className="list-disc pl-5 text-sm mt-1">
                        <li>Bright room environments</li>
                        <li>HDR content viewing</li>
                        <li>Longer-term use without burn-in concerns</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Read Full Comparison</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Wireless vs Wired Headphones: Pros and Cons</CardTitle>
                <CardDescription>Updated February 15, 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Wireless Headphones</h3>
                      <div className="space-y-3">
                        <div>
                          <p className="font-medium text-sm text-green-600 dark:text-green-400">Pros:</p>
                          <ul className="list-disc pl-5 text-sm space-y-1">
                            <li>Freedom of movement without cables</li>
                            <li>Convenient for exercise and commuting</li>
                            <li>No cable tangling or wear</li>
                            <li>Often include additional features (ANC, touch controls)</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium text-sm text-red-600 dark:text-red-400">Cons:</p>
                          <ul className="list-disc pl-5 text-sm space-y-1">
                            <li>Require regular charging</li>
                            <li>Typically more expensive</li>
                            <li>Potential for connection issues</li>
                            <li>Slight audio quality compromise (improving with technology)</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="font-medium">Best for:</p>
                      <ul className="list-disc pl-5 text-sm mt-1">
                        <li>Active lifestyles</li>
                        <li>Commuters</li>
                        <li>Those who value convenience</li>
                        <li>Multi-device users</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Wired Headphones</h3>
                      <div className="space-y-3">
                        <div>
                          <p className="font-medium text-sm text-green-600 dark:text-green-400">Pros:</p>
                          <ul className="list-disc pl-5 text-sm space-y-1">
                            <li>Generally better audio quality at same price point</li>
                            <li>No charging required</li>
                            <li>No latency issues</li>
                            <li>Often more affordable</li>
                            <li>Longer lifespan (no battery degradation)</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium text-sm text-red-600 dark:text-red-400">Cons:</p>
                          <ul className="list-disc pl-5 text-sm space-y-1">
                            <li>Limited mobility due to cables</li>
                            <li>Cables can tangle or break</li>
                            <li>Less convenient for exercise</li>
                            <li>Compatibility issues with newer phones (no headphone jack)</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="font-medium">Best for:</p>
                      <ul className="list-disc pl-5 text-sm mt-1">
                        <li>Audiophiles</li>
                        <li>Studio/professional use</li>
                        <li>Gaming (zero latency)</li>
                        <li>Budget-conscious buyers</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Read Full Comparison</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Popular Topics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="px-3 py-1">
                Smart Home
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                Smartphones
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                Gaming
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                Laptops
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                Headphones
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                Photography
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                Home Theater
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                Wearables
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                Streaming
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                Productivity
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                Security
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                Networking
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expert Contributors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-bold">JD</span>
                </div>
                <div>
                  <p className="font-medium">James Davis</p>
                  <p className="text-xs text-muted-foreground">Smart Home Expert</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-bold">SL</span>
                </div>
                <div>
                  <p className="font-medium">Sarah Lee</p>
                  <p className="text-xs text-muted-foreground">Photography Specialist</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-bold">MJ</span>
                </div>
                <div>
                  <p className="font-medium">Michael Johnson</p>
                  <p className="text-xs text-muted-foreground">Gaming Editor</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
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

      <div className="bg-muted p-6 rounded-lg mt-8">
        <div className="md:flex items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-medium mb-2">Subscribe to Our Newsletter</h3>
            <p>Get the latest guides, tips, and product recommendations delivered to your inbox.</p>
          </div>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex h-10 w-full md:w-auto rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

