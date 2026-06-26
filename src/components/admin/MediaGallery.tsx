"use client";

import { useState, useRef } from "react";
import { uploadMedia, deleteMedia } from "@/app/admin/media/actions";
import { UploadCloud, Image as ImageIcon, File as FileIcon, Trash2, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";

export interface MediaAssetType {
  id: string;
  filename: string;
  url: string;
  mimeType: string;
  size: number;
  altText: string | null;
  createdAt: Date;
}

export default function MediaGallery({ initialAssets }: { initialAssets: MediaAssetType[] }) {
  const [isUploading, setIsUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAsset, setSelectedAsset] = useState<MediaAssetType | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

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
    router.refresh();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus file ini permanen?")) {
      await deleteMedia(id);
      setSelectedAsset(null);
      router.refresh();
    }
  };

  const filteredAssets = initialAssets.filter(asset => 
    asset.filename.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatBytes = (bytes: number, decimals = 2) => {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[600px]">
      {/* Top Bar */}
      <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-50">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <button 
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="flex items-center gap-2 px-4 py-2 bg-[#0B1528] text-white rounded-lg text-sm font-semibold hover:bg-[#1a2b4c] transition-colors whitespace-nowrap"
          >
            <UploadCloud className="w-4 h-4" />
            {isUploading ? "Mengunggah..." : "Tambah Baru"}
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

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Grid Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          {filteredAssets.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400">
              <ImageIcon className="w-16 h-16 mb-4 opacity-20" />
              <p>Belum ada aset media.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredAssets.map(asset => (
                <div 
                  key={asset.id} 
                  onClick={() => setSelectedAsset(asset)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${selectedAsset?.id === asset.id ? 'border-amber-500 shadow-md ring-2 ring-amber-500/20' : 'border-slate-200 hover:border-slate-300'}`}
                >
                  {asset.mimeType.startsWith('image/') ? (
                    <img src={asset.url} alt={asset.filename} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                      <FileIcon className="w-10 h-10 text-slate-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar Detail (WordPress style) */}
        {selectedAsset && (
          <div className="w-80 bg-slate-50 border-l border-slate-200 p-6 flex flex-col overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h3 className="font-bold text-[#0B1528]">Detail File</h3>
              <button onClick={() => setSelectedAsset(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-video bg-slate-200 rounded-lg overflow-hidden mb-4 border border-slate-200 flex items-center justify-center">
              {selectedAsset.mimeType.startsWith('image/') ? (
                <img src={selectedAsset.url} alt={selectedAsset.filename} className="w-full h-full object-contain" />
              ) : (
                <FileIcon className="w-12 h-12 text-slate-400" />
              )}
            </div>

            <div className="space-y-3 text-sm text-slate-600">
              <div>
                <span className="block text-xs font-bold text-slate-400 mb-0.5">Nama File</span>
                <span className="break-all">{selectedAsset.filename}</span>
              </div>
              <div>
                <span className="block text-xs font-bold text-slate-400 mb-0.5">Tipe File</span>
                <span>{selectedAsset.mimeType}</span>
              </div>
              <div>
                <span className="block text-xs font-bold text-slate-400 mb-0.5">Ukuran</span>
                <span>{formatBytes(selectedAsset.size)}</span>
              </div>
              <div>
                <span className="block text-xs font-bold text-slate-400 mb-0.5">Diunggah Pada</span>
                <span>{new Date(selectedAsset.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-200">
              <label className="block text-xs font-bold text-slate-400 mb-1">URL File</label>
              <input 
                readOnly 
                value={selectedAsset.url} 
                className="w-full h-9 px-3 bg-white border border-slate-200 rounded-lg text-xs text-slate-600 outline-none"
              />
            </div>

            <div className="mt-auto pt-6 text-right">
              <button 
                onClick={() => handleDelete(selectedAsset.id)}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" /> Hapus Permanen
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
