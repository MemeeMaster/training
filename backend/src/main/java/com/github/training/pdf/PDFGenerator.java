package com.github.training.pdf;

import com.github.training.dog.Dog;
import com.lowagie.text.*;
import com.lowagie.text.pdf.CMYKColor;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;


/**
 * PDF files generator. Creates PDF file containing formatted table
 * with passed dog details.
 */
@AllArgsConstructor
@Setter
public class PDFGenerator {
    /**
     * Dog instance for which PDF is created.
     */
    private Dog dog;

    /**
     * Generates a PDF document with dog information and sends it as a response to the HttpServletResponse.
     * In more details, it is firstly setting file size to A4, and then is defining basic styling.
     * Then it is adding title, table with 6 columns and table properties. At the end, header cells and
     * data cells are added and filled with details followed by adding table to document and closing it.
     *
     * @param response The HttpServletResponse object to which the PDF will be sent.
     * @throws ResponseStatusException Thrown if there is an error during PDF generation.
     */
    public void generatePdf(HttpServletResponse response) {
        try {
            Document document = new Document(PageSize.A4);
            PdfWriter.getInstance(document, response.getOutputStream());
            document.open();

            Font fontTitle = FontFactory.getFont(FontFactory.COURIER);
            fontTitle.setSize(20);

            Paragraph paragraph = new Paragraph(String.format("%s information", dog.getName()), fontTitle);
            paragraph.setAlignment(Paragraph.ALIGN_CENTER);

            document.add(paragraph);

            PdfPTable table = new PdfPTable(6);
            table.setWidthPercentage(100f);
            table.setWidths(new int[]{3, 3, 3, 3, 3, 3});
            table.setSpacingBefore(5);

            PdfPCell cell = new PdfPCell();
            cell.setBackgroundColor(CMYKColor.DARK_GRAY);
            cell.setPadding(5);

            Font font = FontFactory.getFont(FontFactory.COURIER);
            font.setColor(CMYKColor.WHITE);

            cell.setPhrase(new Phrase("Name", font));
            table.addCell(cell);
            cell.setPhrase(new Phrase("Breed", font));
            table.addCell(cell);
            cell.setPhrase(new Phrase("Gender", font));
            table.addCell(cell);
            cell.setPhrase(new Phrase("Age", font));
            table.addCell(cell);
            cell.setPhrase(new Phrase("Color", font));
            table.addCell(cell);
            cell.setPhrase(new Phrase("Collar color", font));
            table.addCell(cell);

            table.addCell(dog.getName());
            table.addCell(dog.getBreed());
            table.addCell(dog.getGender());
            table.addCell(String.valueOf(dog.getAge()));
            table.addCell(dog.getColor());
            table.addCell(dog.getCollarColor());
            document.add(table);

            document.close();
        } catch (IOException exception) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error while creating a file.");
        }
    }
}
