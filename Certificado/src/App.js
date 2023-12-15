import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { renderToString } from 'react-dom/server';
import 'jspdf-autotable';
import './styles.css';

const CertificateContent = () => {
  return (
    <div className="certificate">
      <h1>CERTIFICADO</h1>
      <div className="info">
        <p>Certificamos que <strong>xxxxxxxxxxxxxxxxxxxxxx</strong> participou do curso de extensão universitária "Minha vida brasileira: português para migrantes e</p>
        <p>refugiados", promovido Universidade Católica de Pernambuco e pela Cáritas Nordeste 2, com carga horaria total de 120h.</p>
      </div>
      <div className="data">
        <p>Recife, 15 de agosto de 2021.</p>
      </div>
      <div className="assinaturas">
        <div className="assinaturaReitor"/>
        <div className="assinaturaExtensao"/>
      </div>
    </div>
  );
};

function CertificateStatus() {
  const certificateRef = useRef(null);

  const generatePDF = async () => {
    const doc = new jsPDF();

    // Use html2canvas para capturar o conteúdo visível na tela em modo paisagem
    const canvas = await html2canvas(document.body, { scale: 2, width: 1450, height: 1080 });

    // Obtenha a imagem da tela como base64
    const imgData = canvas.toDataURL('image/png');

    // Adicione a imagem ao PDF
    doc.addImage(imgData, 'PNG', 0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height);

    // Adicione o conteúdo do certificado ao PDF (opcional)
    const certificateHTML = renderToString(<CertificateContent />);
    addHTMLToPDF(doc, certificateHTML, 15, 15);

    // Salve o arquivo PDF
    doc.save('certificado.pdf');
  };

  // Método para adicionar HTML ao PDF
  const addHTMLToPDF = (pdf, html, x, y) => {
    pdf.html(html, { x, y });
  };

  return (
    <div className="container">
      <div className="headerUnicap"/>

      <CertificateContent ref={certificateRef} />

      <div className="footer">
        <p>Universidade Católica de Pernambuco – Unicap</p>
        <p>Rua do Príncipe, 526, Boa Vista – Recife – Pernambuco - CEP – 50050-900 – Fone: 81 2119-4242 – e-mail: extensão@unicap.br</p>
      </div>

      <button id="botao" onClick={generatePDF}>Gerar PDF</button>
    </div>
  );
}

export default CertificateStatus;
