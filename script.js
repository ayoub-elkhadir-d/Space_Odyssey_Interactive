
// الحصول على جميع أيقونات القائمة
const menuIcones = document.querySelectorAll('.menu_icone');  // استخدم querySelectorAll للمرونة

// حلقة على كل أيقونة لإضافة listener
menuIcones.forEach(function(icone) {
    icone.addEventListener('click', function(event) {
        // منع انتشار الحدث إذا لزم الأمر
        
        
        // البحث عن ul.menu_choix داخل نفس الـ choix_et_menu_div (الأب المباشر)
        const menuChoix = icone.parentElement.querySelector('.menu_choix');
        
        if (menuChoix) {
            // التبديل بين الإظهار والإخفاء
            if (menuChoix.style.display === 'flex') {
                menuChoix.style.display = 'none';  // إخفاء
            } else {
                menuChoix.style.display = 'flex';  // إظهار (افترض أنها flex للقائمة الأفقية)
            }
        }
    });
    0
});




