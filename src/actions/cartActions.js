"use server";
import { cookies } from "next/headers";
import { fetchWithAuth } from "@/lib/fetchWithAuth";

const BASE = process.env.NEXT_PUBLIC_BASE_API;

/**
 * Fetch the cart from the backend
 */
export async function getCart() {
  try {
    const res = await fetchWithAuth(`${BASE}/api/v1/cart`, {
      method: "GET",
    });
    const data = await res.json();
    return { success: res.ok, data: data.data || data };
  } catch (error) {
    console.error("Failed to get cart:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Add a bootcamp to the backend cart
 */
export async function addToCart(bootcampId) {
  try {
    const res = await fetchWithAuth(`${BASE}/api/v1/cart/bootcamps/${bootcampId}`, {
      method: "POST",
    });
    const data = await res.json();
    return { success: res.ok, data: data.data || data };
  } catch (error) {
    console.error("Failed to add to cart:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Remove a bootcamp from the backend cart
 */
export async function removeFromCart(bootcampId) {
  try {
    const res = await fetchWithAuth(`${BASE}/api/v1/cart/bootcamps/${bootcampId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    return { success: res.ok, data: data.data || data };
  } catch (error) {
    console.error("Failed to remove from cart:", error);
    return { success: false, error: error.message };
  }
}
