document.addEventListener('DOMContentLoaded', () => {
    
    // 1. تهيئة مكتبة AOS (Animation On Scroll)
    AOS.init({
        duration: 1000,
        once: true, // تفعيل الأنميشن مرة واحدة فقط عند التمرير
        offset: 50, // البدء قبل وصول العنصر بـ 50 بكسل
    });

    // 2. تفعيل قائمة الهامبرغر في الجوال
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // إغلاق قائمة الجوال عند الضغط على رابط (للـ Smooth Scrolling)
    document.querySelectorAll('#nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });

    // 3. شريط التنقل الثابت (Sticky Header)
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '5px 0';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.padding = '10px 0';
            header.style.backgroundColor = 'white';
        }
    });

    // 4. Smooth Scrolling (التمرير السلس)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // 5. وظيفة إرسال النموذج عبر واتساب
    // الرقم المخصص: +201002196772
    const whatsappNumber = '201002196772'; 
    const helpForm = document.getElementById('help-form');

    helpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // جمع البيانات من الحقول
        const name = this.name.value || 'غير محدد';
        const email = this.email.value || 'غير محدد';
        const phone = this.phone.value || 'غير محدد';
        const issueType = this.issue_type.options[this.issue_type.selectedIndex].text || 'غير محدد';
        const details = this.details.value || 'لا يوجد تفاصيل';

        // بناء رسالة واتساب بتنسيق واضح
        let whatsappMessage = `*طلب مساعدة جديد من موقع Smartiva:*\n`;
        whatsappMessage += `\n*الاسم:* ${name}`;
        whatsappMessage += `\n*الهاتف:* ${phone}`;
        whatsappMessage += `\n*البريد:* ${email}`;
        whatsappMessage += `\n*نوع المشكلة:* ${issueType}`;
        whatsappMessage += `\n*شرح المشكلة:*\n${details}`;
        
        // ترميز الرسالة وإعادة توجيه العميل
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        
        // فتح رابط الواتساب في نافذة جديدة
        window.open(whatsappURL, '_blank');
        
        // إعادة تعيين النموذج بعد فتحه (لتجهيزه لطلب جديد)
        setTimeout(() => {
            helpForm.reset();
        }, 1000); 
    });

});
