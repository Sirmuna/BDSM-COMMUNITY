document.addEventListener('DOMContentLoaded', function () {
  const whatsappSendBtn = document.getElementById('whatsapp-send-btn');
  const whatsappProductInput = document.getElementById('whatsapp-product-input');
  const whatsappNumber = '+447497431388'; // WhatsApp number from shop.html header

  whatsappSendBtn.addEventListener('click', function () {
    const productName = whatsappProductInput.value.trim();
    if (!productName) {
      alert('Please enter a product name.');
      return;
    }
    const message = encodeURIComponent(`Hello, I am interested in the product: ${productName}`);
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  });
});
