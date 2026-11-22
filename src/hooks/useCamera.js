import { useState, useEffect, useRef, useCallback } from 'react';

export function useCamera() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState('');
  const [permissionStatus, setPermissionStatus] = useState('prompt'); // 'prompt' | 'granted' | 'denied' | 'not-supported'
  const [errorMessage, setErrorMessage] = useState('');
  const [isMirrored, setIsMirrored] = useState(true); // Default mirrored like Korean photo booths
  const [isStreaming, setIsStreaming] = useState(false);

  // Stop current stream tracks
  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsStreaming(false);
  }, []);

  // Enumerate camera devices
  const getCameraDevices = useCallback(async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        return [];
      }
      const allDevices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = allDevices.filter((d) => d.kind === 'videoinput');
      setDevices(videoDevices);
      return videoDevices;
    } catch (err) {
      console.warn('Failed to enumerate devices:', err);
      return [];
    }
  }, []);

  // Start camera stream with given device ID or constraints
  const startCamera = useCallback(async (deviceIdToUse = null) => {
    stopStream();
    setErrorMessage('');

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setPermissionStatus('not-supported');
      setErrorMessage('Browser Anda tidak mendukung akses kamera (MediaDevices API). Silakan gunakan browser modern (Chrome, Safari, Edge, Firefox).');
      return false;
    }

    try {
      const constraints = {
        video: {
          width: { ideal: 1920, min: 640 },
          height: { ideal: 1080, min: 480 },
          ...(deviceIdToUse ? { deviceId: { exact: deviceIdToUse } } : { facingMode: 'user' })
        },
        audio: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(e => console.warn('Video play interrupted:', e));
      }

      setPermissionStatus('granted');
      setIsStreaming(true);

      // Populate available devices list
      const availableDevices = await getCameraDevices();
      if (!deviceIdToUse && availableDevices.length > 0) {
        const activeTrack = stream.getVideoTracks()[0];
        const settings = activeTrack ? activeTrack.getSettings() : null;
        if (settings && settings.deviceId) {
          setSelectedDeviceId(settings.deviceId);
        } else {
          setSelectedDeviceId(availableDevices[0].deviceId);
        }
      }

      return true;
    } catch (err) {
      console.error('Camera access error:', err);
      setIsStreaming(false);

      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setPermissionStatus('denied');
        setErrorMessage('Izin akses kamera ditolak. Silakan izinkan akses kamera di pengaturan browser Anda untuk melanjutkan.');
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setPermissionStatus('not-supported');
        setErrorMessage('Kamera tidak ditemukan pada perangkat Anda. Pastikan webcam terpasang dan aktif.');
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        setPermissionStatus('denied');
        setErrorMessage('Kamera sedang digunakan oleh aplikasi lain (seperti Zoom, Google Meet). Silakan tutup aplikasi tersebut dan coba lagi.');
      } else {
        setPermissionStatus('denied');
        setErrorMessage(`Gagal mengakses kamera: ${err.message || 'Unknown error'}`);
      }
      return false;
    }
  }, [stopStream, getCameraDevices]);

  // Switch camera device
  const switchDevice = useCallback((newDeviceId) => {
    setSelectedDeviceId(newDeviceId);
    startCamera(newDeviceId);
  }, [startCamera]);

  // Capture a still frame from video
  const captureFrame = useCallback(() => {
    if (!videoRef.current || !isStreaming) return null;

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;

    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Apply mirror flip to canvas snapshot if mirror mode is enabled
    if (isMirrored) {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/jpeg', 0.95);
  }, [isMirrored, isStreaming]);

  // Clean up stream on unmount
  useEffect(() => {
    return () => {
      stopStream();
    };
  }, [stopStream]);

  return {
    videoRef,
    devices,
    selectedDeviceId,
    permissionStatus,
    errorMessage,
    isMirrored,
    isStreaming,
    startCamera,
    stopStream,
    switchDevice,
    setIsMirrored,
    captureFrame
  };
}
