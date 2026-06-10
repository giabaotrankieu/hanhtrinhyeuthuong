document.addEventListener("DOMContentLoaded", function () {
    // 1. Khởi tạo AOS Animation
    AOS.init({
        once: true,
        offset: 100,
        duration: 800
    });

    // 2. Tắt màn hình Loading
    setTimeout(() => {
        document.getElementById('loader').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loader').style.display = 'none';
        }, 500);
    }, 800);

    // 3. Hiệu ứng gõ chữ (Typing Effect)
    const textToType = "Hành Trình Yêu Thương";
    const typingElement = document.getElementById("typing-text");
    let charIndex = 0;

    function type() {
        if (charIndex < textToType.length) {
            typingElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(type, 100); // Tốc độ gõ
        }
    }
    setTimeout(type, 1500); // Đợi loading xong mới gõ

    // 4. Navbar & Back to Top khi Scroll
    const navbar = document.getElementById('mainNav');
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
            backToTop.style.display = "flex";
        } else {
            navbar.style.boxShadow = "none";
            backToTop.style.display = "none";
        }
    });

    // 5. Counter Animation
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;

    window.addEventListener('scroll', () => {
        const statsSection = document.querySelector('.stats-section');
        const sectionPos = statsSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight;

        if (sectionPos < screenPos && !hasCounted) {
            counters.forEach(counter => {
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;
                    const inc = target / 100;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 15);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
            });
            hasCounted = true;
        }
    });

    // 6. Fetch dữ liệu từ JSON và render Card
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('cases-container');
            data.cases.forEach((item, index) => {
                // Thêm delay AOS tăng dần cho mỗi card
                const delay = (index + 1) * 100;
                
                const cardHTML = `
                    <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="${delay}">
                        <div class="case-card">
                            <div class="case-img-wrap">
                                <img src="${item.image}" alt="${item.name}">
                            </div>
                            <div class="card-body">
                                <span class="location-badge mb-3 d-inline-block"><i class="fa-solid fa-location-dot me-1"></i> ${item.location}</span>
                                <h4 class="fw-bold mb-3">${item.name}</h4>
                                <p class="text-muted small mb-4">${item.summary}</p>
                                <a href="detail.html?id=${item.id}" class="btn btn-outline-primary w-100 rounded-pill">Xem chi tiết</a>
                            </div>
                        </div>
                    </div>
                `;
                container.insertAdjacentHTML('beforeend', cardHTML);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});