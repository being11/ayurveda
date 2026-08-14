'use client';

import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Skeleton } from '@workspace/ui/components/skeleton';
import { useYogaCamera } from '../hooks/useYogaCamera';
import { usePoseFeedback } from '../hooks/usePoseFeedback';
import { usePoseEngine } from '../hooks/usePoseEngine';
import { PoseOverlay } from './PoseOverlay';

export function YogaCameraView() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { status, errorMsg, detectorService } = useYogaCamera(videoRef);
  const { currentScore, arrows, videoDims } = usePoseEngine(status, detectorService, videoRef, canvasRef);
  const feedback = usePoseFeedback(currentScore, arrows);

  // Handle resizing canvas to match video size
  useEffect(() => {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      const handleResize = () => {
          if (video && canvas && video.videoWidth && video.videoHeight) {
              canvas.width = video.videoWidth;
              canvas.height = video.videoHeight;
          }
      };

      if (video) {
          video.addEventListener('loadedmetadata', handleResize);
          video.addEventListener('resize', handleResize);
          handleResize();
      }

      return () => {
         if (video) {
             video.removeEventListener('loadedmetadata', handleResize);
             video.removeEventListener('resize', handleResize);
         }
      };
  }, [status]);


  return (
    <Card className="w-full max-w-4xl mx-auto bg-white border-none shadow-md overflow-hidden">
      <CardHeader className="bg-[#FAF9F7] border-b pb-4">
        <CardTitle className="text-[#1B3A6B]">Yoga Pose Recognition & Form Correction</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div
          ref={containerRef}
          className="relative w-full aspect-video rounded-lg overflow-hidden bg-[#FAF9F7] flex items-center justify-center border border-gray-200"
        >
          {status === 'loading' || status === 'uninitialized' ? (
            <div className="flex flex-col items-center justify-center space-y-4 w-full h-full p-4 text-[#1B3A6B]">
               <Skeleton className="w-full h-full rounded-md" />
               <p className="absolute text-sm font-medium">Initializing camera and AI models...</p>
            </div>
          ) : status === 'error' ? (
            <div className="text-red-500 font-medium">
               Error: {errorMsg}
            </div>
          ) : null}

          <video
            ref={videoRef}
            className={`absolute top-0 left-0 w-full h-full object-cover ${status === 'ready' ? 'opacity-100' : 'opacity-0'}`}
            playsInline
            muted
          />
          <canvas
            ref={canvasRef}
            className={`absolute top-0 left-0 w-full h-full object-cover ${status === 'ready' ? 'opacity-100' : 'opacity-0'}`}
          />

          {status === 'ready' && <PoseOverlay feedback={feedback} videoDims={videoDims} />}
        </div>
      </CardContent>
    </Card>
  );
}
