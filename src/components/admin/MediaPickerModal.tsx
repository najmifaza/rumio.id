"use client";

import { useState, useEffect, useRef } from "react";
import { getMediaAssets, uploadMedia } from "@/app/admin/media/actions";
import { X, Search, UploadCloud, Image as ImageIcon, Check } from "lucide-react";
import type { MediaAssetType } from "./MediaGallery";

interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (assets: MediaAssetType[]) => void;
  multiple?: boolean;
}

export default function MediaPickerModal({ isOpen, onClose, onSelect, multiple = false }: MediaPickerModalProps) {
  const [assets, setAssets] = useState<MediaAssetType[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadAssets = async (showLoadingState = true) => {
    if (showLoadingState) setLoading(true);
    const res = await getMediaAssets();
    if (res.success && res.assets) {
      setAssets(res.assets as MediaAssetType[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      // Menghindari "Cascading Render" (sinkron setState dalam effect) dengan memindahkannya ke micro-task/antrean async
      const timer = setTimeout(() => {
        loadAssets(true);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    setSelectedIds(new Set());
    onClose();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append("file", files[i]);
      await uploadMedia(formData);
    }
    
    setIsUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
    await loadAssets(false); // Tidak perlu show loading full-screen saat upload
  };

  const toggleSelection = (asset: MediaAssetType) => {
    if (!multiple) {
      onSelect([asset]);
      onClose();
      return;
    }

    const newSelected = new Set(selectedIds);
    if (newSelected.has(asset.id)) {
      newSelected.delete(asset.id);
    } else {
      newSelected.add(asset.id);
    }
    setSelectedIds(newSelected);
  };

  const handleConfirmSelection = () => {
    if (multiple) {
      const selectedAssets = assets.filter(a => selectedIds.has(a.id));
      onSelect(selectedAssets);
      onClose();
    }
  };

  if (!isOpen) return null;

  const filteredAssets = assets.filter(asset => 
    asset.filename.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={handleClose} />
      
      {/* Modal */}
      <div className="relative w-full max-w-5xl h-[85vh] bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-bold text-[#0B1528]">Pilih Media</h2>
          <button type="button" onClick={handleClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50">
          <div className="flex gap-4 w-full sm:w-auto">
            <button 
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="flex items-center gap-2 px-4 py-2 bg-[#0B1528] text-white rounded-lg text-sm font-semibold hover:bg-[#1a2b4c] transition-colors whitespace-nowrap"
            >
              <UploadCloud className="w-4 h-4" />
              {isUploading ? "Mengunggah..." : "Unggah Baru"}
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              multiple 
              accept="image/*,video/*"
            />
          </div>
          
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari file..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-9 pr-4 rounded-xl border border-slate-200 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
            />
          </div>
        </div>

        {/* Grid Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
          {loading ? (
            <div className="h-full flex items-center justify-center text-slate-400">
              <div className="animate-spin w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full" />
            </div>
          ) : filteredAssets.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400">
              <ImageIcon className="w-16 h-16 mb-4 opacity-20" />
              <p>Belum ada aset media.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
              {filteredAssets.map(asset => {
                const isSelected = selectedIds.has(asset.id);
                const isImage = asset.mimeType.startsWith('image/');
                
                return (
                  <div 
                    key={asset.id} 
                    onClick={() => toggleSelection(asset)}
                    className={`group relative aspect-square rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                      isSelected ? 'border-amber-500 shadow-md ring-2 ring-amber-500/20' : 'border-slate-200 hover:border-amber-300'
                    }`}
                  >
                    {isImage ? (
                      <img src={asset.url} alt={asset.filename} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                        <ImageIcon className="w-10 h-10 text-slate-400" />
                      </div>
                    )}

                    {/* Selection Overlay */}
                    {isSelected && (
                      <div className="absolute inset-0 bg-amber-500/20 flex items-start justify-end p-2">
                        <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-white shadow-sm">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer (only for multiple selection) */}
        {multiple && (
          <div className="px-6 py-4 border-t border-slate-200 bg-white flex justify-between items-center">
            <span className="text-sm font-medium text-slate-500">
              {selectedIds.size} file terpilih
            </span>
            <div className="flex gap-3">
              <button 
                type="button"
                onClick={handleClose}
                className="px-5 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Batal
              </button>
              <button 
                type="button"
                onClick={handleConfirmSelection}
                disabled={selectedIds.size === 0}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 disabled:hover:bg-amber-500 text-white rounded-xl font-bold transition-colors shadow-sm"
              >
                Gunakan File Terpilih
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
