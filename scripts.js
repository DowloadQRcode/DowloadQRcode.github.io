document.getElementById('qr-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const inputText = document.getElementById('input-text').value;
    const qrType = document.getElementById('qr-type').value;

    if (!inputText) {
        alert("Por favor, ingresa un dato válido.");
        return;
    }

    const qrCodeContainer = document.getElementById('qr-code-container');
    qrCodeContainer.innerHTML = ''; // Limpiar QR anterior

    // Generar el QR dependiendo del tipo seleccionado
    let data = inputText;
    if (qrType === 'email') {
        data = `mailto:${inputText}`;
    } else if (qrType === 'social') {
        data = `https://www.${inputText}.com`; // Simples redes sociales
    }

    QRCode.toCanvas(data, { width: 200, height: 200, color: { dark: '#000000', light: '#ffffff' }}, function(error, canvas) {
        if (error) {
            console.error(error);
            return;
        }

        // Añadir el canvas con el QR generado al contenedor
        qrCodeContainer.appendChild(canvas);

        // Hacer visible el botón de descarga
        const downloadButton = document.getElementById('download-btn');
        downloadButton.style.display = 'inline-block';

        // Funcionalidad de descarga
        downloadButton.href = canvas.toDataURL('image/png');
    });
});
