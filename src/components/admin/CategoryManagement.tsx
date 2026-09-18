import React, { useState } from 'react';
import { Plus, Edit2, Trash2, FolderPlus, Check } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Category } from '../../types';

export const CategoryManagement: React.FC = () => {
  const { categories, addCategory, updateCategory, deleteCategory, recipes } = useStore();
  const [newCatName, setNewCatName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    addCategory(newCatName.trim());
    setNewCatName('');
  };

  const handleStartEdit = (cat: Category) => {
    setEditingId(cat.id);
    setEditName(cat.name);
  };

  const handleSaveEdit = (id: string) => {
    if (!editName.trim()) return;
    updateCategory(id, { name: editName.trim() });
    setEditingId(null);
  };

  const handleDelete = (cat: Category) => {
    const associatedRecipes = recipes.filter((r) => r.category === cat.name).length;
    if (associatedRecipes > 0) {
      if (!confirm(`Category "${cat.name}" has ${associatedRecipes} recipes. Are you sure you want to delete it?`)) {
        return;
      }
    }
    deleteCategory(cat.id);
  };

  return (
    <div className="space-y-6 text-aura-cream">
      {/* Header */}
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-aura-cream">
          Category Management
        </h1>
        <p className="text-xs sm:text-sm text-aura-cream/60 mt-1">
          Add or edit drink & food categories. Changes instantly update the customer menu filter bar.
        </p>
      </div>

      {/* Add New Category Form */}
      <form
        onSubmit={handleAdd}
        className="p-5 rounded-2xl bg-aura-surface border border-aura-border flex flex-col sm:flex-row gap-3 items-center max-w-xl"
      >
        <div className="relative flex-1 w-full">
          <FolderPlus className="w-4 h-4 text-aura-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            required
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            placeholder="New category name (e.g. Seasonal Bakes, Teas)"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm placeholder:text-aura-cream/35"
          />
        </div>
        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#dfbe90] hover:bg-[#eccaa0] text-[#120d0a] font-semibold text-xs tracking-wider uppercase flex items-center justify-center space-x-1.5 shadow-md shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
        </button>
      </form>

      {/* Categories Table */}
      <div className="bg-[#120d0a] border border-[#241913] rounded-2xl overflow-hidden shadow-xl max-w-4xl">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-[#241913] text-aura-cream/50 text-[11px] uppercase tracking-wider bg-aura-surface/40">
              <th className="py-3.5 px-6 font-semibold">Category Name</th>
              <th className="py-3.5 px-6 font-semibold">Associated Recipes</th>
              <th className="py-3.5 px-6 font-semibold">Live Status</th>
              <th className="py-3.5 px-6 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#20150f]">
            {categories.map((cat) => {
              const recipeCount = recipes.filter((r) => r.category === cat.name).length;
              const isEditing = editingId === cat.id;

              return (
                <tr key={cat.id} className="hover:bg-aura-surface/50 transition-colors">
                  {/* Name */}
                  <td className="py-4 px-6">
                    {isEditing ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="px-2.5 py-1 rounded-lg glass-input text-xs"
                          autoFocus
                        />
                        <button
                          onClick={() => handleSaveEdit(cat.id)}
                          className="p-1 rounded bg-emerald-700 text-white"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <span className="font-semibold text-aura-cream">{cat.name}</span>
                    )}
                  </td>

                  {/* Count */}
                  <td className="py-4 px-6 text-aura-cream/60">
                    <span className="font-mono">{recipeCount} items</span>
                  </td>

                  {/* Status */}
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800">
                      Active on Menu
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6 text-right space-x-2">
                    <button
                      onClick={() => handleStartEdit(cat)}
                      className="p-1.5 rounded-lg hover:bg-aura-surface text-aura-cream/60 hover:text-aura-gold transition-colors"
                      title="Edit Name"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(cat)}
                      className="p-1.5 rounded-lg hover:bg-aura-surface text-aura-cream/60 hover:text-red-400 transition-colors"
                      title="Delete Category"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

