import { PrismaClient, UserRole, CourseLevel } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('Seed started...');
    const hashedAdminPassword = await bcrypt.hash('adminpassword123', 10);
    const hashedTeacherPassword = await bcrypt.hash('teacher123', 10);

    // 1. Create Admin
    const admin = await prisma.user.upsert({
        where: { email: 'admin@linguagerman.vn' },
        update: {},
        create: {
            email: 'admin@linguagerman.vn',
            password: hashedAdminPassword,
            name: 'Super Admin',
            role: UserRole.ADMIN,
        },
    });

    // 2. Create Teachers
    const teachersData = [
        { email: 'muller@linguagerman.vn', name: 'Herr Müller', level: 'A1-A2', slug: 'herr-muller', bio: 'Hơn 10 năm kinh nghiệm giảng dạy tiếng Đức sơ cấp. Luôn tận tâm và vui vẻ.' },
        { email: 'schmidt@linguagerman.vn', name: 'Frau Schmidt', level: 'B1', slug: 'frau-schmidt', bio: 'Chuyên gia luyện thi Goethe B1 với các phương pháp ghi nhớ từ vựng hiệu quả.' },
        { email: 'weber@linguagerman.vn', name: 'Herr Weber', level: 'B2', slug: 'herr-weber', bio: 'Từng làm việc tại Đức 5 năm, chia sẻ kinh nghiệm văn hóa và ngôn ngữ thực tế.' },
        { email: 'wagner@linguagerman.vn', name: 'Frau Wagner', level: 'C1', slug: 'frau-wagner', bio: 'Master cấp độ C1, chuyên luyện kỹ năng nghe hiểu và đọc hiểu trình độ cao.' },
    ];

    const teachers: any = {};
    for (const t of teachersData) {
        teachers[t.email] = await prisma.user.upsert({
            where: { email: t.email },
            update: { 
                role: (UserRole as any).TEACHER,
                slug: t.slug,
                bio: t.bio,
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${t.email}`
            } as any,
            create: {
                email: t.email,
                password: hashedTeacherPassword,
                name: t.name,
                role: (UserRole as any).TEACHER,
                slug: t.slug,
                bio: t.bio,
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${t.email}`
            } as any,
        });
    }

    // 3. Create Courses linked to Teachers
    const coursesData = [
        { title: 'Tiếng Đức sơ cấp A1', teacherEmail: 'muller@linguagerman.vn', level: CourseLevel.A1, price: 500000, thumbnail: '/courses/a1.png' },
        { title: 'Chinh phục A2 trong 3 tháng', teacherEmail: 'muller@linguagerman.vn', level: CourseLevel.A2, price: 750000, thumbnail: '/courses/a2.png' },
        { title: 'Tiếng Đức trung cấp B1', teacherEmail: 'schmidt@linguagerman.vn', level: CourseLevel.B1, price: 1200000, thumbnail: '/courses/b1.png' },
        { title: 'Luyện thi B2 cấp tốc', teacherEmail: 'weber@linguagerman.vn', level: CourseLevel.B2, price: 2500000, thumbnail: '/courses/b2.png' },
        { title: 'Master C1 - Reading & Listening', teacherEmail: 'wagner@linguagerman.vn', level: CourseLevel.C1, price: 3500000, thumbnail: '/courses/c1.png' },
    ];

    for (const c of coursesData) {
        await prisma.course.upsert({
            where: { title: c.title } as any,
            update: {
                teacherId: teachers[c.teacherEmail].id,
                level: c.level,
                price: c.price,
                thumbnail: c.thumbnail,
            } as any,
            create: {
                title: c.title,
                level: c.level,
                price: c.price,
                thumbnail: c.thumbnail,
                teacherId: teachers[c.teacherEmail].id,
                slug: c.title.toLowerCase().replace(/\s+/g, '-'),
            } as any,
        });
    }

    console.log('Seed completed successfully!');
    console.log('Admin:', admin.email);
    console.log('Teachers created:', teachersData.length);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
