import { useState, ReactNode, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Edit, Trash2, Image as ImageIcon } from "lucide-react";
import axios from "@/lib/axios";
import DeleteCategoryButton from "@/components/Admin/CMS/DeleteCategoryButton";
import AddCategoryDialog from "@/components/Admin/CMS/AddCategoryDialog";
import EditCategoryDialog from "@/components/Admin/CMS/EditCategoryDialog";

interface Category {
  name: string;
  imageUrl: string;
}

interface TableWrapperProps {
  children: ReactNode;
}

const ContentManagement = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [activeTab, setActiveTab] = useState("categories");
  const [categories, setCategories] = useState<Array<Category>>([]);

  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/admin/cms/categories`
        );
        if (response.status === 200) {
          setCategories(response.data);
        }
      } catch (error: any) {
        console.log(error);
      }
    };

    getAllCategories();
  }, []);

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

  const CategorySection = () => {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Categories</h3>
          <AddCategoryDialog setCategories={setCategories} />
        </div>
        <TableWrapper>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <TableRow key={category.name}>
                    <TableCell>
                      <div className="w-32 h-24 bg-gray-100 rounded flex items-center justify-center">
                        {category.imageUrl ? (
                          <img
                            src={category.imageUrl}
                            className="w-full h-full object-contain"
                            alt="Category Image"
                          />
                        ) : (
                          <ImageIcon className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {category.name}
                    </TableCell>

                    <TableCell>
                      <div className="flex space-x-2">
                        <EditCategoryDialog
                          setCategories={setCategories}
                          categoryName={category.name}
                          imageUrl={category.imageUrl}
                        />
                        <DeleteCategoryButton
                          categoryName={category.name}
                          setCategories={setCategories}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <></>
              )}
            </TableBody>
          </Table>
        </TableWrapper>
      </div>
    );
  };

  return (
    <div className="w-full px-2 py-2 sm:px-4 sm:py-4 space-y-4 ">
      <Card className="shadow-md rounded-lg">
        <CardHeader className="px-4 py-2 sm:p-5">
          <CardTitle className="text-xl sm:text-2xl">
            Content Management
          </CardTitle>
        </CardHeader>
        <CardContent className="p-2 sm:p-4">
          <Tabs
            defaultValue="categories"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="w-fit justify-start mb-4 bg-accent ">
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="bannerCarousel">Banner Carousel</TabsTrigger>
              <TabsTrigger value="productCarousel">
                Product Carousel
              </TabsTrigger>

              <TabsTrigger value="discounts">Discounts</TabsTrigger>
            </TabsList>
            <TabsContent value="categories">
              <CategorySection />
            </TabsContent>
            <TabsContent value="bannerCarousel">
              <CarouselSection />
            </TabsContent>
            <TabsContent value="productCarousel">
              <CarouselSection />
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
