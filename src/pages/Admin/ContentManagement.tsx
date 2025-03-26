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
  const [loading, setLoadung] = useState(true);
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
        setLoadung(false);
      }
    };

    getAllCategories();
  }, []);

  useEffect(() => {
    const getAllBannerCarousels = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/admin/cms/banner-carousels`
        );
        if (response.status === 200) {
          setBannerCarousels(response.data);
        }
      } catch (error: any) {
        console.log(error);
      }
    };
    getAllBannerCarousels();
  }, []);

  useEffect(() => {
    const getAllProductCarousels = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/admin/cms/product-carousels`
        );
        if (response.status === 200) {
          setProductCarousels(response.data);
        }
      } catch (error: any) {
        console.log(error);
      }
    };
    getAllProductCarousels();
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
  const BannerCarouselSection = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Banner Images</h3>
        <AddBannerCarousel setBannerCarousels={setBannerCarousels} />
      </div>
      <TableWrapper>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sr no</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Link</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bannerCarousels.length > 0 ? (
              bannerCarousels.map((bannerCarousel, index) => (
                <TableRow key={bannerCarousel.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{bannerCarousel.title}</TableCell>
                  <TableCell>
                    <div className="w-32 h-24 bg-gray-100 rounded flex items-center justify-center">
                      {bannerCarousel.imageUrl ? (
                        <img
                          src={bannerCarousel.imageUrl}
                          className="w-full h-full object-contain"
                          alt="Banner Image"
                        />
                      ) : (
                        <ImageIcon className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                  </TableCell>

                  <TableCell>{bannerCarousel.href}</TableCell>
                  <TableCell>
                    {bannerCarousel.isActive === true ? "Active" : "Inactive"}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
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
              <h1 className="text-xl font-medium p-4">No Banners found</h1>
            )}
          </TableBody>
        </Table>
      </TableWrapper>
    </div>
  );

  const ProductCarouselSection = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Product Slider Images</h3>
        <AddProductCarousel setProductCarousels={setProductCarousels} />
      </div>
      <TableWrapper>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sr no</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Link</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productCarousels.length > 0 ? (
              productCarousels.map((productCarousel, index) => (
                <TableRow key={productCarousel.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{productCarousel.name}</TableCell>
                  <TableCell>
                    <div className="w-32 h-24 bg-gray-100 rounded flex items-center justify-center">
                      {productCarousel.imageUrl ? (
                        <img
                          src={productCarousel.imageUrl}
                          className="w-full h-full object-contain"
                          alt="Banner Image"
                        />
                      ) : (
                        <ImageIcon className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>₹{formatPrice(productCarousel.price)}</TableCell>
                  <TableCell>{productCarousel.href}</TableCell>
                  <TableCell>
                    {productCarousel.isActive === true ? "Active" : "Inactive"}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
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
              <h1 className="text-xl font-medium p-4">No Products found</h1>
            )}
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
                <TableHead>Sr no</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!loading ? (
                categories.length > 0 ? (
                  categories.map((category, index) => (
                    <TableRow key={category.name}>
                      <TableCell>{index + 1}</TableCell>
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
                  <h1 className="text-xl font-medium p-4">
                    No Categories found
                  </h1>
                )
              ) : (
                <tr>
                  <td colSpan={4}>
                    <div className="flex justify-center items-center h-64 w-full">
                      <Loader2 className="h-12 w-12 animate-spin text-primary mr-2" />
                      <p className="text-muted-foreground">
                        Loading Categories...
                      </p>
                    </div>
                  </td>
                </tr>
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
              <TabsTrigger value="bannerCarousel">Banners</TabsTrigger>
              <TabsTrigger value="productCarousel">Product Slider</TabsTrigger>
            </TabsList>
            <TabsContent value="categories">
              <CategorySection />
            </TabsContent>
            <TabsContent value="bannerCarousel">
              <BannerCarouselSection />
            </TabsContent>
            <TabsContent value="productCarousel">
              <ProductCarouselSection />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentManagement;
