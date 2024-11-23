'use server'

import QRCode from 'qrcode'

export async function generateQRCode(id: string): Promise<string> {
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(id, {
      width: 200,
      margin: 2,
    })
    return qrCodeDataUrl
  } catch (error) {
    console.error('Error generating QR code:', error)
    throw new Error('Failed to generate QR code')
  }
}
