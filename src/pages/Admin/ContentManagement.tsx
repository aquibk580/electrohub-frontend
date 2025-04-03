import { useState, ReactNode, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Image as ImageIcon, Loader2 } from "lucide-react";
import axios from "@/lib/axios";
import DeleteCategoryButton from "@/components/Admin/CMS/DeleteCategoryButton";
import AddCategoryDialog from "@/components/Admin/CMS/AddCategoryDialog";
import EditCategoryDialog from "@/components/Admin/CMS/EditCategoryDialog";
import AddBannerCarousel from "@/components/Admin/CMS/AddBannerCarousel";
import DeleteBannerCarouselButton from "@/components/Admin/CMS/DeleteBannerCarousel";
import EditBannerCarouselDialog from "@/components/Admin/CMS/EditBannerCarousel";
import AddProductCarousel from "@/components/Admin/CMS/AddProductCarousel";
import { formatPrice } from "@/utils/FormatPrice";
import DeleteProductCarouselButton from "@/components/Admin/CMS/DeleteProductCarousel";
import EditProductCarouselButton from "@/components/Admin/CMS/EditProductCarousel";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Helmet } from "react-helmet-async";

interface Category {
  name: string;
  imageUrl: string;
}

export interface BannerCrousel {
  id: number;
  title: string;
  imageUrl: string;
  href: string;
  isActive: boolean;
}

export interface ProductCrousel {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  href: string;
  isActive: boolean;
}

interface TableWrapperProps {
  children: ReactNode;
}

const ContentManagement = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [activeTab, setActiveTab] = useState("categories");
  const [loading, setLoading] = useState(true);
  const [productLoading, setProductLoading] = useState(true);
  const [bannerLoading, setBannerLoading] = useState(true);
  const [productCarousels, setProductCarousels] = useState<
    Array<ProductCrousel>
  >([]);
  const [bannerCarousels, setBannerCarousels] = useState<Array<BannerCrousel>>(
    []
  );
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
      } finally {
        setLoading(false);
      }
    };

    getAllCategories();
  }, []);

  useEffect(() => {
    const getAllBannerCarousels = async () => {
      try {
        setBannerLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/admin/cms/banner-carousels`
        );
        if (response.status === 200) {
          setBannerCarousels(response.data);
        }
      } catch (error: any) {
        console.log(error);
      } finally {
        setBannerLoading(false);
      }
    };
    getAllBannerCarousels();
  }, []);

  useEffect(() => {
    const getAllProductCarousels = async () => {
      try {
        setProductLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/admin/cms/product-carousels`
        );
        if (response.status === 200) {
          setProductCarousels(response.data);
        }
      } catch (error: any) {
        console.log(error);
      } finally {
        setProductLoading(false);
      }
    };
    getAllProductCarousels();
  }, []);

  const TableWrapper = ({ children }: TableWrapperProps) => {
    if (isMobile) {
      return (
        <ScrollArea className="w-full rounded-md">
          <div className="min-w-[600px]">{children}</div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      );
    }
    return <>{children}</>;
  };

  const StatusBadge = ({ active }: { active: boolean }) => (
    <Badge
      variant={active ? "default" : "outline"}
      className={`${
        active
          ? "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/30"
          : "bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-800"
      }`}
    >
      {active ? "Active" : "Inactive"}
    </Badge>
  );

  const TableSkeleton = ({ columns }: { columns: number }) => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="space-y-2">
        <div className="flex space-x-4">
          {Array.from({ length: columns }).map((_, i) => (
            <Skeleton key={i} className="h-10 flex-1" />
          ))}
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex space-x-4">
            {Array.from({ length: columns }).map((_, j) => (
              <Skeleton key={j} className="h-16 flex-1" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  const ImageCell = ({ url, alt }: { url: string; alt: string }) => (
    <div className="w-32 h-24 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
      {url ? (
        <img
          src={url}
          className="w-full h-full object-contain"
          alt={alt}
          loading="lazy"
        />
      ) : (
        <ImageIcon className="w-6 h-6 text-gray-400" />
      )}
    </div>
  );

  const BannerCarouselSection = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Banner Images</h3>
        <AddBannerCarousel setBannerCarousels={setBannerCarousels} />
      </div>
      {bannerLoading ? (
        <TableSkeleton columns={6} />
      ) : (
        <TableWrapper>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b border-b-primary/30 bg-primary/5">
                <TableHead className="text-center font-medium">Sr no</TableHead>
                <TableHead className="text-center font-medium">Title</TableHead>
                <TableHead className="text-center font-medium">Image</TableHead>
                <TableHead className="text-center font-medium">Link</TableHead>
                <TableHead className="text-center font-medium">Status</TableHead>
                <TableHead className="text-center font-medium">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bannerCarousels.length > 0 ? (
                bannerCarousels.map((bannerCarousel, index) => (
                  <TableRow 
                    className="border-b border-b-primary/10 hover:bg-primary/5 transition-colors" 
                    key={bannerCarousel.id}
                  >
                    <TableCell className="text-center">{index + 1}</TableCell>
                    <TableCell className="text-center font-medium">{bannerCarousel.title}</TableCell>
                    <TableCell className="flex justify-center py-4">
                      <ImageCell url={bannerCarousel.imageUrl} alt="Banner Image" />
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="max-w-xs truncate inline-block">{bannerCarousel.href}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <StatusBadge active={bannerCarousel.isActive} />
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2 justify-center">
                        <EditBannerCarouselDialog
                          bannerCarousel={bannerCarousel}
                          setBannerCarousels={setBannerCarousels}
                        />
                        <DeleteBannerCarouselButton
                          id={bannerCarousel.id}
                          setBannerCarousel={setBannerCarousels}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <ImageIcon className="w-12 h-12 text-gray-400" />
                      <p className="text-lg text-gray-500">No banner images found</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableWrapper>
      )}
    </div>
  );

  const ProductCarouselSection = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Product Slider Images</h3>
        <AddProductCarousel setProductCarousels={setProductCarousels} />
      </div>
      {productLoading ? (
        <TableSkeleton columns={7} />
      ) : (
        <TableWrapper>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b border-b-primary/30 bg-primary/5">
                <TableHead className="text-center font-medium">Sr no</TableHead>
                <TableHead className="text-center font-medium">Name</TableHead>
                <TableHead className="text-center font-medium">Image</TableHead>
                <TableHead className="text-center font-medium">Price</TableHead>
                <TableHead className="text-center font-medium">Link</TableHead>
                <TableHead className="text-center font-medium">Status</TableHead>
                <TableHead className="text-center font-medium">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productCarousels.length > 0 ? (
                productCarousels.map((productCarousel, index) => (
                  <TableRow 
                    className="border-b border-b-primary/10 hover:bg-primary/5 transition-colors" 
                    key={productCarousel.id}
                  >
                    <TableCell className="text-center">{index + 1}</TableCell>
                    <TableCell className="text-center font-medium">{productCarousel.name}</TableCell>
                    <TableCell className="flex justify-center py-4">
                      <ImageCell url={productCarousel.imageUrl} alt="Product Image" />
                    </TableCell>
                    <TableCell className="text-center font-medium">₹{formatPrice(productCarousel.price)}</TableCell>
                    <TableCell className="text-center">
                      <span className="max-w-xs truncate inline-block">{productCarousel.href}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <StatusBadge active={productCarousel.isActive} />
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2 justify-center">
                        <EditProductCarouselButton
                          key={productCarousel.id}
                          productCarousel={productCarousel}
                          setProductCarousels={setProductCarousels}
                        />
                        <DeleteProductCarouselButton
                          id={productCarousel.id}
                          setProductCarousels={setProductCarousels}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <ImageIcon className="w-12 h-12 text-gray-400" />
                      <p className="text-lg text-gray-500">No product slider images found</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableWrapper>
      )}
    </div>
  );
  
  const CategorySection = () => {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Categories</h3>
          <AddCategoryDialog setCategories={setCategories} />
        </div>
        {loading ? (
          <TableSkeleton columns={4} />
        ) : (
          <TableWrapper>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-b border-b-primary/30 bg-primary/5">
                  <TableHead className="text-center font-medium">Sr no</TableHead>
                  <TableHead className="text-center font-medium">Image</TableHead>
                  <TableHead className="text-center font-medium">Name</TableHead>
                  <TableHead className="text-center font-medium">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.length > 0 ? (
                  categories.map((category, index) => (
                    <TableRow 
                      className="border-b border-b-primary/10 hover:bg-primary/5 transition-colors" 
                      key={category.name}
                    >
                      <TableCell className="text-center">{index + 1}</TableCell>
                      <TableCell className="flex justify-center py-4">
                        <ImageCell url={category.imageUrl} alt="Category Image" />
                      </TableCell>
                      <TableCell className="font-medium text-center">
                        {category.name}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center space-x-2">
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
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <ImageIcon className="w-12 h-12 text-gray-400" />
                        <p className="text-lg text-gray-500">No categories found</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableWrapper>
        )}
      </div>
    );
  };

  const LoadingOverlay = ({ visible }: { visible: boolean }) =>
    visible ? (
      <div className="absolute inset-0 bg-white/80 dark:bg-black/80 flex items-center justify-center z-10 rounded-xl">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-lg font-medium text-primary">Loading content...</p>
        </div>
      </div>
    ) : null;

  return (
    <div className="w-full px-2 py-2 sm:px-4 sm:py-6 space-y-4">
      <Helmet
                    title="CMS | Admin"
                    meta={[
                      {
                        name: "description",
                        content: "Content Management System",
                      },
                    ]}
                  />
      <Card className="shadow-lg rounded-xl border border-primary/20 bg-card relative overflow-hidden">
        <CardHeader className="px-4 py-3 sm:p-6 bg-primary/5 border-b border-primary/10">
          <CardTitle className="text-xl sm:text-2xl flex items-center">
            <span className="bg-primary/20 text-primary p-2 rounded-full mr-3 inline-flex">
              <ImageIcon className="h-5 w-5" />
            </span>
            Content Management
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-6">
          <Tabs
            defaultValue="categories"
            className="w-full"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="w-fit justify-start mb-6 gap-1 bg-primary/5 p-1 rounded-xl">
              <TabsTrigger 
                value="categories" 
                className={`rounded-lg ${activeTab === "categories" ? "bg-primary text-primary-foreground shadow-md" : "hover:bg-primary/10"}`}
              >
                Categories
              </TabsTrigger>
              <TabsTrigger 
                value="bannerCarousel" 
                className={`rounded-lg ${activeTab === "bannerCarousel" ? "bg-primary text-primary-foreground shadow-md" : "hover:bg-primary/10"}`}
              >
                Banner Images
              </TabsTrigger>
              <TabsTrigger 
                value="productCarousel" 
                className={`rounded-lg ${activeTab === "productCarousel" ? "bg-primary text-primary-foreground shadow-md" : "hover:bg-primary/10"}`}
              >
                Product Slider
              </TabsTrigger>
            </TabsList>
            
            <div className="relative min-h-[400px]">
              <TabsContent value="categories" className="mt-0">
                <CategorySection />
              </TabsContent>
              <TabsContent value="bannerCarousel" className="mt-0">
                <BannerCarouselSection />
              </TabsContent>
              <TabsContent value="productCarousel" className="mt-0">
                <ProductCarouselSection />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentManagement;