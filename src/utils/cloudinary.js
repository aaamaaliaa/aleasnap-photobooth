// Utility to handle secure, unsigned client-side uploads to Cloudinary without exposing API Secret

const DEFAULT_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '';
const DEFAULT_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '';

// LocalStorage key for user overrides during testing
const STORAGE_KEY_CLOUD = 'aleasnap_cloudinary_cloud_name';
const STORAGE_KEY_PRESET = 'aleasnap_cloudinary_upload_preset';

export function getCloudinaryConfig() {
  const localCloud = localStorage.getItem(STORAGE_KEY_CLOUD) || localStorage.getItem('matchabox_cloudinary_cloud_name');
  const localPreset = localStorage.getItem(STORAGE_KEY_PRESET) || localStorage.getItem('matchabox_cloudinary_upload_preset');

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

  // If not configured, provide graceful notice
  if (!isConfigured) {
    return {
      success: false,
      notConfigured: true,
      error: 'Kredensial Cloudinary belum diatur di file .env atau pengaturan modal.'
    };
  }

  // Detect common mistake: entering purely numeric API Key as cloudName
  if (/^\d{8,}$/.test(cloudName.trim())) {
    return {
      success: false,
      error: 'Unknown API key: Nilai Cloud Name yang Anda masukkan adalah API Key (deretan angka). Masukkan Cloud Name yang benar (nama unik akun Cloudinary Anda, bukan API Key).'
    };
  }

  try {
    const formData = new FormData();
    formData.append('file', dataUrl);
    formData.append('upload_preset', uploadPreset);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName.trim()}/image/upload`, {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    if (!response.ok) {
      let errorMsg = data?.error?.message || `Upload gagal dengan status ${response.status}`;
      if (errorMsg.toLowerCase().includes('unknown api key')) {
        errorMsg = 'Unknown API key: Cloud Name tertukar dengan API Key (angka), atau Upload Preset masih berstatus "Signed" di dashboard Cloudinary. Ubah preset menjadi "Unsigned".';
      } else if (errorMsg.toLowerCase().includes('whitelisted for unsigned')) {
        errorMsg = 'Upload Preset Anda belum disetel ke mode "Unsigned" di dashboard Cloudinary (Settings > Upload > Upload Presets).';
      }
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

/**
 * Fallback free temporary cloud host (tmpfiles.org) for zero-setup demo testing
 * @param {string} dataUrl - Base64 Data URL
 * @returns {Promise<{ success: boolean, url?: string, error?: string, isDemo?: boolean }>}
 */
export async function uploadToDemoHost(dataUrl) {
  try {
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    const formData = new FormData();
    formData.append('file', blob, `aleasnap_${Date.now()}.png`);

    const response = await fetch('https://tmpfiles.org/api/v1/upload', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    if (data?.status === 'success' && data?.data?.url) {
      // Convert https://tmpfiles.org/123/file.png to direct download https://tmpfiles.org/dl/123/file.png
      const directUrl = data.data.url.replace('tmpfiles.org/', 'tmpfiles.org/dl/');
      return {
        success: true,
        url: directUrl,
        isDemo: true
      };
    }
    return {
      success: false,
      error: 'Server demo sementara tidak memberikan respon URL.'
    };
  } catch (err) {
    console.error('Demo upload error:', err);
    return {
      success: false,
      error: 'Gagal upload ke server demo: ' + (err.message || 'Periksa koneksi internet.')
    };
  }
}
