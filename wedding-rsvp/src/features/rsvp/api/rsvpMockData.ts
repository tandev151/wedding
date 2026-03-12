import type { EventSummary, RsvpPayload, RsvpResponse } from "../types";

const KNOWN_SLUGS = new Set(["tan-phat-anh-thu", "demo-wedding"]);

export function getEventSummaryBySlug(slug: string): EventSummary | null {
  if (!slug || !KNOWN_SLUGS.has(slug)) {
    return null;
  }

  return {
    coupleName: "Tấn Phát & Anh Thư",
    monogram: "PT + AT",
    heroMessage: "Trân trọng kính mời bạn đến chung vui trong ngày trọng đại của chúng mình",
    eventDate: "2026-12-20T17:00:00.000Z",
    ceremonyVenueName: "Nhà thờ Chánh tòa Đà Nẵng",
    ceremonyVenueAddress: "156 Trần Phú, Hải Châu, Đà Nẵng",
    ceremonyTime: "14:00",
    venueName: "Sảnh tiệc Moonlight Garden",
    venueAddress: "88 Nguyễn Văn Linh, Đà Nẵng",
    receptionTime: "17:00",
    dressCode: "Pastel lãng mạn",
    mapUrl: "https://maps.google.com/?q=Moonlight+Garden+Da+Nang",
    groomName: "Tấn Phát",
    groomFullName: "Nguyễn Tấn Phát",
    groomDescription: "Chàng trai hướng ngoại, yêu bóng đá và những chuyến đi xa.",
    groomParents: "Ông Nguyễn Văn A - Bà Trần Thị B",
    brideName: "Anh Thư",
    brideFullName: "Trần Ngọc Anh Thư",
    brideDescription: "Cô gái yêu nghệ thuật, thích chụp ảnh và những điều tinh tế.",
    brideParents: "Ông Trần Văn C - Bà Lê Thị D",
    videoId: "dQw4w9WgXcQ",
    gallery: [
      { id: 1, imageUrl: "https://picsum.photos/seed/wdg-gallery-1/900/1200", alt: "Khoảnh khắc 1", order: 1 },
      { id: 2, imageUrl: "https://picsum.photos/seed/wdg-gallery-2/1200/900", alt: "Khoảnh khắc 2", order: 2 },
      { id: 3, imageUrl: "https://picsum.photos/seed/wdg-gallery-3/900/900", alt: "Khoảnh khắc 3", order: 3 },
    ],
    loveStory: [
      { id: 1, dateLabel: "05/2021", title: "Lần đầu gặp nhau", description: "Tụi mình gặp nhau trong một buổi workshop cuối tuần.", order: 1 },
      { id: 2, dateLabel: "12/2022", title: "Lời tỏ tình", description: "Sau nhiều chuyến đi chung, chúng mình chính thức bắt đầu hành trình yêu.", order: 2 },
      { id: 3, dateLabel: "10/2025", title: "Màn cầu hôn", description: "Một buổi hoàng hôn bên biển và câu hỏi quan trọng nhất cuộc đời.", order: 3 },
    ],
  };
}

export function buildRsvpResponse(payload: RsvpPayload, weddingId = 1): RsvpResponse {
  return {
    id: Date.now(),
    requestId: `rsvp_${Math.random().toString(36).slice(2, 10)}`,
    fullName: payload.fullName,
    phone: payload.phone,
    attending: payload.attending,
    guestCount: payload.guestCount,
    message: payload.message ?? null,
    weddingId,
    createdAt: new Date().toISOString(),
  };
}

