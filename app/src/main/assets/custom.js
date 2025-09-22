console.log(
    '%cbuild from PakePlus： 链接1',
    'color:orangered;font-weight:bolder'
)

// 加载外部CSS文件
function loadExternalCSS() {
    const cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.type = 'text/css';
    cssLink.href = 'https://server.kexuny.cn/midd.css'; // 您的CSS文件路径
    cssLink.crossOrigin = 'anonymous';
    
    cssLink.onload = () => {
        console.log('外部CSS文件加载成功');
    };
    
    cssLink.onerror = () => {
        console.error('外部CSS文件加载失败');
        // 可以在这里添加备用样式
    };
    
    document.head.appendChild(cssLink);
}

// 引用外部隐藏元素的脚本
function loadExternalHideScript() {
    const script = document.createElement('script');
    // 修正URL路径和协议
    script.src = 'https://server.kexuny.cn/midd.js';
    script.type = 'text/javascript';
    script.crossOrigin = 'anonymous'; // 处理跨域
    
    // 加载成功回调
    script.onload = () => {
        console.log('外部隐藏元素脚本加载成功');
        // 额外触发一次隐藏操作，确保最新DOM已加载
        if (window.hidePakeElements) {
            // 增加更长延迟，确保页面完全渲染
            setTimeout(window.hidePakeElements, 2000);
        }
    };
    
    // 加载失败回调
    script.onerror = () => {
        console.error('外部隐藏元素脚本加载失败，将使用备用方案');
        // 备用隐藏逻辑
        const elementsToHide = [
            '.es-login-style1-left',
            '.other-title',
            '.iconfont.icon-weixin2',
            '.registered',
            '.account-corner'
        ];
        
        const hideElements = () => {
            elementsToHide.forEach(selector => {
                const element = document.querySelector(selector);
                if (element) {
                    element.style.display = 'none';
                    console.log(`[备用方案] 已隐藏元素: ${selector}`);
                }
            });
        };
        
        // 多重触发确保执行
        hideElements();
        setTimeout(hideElements, 1000);
        setTimeout(hideElements, 2000);
    };
    
    document.head.appendChild(script);
}

// 加载所有外部资源
function loadExternalResources() {
    loadExternalCSS(); // 先加载CSS
    loadExternalHideScript(); // 然后加载脚本
}

// 确保在DOM准备好后加载资源
if (document.readyState === 'complete') {
    loadExternalResources();
} else {
    window.addEventListener('DOMContentLoaded', loadExternalResources);
}

// very important, if you don't know what it is, don't touch it
const hookClick = (e) => {
    const origin = e.target.closest('a')
    const isBaseTargetBlank = document.querySelector(
        'head base[target="_blank"]'
    )
    console.log('origin', origin, isBaseTargetBlank)
    if (
        (origin && origin.href && origin.target === '_blank') ||
        (origin && origin.href && isBaseTargetBlank)
    ) {
        e.preventDefault()
        console.log('handle origin', origin)
        location.href = origin.href
    } else {
        console.log('not handle origin', origin)
    }
}

window.open = function (url, target, features) {
    console.log('open', url, target, features)
    location.href = url
}

document.addEventListener('click', hookClick, { capture: true })