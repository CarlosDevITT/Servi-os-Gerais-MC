   // Função para abrir o modal
      function openModal(title, description) {
        document.getElementById("modalTitle").innerText = title;
        document.getElementById("modalDescription").innerText = description;
        document.getElementById("serviceModal").style.display = "flex";
      }

      // Função para fechar o modal
      function closeModal() {
        document.getElementById("serviceModal").style.display = "none";
      }

      // Função para redirecionar para o WhatsApp
      function redirectToWhatsApp() {
        const serviceTitle = document.getElementById("modalTitle").innerText;
        const serviceDescription = document.getElementById("modalDescription").innerText;
        const phoneNumber = "92985130951"; // Número de WhatsApp
        const message = `Olá, gostaria de solicitar o serviço: *${serviceTitle}*.\nDescrição: ${serviceDescription}`;
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.location.href = url;
      }


       // Função para fechar o modal de boas-vindas
       function closeWelcomeModal() {
        document.getElementById("welcomeModal").style.display = "none";
      }

      