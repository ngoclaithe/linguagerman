import React from "react";
import { Check, X } from "lucide-react";

interface OrderRow {
    id: string;
    user?: {
        name: string;
        email: string;
    };
    items: any[];
    totalPrice: number;
    status: string;
}

interface OrderTableProps {
    orders: OrderRow[];
    onUpdateStatus: (id: string, status: string) => void;
}

const OrderTable: React.FC<OrderTableProps> = ({ orders, onUpdateStatus }) => {
    return (
        <tbody className="divide-y divide-slate-100 bg-white">
            {orders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4 font-bold text-slate-900">#{order.id.slice(-8).toUpperCase()}</td>
                    <td className="px-6 py-4">
                        <div className="flex flex-col">
                            <span className="font-bold text-slate-900">{order.user?.name || "Học viên"}</span>
                            <span className="text-xs text-slate-500">{order.user?.email}</span>
                        </div>
                    </td>
                    <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                            {order.items.map((item: any) => (
                                <div key={item.id} className="text-xs font-medium text-slate-600">
                                    • {item.course?.title}
                                </div>
                            ))}
                        </div>
                    </td>
                    <td className="px-6 py-4 font-black text-[#C53030]">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalPrice)}
                    </td>
                    <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1 font-bold text-xs rounded-lg ${order.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-600' :
                            order.status === 'PENDING' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
                            }`}>
                            {order.status === 'COMPLETED' ? 'Đã duyệt' : order.status === 'PENDING' ? 'Chờ duyệt' : 'Đã hủy'}
                        </span>
                    </td>
                    <td className="px-6 py-4 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {order.status === 'PENDING' && (
                            <>
                                <button
                                    onClick={() => onUpdateStatus(order.id, 'COMPLETED')}
                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-emerald-500 hover:bg-emerald-50 transition-colors"
                                    title="Duyệt đơn hàng"
                                >
                                    <Check className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => onUpdateStatus(order.id, 'CANCELLED')}
                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-rose-500 hover:bg-rose-50 transition-colors"
                                    title="Hủy đơn hàng"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </>
                        )}
                    </td>
                </tr>
            ))}
        </tbody>
    );
};

export default OrderTable;
