import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  LogOut,
  Menu,
  X,
  Plus,
  Edit,
  Trash2,
  TrendingUp,
  DollarSign,
  Eye,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { Textarea } from '@/components/ui/textarea';

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  shipping_address: string;
  items: unknown;
  subtotal: number;
  shipping_cost: number;
  total: number;
  status: string;
  created_at: string;
}

const initialUsers = [
  { id: 1, name: 'Emma Wilson', email: 'emma@email.com', orders: 5, totalSpent: 8450, joined: '2023-06-15' },
  { id: 2, name: 'James Brown', email: 'james@email.com', orders: 3, totalSpent: 2697, joined: '2023-08-22' },
  { id: 3, name: 'Sofia Garcia', email: 'sofia@email.com', orders: 8, totalSpent: 12340, joined: '2023-04-10' },
  { id: 4, name: 'Michael Chen', email: 'michael@email.com', orders: 2, totalSpent: 4998, joined: '2023-11-05' },
];

interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string | null;
  price: number;
  stock: number;
  status: string;
  material: string | null;
  image_url: string | null;
  is_new: boolean;
  is_bestseller: boolean;
}

type Tab = 'overview' | 'products' | 'orders' | 'users';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [users] = useState(initialUsers);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderDetailOpen, setIsOrderDetailOpen] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    subcategory: '',
    price: '',
    stock: '',
    material: '',
    image_url: '',
    is_new: false,
    is_bestseller: false,
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Fetch products from database
  const fetchProducts = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to fetch products');
      console.error(error);
    } else {
      setProducts(data || []);
    }
    setIsLoading(false);
  };

  // Fetch orders from database
  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to fetch orders');
      console.error(error);
    } else {
      setOrders(data || []);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        navigate('/auth');
        return;
      }

      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .eq('role', 'admin')
        .single();

      if (!roles) {
        toast.error('You do not have admin access');
        await supabase.auth.signOut();
        navigate('/auth');
        return;
      }

      setIsAuthenticated(true);
      fetchProducts();
      fetchOrders();
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success('Logged out successfully');
    navigate('/auth');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.category || !newProduct.price) {
      toast.error('Please fill all required fields');
      return;
    }

    const stock = parseInt(newProduct.stock) || 0;
    const productData = {
      name: newProduct.name,
      category: newProduct.category,
      subcategory: newProduct.subcategory || null,
      price: parseFloat(newProduct.price),
      stock: stock,
      status: stock > 0 ? 'Active' : 'Out of Stock',
      material: newProduct.material || null,
      image_url: newProduct.image_url || null,
      is_new: newProduct.is_new,
      is_bestseller: newProduct.is_bestseller,
    };

    const { error } = await supabase.from('products').insert(productData);

    if (error) {
      toast.error('Failed to add product');
      console.error(error);
      return;
    }

    setNewProduct({ 
      name: '', 
      category: '', 
      subcategory: '', 
      price: '', 
      stock: '',
      material: '',
      image_url: '',
      is_new: false,
      is_bestseller: false,
    });
    setIsAddProductOpen(false);
    toast.success('Product added successfully');
    fetchProducts();
  };

  const handleDeleteProduct = async (id: string) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    
    if (error) {
      toast.error('Failed to delete product');
      console.error(error);
      return;
    }
    
    toast.success('Product deleted');
    fetchProducts();
  };

  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId);

    if (error) {
      toast.error('Failed to update order status');
      console.error(error);
      return;
    }

    setOrders(orders.map((o) => (o.id === orderId ? { ...o, status } : o)));
    toast.success('Order status updated');
  };

  const stats = {
    totalRevenue: orders.reduce((sum, o) => sum + o.total, 0),
    totalOrders: orders.length,
    totalProducts: products.length,
    totalUsers: users.length,
  };

  const menuItems = [
    { id: 'overview' as Tab, label: 'Overview', icon: LayoutDashboard },
    { id: 'products' as Tab, label: 'Products', icon: Package },
    { id: 'orders' as Tab, label: 'Orders', icon: ShoppingCart },
    { id: 'users' as Tab, label: 'Users', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-0 lg:w-20'
        } bg-card border-r border-border transition-all duration-300 fixed lg:relative h-full z-50`}
      >
        <div className="p-4 flex items-center justify-between border-b border-border">
          {sidebarOpen && (
            <h1 className="text-xl font-bold text-primary">Admin Panel</h1>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden lg:flex"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.id
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted text-foreground'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Button
            variant="outline"
            className="w-full justify-start gap-3"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && 'Logout'}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8 overflow-auto">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between mb-6">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="w-5 h-5" />
          </Button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Total Revenue</p>
                    <p className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-green-500" />
                  </div>
                </div>
                <p className="text-green-500 text-sm mt-2 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" /> +12.5% from last month
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Total Orders</p>
                    <p className="text-2xl font-bold">{stats.totalOrders}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
                    <ShoppingCart className="w-6 h-6 text-blue-500" />
                  </div>
                </div>
                <p className="text-blue-500 text-sm mt-2 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" /> +8.2% from last month
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Total Products</p>
                    <p className="text-2xl font-bold">{stats.totalProducts}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center">
                    <Package className="w-6 h-6 text-purple-500" />
                  </div>
                </div>
                <p className="text-purple-500 text-sm mt-2 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" /> +3 new this week
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Total Users</p>
                    <p className="text-2xl font-bold">{stats.totalUsers}</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-orange-500" />
                  </div>
                </div>
                <p className="text-orange-500 text-sm mt-2 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" /> +15.3% from last month
                </p>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.slice(0, 5).map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium text-xs">{order.id.slice(0, 8)}...</TableCell>
                      <TableCell>{order.customer_name}</TableCell>
                      <TableCell>${order.total}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs capitalize ${
                            order.status === 'delivered'
                              ? 'bg-green-500/10 text-green-500'
                              : order.status === 'shipped'
                              ? 'bg-blue-500/10 text-blue-500'
                              : order.status === 'processing'
                              ? 'bg-yellow-500/10 text-yellow-500'
                              : 'bg-gray-500/10 text-gray-500'
                          }`}
                        >
                          {order.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </motion.div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Product Management</h2>
              <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" /> Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div>
                      <Label>Product Name</Label>
                      <Input
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        placeholder="Enter product name"
                      />
                    </div>
                    <div>
                      <Label>Category</Label>
                      <Select
                        value={newProduct.category}
                        onValueChange={(v) => setNewProduct({ ...newProduct, category: v })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Rings">Rings</SelectItem>
                          <SelectItem value="Necklaces">Necklaces</SelectItem>
                          <SelectItem value="Earrings">Earrings</SelectItem>
                          <SelectItem value="Bracelets">Bracelets</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Subcategory</Label>
                      <Input
                        value={newProduct.subcategory}
                        onChange={(e) => setNewProduct({ ...newProduct, subcategory: e.target.value })}
                        placeholder="e.g., Diamond, Gold, Silver"
                      />
                    </div>
                    <div>
                      <Label>Material</Label>
                      <Input
                        value={newProduct.material}
                        onChange={(e) => setNewProduct({ ...newProduct, material: e.target.value })}
                        placeholder="e.g., 18K Gold, Sterling Silver"
                      />
                    </div>
                    <div>
                      <Label>Image URL</Label>
                      <Input
                        value={newProduct.image_url}
                        onChange={(e) => setNewProduct({ ...newProduct, image_url: e.target.value })}
                        placeholder="https://..."
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Price ($)</Label>
                        <Input
                          type="number"
                          value={newProduct.price}
                          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                          placeholder="0.00"
                        />
                      </div>
                      <div>
                        <Label>Stock</Label>
                        <Input
                          type="number"
                          value={newProduct.stock}
                          onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                          placeholder="0"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newProduct.is_new}
                          onChange={(e) => setNewProduct({ ...newProduct, is_new: e.target.checked })}
                          className="rounded border-border"
                        />
                        <span className="text-sm">Mark as New</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newProduct.is_bestseller}
                          onChange={(e) => setNewProduct({ ...newProduct, is_bestseller: e.target.checked })}
                          className="rounded border-border"
                        />
                        <span className="text-sm">Bestseller</span>
                      </label>
                    </div>
                    <Button className="w-full" onClick={handleAddProduct}>
                      Add Product
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
              </div>
            ) : products.length === 0 ? (
              <div className="bg-card border border-border rounded-xl p-8 text-center">
                <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No products yet. Add your first product!</p>
              </div>
            ) : (
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>
                          {product.category} / {product.subcategory}
                        </TableCell>
                        <TableCell>${product.price}</TableCell>
                        <TableCell>{product.stock}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              product.status === 'Active'
                                ? 'bg-green-500/10 text-green-500'
                                : 'bg-red-500/10 text-red-500'
                            }`}
                          >
                            {product.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteProduct(product.id)}
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </motion.div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-2xl font-bold mb-6">Order Management</h2>

            {orders.length === 0 ? (
              <div className="bg-card border border-border rounded-xl p-8 text-center">
                <ShoppingCart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No orders yet.</p>
              </div>
            ) : (
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Address</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium text-xs">{order.id.slice(0, 8)}...</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{order.customer_name}</p>
                            <p className="text-xs text-muted-foreground">{order.customer_email}</p>
                          </div>
                        </TableCell>
                        <TableCell>{order.customer_phone || 'N/A'}</TableCell>
                        <TableCell className="max-w-[200px] truncate" title={order.shipping_address}>
                          {order.shipping_address}
                        </TableCell>
                        <TableCell>${order.total}</TableCell>
                        <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Select
                            value={order.status}
                            onValueChange={(v) => handleUpdateOrderStatus(order.id, v)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="processing">Processing</SelectItem>
                              <SelectItem value="shipped">Shipped</SelectItem>
                              <SelectItem value="delivered">Delivered</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => {
                              setSelectedOrder(order);
                              setIsOrderDetailOpen(true);
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {/* Order Detail Dialog */}
            <Dialog open={isOrderDetailOpen} onOpenChange={setIsOrderDetailOpen}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Order Details</DialogTitle>
                </DialogHeader>
                {selectedOrder && (
                  <div className="space-y-6 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-muted-foreground">Order ID</Label>
                        <p className="font-mono text-sm break-all">{selectedOrder.id}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Date</Label>
                        <p>{new Date(selectedOrder.created_at).toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h4 className="font-semibold mb-2">Customer Details</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <Label className="text-muted-foreground">Name</Label>
                          <p>{selectedOrder.customer_name}</p>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Email</Label>
                          <p>{selectedOrder.customer_email}</p>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Phone</Label>
                          <p>{selectedOrder.customer_phone || 'N/A'}</p>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Status</Label>
                          <p className="capitalize">{selectedOrder.status}</p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="font-semibold mb-2">Delivery Address</h4>
                      <p className="text-sm">{selectedOrder.shipping_address}</p>
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="font-semibold mb-2">Order Items</h4>
                      <div className="space-y-2">
                        {Array.isArray(selectedOrder.items) && selectedOrder.items.map((item: any, idx: number) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span>{item.name} x {item.quantity}</span>
                            <span>${(item.price * item.quantity).toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t pt-4 space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>${selectedOrder.subtotal}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Shipping</span>
                        <span>{selectedOrder.shipping_cost === 0 ? 'Free' : `$${selectedOrder.shipping_cost}`}</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>${selectedOrder.total}</span>
                      </div>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </motion.div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-2xl font-bold mb-6">User Management</h2>

            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Total Spent</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.orders}</TableCell>
                      <TableCell>${user.totalSpent.toLocaleString()}</TableCell>
                      <TableCell>{user.joined}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
