import heart_icon from "./heart.png";
import rupees_icon from "./indian-rupee.png";
import phone_icon from "./phone.png";
import search_icon from "./search.png";
import cart_icon from "./shopping-cart.png";
import account_icon from "./user-round.png";
import upload from "./upload.png";
import mobile from "./mobile.png";
import laptop from "./laptop.png";
import tablet from "./tablet.png";
import watch from "./watch.png";
import monitor from "./monitor.png";
import earbuds from "./earbuds.png";
import service1 from "./service1.png";
import service2 from "./service2.png";
import service3 from "./service3.png";
import GoogleLogo from "./google.png";
import wishList from "./wishlist.png";
import CartEmpty from "./CartEmpty.png";
import BannerLogo from "./banner-logo.png";
import shoppingBoyGif from "./little-boy.png";
import iphone16Banner from "./iphone-16-banner.png";
import pfpimg from "./pfpimg.png";
import del from "./del.png";
import edit from "./edit.png";
import image from "./image.png";
import banner from "./banner.png";
import verify from "./verify.png";
import bannerdash from "./orderbanner.png";
import demoimg from "./demopimg.png";
import paymentOptions from "./payment-options.png";
import aquibpfp from "./aquib.jpg";
import aadarshpfp from "./aadarsh.jpg";
import raihanpfp from "./raihan.jpg";
import sumitpfp from "./sumit.jpeg";

// all the icons and image
export const assets = {
  aquibpfp,
  aadarshpfp,
  raihanpfp,
  sumitpfp,
  heart_icon,
  rupees_icon,
  phone_icon,
  search_icon,
  cart_icon,
  account_icon,
  upload,
  mobile,
  laptop,
  tablet,
  monitor,
  watch,
  earbuds,
  GoogleLogo,
  wishList,
  CartEmpty,
  BannerLogo,
  shoppingBoyGif,
  iphone16Banner,
  image,
  edit,
  del,
  verify,
  banner,
  pfpimg,
  bannerdash,
  demoimg,
  paymentOptions,
};

import { Home, BadgeIndianRupee, Package } from "lucide-react";
//services to help you
export const serviceContain = [
  {
    id: 0,
    img: service1,
    icon: Home,
    title: "Frequently Asked Questions",
    desc: "Updates on safe Shopping in our Stores",
  },
  {
    id: 1,
    img: service2,
    icon: BadgeIndianRupee,
    title: "Online Payment Process",
    desc: "Updates on safe Shopping in our Stores",
  },
  {
    id: 2,
    img: service3,
    icon: Package,
    title: "Home Delivery Options",
    desc: "Updates on safe Shopping in our Stores",
  },
];
export const BackContent = {
  0: {
    faqs: [
      {
        question: "How do I create an account?",
        answer:
          "Click on the 'Sign Up' button in the top right corner of our website and follow the prompts.",
      },
      {
        question: "What are your store hours?",
        answer:
          "Our stores are open Monday to Saturday from 9AM to 9PM, and Sunday from 10AM to 7PM.",
      },
      {
        question: "Do you offer international shipping?",
        answer:
          "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location.",
      },
    ],
    additionalInfo:
      "For more information, please contact our customer service team.",
  },
  1: {
    faqs: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept Visa, Mastercard, American Express, PayPal, and Apple Pay.",
      },
      {
        question: "Is it safe to use my credit card on your website?",
        answer:
          "Yes, our website uses SSL encryption to protect your payment information.",
      },
      {
        question: "When will my card be charged?",
        answer:
          "Your card will be charged when your order is processed, typically within 24 hours of placing the order.",
      },
    ],
    additionalInfo:
      "We never store your full credit card information on our servers.",
  },
  2: {
    faqs: [
      {
        question: "How much does delivery cost?",
        answer:
          "Delivery costs start at $5.99 and vary based on location and order size. Orders over $50 qualify for free delivery.",
      },
      {
        question: "How long does delivery take?",
        answer:
          "Standard delivery takes 3-5 business days. Express delivery (1-2 business days) is available for an additional fee.",
      },
      {
        question: "Can I change my delivery address after placing an order?",
        answer:
          "You can change your delivery address within 2 hours of placing your order by contacting customer service.",
      },
    ],
    additionalInfo:
      "We deliver to all mainland addresses and select international destinations.",
  },
};
export const reviews = [
  {
    id: 1,
    author: "Alex M.",
    rating: 5,
    content:
      "The product exceeded my expectations! The quality is top-notch. Being a designer myself, I'm quite picky about aesthetics, and this definitely meets my standards.",
    verified: true,
  },
  {
    id: 2,
    author: "Samantha D.",
    rating: 4,
    content:
      "I absolutely love this! The design is unique and feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to item.",
    verified: true,
  },
  {
    id: 3,
    author: "John R.",
    rating: 5,
    content:
      "Fantastic product! It's exactly what I was looking for. The build quality is excellent and it performs brilliantly.",
    verified: true,
  },
  {
    id: 4,
    author: "Emily S.",
    rating: 4,
    content:
      "Great value for money. It does everything it promises and more. I'm very satisfied with my purchase.",
    verified: true,
  },
  {
    id: 5,
    author: "Michael T.",
    rating: 5,
    content:
      "I'm impressed with how well-designed this product is. It's intuitive to use and looks great. Highly recommended!",
    verified: true,
  },
  {
    id: 6,
    author: "Sarah L.",
    rating: 4,
    content:
      "Very good product overall. There are a few minor things that could be improved, but it's still excellent value.",
    verified: true,
  },
];
export const offers = [
  {
    type: "Cashback",
    description: "Up to ₹2000 cashback on HDFC Credit Cards",
    code: "HDFC2000",
  },
  {
    type: "Bank Offer",
    description: "10% Instant Discount on SBI Credit Cards",
    code: "SBI10",
  },
  {
    type: "Partner Offer",
    description: "GST Invoice Available for Business Purchase",
    code: null,
  },
];
export const specifications = [
  { label: "Brand", value: "TechPro" },
  { label: "Model", value: "TP-2023" },
  { label: "Warranty", value: "1 Year Manufacturer Warranty" },
  { label: "In The Box", value: "Device, Charger, User Manual" },
  { label: "Color", value: "Midnight Black" },
];
export const faqs = [
  {
    question: "What is the warranty period?",
    answer:
      "The product comes with 1 year manufacturer warranty and 6 months warranty on accessories.",
  },
  {
    question: "Is this product eligible for return?",
    answer:
      "Yes, this product is eligible for return within 7 days of delivery if unused and in original packaging.",
  },
  {
    question: "Do you provide installation service?",
    answer:
      "Yes, we provide free installation service for this product in selected cities.",
  },
];
