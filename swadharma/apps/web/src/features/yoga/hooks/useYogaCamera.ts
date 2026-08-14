import { useEffect, useRef, useState } from 'react';
import { PoseDetectorService } from '../services/PoseDetectorService';
import { PoseDetectorStatus } from '../types/pose.types';

export function useYogaCamera(videoRef: React.RefObject<HTMLVideoElement | null>) {
  const [status, setStatus] = useState<PoseDetectorStatus>('uninitialized');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const detectorService = useRef<PoseDetectorService | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function initCamera() {
      try {
        setStatus('loading');

        // Start WebCam
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                width: { ideal: 640 },
                height: { ideal: 480 },
                facingMode: 'user'
            }
        });

        if (!isMounted) {
            // Stop tracks immediately if unmounted during getUserMedia
            stream.getTracks().forEach(track => track.stop());
            return;
        }

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await new Promise((resolve) => {
             if (!videoRef.current) return;
             videoRef.current.onloadedmetadata = () => resolve(null);
          });
          if (isMounted) videoRef.current.play();
        }

        if (!isMounted) return;

        // Initialize Detector
        detectorService.current = new PoseDetectorService();
        await detectorService.current.initialize();

        if (isMounted) {
            setStatus('ready');
        }
      } catch (err: unknown) {
        if (isMounted) {
            setStatus('error');
            setErrorMsg(err instanceof Error ? err.message : 'Unknown camera error');
        }
        console.error('Camera/Detector initialization error:', err);
      }
    }

    initCamera();

    return () => {
      isMounted = false;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (detectorService.current) {
         detectorService.current.dispose();
      }
    };
  }, [videoRef]);

  return { status, errorMsg, detectorService };
}
