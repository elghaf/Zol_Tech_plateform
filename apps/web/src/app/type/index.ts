export interface Course {
    id: number;
    title: string;
    description: string | null;
    category: { id: number; name: string };
    instructor: { id: number; name: string };
    price: number;
    published_at: string;
    created_at: string;
  }
  
  export interface Category {
    id: number;
    name: string;
    slug: string;
    description: string | null;
  }

  