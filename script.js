gsap.registerPlugin(ScrollTrigger);

// 1. DATA CONFIGURATION
const CLUB_GALLERY = [
    { type: 'image', url: 'IMG-20251217-WA0063.jpg', caption: 'Empire United Action' },
    { type: 'image', url: 'WhatsApp Image 2025-12-17 at 13.51.31_ea37a697.jpg', caption: 'Indoor' },
    { type: 'video', url: 'WhatsApp Video 2025-12-17 at 13.51.30_1592d9ef.mp4', caption: 'Goal Highlights' },
    { type: 'image', url: 'WhatsApp Image 2025-12-17 at 13.51.30_c8846b9f.jpg', caption: 'Team Spirit' },
    { type: 'image', url: 'IMG-20251217-WA0059.jpg', caption: 'over 35 astro tournament ' },
    { type: 'image', url: 'Screenshot 2025-12-17 133509.png', caption: 'One Heartbeat' }
];

const STAFF_DATA = [
    { name: "MARK EMPIRE", role: "Head Strategist" },
    { name: "COACH UNITED", role: "Elite Performance" },
    { name: "SARAH GOLD", role: "Physical Mastery" }
];

// 2. INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initCursor();
    initGallery();
    initStaff();
    initMagnetic();
});

// 3. ANIMATION FUNCTIONS
function initLoader() {
    const tl = gsap.timeline();
    tl.to(".loader-line", { width: "100%", duration: 1.5, ease: "expo.inOut" })
      .to(".loader-text", { y: -20, opacity: 0, duration: 0.5 })
      .to(".loader", { yPercent: -100, duration: 1, ease: "expo.inOut" })
      .from(".hero-logo", { scale: 0, rotation: 180, duration: 1.5, ease: "elastic.out(1, 0.3)" }, "-=0.5")
      .from(".split-type", { y: 100, opacity: 0, stagger: 0.1, duration: 1 }, "-=1");
}

function initCursor() {
    document.addEventListener('mousemove', (e) => {
        gsap.to('#custom-cursor', { x: e.clientX, y: e.clientY, duration: 0.1 });
    });
}

function initGallery() {
    const gallery = document.getElementById('main-gallery');
    CLUB_GALLERY.forEach(item => {
        const card = document.createElement('div');
        card.className = 'item';
        
        const media = item.type === 'video' 
            ? `<video src="${item.url}" muted loop playsinline></video>` 
            : `<img src="${item.url}" alt="${item.caption}">`;

        card.innerHTML = `
            ${media}
            <div class="item-overlay"><span>${item.caption}</span></div>
        `;

        card.addEventListener('mouseenter', () => {
            if(item.type === 'video') card.querySelector('video').play();
            gsap.to(card.querySelector('img, video'), { scale: 1.1, duration: 0.6 });
        });
        card.addEventListener('mouseleave', () => {
            if(item.type === 'video') card.querySelector('video').pause();
            gsap.to(card.querySelector('img, video'), { scale: 1, duration: 0.6 });
        });

        gallery.appendChild(card);
    });

    gsap.from(".item", {
        scrollTrigger: { trigger: ".gallery-grid", start: "top 80%" },
        opacity: 0, y: 100, stagger: 0.1, duration: 1, ease: "power4.out"
    });
}

function initStaff() {
    const container = document.getElementById('staff-container');
    STAFF_DATA.forEach(s => {
        container.innerHTML += `
            <div class="staff-card">
                <h3>${s.name}</h3>
                <p>${s.role}</p>
            </div>
        `;
    });
}

function initMagnetic() {
    document.querySelectorAll('.magnetic').forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const { offsetX: x, offsetY: y } = e, { offsetWidth: w, offsetHeight: h } = el;
            gsap.to(el.querySelector('span'), { x: (x/w - 0.5) * 30, y: (y/h - 0.5) * 30, duration: 0.3 });
        });
        el.addEventListener('mouseleave', () => gsap.to(el.querySelector('span'), { x: 0, y: 0 }));
    });
}


function initCursor() {
    // Only init cursor if it's not a touch device
    if (window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener('mousemove', (e) => {
            gsap.to('#custom-cursor', { x: e.clientX, y: e.clientY, duration: 0.1 });
        });
    } else {
        document.getElementById('custom-cursor').style.display = 'none';
    }
}