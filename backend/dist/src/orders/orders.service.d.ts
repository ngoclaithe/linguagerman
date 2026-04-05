import { PrismaService } from '../prisma/prisma.service';
import { OrderStatus } from '@prisma/client';
export declare class OrdersService {
    private prisma;
    constructor(prisma: PrismaService);
    createOrder(userId: string, courseIds: string[]): Promise<{
        items: {
            id: string;
            createdAt: Date;
            price: number;
            courseId: string;
            orderId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        totalPrice: number;
        status: import("@prisma/client").$Enums.OrderStatus;
    }>;
    getMyOrders(userId: string): Promise<({
        items: ({
            course: {
                id: string;
                slug: string | null;
                createdAt: Date;
                updatedAt: Date;
                title: string;
                description: string | null;
                level: import("@prisma/client").$Enums.CourseLevel;
                price: number;
                thumbnail: string | null;
                teacherId: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            price: number;
            courseId: string;
            orderId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        totalPrice: number;
        status: import("@prisma/client").$Enums.OrderStatus;
    })[]>;
    getAllOrders(user: any): Promise<({
        [x: string]: {
            id: string;
            createdAt: Date;
            price: number;
            courseId: string;
            orderId: string;
        }[] | ({
            id: string;
            createdAt: Date;
            price: number;
            courseId: string;
            orderId: string;
        } | {
            id: string;
            createdAt: Date;
            price: number;
            courseId: string;
            orderId: string;
        })[];
        [x: number]: never;
        [x: symbol]: never;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        totalPrice: number;
        status: import("@prisma/client").$Enums.OrderStatus;
    })[]>;
    completeOrder(orderId: string): Promise<{
        items: {
            id: string;
            createdAt: Date;
            price: number;
            courseId: string;
            orderId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        totalPrice: number;
        status: import("@prisma/client").$Enums.OrderStatus;
    }>;
    updateOrderStatus(orderId: string, status: OrderStatus, user: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        totalPrice: number;
        status: import("@prisma/client").$Enums.OrderStatus;
    }>;
    removeOrder(orderId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        totalPrice: number;
        status: import("@prisma/client").$Enums.OrderStatus;
    }>;
}
