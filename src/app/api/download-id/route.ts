import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    let dataUrl = '';
    let filename = '';
    let format = 'png';

    const contentType = req.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      const body = await req.json();
      dataUrl = body.dataUrl || '';
      filename = body.filename || '';
      format = body.format || 'png';
    } else {
      const formData = await req.formData();
      dataUrl = (formData.get('dataUrl') as string) || '';
      filename = (formData.get('filename') as string) || '';
      format = (formData.get('format') as string) || 'png';
    }

    if (!dataUrl || !dataUrl.includes(';base64,')) {
      return NextResponse.json({ error: 'Invalid image data' }, { status: 400 });
    }

    const parts = dataUrl.split(';base64,');
    const mime = format === 'jpg' || format === 'jpeg' ? 'image/jpeg' : 'image/png';
    const buffer = Buffer.from(parts[1], 'base64');
    const ext = format === 'jpg' || format === 'jpeg' ? 'jpg' : 'png';

    // Clean filename: remove all non-alphanumeric chars except dots/dashes/underscores
    let safeFilename = filename ? filename.replace(/[^a-zA-Z0-9_.-]/g, '_') : `HH_GOA_BUILDER_ID.${ext}`;

    // Ensure extension matches target format
    if (!safeFilename.toLowerCase().endsWith(`.${ext}`)) {
      safeFilename = `${safeFilename.replace(/\.[^/.]+$/, '')}.${ext}`;
    }

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': mime,
        'Content-Disposition': `attachment; filename="${safeFilename}"; filename*="UTF-8''${encodeURIComponent(safeFilename)}"`,
        'Content-Length': buffer.length.toString(),
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (err) {
    console.error('Download route error:', err);
    return NextResponse.json({ error: 'Failed to process download' }, { status: 500 });
  }
}
