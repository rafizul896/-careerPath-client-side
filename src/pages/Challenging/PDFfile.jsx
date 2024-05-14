import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const PDFfile = ({ children }) => (
    // console.log(children)
    
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text>
                   {children}
                </Text>
            </View>
        </Page>
    </Document>

);

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4',
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
});

export default PDFfile;
