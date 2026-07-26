/**
 * Peninsula Đà Nẵng - Landing Page Interactive Script
 * Form Submission & Conversion Pixel Support
 */

document.addEventListener('DOMContentLoaded', () => {
  // Sticky Navbar Scroll Effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile Navigation Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close menu when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // Handle Form Submission
  const leadForm = document.getElementById('projectLeadForm');
  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const fullName = document.getElementById('customerName').value.trim();
      const phone = document.getElementById('customerPhone').value.trim();
      const apartmentType = document.getElementById('apartmentType').value;
      const note = document.getElementById('customerNote') ? document.getElementById('customerNote').value.trim() : '';

      // Phone validation (Vietnamese phone number format)
      const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
      if (!phoneRegex.test(phone.replace(/\s+/g, ''))) {
        alert('Vui lòng nhập đúng định dạng số điện thoại Việt Nam (10 chữ số)!');
        document.getElementById('customerPhone').focus();
        return;
      }

      if (!fullName) {
        alert('Vui lòng nhập họ và tên của quý khách!');
        document.getElementById('customerName').focus();
        return;
      }

      // Store lead details in sessionStorage for Thank You page display
      const leadData = {
        name: fullName,
        phone: phone,
        type: apartmentType,
        note: note,
        submittedAt: new Date().toISOString()
      };
      sessionStorage.setItem('peninsula_lead_data', JSON.stringify(leadData));

      // Show submitting visual feedback on button
      const submitBtn = leadForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang gửi dữ liệu...';
      }

      // Build Thank You URL with parameters (useful for tracking & server query params)
      const queryParams = new URLSearchParams({
        name: encodeURIComponent(fullName),
        phone: encodeURIComponent(phone),
        type: encodeURIComponent(apartmentType)
      }).toString();

      // Redirect to Thank You page after 600ms
      setTimeout(() => {
        window.location.href = `thank-you.html?${queryParams}`;
      }, 600);
    });
  }
});
