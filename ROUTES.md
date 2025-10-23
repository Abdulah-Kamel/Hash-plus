# Available Routes in Hash Plus Platform

This document lists all the available routes in the Hash Plus frontend application.

## 📍 Route Structure

The application follows Next.js 13+ App Router structure where each route is defined by a `page.js` file within a directory.

## 🏠 Main Routes

### **Home Page**
- **Route:** `/`
- **File:** `src/app/page.js`
- **Description:** Landing page of the application

### **About Us**
- **Route:** `/about-us`
- **File:** `src/app/about-us/page.js`
- **Description:** About us page with company information

### **Authentication Routes**

#### Login
- **Route:** `/login`
- **File:** `src/app/login/page.js`
- **Description:** User login page

#### Register
- **Route:** `/register`
- **File:** `src/app/register/page.js`
- **Description:** User registration page

#### OTP Verification
- **Route:** `/otp`
- **File:** `src/app/otp/page.js`
- **Description:** One-time password verification page

### **Learning Platform Routes**

#### Courses
- **Route:** `/course`
- **File:** `src/app/course/page.js`
- **Description:** Course listing page

#### Course Details
- **Route:** `/course-page`
- **File:** `src/app/course-page/page.js`
- **Description:** Individual course details page

#### Course Assignment
- **Route:** `/course-page/assignment`
- **File:** `src/app/course-page/assignment/page.js`
- **Description:** Course assignment page

#### My Learning
- **Route:** `/my-learning`
- **File:** `src/app/my-learning/page.js`
- **Description:** User's enrolled courses and learning progress

#### Library
- **Route:** `/library`
- **File:** `src/app/library/page.js`
- **Description:** Resource library page

### **E-commerce Routes**

#### Shop
- **Route:** `/shop`
- **File:** `src/app/shop/page.js`
- **Layout:** `src/app/shop/layout.js`
- **Description:** Product catalog and shopping page

#### Shopping Cart
- **Route:** `/cart`
- **File:** `src/app/cart/page.js`
- **Description:** Shopping cart with selected items

#### Payment
- **Route:** `/payment`
- **File:** `src/app/payment/page.js`
- **Description:** Payment processing page with multiple payment methods (Visa, Mastercard, Tabby, Mada)

### **Teacher/Instructor Routes**

#### Teacher Profile
- **Route:** `/teacher/[id]`
- **File:** `src/app/teacher/[id]/page.js`
- **Description:** Dynamic route for individual teacher profiles
- **Parameters:** `id` - Teacher's unique identifier

## 🎯 Route Categories

### **Public Routes** (No authentication required)
- `/` - Home
- `/about-us` - About Us
- `/login` - Login
- `/register` - Register
- `/course` - Course Listing
- `/shop` - Shop
- `/teacher/[id]` - Teacher Profiles

### **Protected Routes** (Authentication required)
- `/my-learning` - My Learning Dashboard
- `/course-page` - Course Details
- `/course-page/assignment` - Course Assignments
- `/library` - Resource Library
- `/cart` - Shopping Cart
- `/payment` - Payment Processing
- `/otp` - OTP Verification

## 📁 File Structure Summary

```
src/app/
├── page.js                           # Home (/)
├── about-us/
│   └── page.js                       # About Us (/about-us)
├── login/
│   └── page.js                       # Login (/login)
├── register/
│   └── page.js                       # Register (/register)
├── otp/
│   └── page.js                       # OTP (/otp)
├── course/
│   └── page.js                       # Courses (/course)
├── course-page/
│   ├── page.js                       # Course Details (/course-page)
│   └── assignment/
│       └── page.js                   # Assignment (/course-page/assignment)
├── my-learning/
│   └── page.js                       # My Learning (/my-learning)
├── library/
│   └── page.js                       # Library (/library)
├── shop/
│   ├── layout.js                     # Shop Layout
│   └── page.js                       # Shop (/shop)
├── cart/
│   └── page.js                       # Cart (/cart)
├── payment/
│   └── page.js                       # Payment (/payment)
└── teacher/
    └── [id]/
        └── page.js                   # Teacher Profile (/teacher/[id])
```

## 🔧 Special Features

- **Dynamic Routes:** `/teacher/[id]` supports dynamic teacher IDs
- **Nested Routes:** Course assignments are nested under course pages
- **Custom Layouts:** Shop section has its own layout configuration
- **Arabic Support:** Multiple pages support RTL (Right-to-Left) content
- **Payment Integration:** Multiple payment methods including Tabby installments

## 📝 Notes

- All routes use Next.js 13+ App Router structure
- Routes are automatically generated based on folder structure
- Each `page.js` file represents a route endpoint
- Layout files provide shared UI components for route groups
