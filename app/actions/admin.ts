"use server";

import { db } from "@/lib/db";
import { users, cars, webConfig, testimonials } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { encryptSession, setSessionCookie, deleteSessionCookie, getSession } from "@/lib/auth";
import { uploadFile } from "@/lib/upload";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Auth Actions
export async function loginAction(prevState: any, formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return { error: "Username and password are required" };
  }

  try {
    const userList = await db.select().from(users).where(eq(users.username, username));
    const user = userList[0];

    if (!user) {
      return { error: "Invalid username or password" };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { error: "Invalid username or password" };
    }

    const sessionToken = await encryptSession({
      userId: user.id,
      username: user.username,
      name: user.name,
      role: user.role,
    });

    await setSessionCookie(sessionToken);
  } catch (error: any) {
    console.error("Login error:", error);
    return { error: "Internal server error" };
  }

  redirect("/admin/dashboard");
}

export async function logoutAction() {
  await deleteSessionCookie();
  redirect("/admin/login");
}

// Check session middleware helper
async function checkAuth() {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}

// Web Config Actions
export async function updateWebConfigAction(formData: FormData) {
  await checkAuth();

  const idStr = formData.get("id") as string;
  const address = formData.get("address") as string;
  const phone = formData.get("phone") as string;
  const tiktokAccount = formData.get("tiktokAccount") as string;
  const instagramAccount = formData.get("instagramAccount") as string;
  const mapPinPoint = formData.get("mapPinPoint") as string;

  try {
    if (idStr) {
      const id = parseInt(idStr);
      await db.update(webConfig).set({
        address,
        phone,
        tiktokAccount,
        instagramAccount,
        mapPinPoint,
        updatedAt: new Date(),
      }).where(eq(webConfig.id, id));
    } else {
      await db.insert(webConfig).values({
        address,
        phone,
        tiktokAccount,
        instagramAccount,
        mapPinPoint,
      });
    }

    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Error updating web config:", error);
    return { error: error.message || "Failed to update config" };
  }
}

// Cars Actions
export async function saveCarAction(formData: FormData) {
  await checkAuth();

  const idStr = formData.get("id") as string;
  const name = formData.get("name") as string;
  const price = formData.get("price") as string;
  const qtyStr = formData.get("qty") as string;
  const pricePer = formData.get("pricePer") as string;
  const imageFile = formData.get("imageFile") as File | null;
  let imageUrl = formData.get("imageUrl") as string;

  if (!name || !price || !qtyStr) {
    return { error: "Name, price, and quantity are required" };
  }

  const qty = parseInt(qtyStr);

  try {
    // If a new image file is uploaded, process it
    if (imageFile && imageFile.size > 0 && imageFile.name !== "undefined") {
      console.log("DEBUG: Uploading new file...");
      imageUrl = await uploadFile(imageFile);
      console.log("DEBUG: Uploaded file URL:", imageUrl);
    }

    if (!imageUrl) {
      return { error: "Car image is required" };
    }

    if (idStr) {
      const id = parseInt(idStr);
      await db.update(cars).set({
        name,
        price,
        qty,
        pricePer,
        image: imageUrl,
        updatedAt: new Date(),
      }).where(eq(cars.id, id));
    } else {
      await db.insert(cars).values({
        name,
        price,
        qty,
        pricePer,
        image: imageUrl,
      });
    }

    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Error saving car:", error);
    return { error: error.message || "Failed to save car" };
  }
}

export async function deleteCarAction(id: number) {
  await checkAuth();

  try {
    await db.delete(cars).where(eq(cars.id, id));
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting car:", error);
    return { error: error.message || "Failed to delete car" };
  }
}

// Testimonials Actions
export async function saveTestimonialAction(formData: FormData) {
  await checkAuth();

  const idStr = formData.get("id") as string;
  const name = formData.get("name") as string;
  const starsStr = formData.get("stars") as string;
  const comment = formData.get("comment") as string;

  if (!name || !starsStr || !comment) {
    return { error: "Name, stars, and comment are required" };
  }

  const stars = parseInt(starsStr);

  try {
    if (idStr) {
      const id = parseInt(idStr);
      await db.update(testimonials).set({
        name,
        stars,
        comment,
        updatedAt: new Date(),
      }).where(eq(testimonials.id, id));
    } else {
      await db.insert(testimonials).values({
        name,
        stars,
        comment,
      });
    }

    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Error saving testimonial:", error);
    return { error: error.message || "Failed to save testimonial" };
  }
}

export async function deleteTestimonialAction(id: number) {
  await checkAuth();

  try {
    await db.delete(testimonials).where(eq(testimonials.id, id));
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting testimonial:", error);
    return { error: error.message || "Failed to delete testimonial" };
  }
}
