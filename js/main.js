// قائمة التنقل للجوال
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// إغلاق القائمة عند النقر على رابط
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger) hamburger.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
    });
});

// التنقل السلس
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href !== '#' && href !== '#0' && href !== '#home') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// تفعيل الروابط النشطة أثناء التمرير
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// نموذج الاتصال الرئيسي
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
        submitBtn.disabled = true;
        setTimeout(() => {
            alert('✅ تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// إعادة تعيين أرقام الإحصائيات لتتحرك من الصفر عند كل تحميل
function resetNumbers() {
    document.querySelectorAll('.stat-number, .stats-number').forEach(el => {
        if(el.getAttribute('data-target')) {
            el.innerText = '0';
        }
    });
}

// تشغيل الأنيميشن للأرقام
function animateNumbers() {
    const numbers = document.querySelectorAll('.stat-number, .stats-number');
    numbers.forEach(number => {
        const target = parseFloat(number.getAttribute('data-target'));
        if(isNaN(target)) return;
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        const updateNumber = () => {
            current += step;
            if (current < target) {
                number.innerText = target % 1 !== 0 ? current.toFixed(1) : Math.floor(current);
                requestAnimationFrame(updateNumber);
            } else {
                number.innerText = target;
            }
        };
        updateNumber();
    });
}

// تشغيل الأرقام عندما يظهر قسم الإحصائيات
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            statsObserver.disconnect();
        }
    });
}, { threshold: 0.3 });

const statsSection = document.querySelector('#stats');
if (statsSection) statsObserver.observe(statsSection);

// إعادة تعيين الأرقام قبل بدء الأنيميشن
resetNumbers();

// تأثير إظهار العناصر عند التمرير
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .level-card, .stats-card, .info-card').forEach(el => {
    if (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    }
});

// تأثير التمرير على شريط التنقل
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.padding = '10px 0';
        navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.98)';
    } else {
        navbar.style.padding = '15px 0';
        navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
    }
});

// ==========================================
// تأثير الكتابة - نسخة مبسطة مع الحفاظ على التلوين
// ==========================================
(function() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(startTyping, 300);
        });
    } else {
        setTimeout(startTyping, 300);
    }
    
    function startTyping() {
        const heroTitle = document.querySelector('.hero-title');
        if (!heroTitle) return;
        
        // إظهار العنصر بعد أن يصبح جاهزاً للتأثير
        heroTitle.classList.add('typing-started');
        
        // الأجزاء المنفصلة
        const part1 = 'تعلم الإنجليزية ';
        const part2 = 'بـتسلسل ذكي';
        
        // مسح المحتوى
        heroTitle.innerHTML = '';
        
        let i = 0;
        let j = 0;
        
        function typePart1() {
            if (i < part1.length) {
                heroTitle.innerHTML = part1.substring(0, i + 1);
                i++;
                setTimeout(typePart1, 60);
            } else {
                setTimeout(typePart2, 50);
            }
        }
        
        function typePart2() {
            if (j < part2.length) {
                heroTitle.innerHTML = part1 + '<span class="highlight">' + part2.substring(0, j + 1) + '</span>';
                j++;
                setTimeout(typePart2, 80);
            } else {
                heroTitle.innerHTML = part1 + '<span class="highlight">' + part2 + '</span>';
                console.log('اكتمل تأثير الكتابة مع التلوين');
            }
        }
        
        typePart1();
    }
})();

// ==========================================
// تشغيل أرقام القسم الرئيسي (Hero Stats)
// ==========================================
function animateHeroStats() {
    const heroNumbers = document.querySelectorAll('.hero-stats .stat-number');
    
    heroNumbers.forEach(number => {
        const target = parseInt(number.getAttribute('data-target'));
        if (isNaN(target)) return;
        
        let current = 0;
        const duration = 3500; // 2 ثانية
        const step = target / (duration / 16);
        
        const updateNumber = () => {
            current += step;
            if (current < target) {
                number.textContent = Math.floor(current);
                requestAnimationFrame(updateNumber);
            } else {
                number.textContent = target;
            }
        };
        
        updateNumber();
    });
}

// مراقبة وصول قسم hero إلى الشاشة
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateHeroStats();
            heroObserver.disconnect(); // يتوقف عن المراقبة بعد التشغيل
        }
    });
}, { threshold: 0.3 });

const heroSection = document.querySelector('#home');
if (heroSection) {
    heroObserver.observe(heroSection);
}
