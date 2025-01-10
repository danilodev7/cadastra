import { Product } from "./Product";

const serverUrl = "http://localhost:5000";

export async function fetchProducts(page: number = 1, limit: number = 9): Promise<Product[]> {
  const response = await fetch(`${serverUrl}/products?_page=${page}&_limit=${limit}`);
  if (!response.ok) {
    console.error('Erro ao buscar produtos:', response.statusText);
    return [];
  }
  return await response.json();
}