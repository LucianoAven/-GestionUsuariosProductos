import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const exportToPDF = (data, title, columns) => {
  const doc = new jsPDF();
  doc.text(`Lista de ${title}`, 14, 10);

  const tableRows = data.map(item => columns.map(col => item[col]));

  autoTable(doc, {
    head: [columns],
    body: tableRows,
    startY: 20,
    styles: { fontSize: 10 },
  });

  doc.save(`${title}.pdf`);

  };
