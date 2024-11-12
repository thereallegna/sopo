import React from 'react';
import { Button } from '@components/ui/Button';
import { IconPrinter } from '@tabler/icons-react';
import IconComponent from '@components/ui/Icon';
import JsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface PrintButtonProps {
  data: any[];
  columns: any[];
}

const PrintButton: React.FC<PrintButtonProps> = ({ data, columns }) => {
  const generatePdf = () => {
    if (data.length === 0) {
      alert('No data available to print!');
      return;
    }

    const doc = new JsPDF();
    const padding = 10;
    const titleY = 30;

    const imageUrl = '/images/logo-r1.png';
    const imgWidth = 30;
    const imgHeight = 30;
    const imgX = padding;
    const imgY = titleY - 10;

    doc.addImage(imageUrl, 'PNG', imgX, imgY, imgWidth, imgHeight);
    doc.setFontSize(16);
    doc.text('RUN System', imgX + imgWidth + 10, titleY - 3);
    doc.setFontSize(10);

    const addressText =
      'Jl. Wahid Hasyim No. 06, Condongcatur, Depok, Sleman, Yogyakarta, Daerah Istimewa Yogyakarta 55283.';
    const wrappedAddressText = doc.splitTextToSize(addressText, 100);

    doc.text(wrappedAddressText, imgX + imgWidth + 10, titleY + 5);

    const dateText = `Date: ${new Date().toLocaleDateString()}`;
    const pageWidth = doc.internal.pageSize.width;
    const dateX = pageWidth - padding - doc.getTextWidth(dateText);
    doc.text(dateText, dateX, titleY + 10 + wrappedAddressText.length * 5);

    const headers = [...columns.map((col) => col.header || col.accessorKey)];
    const tableData = data.map((item) => [
      ...columns.map((col) => item[col.accessorKey]),
    ]);

    autoTable(doc, {
      head: [headers],
      body: tableData,
      startY: titleY + 30,
      margin: { top: 0, left: padding, right: padding, bottom: padding },
    });

    const pdfBlob = doc.output('blob');
    const url = URL.createObjectURL(pdfBlob);
    window.open(url);
  };

  return (
    <Button
      variant="outlined"
      title="Print"
      onClick={generatePdf}
      className="w-[80px]"
    >
      <IconComponent
        icon={IconPrinter}
        size="large"
        color="quaternary"
        className="mr-2"
      />
      Print
    </Button>
  );
};

export default PrintButton;
