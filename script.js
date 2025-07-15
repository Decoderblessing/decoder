const textArray = [
    "Decoder Technology",
    "Where Design Meets Functionality",
    "We craft high-performance, mobile-friendly websites",
    "Enhance your online presence with modern, responsive design",
    "Attract more traffic and convert visitors into loyal customers"
  ];
  
  
  let index = 0;
  const sliderText = document.getElementById("slider-text");
  
  function showNextSlide() {
    index = (index + 1) % textArray.length;
    sliderText.style.opacity = 0;
  
    setTimeout(() => {
      sliderText.textContent = textArray[index];
      sliderText.style.opacity = 1;
    }, 500);
  }
  
  setInterval(showNextSlide, 5000);

  // Animate cards on load
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      const delay = card.getAttribute('data-delay') || 0;
      setTimeout(() => {
        card.style.opacity = 1;
        card.style.transform = 'translateY(0)';
      }, delay);
    });
  });
  // Animate service cards when in view
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
      observer.unobserve(entry.target); // Only animate once
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll('.service-card').forEach(card => {
  card.style.animationPlayState = 'paused';
  observer.observe(card);
});
document.querySelectorAll('.portfolio-card').forEach(card => {
  card.style.animationPlayState = 'paused';
  observer.observe(card);
});
//book me
document.getElementById("bookingForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const companyName = document.getElementById("companyName").value;
  const serviceProvided = document.getElementById("serviceProvided").value;
  const isCeo = document.getElementById("isCeo").value;
  const packageType = document.getElementById("packageType").value;
  const moreInfo = document.getElementById("moreInfo").value;

  const subject = `Booking Request from ${firstName} ${lastName}`;
  const body = `
First Name: ${firstName}
Last Name: ${lastName}
Company Name: ${companyName}
What they provide: ${serviceProvided}
Are they the CEO?: ${isCeo}
Selected Package: ${packageType}
More Info:
${moreInfo}
`;

  const mailtoLink = `mailto:blessingodionyefe2020@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoLink;
});
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("contactName").value;
  const tel = document.getElementById("contactTel").value;
  const business = document.getElementById("businessName").value;
  const reason = document.getElementById("contactReason").value;

  const subject = `Contact Request from ${name}`;
  const body = `
Name: ${name}
Telephone: ${tel}
Business Name: ${business}
Reason for Contact:
${reason}
  `;

  const mailtoLink = `mailto:blessingodionyefe2020@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoLink;
});
document.addEventListener("DOMContentLoaded", () => {
  const stars = document.querySelectorAll(".star");
  const submitButton = document.getElementById("submitReview");
  const reviewMessage = document.getElementById("reviewMessage");
  const reviewsList = document.getElementById("reviewsList");

  let selectedRating = 0;

  // Highlight stars on hover
  stars.forEach(star => {
      star.addEventListener("mouseover", () => {
          const value = parseInt(star.getAttribute("data-value"));
          stars.forEach(s => {
              s.style.color = s.getAttribute("data-value") <= value ? "#ffd700" : "#ccc";
          });
      });

      star.addEventListener("mouseout", () => {
          stars.forEach(s => {
              s.style.color = s.getAttribute("data-value") <= selectedRating ? "#ffd700" : "#ccc";
          });
      });

      star.addEventListener("click", () => {
          selectedRating = parseInt(star.getAttribute("data-value"));
          stars.forEach(s => {
              s.style.color = s.getAttribute("data-value") <= selectedRating ? "#ffd700" : "#ccc";
          });
      });
  });

  // Submit review
  submitButton.addEventListener("click", () => {
      if (selectedRating === 0 || reviewMessage.value.trim() === "") {
          alert("Please provide a rating and a message.");
          return;
      }

      const newReview = {
          rating: selectedRating,
          message: reviewMessage.value.trim(),
          date: new Date().toLocaleDateString()
      };

      // Save to localStorage
      const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
      reviews.push(newReview);
      localStorage.setItem("reviews", JSON.stringify(reviews));

      // Clear form
      selectedRating = 0;
      reviewMessage.value = "";
      stars.forEach(star => {
          star.style.color = "#ccc";
      });

      // Reload reviews
      loadReviews();
  });

  // Load reviews from localStorage
  function loadReviews() {
      const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
      reviewsList.innerHTML = reviews.map(review => `
          <div class="review-card">
              <img src="https://www.google.com/s2/photos/public/AIbEiAIAAAAjGCi8tq6Fz5v7V5gkG3t8M6m2Xw9v1Xc0d4g=s96-c" alt="User">
              <div class="stars">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
              <p>${review.message}</p>
              <small>${review.date}</small>
          </div>
      `).join('');
  }

  // Initial load
  loadReviews();
});
// Initialize EmailJS
(function () {
  emailjs.init("YOUR_USER_ID"); // Replace with your EmailJS Public Key
})();

// Handle form submission
document.addEventListener("DOMContentLoaded", function () {
  const tutorForm = document.getElementById("tutorForm");

  tutorForm.addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", this)
      .then(function () {
        alert("Thank you for registering! We'll contact you soon.");
        tutorForm.reset();
      }, function (error) {
        alert("Oops! Something went wrong. Please try again.");
        console.error("EmailJS Error:", error);
      });
  });
});

  