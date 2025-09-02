import { TableOrder } from '../types';
import { ESCPOSFormatter } from '../utils/escposUtils';

export const printTableTicket = (order: TableOrder): void => {
  try {
    console.log('[TABLE TICKET] Starting print for order:', order.id, 'table:', order.tableNumber);
    
    // Create combined ticket content - simpler approach
    let ticketContent = ESCPOSFormatter.init();
    ticketContent += ESCPOSFormatter.alignCenter();
    
    // Header with proper darkness
    ticketContent += ESCPOSFormatter.textLarge();
    ticketContent += ESCPOSFormatter.textBold();
    ticketContent += "1ER BOULEVARD";
    ticketContent += ESCPOSFormatter.textNormal();
    ticketContent += ESCPOSFormatter.textBoldOff();
    ticketContent += ESCPOSFormatter.newLine();
    ticketContent += "GUELIZ";
    ticketContent += ESCPOSFormatter.multipleLines(2);
    
    // Table info
    ticketContent += ESCPOSFormatter.textDoubleHeight();
    ticketContent += ESCPOSFormatter.textBold();
    ticketContent += `TABLE ${order.tableNumber}`;
    ticketContent += ESCPOSFormatter.textNormal();
    ticketContent += ESCPOSFormatter.textBoldOff();
    ticketContent += ESCPOSFormatter.newLine();
    
    // Date and server info
    ticketContent += `Date: ${ESCPOSFormatter.formatDate(order.date)}`;
    ticketContent += ESCPOSFormatter.newLine();
    ticketContent += `Serveur: ${order.agentName}`;
    ticketContent += ESCPOSFormatter.multipleLines(2);
    
    // Separator
    ticketContent += ESCPOSFormatter.horizontalLine('=', 32);
    ticketContent += ESCPOSFormatter.newLine();
    ticketContent += ESCPOSFormatter.textBold();
    ticketContent += "TICKET CLIENT";
    ticketContent += ESCPOSFormatter.textBoldOff();
    ticketContent += ESCPOSFormatter.newLine();
    ticketContent += ESCPOSFormatter.horizontalLine('=', 32);
    ticketContent += ESCPOSFormatter.newLine();
    
    // Items
    order.items.forEach((item, index) => {
      ticketContent += `${index + 1}. ${item.drinkName}`;
      ticketContent += ESCPOSFormatter.newLine();
      ticketContent += `${item.quantity} x ${ESCPOSFormatter.formatCurrency(item.unitPrice)} = ${ESCPOSFormatter.formatCurrency(item.unitPrice * item.quantity)}`;
      ticketContent += ESCPOSFormatter.newLine();
      ticketContent += ESCPOSFormatter.horizontalLine('-', 32);
      ticketContent += ESCPOSFormatter.newLine();
    });
    
    // Total
    ticketContent += ESCPOSFormatter.textDoubleHeight();
    ticketContent += ESCPOSFormatter.textBold();
    ticketContent += `TOTAL: ${ESCPOSFormatter.formatCurrency(order.total)}`;
    ticketContent += ESCPOSFormatter.textNormal();
    ticketContent += ESCPOSFormatter.textBoldOff();
    ticketContent += ESCPOSFormatter.multipleLines(2);
    
    // Barcode
    ticketContent += ESCPOSFormatter.generateBarcode(order.id);
    ticketContent += ESCPOSFormatter.multipleLines(2);
    
    // Footer
    ticketContent += "Merci de votre visite !";
    ticketContent += ESCPOSFormatter.multipleLines(4);
    
    // Cut paper
    ticketContent += ESCPOSFormatter.cutPaper();
    
    // Print using simple direct method
    console.log('[TABLE TICKET] Sending to printer, content length:', ticketContent.length);
    ESCPOSFormatter.print(ticketContent);
    console.log('[TABLE TICKET] Print command sent successfully');
    
  } catch (error) {
    console.error('[TABLE TICKET] Error printing:', error);
    alert('Erreur d\'impression du ticket de table. Vérifiez la connexion de l\'imprimante.');
  }
};

// Alternative method to print table tickets individually with manual control
export const printTableCustomerTicket = (order: TableOrder): void => {
  let customerTicket = ESCPOSFormatter.init();
  customerTicket += ESCPOSFormatter.alignCenter();
  
  // Header
  customerTicket += ESCPOSFormatter.textLarge();
  customerTicket += ESCPOSFormatter.darkText("1ER BOULEVARD");
  customerTicket += ESCPOSFormatter.newLine();
  customerTicket += ESCPOSFormatter.textNormal();
  customerTicket += ESCPOSFormatter.mediumDarkText("GUELIZ");
  customerTicket += ESCPOSFormatter.multipleLines(2);
  
  // Table info
  customerTicket += ESCPOSFormatter.alignCenter();
  customerTicket += ESCPOSFormatter.textDoubleHeight();
  customerTicket += ESCPOSFormatter.darkText(`TABLE ${order.tableNumber}`);
  customerTicket += ESCPOSFormatter.textNormal();
  customerTicket += ESCPOSFormatter.newLine();
  
  customerTicket += ESCPOSFormatter.alignCenter();
  customerTicket += ESCPOSFormatter.mediumDarkText("Date: " + ESCPOSFormatter.formatDate(order.date));
  customerTicket += ESCPOSFormatter.newLine();
  customerTicket += ESCPOSFormatter.mediumDarkText("Serveur: " + order.agentName);
  customerTicket += ESCPOSFormatter.multipleLines(2);
  
  // Separator
  customerTicket += ESCPOSFormatter.alignCenter();
  customerTicket += ESCPOSFormatter.horizontalLine('=', 32);
  customerTicket += ESCPOSFormatter.newLine();
  customerTicket += ESCPOSFormatter.darkText("TICKET CLIENT");
  customerTicket += ESCPOSFormatter.newLine();
  customerTicket += ESCPOSFormatter.horizontalLine('=', 32);
  customerTicket += ESCPOSFormatter.newLine();
  
  // Items
  customerTicket += ESCPOSFormatter.alignCenter();
  order.items.forEach((item, index) => {
    customerTicket += ESCPOSFormatter.mediumDarkText(`${index + 1}. ${item.drinkName}`);
    customerTicket += ESCPOSFormatter.newLine();
    customerTicket += ESCPOSFormatter.mediumDarkText(`${item.quantity} x ${ESCPOSFormatter.formatCurrency(item.unitPrice)} = ${ESCPOSFormatter.formatCurrency(item.unitPrice * item.quantity)}`);
    customerTicket += ESCPOSFormatter.newLine();
    customerTicket += ESCPOSFormatter.horizontalLine('-', 32);
    customerTicket += ESCPOSFormatter.newLine();
  });
  
  // Total
  customerTicket += ESCPOSFormatter.alignCenter();
  customerTicket += ESCPOSFormatter.textDoubleHeight();
  customerTicket += ESCPOSFormatter.darkText("TOTAL: " + ESCPOSFormatter.formatCurrency(order.total));
  customerTicket += ESCPOSFormatter.textNormal();
  customerTicket += ESCPOSFormatter.multipleLines(2);
  
  // Barcode
  customerTicket += ESCPOSFormatter.alignCenter();
  customerTicket += ESCPOSFormatter.generateBarcode(order.id);
  customerTicket += ESCPOSFormatter.multipleLines(2);
  
  // Footer
  customerTicket += ESCPOSFormatter.alignCenter();
  customerTicket += ESCPOSFormatter.mediumDarkText("Merci de votre visite !");
  customerTicket += ESCPOSFormatter.multipleLines(6);
  customerTicket += ESCPOSFormatter.cutPaper();
  
  ESCPOSFormatter.print(customerTicket);
};

export const printTableAgentTicket = (order: TableOrder): void => {
  let agentCopy = ESCPOSFormatter.init();
  
  // Add visual separation marker at top
  agentCopy += ESCPOSFormatter.alignCenter();
  agentCopy += ESCPOSFormatter.multipleLines(2);
  agentCopy += ESCPOSFormatter.horizontalLine('*', 32);
  agentCopy += ESCPOSFormatter.newLine();
  agentCopy += ESCPOSFormatter.darkText("NOUVELLE FEUILLE - AGENT");
  agentCopy += ESCPOSFormatter.newLine();
  agentCopy += ESCPOSFormatter.horizontalLine('*', 32);
  agentCopy += ESCPOSFormatter.multipleLines(2);
  
  // Agent header
  agentCopy += ESCPOSFormatter.alignCenter();
  agentCopy += ESCPOSFormatter.darkText("LE 1ER BOULEVARD");
  agentCopy += ESCPOSFormatter.newLine();
  agentCopy += ESCPOSFormatter.darkText("COPIE AGENT");
  agentCopy += ESCPOSFormatter.multipleLines(2);
  
  // Table and agent info
  agentCopy += ESCPOSFormatter.alignCenter();
  agentCopy += ESCPOSFormatter.textDoubleHeight();
  agentCopy += ESCPOSFormatter.darkText(`TABLE ${order.tableNumber}`);
  agentCopy += ESCPOSFormatter.textNormal();
  agentCopy += ESCPOSFormatter.newLine();
  
  agentCopy += ESCPOSFormatter.alignCenter();
  agentCopy += ESCPOSFormatter.mediumDarkText("Date: " + ESCPOSFormatter.formatDate(order.date));
  agentCopy += ESCPOSFormatter.newLine();
  agentCopy += ESCPOSFormatter.mediumDarkText("Agent: " + order.agentName);
  agentCopy += ESCPOSFormatter.newLine();
  agentCopy += ESCPOSFormatter.mediumDarkText("Commande #: " + order.id);
  agentCopy += ESCPOSFormatter.multipleLines(2);
  
  // Products section
  agentCopy += ESCPOSFormatter.alignCenter();
  agentCopy += ESCPOSFormatter.darkText("ARTICLES:");
  agentCopy += ESCPOSFormatter.newLine();
  agentCopy += ESCPOSFormatter.horizontalLine('-', 32);
  agentCopy += ESCPOSFormatter.newLine();
  
  agentCopy += ESCPOSFormatter.alignCenter();
  order.items.forEach((item, index) => {
    agentCopy += ESCPOSFormatter.mediumDarkText(`${index + 1}. ${item.drinkName} - Qte: ${item.quantity}`);
    agentCopy += ESCPOSFormatter.newLine();
  });
  
  // Total for agent
  agentCopy += ESCPOSFormatter.multipleLines(1);
  agentCopy += ESCPOSFormatter.horizontalLine('-', 32);
  agentCopy += ESCPOSFormatter.newLine();
  agentCopy += ESCPOSFormatter.alignCenter();
  agentCopy += ESCPOSFormatter.textDoubleHeight();
  agentCopy += ESCPOSFormatter.darkText("TOTAL: " + ESCPOSFormatter.formatCurrency(order.total));
  agentCopy += ESCPOSFormatter.textNormal();
  agentCopy += ESCPOSFormatter.multipleLines(2);
  
  // Barcode
  agentCopy += ESCPOSFormatter.alignCenter();
  agentCopy += ESCPOSFormatter.generateBarcode(order.id);
  agentCopy += ESCPOSFormatter.multipleLines(6); // Extra space before cut
  
  // Full cut to finish agent ticket
  agentCopy += ESCPOSFormatter.cutPaper();
  
  ESCPOSFormatter.print(agentCopy);
};

// Enhanced version with better paper separation and darker printing
export const printTableTicketWithSeparation = (order: TableOrder): void => {
  // Generate customer ticket with enhanced darkness and extra separation
  let customerTicket = ESCPOSFormatter.init();
  customerTicket += ESCPOSFormatter.alignCenter();
  
  // Header
  customerTicket += ESCPOSFormatter.textLarge();
  customerTicket += ESCPOSFormatter.darkText("1ER BOULEVARD");
  customerTicket += ESCPOSFormatter.newLine();
  customerTicket += ESCPOSFormatter.textNormal();
  customerTicket += ESCPOSFormatter.mediumDarkText("GUELIZ");
  customerTicket += ESCPOSFormatter.multipleLines(2);
  
  // Table info
  customerTicket += ESCPOSFormatter.alignCenter();
  customerTicket += ESCPOSFormatter.textDoubleHeight();
  customerTicket += ESCPOSFormatter.darkText(`TABLE ${order.tableNumber}`);
  customerTicket += ESCPOSFormatter.textNormal();
  customerTicket += ESCPOSFormatter.newLine();
  
  customerTicket += ESCPOSFormatter.alignCenter();
  customerTicket += ESCPOSFormatter.mediumDarkText("Date: " + ESCPOSFormatter.formatDate(order.date));
  customerTicket += ESCPOSFormatter.newLine();
  customerTicket += ESCPOSFormatter.mediumDarkText("Serveur: " + order.agentName);
  customerTicket += ESCPOSFormatter.multipleLines(2);
  
  // Separator
  customerTicket += ESCPOSFormatter.alignCenter();
  customerTicket += ESCPOSFormatter.horizontalLine('=', 32);
  customerTicket += ESCPOSFormatter.newLine();
  customerTicket += ESCPOSFormatter.darkText("TICKET CLIENT");
  customerTicket += ESCPOSFormatter.newLine();
  customerTicket += ESCPOSFormatter.horizontalLine('=', 32);
  customerTicket += ESCPOSFormatter.newLine();
  
  // Items
  customerTicket += ESCPOSFormatter.alignCenter();
  order.items.forEach((item, index) => {
    customerTicket += ESCPOSFormatter.mediumDarkText(`${index + 1}. ${item.drinkName}`);
    customerTicket += ESCPOSFormatter.newLine();
    customerTicket += ESCPOSFormatter.mediumDarkText(`${item.quantity} x ${ESCPOSFormatter.formatCurrency(item.unitPrice)} = ${ESCPOSFormatter.formatCurrency(item.unitPrice * item.quantity)}`);
    customerTicket += ESCPOSFormatter.newLine();
    customerTicket += ESCPOSFormatter.horizontalLine('-', 32);
    customerTicket += ESCPOSFormatter.newLine();
  });
  
  // Total
  customerTicket += ESCPOSFormatter.alignCenter();
  customerTicket += ESCPOSFormatter.textDoubleHeight();
  customerTicket += ESCPOSFormatter.darkText("TOTAL: " + ESCPOSFormatter.formatCurrency(order.total));
  customerTicket += ESCPOSFormatter.textNormal();
  customerTicket += ESCPOSFormatter.multipleLines(2);
  
  // Barcode
  customerTicket += ESCPOSFormatter.alignCenter();
  customerTicket += ESCPOSFormatter.generateBarcode(order.id);
  customerTicket += ESCPOSFormatter.multipleLines(2);
  
  // Footer
  customerTicket += ESCPOSFormatter.alignCenter();
  customerTicket += ESCPOSFormatter.mediumDarkText("Merci de votre visite !");
  customerTicket += ESCPOSFormatter.multipleLines(7); // Extra space for clear separation
  
  // Full cut for complete separation
  customerTicket += ESCPOSFormatter.cutPaper();
  
  // Generate agent copy with clear separation indicators
  let agentCopy = ESCPOSFormatter.init(); // Fresh init for second paper
  
  // Clear separation marker
  agentCopy += ESCPOSFormatter.alignCenter();
  agentCopy += ESCPOSFormatter.multipleLines(3);
  agentCopy += ESCPOSFormatter.horizontalLine('*', 32);
  agentCopy += ESCPOSFormatter.newLine();
  agentCopy += ESCPOSFormatter.darkText("FEUILLE SEPAREE - AGENT");
  agentCopy += ESCPOSFormatter.newLine();
  agentCopy += ESCPOSFormatter.horizontalLine('*', 32);
  agentCopy += ESCPOSFormatter.multipleLines(2);
  
  // Agent header
  agentCopy += ESCPOSFormatter.alignCenter();
  agentCopy += ESCPOSFormatter.darkText("LE 1ER BOULEVARD");
  agentCopy += ESCPOSFormatter.newLine();
  agentCopy += ESCPOSFormatter.darkText("COPIE AGENT");
  agentCopy += ESCPOSFormatter.multipleLines(2);
  
  // Table details
  agentCopy += ESCPOSFormatter.alignCenter();
  agentCopy += ESCPOSFormatter.textDoubleHeight();
  agentCopy += ESCPOSFormatter.darkText(`TABLE ${order.tableNumber}`);
  agentCopy += ESCPOSFormatter.textNormal();
  agentCopy += ESCPOSFormatter.newLine();
  
  agentCopy += ESCPOSFormatter.alignCenter();
  agentCopy += ESCPOSFormatter.mediumDarkText("Date: " + ESCPOSFormatter.formatDate(order.date));
  agentCopy += ESCPOSFormatter.newLine();
  agentCopy += ESCPOSFormatter.mediumDarkText("Agent: " + order.agentName);
  agentCopy += ESCPOSFormatter.newLine();
  agentCopy += ESCPOSFormatter.mediumDarkText("Commande #: " + order.id);
  agentCopy += ESCPOSFormatter.multipleLines(2);
  
  // Products
  agentCopy += ESCPOSFormatter.alignCenter();
  agentCopy += ESCPOSFormatter.darkText("ARTICLES:");
  agentCopy += ESCPOSFormatter.newLine();
  agentCopy += ESCPOSFormatter.horizontalLine('-', 32);
  agentCopy += ESCPOSFormatter.newLine();
  
  agentCopy += ESCPOSFormatter.alignCenter();
  order.items.forEach((item, index) => {
    agentCopy += ESCPOSFormatter.mediumDarkText(`${index + 1}. ${item.drinkName} - Qte: ${item.quantity}`);
    agentCopy += ESCPOSFormatter.newLine();
  });
  
  // Total
  agentCopy += ESCPOSFormatter.multipleLines(1);
  agentCopy += ESCPOSFormatter.horizontalLine('-', 32);
  agentCopy += ESCPOSFormatter.newLine();
  agentCopy += ESCPOSFormatter.alignCenter();
  agentCopy += ESCPOSFormatter.textDoubleHeight();
  agentCopy += ESCPOSFormatter.darkText("TOTAL: " + ESCPOSFormatter.formatCurrency(order.total));
  agentCopy += ESCPOSFormatter.textNormal();
  agentCopy += ESCPOSFormatter.multipleLines(2);
  
  // Barcode
  agentCopy += ESCPOSFormatter.alignCenter();
  agentCopy += ESCPOSFormatter.generateBarcode(order.id);
  agentCopy += ESCPOSFormatter.multipleLines(7); // Extra space before cut
  
  // Full cut
  agentCopy += ESCPOSFormatter.cutPaper();
  
  // Print with enhanced separation timing (3 seconds between tickets)
  console.log('Printing customer table ticket...');
  ESCPOSFormatter.print(customerTicket);
  
  setTimeout(() => {
    console.log('Printing agent table ticket...');
    ESCPOSFormatter.print(agentCopy);
  }, 3000); // 3 second delay for better separation
};

// Test function to verify table ticket separation
export const printTableTestSeparation = (): void => {
  const testCustomer = ESCPOSFormatter.init() +
                       ESCPOSFormatter.alignCenter() +
                       ESCPOSFormatter.darkText("TABLE TEST - CLIENT") +
                       ESCPOSFormatter.multipleLines(3) +
                       ESCPOSFormatter.mediumDarkText("Ceci est le ticket client") +
                       ESCPOSFormatter.multipleLines(7) +
                       ESCPOSFormatter.cutPaper();
  
  const testAgent = ESCPOSFormatter.init() +
                    ESCPOSFormatter.alignCenter() +
                    ESCPOSFormatter.multipleLines(3) +
                    ESCPOSFormatter.horizontalLine('*', 32) +
                    ESCPOSFormatter.newLine() +
                    ESCPOSFormatter.darkText("TABLE TEST - AGENT") +
                    ESCPOSFormatter.newLine() +
                    ESCPOSFormatter.horizontalLine('*', 32) +
                    ESCPOSFormatter.multipleLines(2) +
                    ESCPOSFormatter.mediumDarkText("Ceci est le ticket agent") +
                    ESCPOSFormatter.multipleLines(7) +
                    ESCPOSFormatter.cutPaper();
  
  ESCPOSFormatter.printBothTickets(testCustomer, testAgent);
};