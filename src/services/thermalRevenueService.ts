
import { ESCPOSFormatter } from '../utils/escposUtils';
import { getOrders } from './cafeService';

export const printThermalRevenueReport = (
  filteredData: any[], 
  periodType: string, 
  startDate: string, 
  endDate: string, 
  totalRevenue: number
): void => {
  try {
    console.log('[THERMAL REVENUE] Starting print for period:', periodType, 'from', startDate, 'to', endDate);
    
    // Simplified thermal revenue report
    let report = ESCPOSFormatter.init();
    report += ESCPOSFormatter.alignCenter();
    
    // Header
    report += ESCPOSFormatter.textLarge();
    report += ESCPOSFormatter.textBold();
    report += "LE 1ER BOULEVARD";
    report += ESCPOSFormatter.textNormal();
    report += ESCPOSFormatter.textBoldOff();
    report += ESCPOSFormatter.newLine();
    report += "RAPPORT REVENUS";
    report += ESCPOSFormatter.multipleLines(2);
    
    // Period info
    const getPeriodLabel = () => {
      switch (periodType) {
        case 'day': return `Jour: ${startDate}`;
        case 'month': return `Mois: ${new Date(startDate).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}`;
        case 'year': return `Année: ${new Date(startDate).getFullYear()}`;
        case 'custom': return `Période: ${startDate} - ${endDate}`;
        default: return 'Période inconnue';
      }
    };
    
    report += `${getPeriodLabel()}`;
    report += ESCPOSFormatter.newLine();
    report += `Commandes: ${filteredData.length}`;
    report += ESCPOSFormatter.newLine();
    report += ESCPOSFormatter.textDoubleHeight();
    report += ESCPOSFormatter.textBold();
    report += `TOTAL: ${ESCPOSFormatter.formatCurrency(totalRevenue)}`;
    report += ESCPOSFormatter.textNormal();
    report += ESCPOSFormatter.textBoldOff();
    report += ESCPOSFormatter.multipleLines(4);
    
    report += ESCPOSFormatter.cutPaper();
    
    console.log('[THERMAL REVENUE] Sending to printer, content length:', report.length);
    ESCPOSFormatter.print(report);
    console.log('[THERMAL REVENUE] Print command sent successfully');
    
  } catch (error) {
    console.error('[THERMAL REVENUE] Error printing:', error);
    alert('Erreur d\'impression du rapport de revenus. Vérifiez la connexion de l\'imprimante.');
  }
};
