// أرقام متحركة للإحصائيات
const animateNumbers = () => {
    const numbers = document.querySelectorAll('.stat-number, .stats-number');
    
    numbers.forEach(number => {
        const target = parseFloat(number.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateNumber = () => {
            current += step;
            if (current < target) {
                if (target % 1 !== 0) {
                    number.textContent = current.toFixed(1);
                } else {
                    number.textContent = Math.floor(current);
                }
                requestAnimationFrame(updateNumber);
            } else {
                number.textContent = target;
            }
        };
        
        updateNumber();
    });
};

// مراقبة وصول الأرقام إلى الشاشة
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            statsObserver.disconnect();
        }
    });
}, { threshold: 0.3 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// تأثير hover ثلاثي الأبعاد على البطاقات
document.querySelectorAll('.feature-card, .level-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
});



// ==========================================
// باقي تأثيرات الصفحة
// ==========================================

// أرقام متحركة للإحصائيات
const animateNumbers = () => {
    const numbers = document.querySelectorAll('.stat-number, .stats-number');
    
    numbers.forEach(number => {
        const target = parseFloat(number.getAttribute('data-target'));
        if (isNaN(target)) return;
        
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateNumber = () => {
            current += step;
            if (current < target) {
                if (target % 1 !== 0) {
                    number.textContent = current.toFixed(1);
                } else {
                    number.textContent = Math.floor(current);
                }
                requestAnimationFrame(updateNumber);
            } else {
                number.textContent = target;
            }
        };
        
        updateNumber();
    });
};

// مراقبة وصول الأرقام إلى الشاشة
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            statsObserver.disconnect();
        }
    });
}, { threshold: 0.3 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// تأثير hover ثلاثي الأبعاد على البطاقات
document.querySelectorAll('.feature-card, .level-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
});

// تأثير ظهور العناصر عند التمرير
const observeElements = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s both`;
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .level-card, .gallery-item, .info-card').forEach(el => {
        observer.observe(el);
    });
};

// تأثير ظهور الصفحة عند التحميل
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    observeElements();
});

// منع التمرير الزائد
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        // تم
    }, 100);
});

// انيميشن العناصر عند دخولها منطقة العرض
const observeElements = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s both`;
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .level-card, .gallery-item, .info-card').forEach(el => {
        observer.observe(el);
    });
};

// تأخير تشغيل الانيميشن حتى يتم تحميل الصفحة بالكامل
window.addEventListener('load', observeElements);