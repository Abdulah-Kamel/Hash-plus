"use client";

import React, { useEffect, useRef } from "react";
import Script from "next/script";

const MoyasarForm = ({ amount, description, metadata, onCompleted }) => {
  const formRef = useRef(null);
  const scriptLoaded = useRef(false);
  const formInitialized = useRef(false);

  const initMoyasar = () => {
    // If window.Moyasar exists, the script is loaded, regardless of the ref
    if (typeof window !== "undefined" && window.Moyasar) {
      scriptLoaded.current = true;
    }

    if (
      !scriptLoaded.current ||
      formInitialized.current ||
      !formRef.current ||
      typeof window === "undefined" ||
      !window.Moyasar
    ) {
      return;
    }

    try {
      window.Moyasar.init({
        element: ".mysr-form",
        amount: Math.round(amount * 100), // Moyasar expects amount in Halalas
        currency: "SAR",
        description: description || "Hash Plus Order",
        publishable_api_key: process.env.NEXT_PUBLIC_MOYASAR_PUBLISHABLE_KEY,
        callback_url: `${window.location.origin}/payment/callback`,
        metadata: metadata || {},
        supported_networks: ["mada", "visa", "mastercard"],
        methods: ["creditcard", "applepay"],
        apple_pay: {
          country: "SA",
          label: "Hash Plus",
          validate_merchant_url: "https://api.moyasar.com/v1/applepay/initiate",
        },
        on_completed: onCompleted
          ? async function (payment) {
              await onCompleted(payment);
            }
          : undefined,
      });
      formInitialized.current = true;
    } catch (err) {
      console.error("Error initializing Moyasar:", err);
    }
  };

  useEffect(() => {
    // Attempt initialization immediately in case script is already loaded
    initMoyasar();
    
    return () => {
      // Cleanup to allow re-initialization if component remounts
      formInitialized.current = false;
    };
  }, [amount, description, metadata]);

  return (
    <div className="w-full">
      <link
        rel="stylesheet"
        href="https://cdn.moyasar.com/mpf/1.14.0/moyasar.css"
      />
      <Script
        src="https://cdn.moyasar.com/mpf/1.14.0/moyasar.js"
        strategy="lazyOnload"
        onLoad={() => {
          scriptLoaded.current = true;
          initMoyasar();
        }}
      />
      <style jsx global>{`
        /* Force Moyasar form to take full width and fix RTL alignment */
        .mysr-form {
          width: 100% !important;
          max-width: 100% !important;
          text-align: right !important;
        }
        .mysr-form form {
          width: 100% !important;
          max-width: 100% !important;
        }
        .mysr-form .mysr-form-group {
          margin-bottom: 1.5rem !important;
        }
        .mysr-form button[type="submit"] {
          width: 100% !important;
          border-radius: 9999px !important;
          padding: 1rem !important;
          font-size: 1.125rem !important;
          font-weight: 600 !important;
          background-color: var(--primary) !important;
        }
      `}</style>
      
      {/* Container for Moyasar Form */}
      <div 
        ref={formRef} 
        className="mysr-form w-full min-h-[350px]"
        dir="rtl"
      >
        {/* Moyasar will inject its iframe here */}
      </div>
    </div>
  );
};

export default MoyasarForm;
