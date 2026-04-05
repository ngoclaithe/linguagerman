import { OrdersService } from './orders.service';
import { OrderStatus } from '@prisma/client';
export declare class OrdersController {
    private ordersService;
    constructor(ordersService: OrdersService);
    getAllOrders(req: any): Promise<({
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
    create(req: any, courseIds: string[]): Promise<{
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
    getMyOrders(req: any): Promise<({
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
    complete(id: string): Promise<{
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
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        totalPrice: number;
        status: import("@prisma/client").$Enums.OrderStatus;
    }>;
    updateStatus(req: any, id: string, status: OrderStatus): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        totalPrice: number;
        status: import("@prisma/client").$Enums.OrderStatus;
    }>;
}
