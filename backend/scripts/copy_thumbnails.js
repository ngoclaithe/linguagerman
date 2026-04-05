const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'courses');
if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

const images = [
    { src: 'C:\\Users\\Admin\\.gemini\\antigravity\\brain\\c6afb41a-9cc0-4f13-891c-56e2e90b6c8f\\course_n5_thumbnail_1773221385337.png', dest: 'n5.png' },
    { src: 'C:\\Users\\Admin\\.gemini\\antigravity\\brain\\c6afb41a-9cc0-4f13-891c-56e2e90b6c8f\\course_n4_thumbnail_1773221400927.png', dest: 'n4.png' },
    { src: 'C:\\Users\\Admin\\.gemini\\antigravity\\brain\\c6afb41a-9cc0-4f13-891c-56e2e90b6c8f\\course_n3_thumbnail_1773221417303.png', dest: 'n3.png' },
    { src: 'C:\\Users\\Admin\\.gemini\\antigravity\\brain\\c6afb41a-9cc0-4f13-891c-56e2e90b6c8f\\course_n2_thumbnail_1773221434710.png', dest: 'n2.png' },
    { src: 'C:\\Users\\Admin\\.gemini\\antigravity\\brain\\c6afb41a-9cc0-4f13-891c-56e2e90b6c8f\\course_n1_thumbnail_1773221450419.png', dest: 'n1.png' },
];

images.forEach(img => {
    if (fs.existsSync(img.src)) {
        fs.copyFileSync(img.src, path.join(targetDir, img.dest));
        console.log(`Copied ${img.dest}`);
    } else {
        console.error(`Source not found: ${img.src}`);
    }
});
