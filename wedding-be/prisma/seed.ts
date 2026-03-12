import 'dotenv/config';
import { PrismaClient, Role, AttendanceStatus } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding...');

  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@wedding.vn' },
    update: {},
    create: { email: 'admin@wedding.vn', password: adminPassword, role: Role.ADMIN },
  });
  console.log('Admin:', admin.email);

  const clientPassword = await bcrypt.hash('client123', 10);
  const client = await prisma.user.upsert({
    where: { email: 'phat@wedding.vn' },
    update: {},
    create: { email: 'phat@wedding.vn', password: clientPassword, role: Role.CLIENT },
  });
  console.log('Client:', client.email);

  const wedding = await prisma.wedding.upsert({
    where: { slug: 'phat-thu-2026' },
    update: {
      coupleName: 'Tấn Phát & Anh Thư',
      monogram: 'T & A',
      heroMessage: 'Trân trọng kính mời bạn đến chung vui trong ngày trọng đại của chúng mình',
      eventDate: new Date('2026-10-24T11:30:00Z'),

      ceremonyVenueName: 'Lễ Đường An Nhiên',
      ceremonyVenueAddress: '12 Bạch Đằng, Hải Châu, Đà Nẵng',
      ceremonyTime: '08:00 SA, Thứ Bảy 24/10/2026',

      venueName: 'Sảnh tiệc Moonlight Garden',
      venueAddress: '88 Nguyễn Văn Linh, Đà Nẵng',
      receptionTime: '18:30 CH, Thứ Bảy 24/10/2026',
      dressCode: 'Pastel lãng mạn',
      mapUrl: 'https://maps.google.com/?q=Moonlight+Garden+Da+Nang',

      groomName: 'Tấn Phát',
      groomFullName: 'Nguyễn Tấn Phát',
      groomDescription: 'Hài hước, chân thành và luôn biết cách làm người khác cảm thấy được quan tâm. Mê cà phê và những chuyến đi dài.',
      groomImageUrl: 'https://picsum.photos/seed/wdg-groom-01/500/700',
      groomParents: 'Ông & Bà Nguyễn Văn A',
      groomBank: 'Techcombank',
      groomBankAccount: '9876 5432 1098 7654',
      groomBankName: 'NGUYEN TAN PHAT',

      brideName: 'Anh Thư',
      brideFullName: 'Nguyễn Thị Anh Thư',
      brideDescription: 'Nhẹ nhàng, ấm áp và luôn mang nụ cười đến mọi người xung quanh. Yêu thích những buổi chiều đọc sách bên cửa sổ.',
      brideImageUrl: 'https://picsum.photos/seed/wdg-bride-01/500/700',
      brideParents: 'Ông & Bà Trần Văn B',
      brideBank: 'Vietcombank',
      brideBankAccount: '1234 5678 9012 3456',
      brideBankName: 'NGUYEN THI ANH THU',

      videoId: 'jfKfPfyJRdk',
      isPublished: true,
    },
    create: {
      slug: 'phat-thu-2026',
      coupleName: 'Tấn Phát & Anh Thư',
      monogram: 'T & A',
      heroMessage: 'Trân trọng kính mời bạn đến chung vui trong ngày trọng đại của chúng mình',
      eventDate: new Date('2026-10-24T11:30:00Z'),

      ceremonyVenueName: 'Lễ Đường An Nhiên',
      ceremonyVenueAddress: '12 Bạch Đằng, Hải Châu, Đà Nẵng',
      ceremonyTime: '08:00 SA, Thứ Bảy 24/10/2026',

      venueName: 'Sảnh tiệc Moonlight Garden',
      venueAddress: '88 Nguyễn Văn Linh, Đà Nẵng',
      receptionTime: '18:30 CH, Thứ Bảy 24/10/2026',
      dressCode: 'Pastel lãng mạn',
      mapUrl: 'https://maps.google.com/?q=Moonlight+Garden+Da+Nang',

      groomName: 'Tấn Phát',
      groomFullName: 'Nguyễn Tấn Phát',
      groomDescription: 'Hài hước, chân thành và luôn biết cách làm người khác cảm thấy được quan tâm. Mê cà phê và những chuyến đi dài.',
      groomImageUrl: 'https://picsum.photos/seed/wdg-groom-01/500/700',
      groomParents: 'Ông & Bà Nguyễn Văn A',
      groomBank: 'Techcombank',
      groomBankAccount: '9876 5432 1098 7654',
      groomBankName: 'NGUYEN TAN PHAT',

      brideName: 'Anh Thư',
      brideFullName: 'Nguyễn Thị Anh Thư',
      brideDescription: 'Nhẹ nhàng, ấm áp và luôn mang nụ cười đến mọi người xung quanh. Yêu thích những buổi chiều đọc sách bên cửa sổ.',
      brideImageUrl: 'https://picsum.photos/seed/wdg-bride-01/500/700',
      brideParents: 'Ông & Bà Trần Văn B',
      brideBank: 'Vietcombank',
      brideBankAccount: '1234 5678 9012 3456',
      brideBankName: 'NGUYEN THI ANH THU',

      videoId: 'jfKfPfyJRdk',
      isPublished: true,
      ownerId: client.id,
    },
  });
  console.log('Wedding:', wedding.slug);

  // Gallery photos
  await prisma.galleryPhoto.deleteMany({ where: { weddingId: wedding.id } });
  await prisma.galleryPhoto.createMany({
    data: [
      { imageUrl: 'https://picsum.photos/seed/wdg-m1/800/1000', alt: 'Khoảnh khắc cô dâu chú rể dưới nắng chiều', order: 1, weddingId: wedding.id },
      { imageUrl: 'https://picsum.photos/seed/wdg-m2/800/600', alt: 'Bó hoa cưới pastel lãng mạn', order: 2, weddingId: wedding.id },
      { imageUrl: 'https://picsum.photos/seed/wdg-m3/800/600', alt: 'Cô dâu và bạn bè trong ngày cưới', order: 3, weddingId: wedding.id },
      { imageUrl: 'https://picsum.photos/seed/wdg-m4/800/1000', alt: 'Khách mời nâng ly chúc mừng', order: 4, weddingId: wedding.id },
      { imageUrl: 'https://picsum.photos/seed/wdg-m5/800/600', alt: 'Bàn tiệc trang trí nến và hoa', order: 5, weddingId: wedding.id },
      { imageUrl: 'https://picsum.photos/seed/wdg-m6/800/600', alt: 'Khoảnh khắc trao nhẫn thành hôn', order: 6, weddingId: wedding.id },
    ],
  });
  console.log('Gallery photos created');

  // Love story events
  await prisma.loveStoryEvent.deleteMany({ where: { weddingId: wedding.id } });
  await prisma.loveStoryEvent.createMany({
    data: [
      { dateLabel: '03 / 2020', title: 'Lần đầu gặp gỡ', description: 'Gặp nhau trong một buổi workshop và bắt đầu nói chuyện từ những điều thật nhỏ nhất. Không ai ngờ đó là khởi đầu của tất cả.', order: 1, weddingId: wedding.id },
      { dateLabel: '08 / 2021', title: 'Hẹn hò chính thức', description: 'Sau nhiều lần đồng hành, chúng mình quyết định bắt đầu hành trình yêu thương — chính thức và trọn vẹn hơn.', order: 2, weddingId: wedding.id },
      { dateLabel: '11 / 2023', title: 'Memorable Moment', description: 'Một buổi chiều thật đặc biệt cùng những lời hứa từ trái tim. Khoảnh khắc mà cả hai đều biết — đây là người dành cho nhau.', order: 3, weddingId: wedding.id },
      { dateLabel: '04 / 2024', title: 'Engagement Day', description: 'Chính thức đính hôn bên gia đình và những người thân yêu nhất. Một bước tiến mới cho câu chuyện tình của chúng mình.', order: 4, weddingId: wedding.id },
      { dateLabel: '10 / 2026', title: 'Ngày chung đôi', description: 'Chúng mình rất mong bạn có mặt để chứng kiến và chia sẻ niềm hạnh phúc trong khoảnh khắc đặc biệt nhất của đời mình.', order: 5, weddingId: wedding.id },
    ],
  });
  console.log('Love story events created');

  await prisma.rsvp.upsert({
    where: { requestId: 'sample-rsvp-001' },
    update: {},
    create: {
      requestId: 'sample-rsvp-001',
      fullName: 'Nguyễn Văn An',
      phone: '0901234567',
      attending: AttendanceStatus.yes,
      guestCount: 2,
      message: 'Chúc mừng đôi uyên ương!',
      weddingId: wedding.id,
    },
  });

  console.log('Seed done!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
