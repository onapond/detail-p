import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function POST(request: NextRequest) {
  let browser = null;

  try {
    const { html, width = 1200 } = await request.json();

    if (!html) {
      return NextResponse.json(
        { success: false, error: 'HTML content is required' },
        { status: 400 }
      );
    }

    // Launch puppeteer
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
      ],
    });

    const page = await browser.newPage();

    // SSRF 방지: 외부 네트워크 요청 차단 (data: URI와 인라인 리소스만 허용)
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      const url = req.url();
      if (url.startsWith('data:') || url === 'about:blank') {
        req.continue();
      } else {
        req.abort();
      }
    });

    // Set viewport width (height will be determined by content)
    await page.setViewport({
      width: Number(width),
      height: 800,
      deviceScaleFactor: 2, // 2x for high resolution
    });

    // Set content (외부 요청이 차단되므로 domcontentloaded만 대기)
    await page.setContent(html, {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    });

    // Wait a bit for any animations/fonts to fully load
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));

    // Get the full page height
    const bodyHeight = await page.evaluate(() => {
      return document.body.scrollHeight;
    });

    // Update viewport to full height
    await page.setViewport({
      width: Number(width),
      height: bodyHeight,
      deviceScaleFactor: 2,
    });

    // Take full page screenshot
    const screenshot = await page.screenshot({
      type: 'png',
      fullPage: true,
      omitBackground: false,
    });

    await browser.close();
    browser = null;

    // Convert Uint8Array to Buffer for NextResponse
    const buffer = Buffer.from(screenshot);

    // Return image as response
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': 'attachment; filename="detail-page.png"',
      },
    });
  } catch (error) {
    console.error('Screenshot capture error:', error);

    if (browser) {
      await browser.close();
    }

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to capture screenshot'
      },
      { status: 500 }
    );
  }
}
