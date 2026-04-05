export declare const UserRole: {
    readonly STUDENT: "STUDENT";
    readonly ADMIN: "ADMIN";
};
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
export declare const CourseLevel: {
    readonly N5: "N5";
    readonly N4: "N4";
    readonly N3: "N3";
    readonly N2: "N2";
    readonly N1: "N1";
};
export type CourseLevel = (typeof CourseLevel)[keyof typeof CourseLevel];
export declare const OrderStatus: {
    readonly PENDING: "PENDING";
    readonly COMPLETED: "COMPLETED";
    readonly CANCELLED: "CANCELLED";
};
export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];
