import { Document, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { ProjectCertificateTemplate } from "backend";

interface CertificadoPDFParams {
  certificateId: string;
  template: ProjectCertificateTemplate;
  title: string;
}

export default function CertificadoPDF({ certificateId, template, title }: CertificadoPDFParams) {
  const pdfStyles = StyleSheet.create({
    verify: {
      color: "#fff",
      opacity: 0.4,
      textAlign: "center",
    },
  });

  return (
    <Document title={title} author="PET Computação UFPB" language="Português">
      <Page orientation="landscape" wrap={false}>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image
          src={template.backgroundUrl}
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
          }}
        />

        <View style={{ height: "100%" }}>
          <Text
            // eslint-disable-next-line react/no-children-prop
            children={template.text
              .replaceAll("<br/>", "\n")
              .split(/(<b>.+?<\/b>)/)
              .map(text => {
                if (text.includes("<b>")) {
                  const [_, actualText] = text.split(/<\/?b>/);

                  return (
                    <Text key={actualText} style={{ fontFamily: "Helvetica-Bold" }}>
                      {actualText}
                    </Text>
                  );
                }

                return text;
              })}
            style={{
              color: "#fff",
              margin: "auto",
              width: "80%",
              textAlign: "center",
            }}
          />

          <View style={{ bottom: 0, position: "absolute", width: "100%" }}>
            <Text style={pdfStyles.verify}>{certificateId}</Text>
            <Text style={pdfStyles.verify}>
              Verifique a autenticidade em: https://petccufpb.com.br/sdc/certificados
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
