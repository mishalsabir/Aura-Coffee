import React, { useState, useMemo } from 'react';
import { Plus, Edit2, Trash2, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Recipe } from '../../types';
import { RecipeFormPanel } from './RecipeFormPanel';

interface RecipeManagementProps {
  searchFilter: string;
}

export const RecipeManagement: React.FC<RecipeManagementProps> = ({ searchFilter }) => {
  const { recipes, categories, addRecipe, updateRecipe, deleteRecipe, toggleRecipeStatus } = useStore();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(true); // Open by default as in Reference #3
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter recipes
  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchCat =
        selectedCategory === 'All' ||
        recipe.category.toLowerCase() === selectedCategory.toLowerCase();

      const q = searchFilter.toLowerCase().trim();
      const matchSearch =
        !q ||
        recipe.name.toLowerCase().includes(q) ||
        recipe.description.toLowerCase().includes(q) ||
        recipe.category.toLowerCase().includes(q);

      return matchCat && matchSearch;
    });
  }, [recipes, selectedCategory, searchFilter]);

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(filteredRecipes.length / itemsPerPage));
  const paginatedRecipes = filteredRecipes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const activeCategories = ['All', ...categories.map((c) => c.name)];

  const handleSaveRecipe = (recipeData: Omit<Recipe, 'id' | 'created_at' | 'updated_at'>) => {
    if (editingRecipe) {
      updateRecipe(editingRecipe.id, recipeData);
      setEditingRecipe(null);
    } else {
      addRecipe(recipeData);
    }
  };

  const handleEditClick = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    setIsFormOpen(true);
    // Smooth scroll to top of form on smaller screens
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleDeleteClick = (recipe: Recipe) => {
    if (confirm(`Are you sure you want to remove "${recipe.name}" from the menu?`)) {
      deleteRecipe(recipe.id);
      if (editingRecipe?.id === recipe.id) {
        setEditingRecipe(null);
      }
    }
  };

  // Helper for category badge styling
  const getCategoryBadgeClass = (categoryName: string) => {
    const c = categoryName.toLowerCase();
    if (c === 'espresso') return 'bg-[#4a2e1b] text-[#edd5be] border border-[#6b452b]';
    if (c === 'hot coffee') return 'bg-[#5e271d] text-[#f7cfc8] border border-[#85382b]';
    if (c === 'cold coffee') return 'bg-[#183952] text-[#c4e3fb] border border-[#235073]';
    if (c === 'specialty') return 'bg-[#3b244d] text-[#e5d0f7] border border-[#54336e]';
    if (c === 'desserts') return 'bg-[#543d22] text-[#fce4c3] border border-[#785731]';
    return 'bg-aura-surface text-aura-cream border border-aura-border';
  };

  return (
    <div className="space-y-6">
      {/* Top Header matching Reference #3 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-aura-cream">
            Menu / Recipes
          </h1>
          <p className="text-xs sm:text-sm text-aura-cream/60 mt-1">
            Manage your coffee recipes, prices and images
          </p>
        </div>

        {/* "+ Add New Recipe" Button matching Reference #3 */}
        <button
          onClick={() => {
            setEditingRecipe(null);
            setIsFormOpen(true);
          }}
          className="px-5 py-2.5 rounded-xl bg-[#dfbe90] hover:bg-[#eccaa0] text-[#120d0a] font-semibold text-xs tracking-wider uppercase flex items-center space-x-2 transition-all shadow-md shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Recipe</span>
        </button>
      </div>

      {/* Category Filter Pills matching Reference #3 */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 no-scrollbar">
        {activeCategories.map((category) => {
          const isActive = selectedCategory.toLowerCase() === category.toLowerCase();
          return (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setCurrentPage(1);
              }}
              className={`px-5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all shrink-0 ${
                isActive
                  ? 'bg-[#dfbe90] text-[#120d0a] font-bold shadow-sm'
                  : 'bg-aura-surface text-aura-cream/70 hover:text-aura-cream border border-aura-border hover:border-aura-gold/40'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Main Split Layout: Left Table + Right Form Panel matching Reference #3 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Table Container (7 cols on desktop or 12 if form closed) */}
        <div className={isFormOpen ? 'lg:col-span-7' : 'lg:col-span-12'}>
          <div className="bg-[#120d0a] border border-[#241913] rounded-2xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[#241913] text-aura-cream/50 text-[11px] uppercase tracking-wider bg-aura-surface/40">
                    <th className="py-3.5 px-4 font-semibold">Image</th>
                    <th className="py-3.5 px-4 font-semibold">Name</th>
                    <th className="py-3.5 px-4 font-semibold">Category</th>
                    <th className="py-3.5 px-4 font-semibold">Price</th>
                    <th className="py-3.5 px-4 font-semibold text-center">Status</th>
                    <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#20150f]">
                  {paginatedRecipes.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-aura-cream/50">
                        No recipes found matching current filters.
                      </td>
                    </tr>
                  ) : (
                    paginatedRecipes.map((recipe) => (
                      <tr
                        key={recipe.id}
                        className={`hover:bg-aura-surface/50 transition-colors ${
                          editingRecipe?.id === recipe.id ? 'bg-aura-surface/80' : ''
                        }`}
                      >
                        {/* Image Thumbnail */}
                        <td className="py-3 px-4">
                          <img
                            src={recipe.image}
                            alt={recipe.name}
                            className="w-12 h-12 rounded-xl object-cover border border-aura-border shadow-sm"
                          />
                        </td>

                        {/* Name & Description */}
                        <td className="py-3 px-4 max-w-[200px]">
                          <span className="font-semibold text-aura-cream block truncate text-sm">
                            {recipe.name}
                          </span>
                          <span className="text-[11px] text-aura-cream/50 line-clamp-1">
                            {recipe.description}
                          </span>
                        </td>

                        {/* Category Badge */}
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${getCategoryBadgeClass(
                              recipe.category
                            )}`}
                          >
                            {recipe.category}
                          </span>
                        </td>

                        {/* Price */}
                        <td className="py-3 px-4 whitespace-nowrap font-mono font-bold text-aura-cream">
                          Rs. {recipe.price.toLocaleString()}
                        </td>

                        {/* Status Toggle matching Reference #3 */}
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => toggleRecipeStatus(recipe.id)}
                            className={`w-10 h-5 inline-flex items-center rounded-full p-0.5 transition-colors ${
                              recipe.status === 'active' ? 'bg-emerald-500' : 'bg-[#2a1d15]'
                            }`}
                            title={
                              recipe.status === 'active'
                                ? 'Click to hide from website'
                                : 'Click to make visible on website'
                            }
                          >
                            <div
                              className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform ${
                                recipe.status === 'active' ? 'translate-x-5' : 'translate-x-0'
                              }`}
                            />
                          </button>
                        </td>

                        {/* Actions matching Reference #3 */}
                        <td className="py-3 px-4 text-right whitespace-nowrap space-x-1.5">
                          <button
                            onClick={() => handleEditClick(recipe)}
                            className="p-1.5 rounded-lg hover:bg-aura-surface text-aura-cream/60 hover:text-aura-gold transition-colors"
                            title="Edit Recipe"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(recipe)}
                            className="p-1.5 rounded-lg hover:bg-aura-surface text-aura-cream/60 hover:text-red-400 transition-colors"
                            title="Delete Recipe"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Table Footer Pagination matching Reference #3 */}
            <div className="p-4 border-t border-[#241913] flex items-center justify-between text-xs text-aura-cream/50 bg-aura-surface/20">
              <span>
                Showing {(currentPage - 1) * itemsPerPage + 1}–
                {Math.min(currentPage * itemsPerPage, filteredRecipes.length)} of{' '}
                {filteredRecipes.length} recipes
              </span>

              <div className="flex items-center space-x-1.5">
                <button
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  className="p-1.5 rounded-lg border border-aura-border hover:bg-aura-surface disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-7 h-7 rounded-lg text-xs font-semibold flex items-center justify-center transition-colors ${
                      currentPage === i + 1
                        ? 'bg-[#dfbe90] text-[#120d0a]'
                        : 'border border-aura-border hover:bg-aura-surface text-aura-cream/70'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  className="p-1.5 rounded-lg border border-aura-border hover:bg-aura-surface disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Panel matching Reference #3 */}
        {isFormOpen && (
          <div className="lg:col-span-5 sticky top-28">
            <RecipeFormPanel
              recipeToEdit={editingRecipe}
              categories={categories}
              onSave={handleSaveRecipe}
              onCancel={() => {
                setEditingRecipe(null);
                setIsFormOpen(false);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

