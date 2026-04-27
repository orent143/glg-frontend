'use client';
import { useState } from 'react';
import Link from 'next/link';
import Topbar from '@/src/components/layout/Topbar';
import Navbar from '@/src/components/layout/Navbar';
import Footer from '@/src/components/layout/Footer';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  requiresPrescription: boolean;
  prescriptionStatus?: 'verified' | 'pending' | 'none';
}

const mockCart: CartItem[] = [
  {
    id: '1',
    name: 'Amoxicillin 500mg (30 tablets)',
    price: 12.99,
    quantity: 1,
    requiresPrescription: true,
    prescriptionStatus: 'verified'
  },
  {
    id: '2',
    name: 'Vitamin D3 2000IU (60 capsules)',
    price: 8.99,
    quantity: 2,
    requiresPrescription: false,
    prescriptionStatus: 'none'
  },
];

export default function CartPage() {
  const [cart, setCart] = useState(mockCart);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount] = useState(5);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = +(subtotal * 0.08).toFixed(2);
  const discount = couponApplied ? couponDiscount : 0;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = +(subtotal + tax + shipping - discount).toFixed(2);

  const updateQuantity = (id: string, newQty: number) => {
    if (newQty === 0) {
      setCart(cart.filter(item => item.id !== id));
    } else {
      setCart(cart.map(item => 
        item.id === id ? { ...item, quantity: newQty } : item
      ));
    }
  };

  const handleCoupon = () => {
    if (couponCode === 'DIMBOOLA10') {
      setCouponApplied(true);
    }
  };

  if (cart.length === 0) {
    return (
      <main className="page-shell py-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">Your Cart</h1>
        <div className="text-center py-12">
          <p className="text-slate-600 mb-4">Your cart is empty</p>
          <Link href="/shop" className="inline-block px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <section className='flex flex-col'>
      <Topbar></Topbar>
      <Navbar></Navbar>
    <main className="page-shell py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="border rounded-lg p-4 flex gap-4 items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">{item.name}</h3>
                  
                  {item.requiresPrescription && (
                    <div className={`mt-2 text-xs px-2 py-1 rounded w-fit ${
                      item.prescriptionStatus === 'verified' 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {item.prescriptionStatus === 'verified' ? '✓ Rx Verified' : '⚠ Rx Pending'}
                    </div>
                  )}

                  <p className="text-sm text-slate-500 mt-2">${item.price.toFixed(2)} each</p>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-2 py-1 border rounded hover:bg-slate-100"
                  >
                    −
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 border rounded hover:bg-slate-100"
                  >
                    +
                  </button>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-slate-900">${(item.price * item.quantity).toFixed(2)}</p>
                  <button 
                    onClick={() => updateQuantity(item.id, 0)}
                    className="text-xs text-red-600 hover:underline mt-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6 sticky top-6">
            <h2 className="font-bold text-slate-900 mb-6">Order Summary</h2>

            {/* Coupon */}
            <div className="mb-6 pb-6 border-b">
              <label className="text-sm font-medium text-slate-700 block mb-2">Promo Code</label>
              <div className="flex gap-2">
                <input 
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="Enter code"
                  className="flex-1 px-3 py-2 border rounded text-sm"
                  disabled={couponApplied}
                />
                <button 
                  onClick={handleCoupon}
                  disabled={couponApplied}
                  className="px-3 py-2 bg-slate-100 rounded text-sm font-medium hover:bg-slate-200 disabled:opacity-50"
                >
                  {couponApplied ? '✓' : 'Apply'}
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-1">Try: DIMBOOLA10</p>
            </div>

            {/* Totals */}
            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between">
                <span className="text-slate-600">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {shipping > 0 && (
                <div className="flex justify-between">
                  <span className="text-slate-600">Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
              )}
              {shipping === 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Free Shipping</span>
                  <span>−$0.00</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-slate-600">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Discount</span>
                  <span>−${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-slate-900 text-base pt-3 border-t">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 mb-3">
              Proceed to Checkout
            </button>
            <Link href="/shop" className="block text-center text-sm text-slate-600 hover:underline">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </main>
    <footer></footer>
    </section>
  );
}