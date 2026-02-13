document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. SCROLL REVEAL (Hiệu ứng hiện khi cuộn) ---
    const revealElements = document.querySelectorAll('.reveal, .fade-in-up');
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;
        revealElements.forEach((el) => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Chạy ngay lần đầu

    // --- 2. ACCORDION (Xem ý nghĩa lời dạy) ---
    const explainBtns = document.querySelectorAll('.btn-explain');
    explainBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const explanation = this.nextElementSibling;
            explanation.classList.toggle('open');
            if (explanation.style.maxHeight) {
                explanation.style.maxHeight = null;
                this.innerHTML = 'Xem ý nghĩa <i class="fas fa-chevron-down"></i>';
            } else {
                explanation.style.maxHeight = explanation.scrollHeight + 40 + "px";
                this.innerHTML = 'Thu gọn <i class="fas fa-chevron-up"></i>';
            }
        });
    });

    // --- 3. BOOK VIEWER (Đọc sách Flipbook) ---
    const bookModal = document.getElementById('book-modal');
    const bookFrame = document.getElementById('book-frame');
    const closeBookBtn = document.querySelector('.close-book');
    const readBtns = document.querySelectorAll('.read-btn');

    readBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const bookLink = this.getAttribute('data-link');
            if (bookLink) {
                bookFrame.src = bookLink;
                bookModal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Khóa cuộn trang nền
            } else {
                alert("Sách đang được cập nhật!");
            }
        });
    });

    // Đóng sách
    const closeBook = () => {
        bookModal.style.display = 'none';
        bookFrame.src = '';
        document.body.style.overflow = 'auto';
    };
    closeBookBtn.addEventListener('click', closeBook);
    
    // Click ra ngoài khung sách để đóng
    window.addEventListener('click', (e) => {
        if (e.target == bookModal) closeBook();
    });


    // --- 4. LIGHTBOX GALLERY (Xem ảnh phóng to & Chuyển ảnh) ---
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBoxBtn = document.querySelector(".close-lightbox");
    
    // Nút điều hướng
    const prevBtn = document.querySelector(".lightbox-control.prev");
    const nextBtn = document.querySelector(".lightbox-control.next");

    // Lấy danh sách tất cả ảnh trong gallery
    const galleryImages = Array.from(document.querySelectorAll(".gallery-item img"));
    let currentIndex = 0; // Biến theo dõi ảnh đang xem

    // Hàm hiển thị ảnh theo index
    const showImage = (index) => {
        // Xử lý vòng lặp: Nếu < 0 thì về cuối, nếu > length thì về đầu
        if (index < 0) {
            currentIndex = galleryImages.length - 1;
        } else if (index >= galleryImages.length) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }
        
        // Cập nhật ảnh
        lightboxImg.src = galleryImages[currentIndex].src;
    };

    // Sự kiện click vào ảnh nhỏ để mở Lightbox
    galleryImages.forEach((img, index) => {
        img.addEventListener("click", () => {
            lightbox.style.display = "block";
            showImage(index); // Mở đúng ảnh vừa click
            document.body.style.overflow = 'hidden'; // Khóa cuộn
        });
    });

    // Sự kiện nút Next / Prev
    nextBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Ngăn click xuyên qua làm đóng lightbox
        showImage(currentIndex + 1);
    });

    prevBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        showImage(currentIndex - 1);
    });

    // Hàm đóng Lightbox
    const closeLightbox = () => {
        lightbox.style.display = "none";
        document.body.style.overflow = 'auto';
    };

    closeBoxBtn.addEventListener("click", closeLightbox);

    // Click ra ngoài ảnh để đóng
    lightbox.addEventListener("click", (e) => {
        if(e.target === lightbox) closeLightbox();
    });

    // Hỗ trợ phím điều hướng (Arrow Left/Right/Esc)
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === "block") {
            if (e.key === "ArrowLeft") showImage(currentIndex - 1);
            if (e.key === "ArrowRight") showImage(currentIndex + 1);
            if (e.key === "Escape") closeLightbox();
        }
    });


    // --- 5. SMOOTH SCROLL ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});