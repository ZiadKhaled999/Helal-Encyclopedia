
document.getElementById('copyButton').addEventListener('click', function () {
    const content = document.querySelector('.content').innerText;
    const textToCopy = content + "\nتم النسخ من تطبيق هلال (helal-encyclopedia.vercel.app)";
    navigator.clipboard.writeText(textToCopy).then(function () {
        alert('تم النسخ');
    }, function (err) {
        console.error('Could not copy text: ', err);
    });
});

document.getElementById('shareButton').addEventListener('click', function () {
    const content = document.querySelector('.content').innerText;
    const textToShare = content + "\nتم المشاركة من تطبيق هلال (helal-encyclopedia.vercel.app)";
    if (navigator.share) {
        navigator.share({
            title: 'تطبيق هلال',
            text: textToShare,
            url: 'https://helal-encyclopedia.vercel.app'
        }).then(() => {
            alert('تمت المشاركة');
        }).catch((error) => {
            console.error('Error sharing:', error);
        });
    } else {
        alert('المشاركة غير مدعومة في هذا المتصفح');
    }
});


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
