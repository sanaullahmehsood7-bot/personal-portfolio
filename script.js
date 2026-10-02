// ============================================
// CONTACT FORM - EmailJS + WhatsApp Integration
// ============================================
// Form submit karte hi message Email aur WhatsApp dono par bhej diya jayega
// Koi confirmation nahi — seedha send!

// ===== EmailJS Credentials =====

// EmailJS Public Key (Account > General se milegi)
const EMAILJS_PUBLIC_KEY = 'b2U2zWG_R7GdC01BT'; // ← APNI PUBLIC KEY YAHAN LIKHO

// EmailJS Service ID (Email Services se milegi)
const EMAILJS_SERVICE_ID = 'service_y2axe37'; // ← APNA SERVICE ID YAHAN LIKHO

// EmailJS Template ID (Email Templates se milegi)
const EMAILJS_TEMPLATE_ID = 'template_mi0wsup'; // ← APNA TEMPLATE ID YAHAN LIKHO

// Apna WhatsApp Number (country code ke saath, + ke baghair)
const MY_WHATSAPP = '923497257197'; // ← APNA WHATSAPP NUMBER YAHAN LIKHO

// ===== EmailJS Initialize Karna =====
(function() {
    emailjs.init(EMAILJS_PUBLIC_KEY);
})();

// ===== Form Submit Handler =====
document.getElementById('contactForm').addEventListener('submit', function(e) {

    // Page refresh rokna
    e.preventDefault();

    // ===== Form Se Values Lena =====

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const budget = document.getElementById('budget').value;
    const message = document.getElementById('message').value;

    // ===== Validation =====

    if (!name || !email || !subject || !budget || !message) {
        alert('⚠️ Please fill in all fields before submitting!');
        return;
    }

    // ===== Button Loading State =====

    const submitBtn = document.querySelector('#contactForm button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // ===== EmailJS Se Email Bhejna =====

    const templateParams = {
        name: name,
        email: email,
        subject: subject,
        budget: budget,
        message: message
    };

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
        .then(function(response) {
            // ===== Email Successfully Bhej Di Gayi =====

            console.log('Email sent successfully!', response.status, response.text);

            // ===== WhatsApp Par Bhi Bhejna (Bina Poochay) =====

            const whatsappMessage = `*New Portfolio Contact*%0A%0A` +
                `*Name:* ${name}%0A` +
                `*Email:* ${email}%0A` +
                `*Subject:* ${subject}%0A` +
                `*Budget:* ${budget}%0A%0A` +
                `*Message:*%0A${message}`;

            // WhatsApp kholo (1 second delay taake email pehle jaye)
            setTimeout(function() {
                window.open(`https://wa.me/${MY_WHATSAPP}?text=${whatsappMessage}`, '_blank');
            }, 1000);

            // Success message
            alert('✅ Message Email aur WhatsApp par bhej diya gaya!');

            // Form clear karo
            document.getElementById('contactForm').reset();

        })
        .catch(function(error) {
            // ===== Email Bhejne Mein Error Aayi =====

            console.error('Email failed to send:', error);

            // Error message dikhao
            alert(
                '❌ Email bhejne mein problem hui.\n\n' +
                'Error: ' + error.text + '\n\n' +
                'Kya aap WhatsApp par try karna chahte hain?'
            );

            // WhatsApp fallback - email fail hua toh WhatsApp par bhej do
            const whatsappMessage = `*New Portfolio Contact*%0A%0A` +
                `*Name:* ${name}%0A` +
                `*Email:* ${email}%0A` +
                `*Subject:* ${subject}%0A` +
                `*Budget:* ${budget}%0A%0A` +
                `*Message:*%0A${message}`;

            window.open(`https://wa.me/${MY_WHATSAPP}?text=${whatsappMessage}`, '_blank');
        })
        .finally(function() {
            // ===== Button ko wapas normal state mein lana =====

            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        });
});
