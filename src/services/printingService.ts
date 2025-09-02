import { Order } from "../types";
import { ESCPOSFormatter } from "../utils/escposUtils";

export const generateThankYouMessage = (): string => {
  const messages = [
    "Merci pour votre visite! Nous esperons vous revoir tres bientot chez Le 1er Boulevard.",
    "Votre sourire est notre plus belle recompense. A tres vite chez Le 1er Boulevard!",
    "Le 1er Boulevard vous remercie de votre confiance. Au plaisir de vous servir a nouveau!",
    "Un cafe chez Le 1er Boulevard, c'est un moment de bonheur a partager. Revenez vite!",
    "Merci d'avoir choisi Le 1er Boulevard. Nous vous attendons pour votre prochaine pause cafe!"
  ];
  
  return messages[Math.floor(Math.random() * messages.length)];
};

export const printThermalInvoice = (order: Order): void => {
  try {
    console.log('[THERMAL INVOICE] Starting print for order:', order.id);
    
    // Generate invoice content with proper initialization
    let invoice = ESCPOSFormatter.init();
    invoice += ESCPOSFormatter.alignCenter();
    
    // Header
    invoice += ESCPOSFormatter.textLarge();
    invoice += ESCPOSFormatter.textBold();
    invoice += "Le 1er Boulevard";
    invoice += ESCPOSFormatter.textNormal();
    invoice += ESCPOSFormatter.textBoldOff();
    invoice += ESCPOSFormatter.newLine();
    invoice += "19 , Immeuble Jakar";
    invoice += ESCPOSFormatter.newLine();
    invoice += "Boulevard Mohammed V 40000, Marrakech";
    invoice += ESCPOSFormatter.newLine();
    invoice += "Tel: 01 23 45 67 89";
    invoice += ESCPOSFormatter.multipleLines(2);
    
    // Invoice title
    invoice += ESCPOSFormatter.textDoubleHeight();
    invoice += ESCPOSFormatter.textBold();
    invoice += "FACTURE";
    invoice += ESCPOSFormatter.textNormal();
    invoice += ESCPOSFormatter.textBoldOff();
    invoice += ESCPOSFormatter.newLine();
    
    // Invoice number (shortened)
    invoice += `N° ${order.id.substring(0, 8)}`;
    invoice += ESCPOSFormatter.multipleLines(2);
    
    // Date and agent info
    invoice += `Date: ${new Date(order.date).toLocaleDateString('fr-FR')}`;
    invoice += ESCPOSFormatter.newLine();
    invoice += `Agent: ${order.agentName}`;
    invoice += ESCPOSFormatter.multipleLines(2);
    
    // Separator
    invoice += ESCPOSFormatter.horizontalLine('=', 32);
    invoice += ESCPOSFormatter.newLine();
    invoice += ESCPOSFormatter.textBold();
    invoice += "ARTICLES";
    invoice += ESCPOSFormatter.textBoldOff();
    invoice += ESCPOSFormatter.newLine();
    invoice += ESCPOSFormatter.horizontalLine('=', 32);
    invoice += ESCPOSFormatter.newLine();
    
    // Items
    order.items.forEach((item, index) => {
      invoice += `${index + 1}. ${item.drinkName}`;
      invoice += ESCPOSFormatter.newLine();
      invoice += `${item.quantity} x ${ESCPOSFormatter.formatCurrency(item.unitPrice)}`;
      invoice += ESCPOSFormatter.newLine();
      invoice += `= ${ESCPOSFormatter.formatCurrency(item.quantity * item.unitPrice)}`;
      invoice += ESCPOSFormatter.newLine();
      invoice += ESCPOSFormatter.horizontalLine('-', 32);
      invoice += ESCPOSFormatter.newLine();
    });
    
    // Total
    invoice += ESCPOSFormatter.textDoubleHeight();
    invoice += ESCPOSFormatter.textBold();
    invoice += `TOTAL: ${ESCPOSFormatter.formatCurrency(order.total)}`;
    invoice += ESCPOSFormatter.textNormal();
    invoice += ESCPOSFormatter.textBoldOff();
    invoice += ESCPOSFormatter.multipleLines(2);
    
    // Barcode
    invoice += ESCPOSFormatter.generateBarcode(order.id);
    invoice += ESCPOSFormatter.multipleLines(2);
    
    // Footer
    invoice += "Merci de votre confiance !";
    invoice += ESCPOSFormatter.multipleLines(2);
    invoice += "À bientôt chez Le 1er Boulevard !";
    invoice += ESCPOSFormatter.multipleLines(4);
    
    // Cut paper
    invoice += ESCPOSFormatter.cutPaper();
    
    // Print using simplified method
    console.log('[THERMAL INVOICE] Sending to printer, content length:', invoice.length);
    ESCPOSFormatter.print(invoice);
    console.log('[THERMAL INVOICE] Print command sent successfully');
    
  } catch (error) {
    console.error('[THERMAL INVOICE] Error printing:', error);
    alert('Erreur d\'impression de la facture. Vérifiez la connexion de l\'imprimante.');
  }
};

export const printReport = (
  filteredData: any[], 
  periodType: string, 
  startDate: string, 
  endDate: string, 
  totalRevenue: number
): void => {
  try {
    console.log('[REVENUE REPORT] Starting print for period:', periodType, 'from', startDate, 'to', endDate);
    
    const formatDate = (dateStr: string) => {
      const date = new Date(dateStr);
      return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    const getPeriodLabel = () => {
      switch (periodType) {
        case 'day':
          return `Jour: ${formatDate(startDate)}`;
        case 'month':
          return `Mois: ${new Date(startDate).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}`;
        case 'year':
          return `Année: ${new Date(startDate).getFullYear()}`;
        case 'custom':
          return `Période: ${formatDate(startDate)} - ${formatDate(endDate)}`;
        default:
          return 'Période inconnue';
      }
    };

    // Generate report content with proper initialization
    let report = ESCPOSFormatter.init();
    report += ESCPOSFormatter.alignCenter();
    
    // Header
    report += ESCPOSFormatter.textLarge();
    report += ESCPOSFormatter.textBold();
    report += "Le 1er Boulevard";
    report += ESCPOSFormatter.textNormal();
    report += ESCPOSFormatter.textBoldOff();
    report += ESCPOSFormatter.newLine();
    report += "19 , Immeuble Jakar, Boulevard Mohammed V 40000, Marrakech";
    report += ESCPOSFormatter.multipleLines(2);
    
    // Report title
    report += ESCPOSFormatter.textDoubleHeight();
    report += ESCPOSFormatter.textBold();
    report += "RAPPORT DETAILLE";
    report += ESCPOSFormatter.newLine();
    report += "DES REVENUS";
    report += ESCPOSFormatter.textNormal();
    report += ESCPOSFormatter.textBoldOff();
    report += ESCPOSFormatter.multipleLines(2);
    
    // Generation date
    report += `Généré le: ${new Date().toLocaleDateString('fr-FR')}`;
    report += ESCPOSFormatter.newLine();
    report += `à ${new Date().toLocaleTimeString('fr-FR')}`;
    report += ESCPOSFormatter.multipleLines(2);
    
    // Period and summary
    report += ESCPOSFormatter.horizontalLine('=', 32);
    report += ESCPOSFormatter.newLine();
    report += ESCPOSFormatter.textBold();
    report += "RÉSUMÉ GÉNÉRAL";
    report += ESCPOSFormatter.textBoldOff();
    report += ESCPOSFormatter.newLine();
    report += ESCPOSFormatter.horizontalLine('=', 32);
    report += ESCPOSFormatter.newLine();
    
    report += `${getPeriodLabel()}`;
    report += ESCPOSFormatter.newLine();
    report += `Total des revenus:`;
    report += ESCPOSFormatter.newLine();
    report += ESCPOSFormatter.textDoubleHeight();
    report += ESCPOSFormatter.textBold();
    report += `${ESCPOSFormatter.formatCurrency(totalRevenue)}`;
    report += ESCPOSFormatter.textNormal();
    report += ESCPOSFormatter.textBoldOff();
    report += ESCPOSFormatter.multipleLines(3);
    
    // Footer
    report += "Rapport généré automatiquement";
    report += ESCPOSFormatter.newLine();
    report += "par le système de gestion";
    report += ESCPOSFormatter.multipleLines(4);
    
    // Cut paper
    report += ESCPOSFormatter.cutPaper();
    
    // Print using simplified method
    console.log('[REVENUE REPORT] Sending to printer, content length:', report.length);
    ESCPOSFormatter.print(report);
    console.log('[REVENUE REPORT] Print command sent successfully');
    
  } catch (error) {
    console.error('[REVENUE REPORT] Error printing:', error);
    alert('Erreur d\'impression du rapport. Vérifiez la connexion de l\'imprimante.');
  }
};

export const printTicket = (order: Order): void => {
  try {
    console.log('[TICKET] Starting print for order:', order.id);
    
    const thankYouMessage = generateThankYouMessage();
    
    // Generate single ticket content with proper initialization
    let ticket = ESCPOSFormatter.init();
    ticket += ESCPOSFormatter.alignCenter();
    
    // Header
    ticket += ESCPOSFormatter.textLarge();
    ticket += ESCPOSFormatter.textBold();
    ticket += "LE 1ER BOULEVARD";
    ticket += ESCPOSFormatter.textNormal();
    ticket += ESCPOSFormatter.textBoldOff();
    ticket += ESCPOSFormatter.newLine();
    ticket += "19 , Immeuble Jakar, Boulevard Mohammed V 40000, Marrakech";
    ticket += ESCPOSFormatter.newLine();
    
    // Table number if present
    {
      const tn: any = (order as any).tableNumber;
      if (tn !== undefined && tn !== null) {
        ticket += `TABLE ${tn}`;
        ticket += ESCPOSFormatter.multipleLines(1);
      }
    }
    
    // Date and server info
    ticket += "Date: " + ESCPOSFormatter.formatDate(order.date);
    ticket += ESCPOSFormatter.newLine();
    ticket += "Serveur: " + order.agentName;
    ticket += ESCPOSFormatter.multipleLines(1);
    
    // Separator line
    ticket += ESCPOSFormatter.horizontalLine('=', 32);
    ticket += ESCPOSFormatter.newLine();
    ticket += ESCPOSFormatter.textBold();
    ticket += "TICKET CLIENT";
    ticket += ESCPOSFormatter.textBoldOff();
    ticket += ESCPOSFormatter.newLine();
    ticket += ESCPOSFormatter.horizontalLine('=', 32);
    ticket += ESCPOSFormatter.newLine();
    
    // Items
    order.items.forEach((item, index) => {
      ticket += `${index + 1}. ${item.drinkName}`;
      ticket += ESCPOSFormatter.newLine();
      ticket += `${item.quantity} x ${ESCPOSFormatter.formatCurrency(item.unitPrice)} = ${ESCPOSFormatter.formatCurrency(item.unitPrice * item.quantity)}`;
      ticket += ESCPOSFormatter.newLine();
      ticket += ESCPOSFormatter.horizontalLine('-', 32);
      ticket += ESCPOSFormatter.newLine();
    });
    
    // Total
    ticket += ESCPOSFormatter.textDoubleHeight();
    ticket += ESCPOSFormatter.textBold();
    ticket += "TOTAL: " + ESCPOSFormatter.formatCurrency(order.total);
    ticket += ESCPOSFormatter.textNormal();
    ticket += ESCPOSFormatter.textBoldOff();
    ticket += ESCPOSFormatter.multipleLines(2);
    
    // Barcode
    ticket += ESCPOSFormatter.generateBarcode(order.id);
    ticket += ESCPOSFormatter.newLine();
    
    // Thank you message
    ticket += "Merci de votre visite !";
    ticket += ESCPOSFormatter.multipleLines(4);
    
    // Cut paper
    ticket += ESCPOSFormatter.cutPaper();
    
    // Print using simplified method
    console.log('[TICKET] Sending to printer, content length:', ticket.length);
    ESCPOSFormatter.print(ticket);
    console.log('[TICKET] Print command sent successfully');
    
  } catch (error) {
    console.error('[TICKET] Error printing:', error);
    alert('Erreur d\'impression du ticket. Vérifiez la connexion de l\'imprimante.');
  }
};
