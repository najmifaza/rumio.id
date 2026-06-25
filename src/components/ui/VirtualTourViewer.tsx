"use client";

import { useEffect, useRef } from "react";
import { Viewer } from "@photo-sphere-viewer/core";
import { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";
import { VirtualTourPlugin } from "@photo-sphere-viewer/virtual-tour-plugin";
import "@photo-sphere-viewer/core/index.css";
import "@photo-sphere-viewer/markers-plugin/index.css";
import "@photo-sphere-viewer/virtual-tour-plugin/index.css";

export interface VirtualTourNode {
  id: string;
  name?: string;
  panorama: string;
  links?: {
    nodeId: string;
    pitch?: number;
    yaw?: number;
    position?: { pitch: number; yaw: number };
  }[];
}

export interface VirtualTourData {
  url?: string; // Phase 1 fallback
  nodes?: VirtualTourNode[];
  startNodeId?: string;
}

interface VirtualTourViewerProps {
  data: VirtualTourData;
}

export default function VirtualTourViewer({ data }: VirtualTourViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Viewer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const isTour = data.nodes && data.nodes.length > 0;
    const initialPanorama = isTour ? undefined : (data.url || "/placeholder-image.jpg");

    let isMounted = true;
    let localViewer: Viewer | null = null;

    // Defer initialization to avoid React Strict Mode race condition
    // where immediate unmount crashes the VirtualTourPlugin's async loading
    const timer = setTimeout(() => {
      if (!isMounted || !containerRef.current) return;

      // Initialize the viewer
      localViewer = new Viewer({
        container: containerRef.current,
        panorama: initialPanorama,
        navbar: ["autorotate", "zoom", "fullscreen"],
        defaultYaw: 0,
        defaultPitch: 0,
        touchmoveTwoFingers: true,
        mousewheelCtrlKey: true,
        plugins: isTour
          ? [
              MarkersPlugin,
              [
                VirtualTourPlugin,
                {
                  positionMode: "manual",
                  renderMode: "3d",
                  nodes: (data.nodes || []).map((n) => ({
                    ...n,
                    links: n.links?.map((l) => ({
                      ...l,
                      position:
                        l.position ||
                        (l.pitch !== undefined && l.yaw !== undefined
                          ? { pitch: l.pitch, yaw: l.yaw }
                          : undefined),
                    })),
                  })),
                  startNodeId: data.startNodeId || data.nodes![0].id,
                },
              ],
            ]
          : [],
      });

      viewerRef.current = localViewer;

      if (isTour && localViewer) {
        // Viewer already configured via options, but we can access plugin if needed
        // localViewer.getPlugin(VirtualTourPlugin)
      }
    }, 50);

    // Cleanup on unmount
    return () => {
      isMounted = false;
      clearTimeout(timer);
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, [data]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full bg-slate-900 rounded-xl overflow-hidden"
      style={{ minHeight: "400px" }}
    />
  );
}
