import type { RPMInput } from '../types';

export const generateRPM = async (data: RPMInput): Promise<string> => {
  try {
    const response = await fetch('/.netlify/functions/generate-rpm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error from serverless function:', response.status, errorText);
      throw new Error(`Gagal menghasilkan RPM. Server memberikan respons: ${errorText}`);
    }
    
    return await response.text();
    
  } catch (error) {
    console.error("Error calling backend function:", error);
    throw new Error("Gagal terhubung dengan layanan AI. Periksa koneksi internet Anda.");
  }
};
