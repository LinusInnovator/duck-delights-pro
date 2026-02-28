import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function Home() {
  let isUgly = false; // default fallback

  try {
    const apiKey = process.env.IMPROVE_API_KEY;
    if (apiKey) {
      const res = await fetch('https://improve.delights.pro/api/v1/headless/variants', {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
        // Don't cache here, let the edge caching handle it
        cache: 'no-store'
      });

      if (res.ok) {
        const data = await res.json();
        if (data && data.variants && data.variants.length > 0) {
          // Headless API returns Thompson Sampling weights in the variants array
          // Determine variant based on weight (0-100)
          const randomParam = Math.random() * 100;
          let cumulativeWeight = 0;
          let selectedVariant = data.variants[0];

          for (const variant of data.variants) {
            cumulativeWeight += variant.weight;
            if (randomParam <= cumulativeWeight) {
              selectedVariant = variant;
              break;
            }
          }

          // Use the 'slot' or content to decide. Let's assume the 'ugly' variant has a slot or specific structure.
          // For now, if the slot is 'explorer' or 'challenger', we route it to ugly as a test, otherwise pretty
          // Ideally, the content itself would be passed down, but since we are just routing:
          if (selectedVariant.slot !== 'champion') {
            isUgly = true;
          }
        }
      }
    }
  } catch (e) {
    console.error('Failed to fetch variants from improve.delights.pro', e);
  }

  // To properly track the variant assigned, we normally would set a cookie or pass it in the URL
  // For this simple redirect, we append it so the page can track it.
  if (isUgly) {
    redirect('/ugly?variant=challenger');
  } else {
    redirect('/pretty?variant=champion');
  }
}
