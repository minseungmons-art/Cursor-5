document.addEventListener('DOMContentLoaded', () => {
    
    // --- [1. 배경 이미지 변경 로직] ---
    const sections = document.querySelectorAll('.scroll-section');
    const bgImages = document.querySelectorAll('.bg-image');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('data-bg-index');
            }
        });

        if (!current && scrollY < sections[1].offsetTop) {
            bgImages.forEach(img => img.classList.remove('active'));
            bgImages[0].classList.add('active');
            return;
        }

        bgImages.forEach((img, index) => {
            img.classList.remove('active');
            if (bgImages[index] && index == current) {
                img.classList.add('active');
            }
        });
    });

    // --- [2. 모바일 메뉴 열고 닫기 로직 (새로 추가)] ---
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeBtn = document.getElementById('closeMenuBtn');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    // 햄버거 버튼 클릭 시 메뉴 열기
    if(hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.add('active');
        });
    }

    // X 버튼 클릭 시 메뉴 닫기
    if(closeBtn && mobileMenu) {
        closeBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    }

    // 메뉴 항목(홈, 소개 등) 클릭 시 메뉴 닫기
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });
});