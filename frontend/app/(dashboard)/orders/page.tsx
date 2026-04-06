'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CreditCard, ShoppingBag, CheckCircle, Clock, AlertCircle, Trash2 } from "lucide-react";
import { ordersAPI, getImageUrl } from "@/lib/api";
import { useToast } from "@/components/ui/toast";
import { ConfirmDialog } from "@/components/ui/dialog";

export default function OrdersPage() {
    const toast = useToast();
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [confirmDelete, setConfirmDelete] = useState<{ isOpen: boolean; orderId: string | null; isLoading: boolean }>({
        isOpen: false,
        orderId: null,
        isLoading: false
    });

    const fetchOrders = async () => {
        try {
            const data = await ordersAPI.getMyOrders();
            setOrders(data);
        } catch (error) {
            console.error("Failed to fetch orders", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleComplete = async (orderId: string) => {
        try {
            
            await ordersAPI.complete(orderId);
            toast.success("Thanh ton thnh cng");
            fetchOrders();
        } catch (error) {
            console.error("Failed to complete order", error);
            toast.error("Khng th thanh ton n hng");
        }
    };

    const handleDelete = async () => {
        if (!confirmDelete.orderId) return;
        setConfirmDelete(prev => ({ ...prev, isLoading: true }));
        try {
            await ordersAPI.delete(confirmDelete.orderId);
            toast.success("Xa n hng thnh cng");
            fetchOrders();
            setConfirmDelete({ isOpen: false, orderId: null, isLoading: false });
        } catch (error) {
            console.error("Failed to delete order", error);
            toast.error("Khng th xa n hng");
            setConfirmDelete(prev => ({ ...prev, isLoading: false }));
        }
    };

    if (loading) return <div>ang ti...</div>;

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-20">
            <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
                <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-[#C53030] mb-8 font-medium"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Quay li Dashboard
                </Link>

                <h1 className="text-3xl font-black text-slate-900 mb-8">n hng ca bn</h1>

                <div className="space-y-6">
                    {orders.length === 0 ? (
                        <div className="bg-white rounded-3xl p-12 text-center border border-slate-100">
                            <ShoppingBag className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Cha c n hng no</h3>
                            <Link href="/courses" className="text-[#C53030] font-bold">Tm kha hc ngay</Link>
                        </div>
                    ) : (
                        orders.map((order) => (
                            <div key={order.id} className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
                                <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
                                    <div>
                                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">M n hng</div>
                                        <div className="text-sm font-bold text-slate-900">#{order.id.slice(-8).toUpperCase()}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Trng thi</div>
                                        <div className={`text-xs font-bold px-3 py-1 rounded-full ${order.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-600' :
                                            order.status === 'PENDING' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
                                            }`}>
                                            {order.status === 'COMPLETED' ? ' thanh ton' :
                                                order.status === 'PENDING' ? 'Ch thanh ton' : ' hy'}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Ngy to</div>
                                        <div className="text-sm font-bold text-slate-900">{new Date(order.createdAt).toLocaleDateString('vi-VN')}</div>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-8">
                                    {order.items.map((item: any) => (
                                        <div key={item.id} className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden">
                                                    <img src={item.course?.thumbnail || "/images/default-course.jpg"} alt="" className="w-full h-full object-cover" />
                                                </div>
                                                <span className="font-bold text-slate-900">{item.course?.title || "Kha hc"}</span>
                                            </div>
                                            <span className="font-medium text-slate-600">
                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-slate-100">
                                    <div className="text-2xl font-black text-[#C53030]">
                                        Tng: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalPrice)}
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {order.status === 'PENDING' && (
                                            <>
                                                <button
                                                    onClick={() => setConfirmDelete({ isOpen: true, orderId: order.id, isLoading: false })}
                                                    className="p-3 rounded-xl border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
                                                    title="Xa n hng"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleComplete(order.id)}
                                                    className="bg-[#C53030] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#C53030]/90 transition-all flex items-center gap-2"
                                                >
                                                    <CreditCard className="w-4 h-4" />
                                                    Thanh ton ngay
                                                </button>
                                            </>
                                        )}
                                        {order.status !== 'PENDING' && (
                                            <button
                                                onClick={() => setConfirmDelete({ isOpen: true, orderId: order.id, isLoading: false })}
                                                className="p-3 rounded-xl border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
                                                title="Xa lch s n hng"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <ConfirmDialog
                isOpen={confirmDelete.isOpen}
                onClose={() => setConfirmDelete({ isOpen: false, orderId: null, isLoading: false })}
                onConfirm={handleDelete}
                title="Xa n hng"
                description="Bn c chc chn mun xa n hng ny? Thao tc ny khng th hon tc."
                isLoading={confirmDelete.isLoading}
                confirmText="Xc nhn xa"
                cancelText="Hy b"
            />
        </div>
    );
}
