import { Document, Types } from "mongoose";

export interface IAddress extends Document {
    user: Types.ObjectId;
    type: "Home" | "Work" | "Other";
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    isDefault: boolean;
    createdAt: Date;
}

export interface ICartItem {
    product: Types.ObjectId;
    quantity: number;
    price: number;
    size?: string;
}

export interface ICart extends Document {
    user: Types.ObjectId;
    items: ICartItem[];
    totalAmount: number;
    calculateTotal(): number;
    createdAt: Date;
    updatedAt: Date;
}

export interface IOrderItem {
    product: Types.ObjectId;
    name: string;
    quantity: number;
    price: number;
    size?: string;
}

export interface IOrder extends Document {
    user: Types.ObjectId;
    orderNumber: string;
    items: IOrderItem[];
    shippingAddress: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    paymentMethod: "cash" | "stripe";
    paymentStatus: "pending" | "paid" | "failed" | "refunded";
    paymentIntentId?: string;
    orderStatus: "placed" | "processing" | "shipped" | "delivered" | "cancelled";
    subtotal: number;
    shippingCost: number;
    tax: number;
    totalAmount: number;
    notes?: string;
    deliveredAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    comparePrice?: number;
    images: string[];
    sizes: string[];
    category: "Men" | "Women" | "Kids" | "Shoes" | "Bags" | "Other";
    stock: number;
    ratings: {
        average: number;
        count: number;
    };
    isFeatured: boolean;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUser extends Document {
    name: string;
    email: string;
    clerkId: string;
    image?: string;
    role: "user" | "admin";
    createdAt: Date;
    updatedAt: Date;
}

export interface IWishlist extends Document {
    user: Types.ObjectId;
    products: Types.ObjectId[];
    createdAt: Date;
}
