import * as React from 'react';
import { Product } from '../App';

// Define types for Product and Order
interface ProductType {
  id: string;
  name: string;
  price: number;
}

interface OrderType {
  id: string;
  customer?: { name: string };
  items?: string[];
  total: number;
  status?: string;
  createdAt?: string;
}

export function AdminPage() {
  const [newOrder, setNewOrder] = React.useState<{ customerName: string; items: string; total: string }>({ customerName: '', items: '', total: '' });
  const [products, setProducts] = React.useState<ProductType[]>([]);
  const [newProduct, setNewProduct] = React.useState<{ name: string; price: string }>({ name: '', price: '' });
  const [editingProduct, setEditingProduct] = React.useState<ProductType | null>(null);
  const [orders, setOrders] = React.useState<OrderType[]>([]); // Placeholder for future order management

  // Fetch products
  React.useEffect(() => {
    fetch('https://africanstyle-tn-1.onrender.com/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  // Fetch orders
  React.useEffect(() => {
    fetch('https://africanstyle-tn-1.onrender.com/api/orders')
      .then(res => res.json())
      .then(data => setOrders(data));
  }, []);

  // Create order
  const handleAddOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validation
    if (!newOrder.customerName.trim()) {
      alert('Customer name is required.');
      return;
    }
    if (!newOrder.items.trim()) {
      alert('Items are required.');
      return;
    }
    const itemsArr = newOrder.items.split(',').map(i => i.trim()).filter(i => i.length > 0);
    if (itemsArr.length === 0) {
      alert('Please enter at least one item.');
      return;
    }
    const totalNum = parseFloat(newOrder.total);
    if (isNaN(totalNum) || totalNum <= 0) {
      alert('Total must be a positive number.');
      return;
    }
    fetch('https://africanstyle-tn-1.onrender.com/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer: { name: newOrder.customerName },
        items: itemsArr,
        total: totalNum
      })
    })
      .then(res => res.json())
      .then((order: OrderType) => {
        setOrders([...orders, order]);
        setNewOrder({ customerName: '', items: '', total: '' });
      });
  };

  // Add product
  const handleAddProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch('https://africanstyle-tn-1.onrender.com/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newProduct.name, price: parseFloat(newProduct.price) })
    })
      .then(res => res.json())
      .then((product: ProductType) => {
        setProducts([...products, product]);
        setNewProduct({ name: '', price: '' });
      });
  };

  // Edit product
  const handleEditProduct = (product: ProductType) => {
    setEditingProduct(product);
  };

  // Update product
  const handleUpdateProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingProduct) return;
    fetch(`https://africanstyle-tn-1.onrender.com/api/products/${editingProduct.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editingProduct.name, price: parseFloat(String(editingProduct.price)) })
    })
      .then(res => res.json())
      .then((updated: ProductType) => {
        setProducts(products.map(p => p.id === updated.id ? updated : p));
        setEditingProduct(null);
      });
  };

  // Delete product
  const handleDeleteProduct = (id: string) => {
    fetch(`https://africanstyle-tn-1.onrender.com/api/products/${id}`, { method: 'DELETE' })
      .then(() => {
        setProducts(products.filter(p => p.id !== id));
      });
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Manage Products</h2>
        <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct} className="mb-6 flex gap-4">
          <input
            type="text"
            placeholder="Product Name"
            value={editingProduct ? editingProduct.name : newProduct.name}
            onChange={e => editingProduct ? setEditingProduct({ ...editingProduct, name: e.target.value }) : setNewProduct({ ...newProduct, name: e.target.value })}
            className="border px-4 py-2 rounded"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={editingProduct ? editingProduct.price : newProduct.price}
            onChange={e => editingProduct ? setEditingProduct({ ...editingProduct, price: Number(e.target.value) }) : setNewProduct({ ...newProduct, price: e.target.value })}
            className="border px-4 py-2 rounded"
            required
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            {editingProduct ? 'Update' : 'Add'}
          </button>
          {editingProduct && (
            <button type="button" onClick={() => setEditingProduct(null)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
          )}
        </form>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td className="p-2 border">{product.id}</td>
                <td className="p-2 border">{product.name}</td>
                <td className="p-2 border">${product.price}</td>
                <td className="p-2 border">
                  <button onClick={() => handleEditProduct(product)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                  <button onClick={() => handleDeleteProduct(product.id)} className="bg-red-600 text-white px-2 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-4">Manage Orders</h2>
        <form onSubmit={handleAddOrder} className="mb-6 flex gap-4">
          <input
            type="text"
            placeholder="Customer Name"
            value={newOrder.customerName}
            onChange={e => setNewOrder({ ...newOrder, customerName: e.target.value })}
            className="border px-4 py-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Items (comma separated)"
            value={newOrder.items}
            onChange={e => setNewOrder({ ...newOrder, items: e.target.value })}
            className="border px-4 py-2 rounded"
            required
          />
          <input
            type="number"
            placeholder="Total"
            value={newOrder.total}
            onChange={e => setNewOrder({ ...newOrder, total: e.target.value })}
            className="border px-4 py-2 rounded"
            required
          />
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Add Order</button>
        </form>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Order ID</th>
              <th className="p-2 border">Customer</th>
              <th className="p-2 border">Total</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Created At</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td className="p-2 border">{order.id}</td>
                <td className="p-2 border">{order.customer?.name || '-'}</td>
                <td className="p-2 border">${order.total}</td>
                <td className="p-2 border">{order.status}</td>
                <td className="p-2 border">{order.createdAt}</td>
                <td className="p-2 border">
                  <select
                    value={order.status}
                    onChange={e => {
                      fetch(`https://africanstyle-tn-1.onrender.com/api/orders/${order.id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ status: e.target.value })
                      })
                        .then(res => res.json())
                        .then(updated => {
                          setOrders(orders.map(o => o.id === updated.id ? updated : o));
                        });
                    }}
                    className="border px-2 py-1 rounded mr-2"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <button
                    onClick={() => {
                      fetch(`https://africanstyle-tn-1.onrender.com/api/orders/${order.id}`, { method: 'DELETE' })
                        .then(() => setOrders(orders.filter(o => o.id !== order.id)));
                    }}
                    className="bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
