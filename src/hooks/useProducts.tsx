import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface PriceData {
  platform: string;
  price: number;
  originalPrice: number;
  couponCode: string;
  discount: number;
  available: boolean;
  delivery_time?: string;
  trend?: "up" | "down" | "stable";
  url?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  image_emoji?: string;
  quantity?: string;
  price_data: PriceData[];
}

export const useProducts = (category?: string) => {
  return useQuery({
    queryKey: ["products", category],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke("get-products", {
        body: category ? { category } : {},
      });

      if (error) throw error;
      return data.products as Product[];
    },
  });
};

export const useComparePrice = () => {
  const comparePrice = async (searchQuery: string) => {
    const { data, error } = await supabase.functions.invoke("compare-prices", {
      body: { searchQuery },
    });

    if (error) throw error;
    return data;
  };

  return { comparePrice };
};

export const useFetchLivePrice = () => {
  const fetchLivePrice = async (productName: string) => {
    const { data, error } = await supabase.functions.invoke("fetch-live-prices", {
      body: { productName },
    });

    if (error) throw error;
    return data;
  };

  return { fetchLivePrice };
};
