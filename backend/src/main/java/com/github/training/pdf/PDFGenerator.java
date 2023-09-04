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

@AllArgsConstructor
@Setter
public class PDFGenerator {
    private Dog dog;

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

            PdfPTable table = new PdfPTable(5);
            table.setWidthPercentage(100f);
            table.setWidths(new int[]{3, 3, 3, 3, 3});
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
            cell.setPhrase(new Phrase("Age", font));
            table.addCell(cell);
            cell.setPhrase(new Phrase("Color", font));
            table.addCell(cell);
            cell.setPhrase(new Phrase("Collar color", font));
            table.addCell(cell);

            table.addCell(dog.getName());
            table.addCell(dog.getBreed());
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
