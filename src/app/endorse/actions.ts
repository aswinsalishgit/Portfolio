"use server";

import { supabase } from "../../lib/supabase";
import { revalidatePath } from "next/cache";

export async function submitEndorsement(formData: FormData) {
  const name = (formData.get("name") as string) || "";
  const role = (formData.get("role") as string) || "";
  const message = (formData.get("message") as string) || "";

  if (!name || !role || !message) {
    return { success: false, error: "Missing required fields" };
  }

  const { error } = await supabase
    .from("endorsements")
    .insert([
      { name, role, message, created_at: new Date().toISOString() }
    ]);

  if (error) {
    console.error("Supabase Error:", JSON.stringify(error, null, 2), error?.message || error?.code);
    return { success: false, error: "Failed to store endorsement." };
  }

  revalidatePath("/");
  revalidatePath("/endorse");
  
  return { success: true };
}

export async function getEndorsements() {
  const { data, error } = await supabase
    .from("endorsements")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase Error:", JSON.stringify(error, null, 2), error?.message || error?.code);
    return [];
  }

  return data;
}
