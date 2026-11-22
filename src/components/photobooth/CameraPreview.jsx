import React from 'react';
import { Camera, FlipHorizontal, RefreshCw, AlertCircle, Upload, Sparkles } from 'lucide-react';

export default function CameraPreview({
  videoRef,
  permissionStatus,
  errorMessage,
  isStreaming,
  isMirrored,
  onToggleMirror,
  devices,
  selectedDeviceId,
  onSwitchDevice,
  countdown,
  currentSlotIndex,
  totalSlots,
  isFlashing,
  isSessionActive,
  onStartSession,
  onRetryCamera,
  onUploadPhotos
}) {
  return (
    <div className="camera-stage">
      {/* Video Viewport Area */}
      <div className="camera-viewport-wrapper">
        {/* Flash Animation Overlay */}
        <div className={`camera-flash-overlay ${isFlashing ? 'flashing' : ''}`} />

        {/* Live Video Element */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`camera-video ${isMirrored ? 'mirrored' : ''}`}
          style={{ display: permissionStatus === 'granted' ? 'block' : 'none' }}
        />

        {/* Live Countdown Overlay */}
        {countdown !== null && (
          <div className="countdown-overlay">
            <div className="countdown-number">
              {countdown === 0 ? '📸' : countdown}
            </div>
            <div className="countdown-pose-cue">
              {countdown === 0 ? 'CHEESE! ✨' : `Pose #${currentSlotIndex + 1} of ${totalSlots}`}
            </div>
          </div>
        )}

        {/* Camera Permission Denied or Not Supported Fallback Screen */}
        {permissionStatus !== 'granted' && (
          <div className="camera-fallback-card">
            <AlertCircle size={44} color="#F8B4B4" />
            <h3 style={{ color: '#FFF' }}>
              {permissionStatus === 'denied' ? 'Izin Kamera Diperlukan' : 'Memeriksa Akses Kamera'}
            </h3>
            <p>
              {errorMessage || 'Klik Izinkan / Allow saat browser meminta izin kamera untuk memulai sesi photobooth.'}
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button 
                className="btn btn-primary"
                onClick={onRetryCamera}
                style={{ fontSize: '0.9rem' }}
              >
                <RefreshCw size={16} />
                Coba Akses Kamera
              </button>

              <button 
                className="btn btn-secondary"
                onClick={onUploadPhotos}
                style={{ fontSize: '0.9rem', backgroundColor: 'white', color: 'var(--matcha-dark)' }}
              >
                <Upload size={16} />
                Upload Foto Saja
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Camera Controls & Settings Bar */}
      <div className="camera-controls-bar">
        <div className="camera-utility-btns">
          {/* Mirror Camera Toggle */}
          <button
            className="btn-camera-util"
            onClick={onToggleMirror}
            title={isMirrored ? 'Mirror Mode ON (Tampilan cermin)' : 'Mirror Mode OFF (Tampilan asli)'}
          >
            <FlipHorizontal size={16} />
            <span>{isMirrored ? 'Mirror: On' : 'Mirror: Off'}</span>
          </button>

          {/* Camera Switcher Dropdown (front/back camera on mobile or external webcams) */}
          {devices.length > 1 && (
            <select
              value={selectedDeviceId}
              onChange={(e) => onSwitchDevice(e.target.value)}
              className="camera-select-dropdown"
              disabled={isSessionActive}
            >
              {devices.map((device, idx) => (
                <option key={device.deviceId || idx} value={device.deviceId}>
                  {device.label || `Camera ${idx + 1}`}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Primary Shutter Action Button */}
        <div>
          <button
            className="btn-shutter"
            onClick={onStartSession}
            disabled={isSessionActive || permissionStatus !== 'granted'}
          >
            <Camera size={22} />
            <span>
              {isSessionActive 
                ? `Recording Shot ${currentSlotIndex + 1} of ${totalSlots}...`
                : 'Start Photo Session'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
