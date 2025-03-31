"use client";

import { useEffect, useState } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MoveLeft,
  Star,
  Edit,
  Boxes,
  ShoppingBag,
  TrendingUp,
  Loader2,
  Calendar,
} from "lucide-react";
import axios from "@/lib/axios";
import DeleteButtonDialog from "@/components/Seller/DeleteButtonDialog";
import { toast } from "react-toastify";
import { cn, formatDate } from "@/lib/utils";
import { ViewOrderSkeleton } from "@/components/Seller/Skeletons";
import { Helmet } from "react-helmet-async";

interface Image {
  url: string;
}

interface Review {
  id: number;
  rating: number;
  content: string;
  user: { name: string };
  createdAt: Date;
}
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  offerPercentage: number;
  stock: number;
  categoryName: string;
  status: string;
  brand: string;
  productInfo: { brand: string; details: { key: string; value: string }[] };
  images: { id: number; url: string }[];
  reviews: Array<Review> | [];
}

export default function ViewProduct() {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const [iseDeleting, setIsDeleting] = useState<boolean>(false);
  const [averageRating, setAverageRating] = useState(0);
  const [detailsArray, setDetailsArray] = useState([]);
  const [product, setProduct] = useState<Product | null>(null);

  const handleDelete = async (id: number) => {
    setIsDeleting(true);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/seller/products/${id}`
      );
      if (response.status === 200) {
        toast.success("Product Deleted Successfully", {
          position: "top-center",
          theme: "dark",
        });
        navigate("/seller/dashboard/products");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message, {
        position: "top-center",
        theme: "dark",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handlePermanentDelete = async (id: number) => {
    setIsDeleting(true);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL
        }/api/seller/products/del-permanent/${id}`
      );
      if (response.status === 200) {
        toast.success("Product Deleted Permanently", {
          position: "top-center",
          theme: "dark",
        });
        navigate("/seller/dashboard/products");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message, {
        position: "top-center",
        theme: "dark",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL
          }/api/seller/products/single-product/${id}`
        );
        if (response.status === 200) {
          setProduct(response.data);
        }
      } catch (error: any) {
        console.log(error);
        toast.error(error.message, { position: "top-center", theme: "dark" });
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, []);

  useEffect(() => {
    if (product) {
      setAverageRating(
        product!.reviews.length > 0
          ? product!.reviews.reduce(
            (acc: number, review: Review) => acc + review.rating,
            0
          ) / product!.reviews.length
          : 0.0
      );

      setDetailsArray(
        Array.isArray(product!.productInfo.details)
          ? product!.productInfo.details
          : JSON.parse(product!.productInfo.details || "[]")
      );
    }
  }, [product]);

  if (loading) {
    return (
      <>
        <Helmet
          title="View Product | Seller"
          meta={[
            {
              name: "og:url",
              property: "og:url",
              content: `${import.meta.env.VITE_APP_URL}/seller/dashboard/products/view-product`,
            }
          ]}></Helmet>
        <ViewOrderSkeleton />
      </>
      // <div className="flex flex-col justify-center items-center h-screen">
      //   <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
      //   <p className="text-muted-foreground">Loading Product Details...</p>
      // </div>
    );
  }

  return (
    <div className=" p-1.5 space-y-6">
      <Helmet
        title={`Product - ${product!.name}`}
        meta={[
          {
            name: "description",
            content: `Product details for ${product!.name}`,
          },
          {
            property: "og:title",
            content: `Product - ${product!.name}`,
          },
          {
            property: "og:description",
            content: `Product details for ${product!.name}`,
          },
        ]}
      ></Helmet>

      <div className="flex justify-between items-center">
        <Button
          className="text-xs md:text-sm bg-transparent text-muted-foreground rounded-full hover:bg-accent shadow-none"
          onClick={() => navigate(-1)}
        >
          <MoveLeft className="h-4 w-4" /> Back to Products
        </Button>
        <div className="flex flex-row space-x-2">
          <Button
            onClick={() =>
              navigate(
                `/seller/dashboard/products/edit-product/${product!.id}`,
                {
                  state: {
                    product,
                  },
                }
              )
            }
            className="bg-blue-200 dark:bg-blue-900/35 dark:text-blue-100 border-blue-500 border hover:bg-blue-300 text-blue-700 flex items-center space-x-2 p-1 px-2.5 shadow-none rounded-xl focus-visible:right-0 "
          >
            <Edit className="w-5" />
            <span className="text-sm font-medium"> Edit</span>
          </Button>
          {product!.status !== "Discontinued" ? (
            <DeleteButtonDialog
              id={product!.id}
              text="Delete"
              handleDelete={handleDelete}
              isDeleting={iseDeleting}
            />
          ) : (
            <DeleteButtonDialog
              id={product!.id}
              text="Delete Permanently"
              handleDelete={handlePermanentDelete}
              isDeleting={iseDeleting}
            />
          )}
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1  md:grid-cols-3 gap-4">
        <Card className="shadow-sm hover:shadow-md border-primary/70 bg-primary/5 dark:bg-gradient-to-br from-primary/15 via-slate-900/30 to-primary/15   transition-all">
          <CardContent className="pt-6 ">
            <div className="flex flex-wrap-reverse gap-2 justify-between items-center">
              <div>
                <p className="text-sm font-medium text-accent-foreground/90">Total Sales</p>
                <h3 className="text-2xl font-bold">₹2,45,000</h3>
              </div>
              <div className="p-2 bg-green-100 dark:bg-green-950 rounded-full">
                <TrendingUp className="h-8 w-8 lg:h-10 lg:w-10 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow-md border-primary/70 bg-primary/5 dark:bg-gradient-to-br from-primary/15 via-slate-900/30 to-primary/15   transition-all">
          <CardContent className="pt-6 ">
            <div className="flex flex-wrap-reverse gap-2 justify-between items-center">
              <div>
                <p className="text-sm font-medium text-accent-foreground/90">
                  Total Units Sold
                </p>
                <h3 className="text-2xl font-bold">157</h3>
              </div>
              <div className="p-2 bg-blue-100 dark:bg-blue-950 rounded-full">
                <ShoppingBag className="h-8 w-8 lg:h-10 lg:w-10 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow-md border-primary/70 bg-primary/5 dark:bg-gradient-to-br from-primary/15 via-slate-900/30 to-primary/15   transition-all">
          <CardContent className="pt-6">
            <div className="flex flex-wrap-reverse gap-2 justify-between items-center">
              <div>
                <p className="text-sm font-medium text-accent-foreground/90">
                  Current Stock{" "}
                </p>
                <h3 className="text-2xl font-bold">{product!.stock}</h3>
              </div>
              <div className="p-2 bg-yellow-100 dark:bg-yellow-950 rounded-full">
                <Boxes className="h-8 w-8 lg:h-10 lg:w-10 text-yellow-600 dark:text-yelow-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="details" className="w-full space-y-4">
        <TabsList className="grid w-full rounded-xl grid-cols-3 space-x-1 ">
          <TabsTrigger className="hover:bg-primary/15 rounded-lg" value="details"> Details </TabsTrigger>
          <TabsTrigger className="hover:bg-primary/15 rounded-lg" value="images"> Images </TabsTrigger>
          <TabsTrigger className="hover:bg-primary/15 rounded-lg" value="reviews"> Reviews </TabsTrigger>
        </TabsList>

        {/* Product Details Tab */}
        <TabsContent value="details" className="space-y-4 ">
          <Card className="shadow-sm border-primary/75 bg-primary/5 dark:bg-gradient-to-br from-primary/10 via-slate-900/30 to-primary/10 ">
            <CardHeader>
              <CardTitle className="bg-primary/30  text-primary py-3 px-2 rounded-md">
                Product Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4  ">
              {/* Grid Layout for Product Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 px-2 gap-4">
                {/* Product Name - Full width on small screens, 1st column on md */}
                <div className="space-y-2 flex flex-col md:col-span-1">
                  <Label htmlFor="name">Product Name</Label>
                  <div className="outline-none bg-transparent  font-medium break-words">
                    {product!.name}
                  </div>
                </div>

                {/* Remaining Details - 2nd column on md */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:col-span-1">
                  <div className="space-y-2 flex flex-col">
                    <Label htmlFor="price">Price (₹)</Label>
                    <input
                      id="price"
                      value={product!.price}
                      disabled
                      className="outline-none bg-transparent  font-medium"
                    />
                  </div>
                  <div className="space-y-2 flex flex-col">
                    <Label htmlFor="category">Category</Label>
                    <input
                      disabled
                      value={product!.categoryName}
                      className="outline-none bg-transparent  font-medium"
                    />
                  </div>
                  <div className="space-y-2 flex flex-col">
                    <Label htmlFor="status">Status</Label>
                    <label
                      className={cn(
                        product!.status === "Discontinued"
                          ? "text-red-600 bg-red-100"
                          : "text-green-800 bg-green-100",
                        "outline-none w-fit px-3 py-1 text-[14px] rounded-lg"
                      )}
                    >
                      {product!.status}
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-2 flex flex-col  px-2">
                <Label htmlFor="description">Description</Label>
                <label
                  id="description"
                  className="outline-none bg-transparent w-full  text-card-foreground/80 font-medium "
                >
                  {product!.description}
                </label>
              </div>
              <hr />
              <div className="space-y-4 grid grid-cols ">
                <Label className="font-semibold text-md bg-primary/30 text-primary py-2 rounded-md px-2">
                  Specifications
                </Label>
                {detailsArray.length > 0 ? (
                  detailsArray.map(
                    (detail: { key: string; value: string }, index: number) => (
                      <div
                        key={index}
                        className="grid grid-cols-1 md:grid-cols-2 px-2 gap-2"
                      >
                        <label className="font-medium  text-md">
                          {detail.key}
                        </label>
                        <div
                          className="w-full  pl-4 bg-transparent text-accent-foreground/90 font-medium break-words"
                        >
                          {detail.value}
                        </div>


                      </div>
                    )
                  )
                ) : (
                  <h1 className="px-2">No Specifications available</h1>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Images Tab */}
        <TabsContent value="images">
          <Card className="border-primary/60 bg-primary/5 dark:bg-gradient-to-br from-primary/15 via-slate-900/30 to-primary/15 rounded-xl ">
            <CardHeader>
              <CardTitle className="text-xl">Product Images</CardTitle>
            </CardHeader>
            <CardContent className=" px-4 ">
              <div className="">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
                  {product!.images.length > 0 ? (
                    product!.images.map((image: Image, index: number) => (
                      <div key={index} className="group ">
                        <img
                          src={image.url}
                          alt={`Product ${index + 1}`}
                          className="w-full h-full md:w-96 p-2  bg-background border border-primary/70 object-contain rounded-xl"
                        />
                      </div>
                    ))
                  ) : (
                    <h2 className="px-2">No image available</h2>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews">
          <Card className="border-primary/75 bg-primary/5 dark:bg-gradient-to-br from-primary/10 via-slate-900/30 to-primary/10 rounded-xl ">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">Customer Reviews</CardTitle>
                <div className="flex items-center gap-2">
                <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-5 w-5 ${i < averageRating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300 fill-current"
                                      }`}
                                  />
                                ))}
                </div>
                  <span className="text-xl font-semibold">
                    {averageRating}.0/5
                  </span>
                  <span className="text-accent-foreground/85">
                    ({product!.reviews.length} reviews)
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {product!.reviews.length > 0 ? (
                  product!.reviews.map((review: Review) => (
                    <Card className="border-none shadow-none dark:border-primary/55  rounded-xl bg-primary/10" key={review.id}>
                      <CardContent className="pt-4">
                        <div className="flex  ">
                          <div className=" w-full flex justify-between ">
                            <div className="flex items-center  gap-2">
                              
                              <span className="bg-gradient-to-br from-primary/60 to-blue-800 p-1.5 text-center text-white  px-2 font-semibold rounded-full">
                                {review.user.name
                                  .split(" ")
                                  .map((letter: string) => letter[0])
                                  .join("")
                                  .toUpperCase()}
                              </span>
                              <div className="font-semibold">
                                {review.user.name}
                              </div>
                              </div>
                              <div className="space-x-1 flex items-center">
                              <div className="flex space-x-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < review.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300 fill-current"
                                      }`}
                                  />
                                ))}
                              </div>
                              <span className="font-medium text-sm">{review.rating}.0/5</span>
                              </div>
                            
                          </div>
                        </div>
                        <p className="mt-1 text-accent-foreground/95">{review.content}</p>
                        <div className="text-sm mt-1 flex items-center space-x-1 text-accent-foreground/85">
                          <Calendar className="w-4 h-4"/>
                            <span>{formatDate(review.createdAt)}</span>
                            </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <h1 className="px-2">No reveiws available</h1>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
