"use client";

import { useState, useRef, useEffect } from "react";
import { Viewer } from "@photo-sphere-viewer/core";
import { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";
import { VirtualTourPlugin } from "@photo-sphere-viewer/virtual-tour-plugin";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Crosshair } from "lucide-react";
import { VirtualTourData, VirtualTourNode } from "@/components/ui/VirtualTourViewer";
import "@photo-sphere-viewer/core/index.css";
import "@photo-sphere-viewer/markers-plugin/index.css";
import "@photo-sphere-viewer/virtual-tour-plugin/index.css";

if (typeof window !== "undefined") {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const pluginProto = VirtualTourPlugin.prototype as any;
  if (pluginProto.loadNode && !pluginProto._patchedLoadNode) {
    const originalLoadNode = pluginProto.loadNode;
    pluginProto.loadNode = function(...args: any[]) {
      return originalLoadNode.apply(this, args).catch((e: any) => {
        if (e && e.message && e.message.includes('clear')) {
          console.warn("Caught VirtualTourPlugin loadNode unmount error.");
        } else {
          throw e;
        }
      });
    };
    pluginProto._patchedLoadNode = true;
  }
  /* eslint-enable @typescript-eslint/no-explicit-any */
}

import MediaPickerModal from "./MediaPickerModal";
import type { MediaAssetType } from "./MediaGallery";

interface VirtualTourBuilderProps {
  initialData?: VirtualTourData | null;
}

export default function VirtualTourBuilder({ initialData }: VirtualTourBuilderProps) {
  const [nodes, setNodes] = useState<VirtualTourNode[]>(initialData?.nodes || []);
  const [startNodeId, setStartNodeId] = useState<string>(initialData?.startNodeId || "");
  
  // Add node state
  const [newNodeName, setNewNodeName] = useState("");
  const [newNodeUrl, setNewNodeUrl] = useState<string>("");
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);

  // Viewer state
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Viewer | null>(null);
  const pluginRef = useRef<VirtualTourPlugin | null>(null);

  // Link creation state
  const [isLinkingMode, setIsLinkingMode] = useState(false);
  const isLinkingModeRef = useRef(isLinkingMode);
  const [pendingLink, setPendingLink] = useState<{ pitch: number; yaw: number; sourceNodeId?: string } | null>(null);
  const [targetNodeId, setTargetNodeId] = useState<string>("");

  useEffect(() => {
    isLinkingModeRef.current = isLinkingMode;
  }, [isLinkingMode]);

  // BUG-3 FIX: Pisah useEffect menjadi DUA:
  // (1) Effect init+update — tidak punya cleanup, sehingga viewer TIDAK di-destroy
  //     setiap kali nodes berubah. Viewer tetap hidup dan hanya di-update via setNodes.
  useEffect(() => {
    if (!containerRef.current || nodes.length === 0 || !startNodeId) return;

    let timer: NodeJS.Timeout;

    if (!viewerRef.current) {
      // Defer initialization to avoid React Strict Mode race condition
      timer = setTimeout(() => {
        if (!containerRef.current) return;
        
        viewerRef.current = new Viewer({
          container: containerRef.current,
          navbar: ["zoom", "fullscreen"],
          plugins: [
            MarkersPlugin,
            [VirtualTourPlugin, {
              positionMode: 'manual',
              renderMode: '3d',
              nodes: nodes.map(n => ({
                ...n,
                links: n.links?.map((l) => ({
                  ...l,
                  position: l.position || (l.pitch !== undefined && l.yaw !== undefined ? { pitch: l.pitch, yaw: l.yaw } : undefined)
                }))
              })),
              startNodeId: startNodeId
            }]
          ]
        });

        pluginRef.current = viewerRef.current.getPlugin(VirtualTourPlugin) as VirtualTourPlugin;

        viewerRef.current.addEventListener('click', ({ data }) => {
          if (isLinkingModeRef.current) {
            const sourceNodeId = pluginRef.current?.getCurrentNode()?.id;
            setPendingLink({ pitch: data.pitch, yaw: data.yaw, sourceNodeId });
          }
        });
      }, 100);
    } else {
      // Viewer sudah ada — update nodes saja tanpa recreate
      try {
        pluginRef.current?.setNodes(
          nodes.map(n => ({
            ...n,
            links: n.links?.map((l) => ({
              ...l,
              position: l.position || (l.pitch !== undefined && l.yaw !== undefined ? { pitch: l.pitch, yaw: l.yaw } : undefined)
            }))
          })),
          startNodeId
        );
      } catch (e) {
        console.error("Error setting nodes:", e);
      }
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [nodes, startNodeId]);

  // (2) Effect cleanup — deps kosong [] agar HANYA berjalan saat komponen unmount.
  //     Memastikan viewer dan semua event listener-nya dibebaskan dari memori.
  useEffect(() => {
    return () => {
      if (viewerRef.current) {
        try {
          viewerRef.current.destroy();
        } catch (e: any) {
          if (e?.message?.includes("clear")) {
            console.warn("Caught PhotoSphereViewer destroy clear error.");
          } else {
            console.error("Error destroying viewer:", e);
          }
        }
        viewerRef.current = null;
        pluginRef.current = null;
      }
    };
  }, []);

  // Pass JSON back to form
  const getJsonString = () => {
    if (nodes.length === 0) return "";
    return JSON.stringify({ nodes, startNodeId });
  };

  const handleAddNode = () => {
    if (!newNodeName) {
       alert("Mohon isi nama ruangan.");
       return;
    }
    
    if (!newNodeUrl) {
       alert("Mohon pilih file foto 360.");
       return;
    }

    const id = "node-" + Date.now();
    const newNode = {
      id,
      name: newNodeName,
      panorama: newNodeUrl,
      links: []
    };
    
    const newNodes = [...nodes, newNode];
    setNodes(newNodes);

    if (newNodes.length === 1) {
      setStartNodeId(id);
    }
    setNewNodeName("");
    setNewNodeUrl("");
  };

  const handleDeleteNode = (id: string) => {
    // Revoke blob URL panorama sebelum node dihapus untuk membebaskan memori
    const nodeToDelete = nodes.find(n => n.id === id);
    if (nodeToDelete?.panorama.startsWith('blob:')) {
      URL.revokeObjectURL(nodeToDelete.panorama);
    }

    const newNodes = nodes.filter(n => n.id !== id).map(n => ({
      ...n,
      links: n.links?.filter((l) => l.nodeId !== id)
    }));
    setNodes(newNodes);

    if (startNodeId === id) {
      setStartNodeId(newNodes[0]?.id || "");
    }
    if (newNodes.length === 0) {
      if (viewerRef.current) {
        try {
          viewerRef.current.destroy();
        } catch (e: unknown) {
          console.warn("Caught destroy error", e);
        }
        viewerRef.current = null;
        pluginRef.current = null;
      }
    } else {
      // Jika node yang dihapus sedang aktif, kita harus paksa viewer untuk direcreate
      // dengan cara menghancurkannya, biarkan useEffect merecreate-nya.
      const currentNodeId = pluginRef.current?.getCurrentNode()?.id;
      if (currentNodeId === id) {
        if (viewerRef.current) {
          try {
            viewerRef.current.destroy();
          } catch (e) {
            console.warn(e);
          }
          viewerRef.current = null;
          pluginRef.current = null;
        }
      }
    }
  };

  const saveLink = () => {
    if (!pendingLink || !targetNodeId || !pluginRef.current) return;
    
    const currentNodeId = pluginRef.current.getCurrentNode()?.id;
    if (!currentNodeId) return;

    const newNodes = nodes.map(n => {
      if (n.id === currentNodeId) {
        return {
          ...n,
          links: [
            ...(n.links || []),
            { 
              nodeId: targetNodeId, 
              pitch: pendingLink.pitch, 
              yaw: pendingLink.yaw,
              position: { pitch: pendingLink.pitch, yaw: pendingLink.yaw } // Double coverage in case of version differences
            }
          ]
        };
      }
      return n;
    });

    setNodes(newNodes);
    setPendingLink(null);
    setIsLinkingMode(false);
    setTargetNodeId("");
  };

  return (
    <div className="space-y-6">
      <input type="hidden" name="virtualTourDataJson" value={getJsonString()} />
      
      {/* Node List & Add Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
          <h4 className="font-bold text-sm mb-3">Daftar Ruangan (Nodes)</h4>
          {nodes.length === 0 ? (
            <p className="text-xs text-slate-500">Belum ada ruangan ditambahkan.</p>
          ) : (
            <div className="space-y-2">
              {nodes.map(n => (
                <div key={n.id} className={`flex items-center justify-between p-3 rounded-lg border gap-2 ${startNodeId === n.id ? 'border-amber-500 bg-amber-50' : 'border-slate-200 bg-white'}`}>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate">
                      {n.name} {startNodeId === n.id && <span className="text-xs text-amber-600 ml-2">(Start)</span>}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {n.panorama.split('/').pop()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    {startNodeId !== n.id && (
                      <button type="button" onClick={() => setStartNodeId(n.id)} className="text-xs font-semibold text-blue-600 hover:underline whitespace-nowrap">
                        Jadikan Start
                      </button>
                    )}
                    <button type="button" onClick={() => handleDeleteNode(n.id)} className="text-red-500 hover:text-red-700 shrink-0 p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
          <h4 className="font-bold text-sm">Tambah Ruangan Baru</h4>
          <input
            type="text"
            placeholder="Nama Ruangan (ex: Ruang Tamu)"
            value={newNodeName}
            onChange={e => setNewNodeName(e.target.value)}
            className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm"
          />
          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value={newNodeUrl.split('/').pop() || ""}
              placeholder="Belum ada foto 360..."
              className="flex-1 min-w-0 h-10 px-3 border border-slate-200 rounded-lg text-sm bg-white outline-none"
            />
            <Button type="button" variant="outline" onClick={() => setIsMediaPickerOpen(true)} className="h-10 px-4 shrink-0 whitespace-nowrap">
              Pilih Foto
            </Button>
          </div>
          <Button type="button" onClick={handleAddNode} className="w-full bg-slate-800 text-white hover:bg-slate-700">
            <Plus className="w-4 h-4 mr-2" /> Tambah Ruangan
          </Button>
        </div>
      </div>

      {/* Viewer & Link Builder */}
      {nodes.length > 0 && (
        <div className="border border-slate-200 rounded-xl overflow-hidden relative">
          <div className="p-3 bg-slate-800 text-white flex justify-between items-center">
            <span className="text-sm font-medium">360 Preview & Builder</span>
            <Button
              type="button"
              variant={isLinkingMode ? "destructive" : "secondary"}
              size="sm"
              onClick={() => {
                setIsLinkingMode(!isLinkingMode);
                setPendingLink(null);
              }}
              className="text-xs h-8"
            >
              <Crosshair className="w-3.5 h-3.5 mr-2" />
              {isLinkingMode ? "Batal Tambah Hotspot" : "Tambah Hotspot Panah"}
            </Button>
          </div>
          
          <div className="relative">
            <div ref={containerRef} className="w-full h-[500px] bg-slate-900" />
            
            {/* Linking Helper Overlay */}
            {isLinkingMode && !pendingLink && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg pointer-events-none animate-pulse">
                Klik dimana saja pada gambar untuk menaruh Hotspot!
              </div>
            )}

            {/* Target Selection Modal */}
            {pendingLink && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-xl w-80 space-y-4 shadow-xl">
                  <h4 className="font-bold">Pilih Tujuan Hotspot</h4>
                  <p className="text-xs text-slate-500">Saat hotspot ini diklik, pengunjung akan diarahkan ke ruangan mana?</p>
                  <select 
                    className="w-full h-10 border rounded-lg px-3 text-sm"
                    value={targetNodeId}
                    onChange={e => setTargetNodeId(e.target.value)}
                  >
                    <option value="">-- Pilih Ruangan --</option>
                    {nodes.filter(n => n.id !== pendingLink.sourceNodeId).map(n => (
                      <option key={n.id} value={n.id}>{n.name}</option>
                    ))}
                  </select>
                  <div className="flex gap-2">
                    <Button type="button" variant="outline" className="flex-1" onClick={() => setPendingLink(null)}>Batal</Button>
                    <Button type="button" className="flex-1 bg-amber-600 hover:bg-amber-700" onClick={saveLink}>Simpan</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        onSelect={(assets) => {
          if (assets.length > 0) {
            setNewNodeUrl(assets[0].url);
          }
        }}
        multiple={false}
      />
    </div>
  );
}
