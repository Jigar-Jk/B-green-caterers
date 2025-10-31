import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Upload, X, Check, Menu as MenuIcon, Home, LayoutDashboard, UtensilsCrossed, LogOut, Search, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { api, API_ENDPOINTS } from '@/config/api';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check authentication
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuth');
    if (!isAuthenticated) {
      navigate('/admin');
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    name: '',
    category_id: '',
    price: '',
    description: '',
    image: null,
    is_chefs_pick: false,
    is_popular: false,
    is_available: true,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [itemsData, categoriesData] = await Promise.all([
        api.get(API_ENDPOINTS.GET_MENU),
        api.get(API_ENDPOINTS.GET_CATEGORIES),
      ]);
      setMenuItems(itemsData);
      setCategories(categoriesData);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load data: ' + error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = editingItem?.image_url || null;

      // Upload image if new file selected
      if (formData.image) {
        const uploadResult = await api.upload(API_ENDPOINTS.UPLOAD_IMAGE, formData.image);
        imageUrl = uploadResult.filename;
      }

      const itemData = {
        name: formData.name,
        category_id: parseInt(formData.category_id),
        price: parseFloat(formData.price),
        description: formData.description,
        image: imageUrl,
        is_chefs_pick: formData.is_chefs_pick ? 1 : 0,
        is_popular: formData.is_popular ? 1 : 0,
        is_available: formData.is_available ? 1 : 0,
      };

      if (editingItem) {
        // Update existing item
        itemData.id = editingItem.id;
        await api.put(API_ENDPOINTS.UPDATE_MENU_ITEM, itemData);
        toast({
          title: 'Success',
          description: 'Menu item updated successfully',
        });
      } else {
        // Create new item
        await api.post(API_ENDPOINTS.CREATE_MENU_ITEM, itemData);
        toast({
          title: 'Success',
          description: 'Menu item created successfully',
        });
      }

      resetForm();
      loadData();
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save menu item',
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      category_id: item.category_id,
      price: item.price,
      description: item.description || '',
      image: null,
      is_chefs_pick: item.is_chefs_pick === 1,
      is_popular: item.is_popular === 1,
      is_available: item.is_available === 1,
    });
    setImagePreview(item.image_url ? `/images/${item.image_url}` : null);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      await api.delete(`${API_ENDPOINTS.DELETE_MENU_ITEM}?id=${id}`);
      toast({
        title: 'Success',
        description: 'Menu item deleted successfully',
      });
      loadData();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete menu item',
        variant: 'destructive',
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category_id: '',
      price: '',
      description: '',
      image: null,
      is_chefs_pick: false,
      is_popular: false,
      is_available: true,
    });
    setImagePreview(null);
    setEditingItem(null);
    setShowForm(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminEmail');
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully',
    });
    navigate('/admin');
  };

  const adminEmail = localStorage.getItem('adminEmail') || 'admin@bgcaterers.com';

  const filteredItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-50 flex flex-col"
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-forest rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <div>
              <h2 className="font-bold text-forest text-lg">B Green Admin</h2>
              <p className="text-xs text-gray-500">Caterers Dashboard</p>
            </div>
          </div>
        </div>

        {/* Admin User */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">{adminEmail.charAt(0).toUpperCase()}</span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-800 text-sm">Admin User</p>
              <p className="text-xs text-gray-500">{adminEmail}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">View Public Site</span>
          </button>
          
          <button className="w-full flex items-center space-x-3 px-4 py-3 bg-blue-600 text-white rounded-lg">
            <UtensilsCrossed className="w-5 h-5" />
            <span className="font-medium">Menu Items</span>
          </button>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <MenuIcon className="w-6 h-6 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                <p className="text-sm text-gray-500">Manage programs and initiatives</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Menu Management</h2>
              <Button
                onClick={() => setShowForm(!showForm)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                {showForm ? 'Cancel' : 'Add New Menu Item'}
              </Button>
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Add/Edit Form */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-lg shadow-md p-6 mb-6"
              >
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Item Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Item Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest focus:border-transparent"
                      placeholder="e.g., Butter Chicken"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      required
                      value={formData.category_id}
                      onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest focus:border-transparent"
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price (₹) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest focus:border-transparent"
                      placeholder="250.00"
                    />
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image
                    </label>
                    <div className="flex items-center space-x-4">
                      <label className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-forest transition-colors">
                          <Upload className="w-5 h-5 mr-2 text-gray-500" />
                          <span className="text-sm text-gray-600">
                            {formData.image ? formData.image.name : 'Choose Image'}
                          </span>
                        </div>
                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/jpg,image/gif,image/webp,image/svg+xml,image/bmp,image/tiff,image/avif,image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                      {imagePreview && (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest focus:border-transparent"
                    placeholder="Describe the dish..."
                  />
                </div>

                {/* Checkboxes */}
                <div className="flex items-center space-x-8">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_chefs_pick}
                      onChange={(e) => setFormData({ ...formData, is_chefs_pick: e.target.checked })}
                      className="w-4 h-4 text-forest focus:ring-forest border-gray-300 rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">Chef's Pick</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_popular}
                      onChange={(e) => setFormData({ ...formData, is_popular: e.target.checked })}
                      className="w-4 h-4 text-forest focus:ring-forest border-gray-300 rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">Popular</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_available}
                      onChange={(e) => setFormData({ ...formData, is_available: e.target.checked })}
                      className="w-4 h-4 text-forest focus:ring-forest border-gray-300 rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">Available</span>
                  </label>
                </div>

                {/* Submit Buttons */}
                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    onClick={resetForm}
                    variant="outline"
                    className="border-gray-300"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-forest hover:bg-forest/90 text-white">
                    <Check className="mr-2" />
                    {editingItem ? 'Update Item' : 'Add Item'}
                  </Button>
                </div>
              </form>
            </motion.div>
            )}
          </AnimatePresence>

          {/* Menu Items Table */}
          {loading ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading menu items...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-600 text-lg">
                {searchQuery ? 'No items found matching your search.' : 'No menu items yet. Add your first item!'}
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredItems.map((item) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      {/* Image */}
                      <td className="px-6 py-4">
                        <div className="relative">
                          {item.image_url ? (
                            <img
                              src={`/images/${item.image_url}`}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                          ) : (
                            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                              <UtensilsCrossed className="w-6 h-6 text-gray-400" />
                            </div>
                          )}
                          {(item.is_chefs_pick === 1 || item.is_popular === 1) && (
                            <div className="absolute -top-1 -right-1 flex gap-0.5">
                              {item.is_chefs_pick === 1 && (
                                <span className="w-5 h-5 bg-forest rounded-full flex items-center justify-center" title="Chef's Pick">
                                  <span className="text-gold text-xs">👨‍🍳</span>
                                </span>
                              )}
                              {item.is_popular === 1 && (
                                <span className="w-5 h-5 bg-gold rounded-full flex items-center justify-center" title="Popular">
                                  <span className="text-white text-xs">★</span>
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Title */}
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-800">{item.name}</p>
                          {item.description && (
                            <p className="text-sm text-gray-500 mt-1 line-clamp-1">{item.description}</p>
                          )}
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                          {item.category_name}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="px-6 py-4">
                        <p className="font-bold text-gray-800">₹{parseFloat(item.price).toFixed(2)}</p>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 text-sm font-medium rounded-full ${
                            item.is_available === 1
                              ? 'bg-red-100 text-red-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {item.is_available === 1 ? 'available' : 'unavailable'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
