export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    // Allows to automatically instantiate createClient with right options
    // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
    __InternalSupabase: {
        PostgrestVersion: "13.0.5"
    }
    public: {
        Tables: {
            cart_items: {
                Row: {
                    cart_id: string
                    created_at: string | null
                    id: string
                    product_id: string
                    quantity: number | null
                    updated_at: string | null
                }
                Insert: {
                    cart_id: string
                    created_at?: string | null
                    id?: string
                    product_id: string
                    quantity?: number | null
                    updated_at?: string | null
                }
                Update: {
                    cart_id?: string
                    created_at?: string | null
                    id?: string
                    product_id?: string
                    quantity?: number | null
                    updated_at?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "cart_items_cart_id_fkey"
                        columns: ["cart_id"]
                        isOneToOne: false
                        referencedRelation: "carts"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "cart_items_product_id_fkey"
                        columns: ["product_id"]
                        isOneToOne: false
                        referencedRelation: "products"
                        referencedColumns: ["id"]
                    },
                ]
            }
            carts: {
                Row: {
                    created_at: string | null
                    id: string
                    session_id: string | null
                    updated_at: string | null
                    user_id: string | null
                }
                Insert: {
                    created_at?: string | null
                    id?: string
                    session_id?: string | null
                    updated_at?: string | null
                    user_id?: string | null
                }
                Update: {
                    created_at?: string | null
                    id?: string
                    session_id?: string | null
                    updated_at?: string | null
                    user_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "carts_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                ]
            }
            categories: {
                Row: {
                    created_at: string | null
                    id: string
                    image_url: string | null
                    name: string
                    slug: string
                }
                Insert: {
                    created_at?: string | null
                    id?: string
                    image_url?: string | null
                    name: string
                    slug: string
                }
                Update: {
                    created_at?: string | null
                    id?: string
                    image_url?: string | null
                    name?: string
                    slug?: string
                }
                Relationships: []
            }
            order_items: {
                Row: {
                    created_at: string | null
                    id: string
                    order_id: string | null
                    price: number
                    product_id: string | null
                    quantity: number
                }
                Insert: {
                    created_at?: string | null
                    id?: string
                    order_id?: string | null
                    price: number
                    product_id?: string | null
                    quantity: number
                }
                Update: {
                    created_at?: string | null
                    id?: string
                    order_id?: string | null
                    price?: number
                    product_id?: string | null
                    quantity?: number
                }
                Relationships: [
                    {
                        foreignKeyName: "order_items_order_id_fkey"
                        columns: ["order_id"]
                        isOneToOne: false
                        referencedRelation: "orders"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "order_items_product_id_fkey"
                        columns: ["product_id"]
                        isOneToOne: false
                        referencedRelation: "products"
                        referencedColumns: ["id"]
                    },
                ]
            }
            orders: {
                Row: {
                    created_at: string | null
                    id: string
                    order_number: number
                    status: string
                    total: number
                    user_id: string | null
                }
                Insert: {
                    created_at?: string | null
                    id?: string
                    order_number?: number
                    status: string
                    total: number
                    user_id?: string | null
                }
                Update: {
                    created_at?: string | null
                    id?: string
                    order_number?: number
                    status?: string
                    total?: number
                    user_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "orders_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                ]
            }
            products: {
                Row: {
                    category_id: string | null
                    created_at: string | null
                    description: string | null
                    discount: number | null
                    featured: boolean | null
                    id: string
                    image_url: string | null
                    name: string
                    price: number
                    stock: number
                }
                Insert: {
                    category_id?: string | null
                    created_at?: string | null
                    description?: string | null
                    discount?: number | null
                    featured?: boolean | null
                    id?: string
                    image_url?: string | null
                    name: string
                    price: number
                    stock?: number
                }
                Update: {
                    category_id?: string | null
                    created_at?: string | null
                    description?: string | null
                    discount?: number | null
                    featured?: boolean | null
                    id?: string
                    image_url?: string | null
                    name?: string
                    price?: number
                    stock?: number
                }
                Relationships: [
                    {
                        foreignKeyName: "products_category_id_fkey"
                        columns: ["category_id"]
                        isOneToOne: false
                        referencedRelation: "categories"
                        referencedColumns: ["id"]
                    },
                ]
            }
            profiles: {
                Row: {
                    avatar_url: string | null
                    created_at: string | null
                    email: string | null
                    full_name: string | null
                    id: string
                    role: string
                }
                Insert: {
                    avatar_url?: string | null
                    created_at?: string | null
                    email?: string | null
                    full_name?: string | null
                    id: string
                    role?: string
                }
                Update: {
                    avatar_url?: string | null
                    created_at?: string | null
                    email?: string | null
                    full_name?: string | null
                    id?: string
                    role?: string
                }
                Relationships: []
            }
            reviews: {
                Row: {
                    comment: string | null
                    created_at: string | null
                    id: string
                    product_id: string | null
                    rating: number
                    user_id: string | null
                }
                Insert: {
                    comment?: string | null
                    created_at?: string | null
                    id?: string
                    product_id?: string | null
                    rating: number
                    user_id?: string | null
                }
                Update: {
                    comment?: string | null
                    created_at?: string | null
                    id?: string
                    product_id?: string | null
                    rating?: number
                    user_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "reviews_product_id_fkey"
                        columns: ["product_id"]
                        isOneToOne: false
                        referencedRelation: "products"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "reviews_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                ]
            }
            shipping_rules: {
                Row: {
                    cost: number
                    created_at: string | null
                    id: string
                    is_active: boolean | null
                    max_order_value: number | null
                    min_order_value: number | null
                    name: string
                }
                Insert: {
                    cost: number
                    created_at?: string | null
                    id?: string
                    is_active?: boolean | null
                    max_order_value?: number | null
                    min_order_value?: number | null
                    name: string
                }
                Update: {
                    cost?: number
                    created_at?: string | null
                    id?: string
                    is_active?: boolean | null
                    max_order_value?: number | null
                    min_order_value?: number | null
                    name?: string
                }
                Relationships: []
            }
            slideshow: {
                Row: {
                    button_link: string | null
                    button_text: string | null
                    created_at: string | null
                    id: string
                    image_url: string
                    is_active: boolean | null
                    order_index: number | null
                    subtitle: string | null
                    title: string | null
                }
                Insert: {
                    button_link?: string | null
                    button_text?: string | null
                    created_at?: string | null
                    id?: string
                    image_url: string
                    is_active?: boolean | null
                    order_index?: number | null
                    subtitle?: string | null
                    title?: string | null
                }
                Update: {
                    button_link?: string | null
                    button_text?: string | null
                    created_at?: string | null
                    id?: string
                    image_url?: string
                    is_active?: boolean | null
                    order_index?: number | null
                    subtitle?: string | null
                    title?: string | null
                }
                Relationships: []
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
    PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
            Row: infer R
        }
    ? R
    : never
    : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
            Row: infer R
        }
    ? R
    : never
    : never

export type TablesInsert<
    PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
        Insert: infer I
    }
    ? I
    : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
    }
    ? I
    : never
    : never

export type TablesUpdate<
    PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
        Update: infer U
    }
    ? U
    : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
    }
    ? U
    : never
    : never

export type Enums<
    PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
    EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
    ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
    PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
    CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
        schema: keyof Database
    }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
    ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
