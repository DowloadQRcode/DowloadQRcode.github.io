document.getElementById('qr-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const inputText = document.getElementById('input-text').value.trim();
    const qrType = document.getElementById('qr-type').value;
    const qrCodeContainer = document.getElementById('qr-code-container');
    const downloadButton = document.getElementById('download-btn');
    const viewButton = document.getElementById('view-btn');
    const errorMessage = document.getElementById('error-message');
    const qrActions = document.getElementById('qr-actions');

    // Limpiar errores y QR anterior
    errorMessage.style.display = 'none';
    qrCodeContainer.innerHTML = '';
    qrActions.style.display = 'none';

    // Validación de entrada
    if (!inputText) {
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Por favor, ingresa un valor válido.';
        return;
    }

    // Formatear entrada según el tipo de QR
    let data = inputText;
    if (qrType === 'email') data = `mailto:${inputText}`;
    else if (qrType === 'social') data = `https://www.${inputText}.com`;
    else if (qrType === 'image') data = `http://example.com/${inputText}.jpg`;

    // Generar código QR
    QRCode.toCanvas(data, { width: 250, height: 250, color: { dark: '#000000', light: '#ffffff' }}, function(error, canvas) {
        if (error) {
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'Hubo un error al generar el código QR.';
            return;
        }

        // Mostrar el QR generado
        qrCodeContainer.appendChild(canvas);

        // Mostrar botones de descarga y visualización
        downloadButton.href = canvas.toDataURL('image/png');
        viewButton.href = canvas.toDataURL('image/png');
        qrActions.style.display = 'block';
    });
});
