import React, { useState, useEffect, useRef } from 'react';
import { UploadCloud, X, Check, Image as ImageIcon, Sparkles } from 'lucide-react';
import { Recipe, Category } from '../../types';
import { PRESET_IMAGE_LIBRARY } from '../../data/initialData';

interface RecipeFormPanelProps {
  recipeToEdit: Recipe | null;
  categories: Category[];
  onSave: (data: Omit<Recipe, 'id' | 'created_at' | 'updated_at'>) => void;
  onCancel: () => void;
}

export const RecipeFormPanel: React.FC<RecipeFormPanelProps> = ({
  recipeToEdit,
  categories,
  onSave,
  onCancel,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState<string>('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [status, setStatus] = useState<'active' | 'inactive'>('active');
  const [showPresets, setShowPresets] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (recipeToEdit) {
      setName(recipeToEdit.name);
      setCategory(recipeToEdit.category);
      setPrice(recipeToEdit.price.toString());
      setDescription(recipeToEdit.description);
      setImage(recipeToEdit.image);
      setStatus(recipeToEdit.status);
    } else {
      setName('');
      setCategory(categories[0]?.name || 'Hot Coffee');
      setPrice('');
      setDescription('');
      setImage(PRESET_IMAGE_LIBRARY[0]?.url || '');
      setStatus('active');
    }
  }, [recipeToEdit, categories]);

  // Handle local image file upload (converts to base64 Data URL)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numPrice = parseFloat(price);
    if (!name.trim()) {
      alert('Please enter a recipe name.');
      return;
    }
    if (isNaN(numPrice) || numPrice <= 0) {
      alert('Please enter a valid positive price.');
      return;
    }
    if (!image.trim()) {
      alert('Please select or upload an image.');
      return;
    }

    onSave({
      name: name.trim(),
      category: category || categories[0]?.name || 'Hot Coffee',
      price: numPrice,
      description: description.trim(),
      image: image.trim(),
      status,
    });
  };

  return (
    <div className="bg-[#140e0b] border border-[#2a1d15] rounded-2xl p-6 shadow-2xl text-aura-cream">
      {/* Header matching Reference #3 */}
      <div className="flex items-center justify-between pb-4 border-b border-aura-border mb-5">
        <div>
          <h3 className="font-serif text-lg font-bold text-aura-cream">
            {recipeToEdit ? `Edit Recipe: ${recipeToEdit.name}` : 'Add / Edit Recipe'}
          </h3>
          <p className="text-[11px] text-aura-cream/50">
            {recipeToEdit
              ? 'Update price, image, category or details.'
              : 'Add a new craft creation to the digital menu.'}
          </p>
        </div>
        <button
          onClick={onCancel}
          className="p-1.5 rounded-full hover:bg-aura-surface text-aura-cream/50 hover:text-aura-cream transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Recipe Name */}
        <div>
          <label className="block text-xs font-semibold text-aura-cream/80 mb-1">
            Recipe Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter recipe name"
            className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm text-aura-cream placeholder:text-aura-cream/35"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-xs font-semibold text-aura-cream/80 mb-1">
            Category <span className="text-red-400">*</span>
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm text-aura-cream bg-[#18110d]"
          >
            {categories.map((c) => (
              <option key={c.id} value={c.name} className="bg-[#18110d] text-aura-cream">
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block text-xs font-semibold text-aura-cream/80 mb-1">
            Price <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-aura-cream/50 font-mono">
              Rs.
            </span>
            <input
              type="number"
              step="10"
              min="50"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price in PKR (e.g. 850)"
              className="w-full pl-11 pr-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm text-aura-cream placeholder:text-aura-cream/35 font-mono"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-aura-cream/80 mb-1">
            Description <span className="text-red-400">*</span>
          </label>
          <textarea
            rows={3}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter recipe description..."
            className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm text-aura-cream placeholder:text-aura-cream/35 resize-none"
          />
        </div>

        {/* Upload Image matching Reference #3 */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-semibold text-aura-cream/80">
              Upload Image <span className="text-red-400">*</span>
            </label>
            <button
              type="button"
              onClick={() => setShowPresets(!showPresets)}
              className="text-[11px] text-aura-gold hover:underline flex items-center space-x-1"
            >
              <Sparkles className="w-3 h-3" />
              <span>{showPresets ? 'Hide presets' : 'Choose preset'}</span>
            </button>
          </div>

          {/* Drag & Drop Box matching Reference #3 */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="relative border-2 border-dashed border-[#3d2a1f] hover:border-aura-gold/60 rounded-xl p-5 text-center cursor-pointer bg-aura-surface/40 hover:bg-aura-surface/70 transition-all group"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
            />

            {image ? (
              <div className="flex items-center space-x-3">
                <img
                  src={image}
                  alt="Preview"
                  className="w-14 h-14 rounded-lg object-cover border border-aura-gold/40 shadow-sm shrink-0"
                />
                <div className="text-left flex-1 min-w-0">
                  <span className="text-xs font-semibold text-aura-cream block truncate">
                    Image ready
                  </span>
                  <span className="text-[10px] text-aura-gold">Click to change or replace file</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-1.5 py-2">
                <div className="w-10 h-10 rounded-full bg-aura-surface border border-aura-border flex items-center justify-center text-aura-cream/60 group-hover:text-aura-gold transition-colors">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <p className="text-xs text-aura-cream/80 font-medium">
                  <span className="text-aura-gold">Click to upload</span> or drag and drop
                </p>
                <p className="text-[10px] text-aura-cream/40 uppercase">JPG, PNG (Max 5MB)</p>
              </div>
            )}
          </div>

          {/* Quick High-Res Presets Drawer */}
          {showPresets && (
            <div className="mt-2.5 p-3 rounded-xl bg-aura-surface border border-aura-border space-y-2">
              <span className="text-[10px] tracking-wider uppercase text-aura-gold font-semibold block">
                Select from Curated Coffee Photography
              </span>
              <div className="grid grid-cols-5 gap-2 max-h-36 overflow-y-auto no-scrollbar">
                {PRESET_IMAGE_LIBRARY.map((preset, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => {
                      setImage(preset.url);
                      setShowPresets(false);
                    }}
                    className={`relative aspect-square rounded-lg overflow-hidden border transition-all ${
                      image === preset.url
                        ? 'border-aura-gold ring-2 ring-aura-gold/50'
                        : 'border-aura-border hover:border-aura-gold/60'
                    }`}
                    title={preset.name}
                  >
                    <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Status Toggle Switch matching Reference #3 */}
        <div className="flex items-center justify-between pt-2 pb-2">
          <div>
            <span className="text-xs font-semibold text-aura-cream block">Status</span>
            <span className="text-[11px] text-aura-cream/60">
              {status === 'active' ? 'Active (Visible on website)' : 'Inactive (Hidden from website)'}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setStatus(status === 'active' ? 'inactive' : 'active')}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 focus:outline-none ${
              status === 'active' ? 'bg-emerald-500' : 'bg-[#2a1d15]'
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                status === 'active' ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Actions Buttons matching Reference #3 */}
        <div className="space-y-2 pt-3 border-t border-aura-border">
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-aura-gold-btn hover:bg-aura-gold-btnHover text-aura-dark font-semibold text-xs tracking-wider uppercase transition-all shadow-md"
          >
            Save Recipe
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="w-full py-2.5 rounded-xl border border-aura-border hover:border-aura-cream/40 text-aura-cream/70 hover:text-aura-cream text-xs font-medium tracking-wider uppercase transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

