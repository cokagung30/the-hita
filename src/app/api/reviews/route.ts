import { NextResponse } from "next/server";

type RawReview = {
    author_name: string;
    author_url?: string;
    rating: number;
    text: string;
    relative_time_description: string;
    profile_photo_url?: string;
    time: number;
};

async function fetchPlaceReviews(placeId: string, apiKey: string) {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total,name&language=en&key=${apiKey}`;

    const res = await fetch(url, {
        next: { revalidate: 3600 }, // cache 1 jam
    });

    if (!res.ok) return null;

    const data = await res.json();
    if (data.status !== "OK") return null;

    const reviews = (data.result?.reviews ?? [] as RawReview[])
        .filter((r: RawReview) => r.rating >= 4 && r.text.trim().length > 0)
        .slice(0, 5)
        .map((r: RawReview) => ({
            name: r.author_name,
            rating: r.rating,
            comment: r.text,
            date: r.relative_time_description,
            photo: r.profile_photo_url ?? null,
            time: r.time,
            location: data.result?.name ?? null,
            reviewUrl: r.author_url ?? null,
        }));

    return {
        reviews,
        totalRating: data.result?.rating ?? null,
        totalReviews: data.result?.user_ratings_total ?? null,
        name: data.result?.name ?? null,
    };
}

export async function GET() {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const placeIdsEnv = process.env.GOOGLE_PLACE_IDS;

    if (!placeIdsEnv || !apiKey) {
        return NextResponse.json({ error: "Missing API configuration" }, { status: 500 });
    }

    const placeIds = placeIdsEnv.split(",").map((id) => id.trim()).filter(Boolean);

    const results = await Promise.allSettled(
        placeIds.map((id) => fetchPlaceReviews(id, apiKey))
    );

    const allReviews = results.flatMap((result) => {
        if (result.status === "fulfilled" && result.value) {
            return result.value.reviews;
        }
        return [];
    });

    // Urutkan berdasarkan waktu terbaru
    allReviews.sort((a, b) => b.time - a.time);

    return NextResponse.json({ reviews: allReviews });
}
