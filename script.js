// ==========================================
// 1. 스크롤 속도 설정 (빠르고 부드럽게)
// ==========================================
const lenis = new Lenis({
    duration: 0.6,          // 멈추는 시간 (숫자가 작을수록 빠릿함)
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    wheelMultiplier: 1.5,   // 마우스 휠 감도 (클수록 많이 내려감)
    smoothWheel: true
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);


// ==========================================
// 2. 배경화면 & 텍스트 애니메이션 (GSAP)
// ==========================================
gsap.registerPlugin(ScrollTrigger);

const bgImages = document.querySelectorAll('.bg-image');
const sections = document.querySelectorAll('.content-section');

// 각 섹션마다 배경 교체 로직
sections.forEach((section) => {
    // HTML에서 설정한 data-bg-index 번호를 가져옴
    const bgIndex = section.dataset.bgIndex; 
    const targetImage = bgImages[bgIndex];

    ScrollTrigger.create({
        trigger: section,
        start: "top 60%",     // 섹션이 화면 중간쯤 왔을 때
        end: "bottom 60%",
        onEnter: () => changeBackground(targetImage),
        onEnterBack: () => changeBackground(targetImage),
        
        // 텍스트 박스 쓱 올라오는 효과
        onToggle: self => {
            const textBox = section.querySelector('.text-box');
            if (self.isActive && textBox) {
                gsap.to(textBox, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" });
            } else if (textBox) {
                gsap.to(textBox, { y: 50, opacity: 0, duration: 0.5 }); // 안 보일 땐 숨김
            }
        }
    });
});

// 배경 바꾸는 함수
function changeBackground(newImage) {
    if(!newImage) return;
    // 모든 이미지 숨기고
    gsap.to(bgImages, { opacity: 0, duration: 1 }); 
    // 타겟 이미지만 보여주기
    gsap.to(newImage, { opacity: 1, duration: 1 }); 
}

// 첫 화면 타이틀 애니메이션 (HELLO, I AM DEV)
gsap.from(".main-title", { y: 50, opacity: 0, duration: 1.5, delay: 0.5, ease: "power4.out" });
gsap.from(".sub-text", { opacity: 0, duration: 1.5, delay: 1 });


// ==========================================
// 3. 모바일 메뉴 (햄버거 버튼)
// ==========================================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li a');

// 햄버거 버튼 클릭 시
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // 아이콘 모양 바꾸기 (작대기 3개 <-> X표시)
    const icon = hamburger.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
    } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    }
});

// 메뉴 누르면 닫기 (모바일에서 편하게)
links.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
            hamburger.querySelector('i').classList.remove('fa-xmark');
            hamburger.querySelector('i').classList.add('fa-bars');
        }
    });
});