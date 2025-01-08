"use server";
import { getAllTags } from "@/db/tag";

export const fetchAllTags: typeof getAllTags = async () => await getAllTags();
