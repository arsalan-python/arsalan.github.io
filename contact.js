/* ==========================================================================
   ARSALAN.GITHUB — CONTACT ENGINE & ENQUIRY DISPATCHER
   Functional WhatsApp Dispatcher + Direct Mailto Integration + Modal Toast
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('project-enquiry-form');
  const modal = document.getElementById('enquiry-confirmation-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalSummary = document.getElementById('modal-summary-content');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('enquiry-name').value.trim();
    const email = document.getElementById('enquiry-email').value.trim();
    const service = document.getElementById('enquiry-service').value;
    const description = document.getElementById('enquiry-description').value.trim();
    const budget = document.getElementById('enquiry-budget').value.trim();

    if (!name || !email || !description) {
      alert('Please fill in your name, email, and project description.');
      return;
    }

    // Compose prefilled WhatsApp message
    const waText = 
`*New Project Enquiry — Arsalan.Github*
---------------------------------------
*Client Name:* ${name}
*Email:* ${email}
*Required Service:* ${service}
*Estimated Budget:* ${budget ? budget : 'Flexible / To be discussed'}
*Project Details:*
${description}
---------------------------------------
Sent via Arsalan.Github Website`;

    const encodedWaText = encodeURIComponent(waText);
    const waUrl = `https://wa.me/919135944050?text=${encodedWaText}`;

    // Compose mailto fallback
    const mailSubject = encodeURIComponent(`Project Enquiry: ${service} — ${name}`);
    const mailBody = encodeURIComponent(
      `Hello Arsalan,\n\nI would like to enquire about building a website.\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Service: ${service}\n` +
      `Budget: ${budget || 'Flexible'}\n\n` +
      `Project Description:\n${description}\n\n` +
      `Looking forward to hearing from you.`
    );
    const mailtoUrl = `mailto:arsalan.github@gmail.com?subject=${mailSubject}&body=${mailBody}`;

    // Populate Modal Summary
    if (modalSummary) {
      modalSummary.innerHTML = `
        <div style="text-align: left; background: rgba(255,255,255,0.04); padding: 1.25rem; border-radius: 12px; font-size: 0.88rem; margin: 1.5rem 0; line-height: 1.6; border: 1px solid rgba(255,255,255,0.08);">
          <p><strong>Client:</strong> ${name} (${email})</p>
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Budget:</strong> ${budget || 'Flexible'}</p>
          <p style="margin-top: 0.5rem; color: #a1a1aa;"><strong>Scope:</strong> ${description}</p>
        </div>
        <p style="font-size: 0.9rem; color: #a1a1aa; margin-bottom: 1.5rem;">
          Your enquiry is formatted and ready. Choose how you want to connect instantly:
        </p>
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          <a href="${waUrl}" target="_blank" class="btn btn-whatsapp" style="width: 100%;">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.073.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z"/></svg>
            Send Directly via WhatsApp (+91 9135944050)
          </a>
          <a href="${mailtoUrl}" class="btn btn-glass" style="width: 100%;">
            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            Send via Official Email (arsalan.github@gmail.com)
          </a>
        </div>
      `;
    }

    if (modal) {
      modal.classList.add('active');
    }
  });

  if (modalCloseBtn && modal) {
    modalCloseBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }
});
