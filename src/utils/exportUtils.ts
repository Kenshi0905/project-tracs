export interface ExportData {
  headers: string[];
  data: (string | number)[][];
  filename: string;
}

// CSV Export
export function exportToCSV(exportData: ExportData): void {
  const csvContent = [
    exportData.headers.join(','),
    ...exportData.data.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${exportData.filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// XML Export
export function exportToXML(exportData: ExportData): void {
  let xmlContent = '<?xml version="1.0" encoding="UTF-8"?>\n<report>\n';
  
  exportData.data.forEach((row, index) => {
    xmlContent += '  <record>\n';
    exportData.headers.forEach((header, headerIndex) => {
      const sanitizedHeader = header.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
      xmlContent += `    <${sanitizedHeader}>${row[headerIndex]}</${sanitizedHeader}>\n`;
    });
    xmlContent += '  </record>\n';
  });
  
  xmlContent += '</report>';

  const blob = new Blob([xmlContent], { type: 'text/xml;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${exportData.filename}.xml`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Screenshot Export (JPEG)
export function exportScreenshot(elementId: string, filename: string): void {
  import('html2canvas').then(html2canvas => {
    const element = document.getElementById(elementId);
    if (!element) return;

    html2canvas.default(element, {
      backgroundColor: '#ffffff',
      scale: 2,
      logging: false,
      useCORS: true
    }).then(canvas => {
      const link = document.createElement('a');
      link.download = `${filename}.jpg`;
      link.href = canvas.toDataURL('image/jpeg', 0.9);
      link.click();
    });
  }).catch(() => {
    console.error('html2canvas not available for screenshot export');
  });
}

// Video Export placeholder (AVI) - Would require actual video recording implementation
export function exportVideo(filename: string): void {
  // This would require implementing screen recording functionality
  // For now, we'll show a notification that this feature is coming soon
  alert('Video export (AVI) functionality coming soon. This would require screen recording implementation.');
}