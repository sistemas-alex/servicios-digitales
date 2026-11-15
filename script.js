document.addEventListener("DOMContentLoaded", () => {
  // 1. Año dinámico en el footer
  const currentYearEl = document.getElementById("currentYear");
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  // 2. Menú hamburguesa responsivo
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav__link, .nav__btn");

  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });

  // Cerrar menú al hacer clic en cualquier enlace (en móviles)
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
    });
  });

  // 3. Filtrado interactivo de tarjetas de servicios
  const filterButtons = document.querySelectorAll(".filter-btn");
  const serviceCards = document.querySelectorAll(".service-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Actualizar estado activo del botón
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const selectedCategory = button.getAttribute("data-filter");

      serviceCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");
        if (selectedCategory === "todos" || selectedCategory === cardCategory) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });

  // 4. Validación del formulario y envío directo a WhatsApp
  const quoteForm = document.getElementById("quoteForm");
  const clientNameInput = document.getElementById("clientName");
  const serviceTypeInput = document.getElementById("serviceType");
  const projectDetailsInput = document.getElementById("projectDetails");

  const nameError = document.getElementById("nameError");
  const serviceError = document.getElementById("serviceError");
  const detailsError = document.getElementById("detailsError");

  // Número de WhatsApp de destino (formato internacional sin '+' ni espacios)
  const WHATSAPP_NUMBER = "573105247136";

  function validateField(input, errorEl, message) {
    if (!input.value.trim()) {
      input.classList.add("invalid");
      errorEl.textContent = message;
      return false;
    } else {
      input.classList.remove("invalid");
      errorEl.textContent = "";
      return true;
    }
  }

  // Validación en tiempo real al escribir o cambiar
  clientNameInput.addEventListener("input", () =>
    validateField(clientNameInput, nameError, "Por favor ingresa tu nombre o empresa.")
  );
  serviceTypeInput.addEventListener("change", () =>
    validateField(serviceTypeInput, serviceError, "Selecciona un tipo de servicio.")
  );
  projectDetailsInput.addEventListener("input", () =>
    validateField(projectDetailsInput, detailsError, "Describe brevemente lo que necesitas.")
  );

  quoteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const isNameValid = validateField(
      clientNameInput,
      nameError,
      "Por favor ingresa tu nombre o empresa."
    );
    const isServiceValid = validateField(
      serviceTypeInput,
      serviceError,
      "Selecciona un tipo de servicio."
    );
    const isDetailsValid = validateField(
      projectDetailsInput,
      detailsError,
      "Describe brevemente lo que necesitas."
    );

    if (!isNameValid || !isServiceValid || !isDetailsValid) {
      return;
    }

    // Construir mensaje estructurado para WhatsApp
    const name = clientNameInput.value.trim();
    const service = serviceTypeInput.value;
    const details = projectDetailsInput.value.trim();

    const message =
      `Hola Alexander, te contacto desde tu página web.\n\n` +
      `*Nombre / Empresa:* ${name}\n` +
      `*Servicio de interés:* ${service}\n` +
      `*Detalles del proyecto:* ${details}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Abrir WhatsApp en una nueva pestaña y limpiar el formulario
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    quoteForm.reset();
  });
});
