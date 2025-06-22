/**
 * Post Detail Page JavaScript
 * Xử lý các tính năng cho trang chi tiết bài viết
 */

class PostDetailManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupLazyContent();
    this.setupLazyLoading();
    this.setupSocialShare();
    this.setupScrollToTop();
  }

  /**
   * Thiết lập lazy loading cho toàn bộ khu vực content
   */
  setupLazyContent() {
    const lazyContent = document.getElementById('lazy-content');
    if (!lazyContent) return;

    // Kiểm tra hỗ trợ Intersection Observer
    if (!('IntersectionObserver' in window)) {
      // Fallback: hiển thị ngay lập tức
      lazyContent.style.opacity = '1';
      return;
    }

    // Ẩn content ban đầu
    lazyContent.style.opacity = '0';
    lazyContent.style.transition = 'opacity 0.5s ease-in-out';

    const contentObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Hiển thị content với animation
          entry.target.style.opacity = '1';
          contentObserver.unobserve(entry.target);
          
          // Khởi tạo các tính năng khác sau khi content hiển thị
          this.initContentFeatures();
        }
      });
    }, {
      root: null,
      rootMargin: '100px',
      threshold: 0.1
    });

    contentObserver.observe(lazyContent);
  }

  /**
   * Khởi tạo các tính năng sau khi content được load
   */
  initContentFeatures() {
    this.setupReadingProgress();
    this.setupTableOfContents();
  }

  /**
   * Thiết lập lazy loading cho hình ảnh (cải tiến)
   */
  setupLazyLoading() {
    // Kiểm tra hỗ trợ Intersection Observer
    if (!('IntersectionObserver' in window)) {
      this.loadAllImages();
      return;
    }

    const lazyImages = document.querySelectorAll('.lazy-image');
    if (lazyImages.length === 0) return;

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target instanceof HTMLImageElement) {
          this.loadImage(entry.target);
          imageObserver.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '50px',
      threshold: 0.1
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  }

  /**
   * Load một hình ảnh cụ thể với error handling
   */
  loadImage(img) {
    const dataSrc = img.getAttribute('data-src');
    if (!dataSrc) return;

    // Tạo placeholder loading
    img.style.filter = 'blur(5px)';
    img.style.transition = 'filter 0.3s ease';

    // Tạo image object để preload
    const imageLoader = new Image();
    
    imageLoader.onload = () => {
      img.src = dataSrc;
      img.style.filter = 'none';
      img.classList.remove('lazy-image');
      img.classList.add('loaded');
    };
    
    imageLoader.onerror = () => {
      img.style.filter = 'none';
      img.classList.add('error');
      img.alt = 'Không thể tải hình ảnh';
      // Có thể thêm placeholder image
      img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkzhu5dpIHRh4bqjaSBo4buNbmggYeG6o25oPC90ZXh0Pjwvc3ZnPg==';
    };
    
    imageLoader.src = dataSrc;
  }

  /**
   * Fallback: Load tất cả hình ảnh cho trình duyệt cũ
   */
  loadAllImages() {
    const lazyImages = document.querySelectorAll('.lazy-image');
    lazyImages.forEach(img => {
      const dataSrc = img.getAttribute('data-src');
      if (dataSrc) {
        img.src = dataSrc;
        img.classList.remove('lazy-image');
        img.classList.add('loaded');
      }
    });
  }

  /**
   * Thiết lập thanh tiến trình đọc bài
   */
  setupReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: linear-gradient(90deg, #3b82f6, #10b981);
      z-index: 9999;
      transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    const updateProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      progressBar.style.width = Math.min(scrollPercent, 100) + '%';
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
  }

  /**
   * Thiết lập nút scroll to top
   */
  setupScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: #3b82f6;
      color: white;
      border: none;
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      z-index: 1000;
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
    `;

    document.body.appendChild(scrollBtn);

    // Hiển thị/ẩn nút dựa trên scroll position
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        scrollBtn.style.opacity = '1';
        scrollBtn.style.visibility = 'visible';
      } else {
        scrollBtn.style.opacity = '0';
        scrollBtn.style.visibility = 'hidden';
      }
    }, { passive: true });

    // Xử lý click scroll to top
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /**
   * Thiết lập chức năng chia sẻ mạng xã hội (cải tiến)
   */
  setupSocialShare() {
    // Copy link functionality
    const copyButton = document.querySelector('.copy-link');
    if (copyButton) {
      copyButton.addEventListener('click', this.copyToClipboard.bind(this));
    }

    // Theo dõi click vào các nút share với analytics
    const shareButtons = document.querySelectorAll('.share-btn[href]');
    shareButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const platform = button.classList.contains('facebook') ? 'facebook' : 
                        button.classList.contains('twitter') ? 'twitter' : 'linkedin';
        
        // Track sharing event (có thể tích hợp Google Analytics)
        this.trackShareEvent(platform);
        
        // Mở popup
        const url = button.href;
        const width = 600;
        const height = 400;
        const left = (screen.width - width) / 2;
        const top = (screen.height - height) / 2;
        
        window.open(url, 'share', `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`);
      });
    });
  }

  /**
   * Track sharing events
   */
  trackShareEvent(platform) {
    // Có thể tích hợp với Google Analytics hoặc tracking service khác
    if (typeof gtag !== 'undefined') {
      gtag('event', 'share', {
        method: platform,
        content_type: 'article',
        content_id: window.location.pathname
      });
    }
  }

  /**
   * Copy link bài viết vào clipboard (cải tiến)
   */
  async copyToClipboard() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      this.showNotification('Đã copy link bài viết!', 'success');
      
      // Track copy event
      this.trackShareEvent('copy_link');
    } catch (err) {
      this.fallbackCopyToClipboard(window.location.href);
    }
  }

  /**
   * Fallback copy to clipboard
   */
  fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      this.showNotification('Đã copy link bài viết!', 'success');
    } catch (err) {
      this.showNotification('Không thể copy link. Vui lòng copy thủ công.', 'error');
    }
    
    document.body.removeChild(textArea);
  }

  /**
   * Hiển thị thông báo
   */
  showNotification(message, type = 'info') {
    // Tạo element thông báo
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style cho thông báo
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '12px 20px',
      borderRadius: '8px',
      color: 'white',
      fontWeight: '500',
      zIndex: '9999',
      transform: 'translateX(100%)',
      transition: 'transform 0.3s ease',
      backgroundColor: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'
    });

    document.body.appendChild(notification);

    // Animation hiển thị
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    // Tự động ẩn sau 3 giây
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }
}

// Khởi tạo khi DOM ready
document.addEventListener('DOMContentLoaded', () => {
  new PostDetailManager();
});

// Export cho global scope
window.PostDetailManager = PostDetailManager;