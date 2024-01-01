import React from 'react';
import './ButtonWithDocument.scss';
import { Button } from '../Button/Button';
import jsPDF from 'jspdf';
// import translate from 'google-translate-api';

// Загружаем шрифт
import Arial from '../../fonts/Arial/arialmt.ttf';

export function ButtonWithDocument(props) {
    async function generateDocument() {
        try {
            const userName = localStorage.getItem('userName');

            const pdf = new jsPDF();

            pdf.addFileToVFS('arial.ttf', Arial);
            pdf.addFont('arial.ttf', 'Arial', 'normal');

            pdf.setLineWidth(1);
            pdf.setDrawColor(0, 102, 204);
            pdf.rect(15, 15, 180, 80, 'S');

            pdf.setFont('Arial', 'normal');

            pdf.setFontSize(18);
            pdf.text('Sertificate', 80, 30);
            console.log(props.title);

            pdf.setFontSize(14);
            pdf.text(`The user ${userName} has successfully completed the course "${props.engTitle}"`, 20, 60);
            pdf.text('on the CatTrain website.', 20, 75);

            pdf.save('certificate.pdf');
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    }

    return (
        <div>
            <Button value="Скачать сертификат" onClick={() => generateDocument()} />
        </div>
    );
}
