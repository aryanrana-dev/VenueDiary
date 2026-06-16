import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const venueId = searchParams.get('venueId')

  if (!venueId) {
    return NextResponse.json({ error: 'venueId is required' }, { status: 400 })
  }

  // Sanitize venueId to prevent directory traversal
  const sanitizedId = path.basename(venueId)
  const dirPath = path.join(process.cwd(), 'public', 'venues', sanitizedId)

  try {
    if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
      const files = fs.readdirSync(dirPath)
      // Filter for common image file extensions
      const images = files
        .filter(file => /\.(png|jpe?g|gif|svg|webp)$/i.test(file))
        .map(file => `/venues/${sanitizedId}/${file}`)
      
      return NextResponse.json({ images })
    }
  } catch (error) {
    console.error('Error reading venue images directory:', error)
  }

  return NextResponse.json({ images: [] })
}
