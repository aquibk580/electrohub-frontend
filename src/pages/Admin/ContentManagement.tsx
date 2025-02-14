import { useState, ReactNode } from "react";
import { useMediaQuery } from "react-responsive";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2, Image as ImageIcon } from "lucide-react";

const ContentManagement = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [activeTab, setActiveTab] = useState("carousel");

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

  const CarouselSection = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Banner Images</h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Banner
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Banner</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid w-full items-center gap-1.5">
                <Label>Title</Label>
                <Input placeholder="Enter banner title" />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label>Image</Label>
                <Input type="file" accept="image/*" />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label>Link URL</Label>
                <Input placeholder="Enter banner link" />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="active" />
                <Label htmlFor="active">Active</Label>
              </div>
              <Button className="w-full">Save Banner</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <TableWrapper>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Link</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <div className="w-16 h-12 bg-gray-100 rounded flex items-center justify-center">
                  <ImageIcon className="w-6 h-6 text-gray-400" />
                </div>
              </TableCell>
              <TableCell>Summer Sale</TableCell>
              <TableCell>/summer-sale</TableCell>
              <TableCell>
                <Switch checked={true} />
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableWrapper>
    </div>
  );

  const PolicySection = () => (
    <div className="space-y-4">
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label>Terms of Service</Label>
          <Textarea className="min-h-[200px]" placeholder="Enter terms of service..." />
        </div>
        <div className="space-y-2">
          <Label>Privacy Policy</Label>
          <Textarea className="min-h-[200px]" placeholder="Enter privacy policy..." />
        </div>
        <div className="space-y-2">
          <Label>Return Policy</Label>
          <Textarea className="min-h-[200px]" placeholder="Enter return policy..." />
        </div>
        <Button>Save Changes</Button>
      </div>
    </div>
  );

  const FAQSection = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Frequently Asked Questions</h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add FAQ
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New FAQ</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid w-full items-center gap-1.5">
                <Label>Question</Label>
                <Input placeholder="Enter question" />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label>Answer</Label>
                <Textarea placeholder="Enter answer" />
              </div>
              <Button className="w-full">Save FAQ</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <TableWrapper>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Question</TableHead>
              <TableHead>Answer</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>How do I track my order?</TableCell>
              <TableCell>You can track your order in your account dashboard...</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableWrapper>
    </div>
  );

  const DiscountSection = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Discount Codes</h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Discount
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Discount</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid w-full items-center gap-1.5">
                <Label>Code</Label>
                <Input placeholder="Enter discount code" />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label>Discount Amount (%)</Label>
                <Input type="number" placeholder="Enter discount percentage" />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label>Valid Until</Label>
                <Input type="date" />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="active" />
                <Label htmlFor="active">Active</Label>
              </div>
              <Button className="w-full">Save Discount</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <TableWrapper>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Valid Until</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>SUMMER2025</TableCell>
              <TableCell>20%</TableCell>
              <TableCell>2025-08-31</TableCell>
              <TableCell>
                <Switch checked={true} />
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableWrapper>
    </div>
  );

  return (
    <div className="w-full px-2 py-2 sm:px-4 sm:py-4 space-y-4 ">
      <Card className="shadow-md rounded-lg">
        <CardHeader className="px-4 py-2 sm:p-5">
          <CardTitle className="text-xl sm:text-2xl">Content Management</CardTitle>
        </CardHeader>
        <CardContent className="p-2 sm:p-4">
          <Tabs defaultValue="carousel" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="w-fit justify-start mb-4 bg-accent">
              <TabsTrigger value="carousel">Carousel/Banner</TabsTrigger>
              <TabsTrigger value="faq">FAQs</TabsTrigger>
              <TabsTrigger value="policies">Policies</TabsTrigger>
              <TabsTrigger value="discounts">Discounts</TabsTrigger>
            </TabsList>
            <TabsContent value="carousel">
              <CarouselSection />
            </TabsContent>
            <TabsContent value="faq">
              <FAQSection />
            </TabsContent>
            <TabsContent value="policies">
              <PolicySection />
            </TabsContent>
            <TabsContent value="discounts">
              <DiscountSection />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentManagement;