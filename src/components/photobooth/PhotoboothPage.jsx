import React, { useState, useEffect, useRef, useCallback } from 'react';
import CameraPreview from './CameraPreview';
import LivePhotoStrip from './LivePhotoStrip';
import FrameSelectorModal from './FrameSelectorModal';
import { useCamera } from '../../hooks/useCamera';
import { PHOTO_LAYOUTS } from '../../constants/layouts';
import { soundEffects } from '../../utils/audioBeep';
import confetti from 'canvas-confetti';
import { ArrowLeft, Palette, Layout, Sparkles } from 'lucide-react';
import './PhotoboothPage.css';

export default function PhotoboothPage({
  selectedFrame,
  onSelectFrame,
  onNavigateGallery,
  onNavigateHome,
  onProceedToEditor
}) {
  const {
    videoRef,
    devices,
    selectedDeviceId,
    permissionStatus,
    errorMessage,
    isMirrored,
    isStreaming,
    startCamera,
    switchDevice,
    setIsMirrored,
    captureFrame
  } = useCamera();

  // Selected layout (default to 4-cut)
  const [currentLayout, setCurrentLayout] = useState(PHOTO_LAYOUTS[0]);

  // Array of captured photo Data URLs
  const [capturedPhotos, setCapturedPhotos] = useState(Array(PHOTO_LAYOUTS[0].slots).fill(null));

  // Sesi state
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [activeSlotIndex, setActiveSlotIndex] = useState(0);
  const [countdown, setCountdown] = useState(null);
  const [isFlashing, setIsFlashing] = useState(false);

  // Frame selector modal state
  const [isFrameModalOpen, setIsFrameModalOpen] = useState(false);

  // Hidden file input ref for uploading photos
  const fileInputRef = useRef(null);
  const singleSlotUploadIndexRef = useRef(null);

  // Start camera on component mount
  useEffect(() => {
    startCamera();
  }, [startCamera]);

  // When layout changes, adjust slots if not currently active
  const handleLayoutChange = (layout) => {
    if (isSessionActive) return;
    setCurrentLayout(layout);
    setCapturedPhotos(Array(layout.slots).fill(null));
  };

  // Automated Photo Session Sequence
  const runSingleShot = (slotIndex) => {
    return new Promise((resolve) => {
      setActiveSlotIndex(slotIndex);

      let counter = 3;
      setCountdown(counter);
      soundEffects.playBeep(false);

      const interval = setInterval(() => {
        counter -= 1;
        if (counter > 0) {
          setCountdown(counter);
          soundEffects.playBeep(false);
        } else if (counter === 0) {
          setCountdown(0);
          soundEffects.playBeep(true);
        } else {
          clearInterval(interval);
          setCountdown(null);

          // Flash & snapshot
          setIsFlashing(true);
          soundEffects.playShutter();
          const photoUrl = captureFrame();

          setTimeout(() => {
            setIsFlashing(false);
          }, 350);

          resolve(photoUrl);
        }
      }, 1000);
    });
  };

  // Start complete session for all slots
  const startFullSession = async () => {
    if (isSessionActive || permissionStatus !== 'granted') return;

    setIsSessionActive(true);
    const newPhotos = [...capturedPhotos];

    for (let i = 0; i < currentLayout.slots; i++) {
      const photo = await runSingleShot(i);
      newPhotos[i] = photo;
      setCapturedPhotos([...newPhotos]);

      // Pause 1.5 seconds before next countdown for pose adjustment
      if (i < currentLayout.slots - 1) {
        await new Promise((r) => setTimeout(r, 1500));
      }
    }

    setIsSessionActive(false);

    // Confetti celebration
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // Ignore if confetti blocked
    }
  };

  // Retake a single slot
  const retakeSingleSlot = async (slotIndex) => {
    if (isSessionActive || permissionStatus !== 'granted') return;

    setIsSessionActive(true);
    const photo = await runSingleShot(slotIndex);

    setCapturedPhotos((prev) => {
      const updated = [...prev];
      updated[slotIndex] = photo;
      return updated;
    });

    setIsSessionActive(false);
  };

  // Retake all photos
  const retakeAll = () => {
    setCapturedPhotos(Array(currentLayout.slots).fill(null));
    startFullSession();
  };

  // Fallback: Upload Photo from local device
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files || files.length === 0) return;

    if (singleSlotUploadIndexRef.current !== null) {
      // Replace single slot
      const reader = new FileReader();
      reader.onload = (event) => {
        setCapturedPhotos((prev) => {
          const updated = [...prev];
          updated[singleSlotUploadIndexRef.current] = event.target.result;
          return updated;
        });
        singleSlotUploadIndexRef.current = null;
      };
      reader.readAsDataURL(files[0]);
    } else {
      // Fill slots with selected images
      const newPhotos = [...capturedPhotos];
      files.slice(0, currentLayout.slots).forEach((file, idx) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          newPhotos[idx] = event.target.result;
          setCapturedPhotos([...newPhotos]);
        };
        reader.readAsDataURL(file);
      });
    }
    e.target.value = '';
  };

  const triggerUpload = (slotIndex = null) => {
    singleSlotUploadIndexRef.current = slotIndex;
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleProceed = () => {
    if (onProceedToEditor) {
      onProceedToEditor({
        photos: capturedPhotos,
        layout: currentLayout,
        frame: selectedFrame
      });
    }
  };

  return (
    <div className="photobooth-container">
      {/* Hidden File Input for Image Upload Fallback */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        multiple
        style={{ display: 'none' }}
      />

      {/* Frame Selection Modal / Wardrobe */}
      <FrameSelectorModal
        isOpen={isFrameModalOpen}
        onClose={() => setIsFrameModalOpen(false)}
        currentFrame={selectedFrame}
        onSelectFrame={(newFrame) => {
          if (onSelectFrame) onSelectFrame(newFrame);
          setIsFrameModalOpen(false);
        }}
      />

      {/* Top Bar Navigation & Active Frame */}
      <div className="photobooth-topbar">
        <button
          onClick={onNavigateHome}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            color: 'var(--text-muted)',
            fontSize: '0.95rem',
            fontWeight: 600
          }}
        >
          <ArrowLeft size={18} /> Back to Home
        </button>

        {/* Active Frame Indicator with modal trigger */}
        <div className="photobooth-active-frame-pill">
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Frame:</span>
          <span style={{ fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            {selectedFrame?.title || 'Matcha Signature'} {selectedFrame?.stickerSample || '🍵'}
          </span>
          <button
            onClick={() => setIsFrameModalOpen(true)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--matcha-primary)',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Change
          </button>
        </div>

        {/* Layout Switcher Buttons */}
        <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
          <Layout size={16} color="var(--text-muted)" />
          {PHOTO_LAYOUTS.map((layout) => (
            <button
              key={layout.id}
              onClick={() => handleLayoutChange(layout)}
              disabled={isSessionActive}
              className={`cat-tab-btn ${currentLayout.id === layout.id ? 'active' : ''}`}
              style={{ padding: '0.35rem 0.8rem', fontSize: '0.85rem' }}
            >
              {layout.icon} {layout.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Studio Grid: Camera + Live Strip */}
      <div className="photobooth-studio-grid">
        {/* Left: Camera Preview & Controls */}
        <CameraPreview
          videoRef={videoRef}
          permissionStatus={permissionStatus}
          errorMessage={errorMessage}
          isStreaming={isStreaming}
          isMirrored={isMirrored}
          onToggleMirror={() => setIsMirrored(!isMirrored)}
          devices={devices}
          selectedDeviceId={selectedDeviceId}
          onSwitchDevice={switchDevice}
          countdown={countdown}
          currentSlotIndex={activeSlotIndex}
          totalSlots={currentLayout.slots}
          isFlashing={isFlashing}
          isSessionActive={isSessionActive}
          onStartSession={startFullSession}
          onRetryCamera={() => startCamera()}
          onUploadPhotos={() => triggerUpload(null)}
        />

        {/* Right: Live Photo Strip with Real-Time Preview & Canvas Test */}
        <LivePhotoStrip
          selectedFrame={selectedFrame}
          layout={currentLayout}
          capturedPhotos={capturedPhotos}
          activeSlotIndex={activeSlotIndex}
          isSessionActive={isSessionActive}
          onRetakeAll={retakeAll}
          onRetakeSingleSlot={retakeSingleSlot}
          onProceedToEditor={handleProceed}
          onUploadPhotos={() => triggerUpload(null)}
          onOpenFrameSelector={() => setIsFrameModalOpen(true)}
        />
      </div>
    </div>
  );
}
