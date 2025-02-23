const labels = [
    "أبي بكر الصديق",
    "أسطورة المغرب الإسلامي (الأمير محمد بن عبد الكريم الخطابي)",
    "(السيدة هاجر)",
    "أرطبون العرب (عمرو بن العاص)",
    "(الجندي المجهول في أمة الإسلام) النجاشي (أصحمة بن أبجر)",
    "(المقداد بن عمرو)",
    "(البدريون)",
    "(حواري رسول اللَّه) الزبير بن العوّام",
    "(طلحة بن عبيد اللَّه)",
    "   مدمر دولة الصفويين   (سليم الأول)",
    "عمالقة البحرية الإسلامية   (الأخوان بربروسا)",
    "(سليمان القانوني)",
    "(سليمان الحلبي)",
    "   عملاق الجزائر   (الأمير عبد القادر الجزائري)",
    "   الإمام   (عبد الحميد بن باديس)",
    "(البربر الأمازيغ)",
    "(طارق بن زياد)",
    "   القائد العابد   (موسى بن نصير)",
    "   القائد الأعلى للقوات الإسلامية المقاتلة   (خالد بن الوليد)",
    "أمين هذه الأمة (أبو عبيدة بن الجراح)",
    "(الغلام المجهول)",
    "   القائد الميداني لوحدة الموت الإسلامية   (عكرمة بن أبي جهل)",
    "الصحابي الجليل   أبو سفيان بن حرب (رضي اللَّه عنه وأرضاه)",
    "كبير أساقفة الإمبراطووية الرومانية   صغاطر",
    "أنسليم تورميدا   (عبد اللَّه المايوركي)",
    "الباحث عن السعادة   (سلمان الفارسي)",
    "(آريوس)",
    "أسد الصحراء   (عمر المختار)",
    "كاسر ضلع كسرى   (عمر بن الخطاب)",
    "قائد سلاح الفرسان الإسلامي   (سعيد بن يزيد)",
    "صقر اليمامة   (زيد بن الخطاب)",
    "آريوس أمة محمد   (محمد بن عبد الوهّاب)",
    "مؤسس جماعة المرابطين   (عبد اللَّه بن ياسين)",
    " فاتح قارة أفريقيا   (أبو بكر بن عمر اللّنتوني)",
    "العزيز في زمن الذلة   (المتوكل بن الأفطس)",
    "زعيم إمبراطورية المرابطين   (يوسف بن تاشفين)",
    "عبد الرحمن الناصر",
    "أصحاب الملابس البيضاء   (بنو أمية)",
    "الهدف رقم واحد لغزاة التاريخ   (عثمان بن عفان)",
    "خال المؤمنين   (معاوية بن أبي سفيان)",
    " البطل   (علي بن أبي طالب)",
    "خامس الخلفاء الراشدين   (الحسن بن علي)",
    "الغازي الأول للقسطنطينية   (يزيد بن معاوية)",
    "أسد القسطنطينية   (أبو أيوب الأنصاري)",
    "(مراد الثاني)",
    "   سيدة نساء أهل الجنة   (فاطمة بنت محمد)",
    "   رمز الزوجة الصالحة   (خديجة بنت خويلد)",
    "أمي. . . . وأمك   (عائشة أم المؤمنين)",
    "(مريم)",
    "(أم موسى)",
    "(آسية بنت مزاحم)",
    "(ماشطة بنت فرعون)",
    "  العالم الفرنسي   (موريس بوكاي)",
    " الصعيدي فاتح إمبراطورية اليابان   (علي الجرجاوي)",
    "قاهر التتار   (سيف الدين قطز)",
    " سلطان العلماء   (العز بن عبد السلام)",
    "شيخ الإسلام   (أحمد بن تيمية)",
    " إقليدس العرب   (ثابت بن قرة)",
    "   أول رائد فضاء في التاريخ   (عباس بن فرناس)",
    "   مكتشف أمريكا   (بيري رئيس)",
    "المسلمون الذين لا يعرفهم المسلمون   (الهنود الحمر!)",
    " رئيس دولة البرازيل الإسلامية   (زومبي)",
    "سلطان دولة الفلبين الإسلامية   (لابو لابو)",
    " أمير العبيد   (عبد الرحمن إبراهيم بن سوري)",
    "(مالكوم إكس)",
    "الرئيس الأمريكي المسلم   (أبراهام لينكولن)",
    "قائد انتفاضة الموريسكيين   محمد بن أمية (سليل عائلة الأبطال)",
    "الرجل الذي أنقذ تراث الأندلس   (أبو يوسف يعقوب المنصور الماريني)",
    "بطل معركة الأرك الخالدة   (أبو يوسف يعقوب المنصور الموحدي)",
    "   الشهيد   (نور الدين زنكي)",
    "(مُؤْمِنو الفُرْس)",
    "الهدف القادم لغزاة التاريخ   (البخاري)",
    "مُحَدِّث الأمَّة   (محمد ناصر الدين الألباني)",
    "(أبو هريرة)",
    "(الإمام الشوكاني)",
    "  لا يحبهم إلّا مؤمن، ولا يبغضهم إلّا منافق  ",
    " قائد قوات الكوماندوز النبوية   (محمد بن مسلمة)",
    "مدمِّر الإمبراطورية الفارسية (سعد بن أبي وقاص)",
    "(أسود القادسية)",
    "(العرب)",
    " أعظم شاعرٍ في تاريخ الإنسانية   (زهَيْر بن أبي سُلمى)",
    "وزراء الإعلام في حكومة محمد بن عبد اللَّه -صلى اللَّه عليه وسلم-   (شعراء الرسول -صلى اللَّه عليه وسلم-)",
    "(الفرسان الثلاثة)",
    "   الرباعي العظيم   (العبادلة الأربعة)",
    "   الخليفة الناسك   (هارون الرشيد)",
    "   المحارب الثالث عشر   (أحمد بن فضلان)",
    "   السلطان العالم   (أورانج زايب عالَم قير)",
    "   قائدي أعظم   (محمد علي جناح)",
    "   أسد جنوب أفريقيا   (أحمد ديدات)",
    "(المخلَّفون الثلاثة)",
    "   مؤسس علم الاقتصاد الإسلامي   (عبد الرحمن بن عوف)",
    "   نسر تونس الخضراء   (عبد العزيز الثعالبي)",
    "   قائد ثورة فلسطين   (عز الدين القسّام)",
    "   الخليفة الذي ضحى بالمُلك من أجل فلسطين   (عبد الحميد الثاني)",
    "(العثمانيّون الجدد)",
    "(جيل الصحوة)",
    "(طرفة بن العبد)",
]



const buttonContainer = document.getElementById("buttonContainer");
const div = document.createElement("div") ;
const num = 97 ;
for (let i = 0; i < num; i++) {

    buttonContainer.innerHTML += `<a href= "../GraetesofIslami/IN100ofISlam/${i}.html " class="btn">${labels[i]}</a>` ;

}



////////////////////////

// alert.js
(function() {
    // Inject required Font Awesome CSS
    const faLink = document.createElement('link');
    faLink.rel = 'stylesheet';
     faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(faLink);

    // Inject custom styles
    const style = document.createElement('style');
    style.textContent = `
        .custom-alert-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0,0,0,0.5);
            z-index: 1100;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .custom-alert {
            position: relative;
            background: #ffffff;
            padding: 25px;
            border-radius: 12px;
            width: 90%;
            max-width: 500px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            border-left: 5px solid #6a5acd;
        }
        
        .alert-content {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
        }
        
        .alert-message {
            font-size: 20px;
            color: #333;
            line-height: 1.5;
               position: absolute;
               left:45%;
        }
        
        .progress-bar {
            height: 4px;
            background: #eee;
            border-radius: 2px;
            overflow: hidden;
        }
        
        .progress {
            height: 100%;
            background: #6a5acd;
            width: 100%;
            transition: width 0.1s linear;
        }
        
        .close-btn {
            position: absolute;
            top: 15px;
            right: 15px;
            background: none;
            border: none;
            cursor: pointer;
            color: #6a5acd;
            font-size: 18px;
        }
    `;
    document.head.appendChild(style);

    // Override default alert
    window.alert = (message, options = {}) => {
        const existingAlert = document.querySelector('.custom-alert-overlay');
        if (existingAlert) return;

        // Default options
        const config = {
            timeout:10000,
            ...options
        };

        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'custom-alert-overlay';

        // Create alert container
        const alert = document.createElement('div');
        alert.className = 'custom-alert';

        // Alert content
        alert.innerHTML = `
            <button class="close-btn">
                <i class="fas fa-times"></i>
            </button>
            <div class="alert-content">
                
                <div class="alert-message">${message}</div>
            </div>
            <div class="progress-bar">
                <div class="progress"></div>
            </div>
        `;

        // Progress animation
        const progress = alert.querySelector('.progress');
        const startTime = Date.now();
        
        const updateProgress = () => {
            const elapsed = Date.now() - startTime;
            const remaining = config.timeout - elapsed;
            progress.style.width = `${(remaining / config.timeout) * 100}%`;
            
            if (remaining > 0) {
                requestAnimationFrame(updateProgress);
            }
        };
        requestAnimationFrame(updateProgress);

        // Close functionality
        const closeAlert = () => {
            overlay.remove();
            alert.remove();
        };

        alert.querySelector('.close-btn').addEventListener('click', closeAlert);
        
        // Auto-close
        setTimeout(closeAlert, config.timeout);

        // Append elements
        overlay.appendChild(alert);
        document.body.appendChild(overlay);
    };
})();