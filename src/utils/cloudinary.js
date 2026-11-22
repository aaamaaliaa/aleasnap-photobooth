// Utility to handle secure, unsigned client-side uploads to Cloudinary without exposing API Secret

const DEFAULT_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '';
const DEFAULT_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '';

// LocalStorage key for user overrides during testing
const STORAGE_KEY_CLOUD = 'matchabox_cloudinary_cloud_name';
const STORAGE_KEY_PRESET = 'matchabox_cloudinary_upload_preset';

export function getCloudinaryConfig() {
  const localCloud = localStorage.getItem(STORAGE_KEY_CLOUD);
  const localPreset = localStorage.getItem(STORAGE_KEY_PRESET);

  return {
    cloudName: localCloud || DEFAULT_CLOUD_NAME,
    uploadPreset: localPreset || DEFAULT_UPLOAD_PRESET,
    isConfigured: Boolean((localCloud || DEFAULT_CLOUD_NAME) && (localPreset || DEFAULT_UPLOAD_PRESET))
  };
}

export function saveCloudinaryConfig(cloudName, uploadPreset) {
  if (cloudName) localStorage.setItem(STORAGE_KEY_CLOUD, cloudName.trim());
  if (uploadPreset) localStorage.setItem(STORAGE_KEY_PRESET, uploadPreset.trim());
}

/**
 * Upload an image (DataURL or Blob) to Cloudinary using unsigned upload preset
 * @param {string} dataUrl - Base64 Data URL of the photo strip
 * @returns {Promise<{ success: boolean, url?: string, publicId?: string, error?: string, isDemo?: boolean }>}
 */
export async function uploadToCloudinary(dataUrl) {
  const { cloudName, uploadPreset, isConfigured } = getCloudinaryConfig();

  // If not configured, provide graceful demo mode notice and temporary storage
  if (!isConfigured) {
    return {
      success: false,
      notConfigured: true,
      error: 'Kredensial Cloudinary belum diatur di file .env (VITE_CLOUDINARY_CLOUD_NAME & VITE_CLOUDINARY_UPLOAD_PRESET).'
    };
  }

  try {
    const formData = new FormData();
    formData.append('file', dataUrl);
    formData.append('upload_preset', uploadPreset);
    formData.append('folder', 'matchabox_photostrips');

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMsg = data?.error?.message || `Upload gagal dengan status ${response.status}`;
      return {
        success: false,
        error: errorMsg
      };
    }

    return {
      success: true,
      url: data.secure_url,
      publicId: data.public_id,
      width: data.width,
      height: data.height
    };
  } catch (err) {
    console.error('Cloudinary upload error:', err);
    return {
      success: false,
      error: 'Gagal menghubungi server Cloudinary. Periksa koneksi internet Anda.'
    };
  }
}
