<template>
    <div ref='coll_viewer' style='width: 100%; height: 100%'></div>
</template>

<script>
    export default {
        name: "collWebviewer",
        data(){
            return {
                publicPath: process.env.BASE_URL
            }
        },
        computed:{
            path(){
                return `${this.publicPath}lib`
            }
        },
        mounted() {
            const viewerElement = this.$refs.coll_viewer;

            let annotManager = null;
            const DOCUMENT_ID = 'webviewer-demo-1';
            const hostName = window.location.hostname;
            const url = `ws://${hostName}:8080`;
            const connection = new WebSocket(url);
            const nameList = ['Andy', 'Andrew', 'Logan', 'Justin', 'Matt', 'Sardor', 'Zhijie', 'James', 'Kristian', 'Mary', 'Patricia', 'Jennifer', 'Linda', 'David', 'Joseph', 'Thomas', 'Naman', 'Nancy', 'Sandra'];
            const serializer = new XMLSerializer();

            connection.onerror = error => {
                console.warn(`Error from WebSocket: ${error}`);
            }

            WebViewer({
                path: this.path, // path to the PDFTron 'lib' folder
                initialDoc: 'https://pdftron.s3.amazonaws.com/downloads/pl/webviewer-demo.pdf',//
            }, viewerElement).then((instance) => {
                // Instance is ready here
                instance.openElements(['leftPanel']);
                annotManager = instance.docViewer.getAnnotationManager();
                // Assign a random name to client
                annotManager.setCurrentUser(nameList[Math.floor(Math.random() * nameList.length)]);
                annotManager.on('annotationChanged', e => {
                    // If annotation change is from import, return
                    if (e.imported) {
                        return;
                    }

                    const xfdfString = annotManager.getAnnotCommand();
                    // Parse xfdfString to separate multiple annotation changes to individual annotation change
                    const parser = new DOMParser();
                    const commandData = parser.parseFromString(xfdfString, 'text/xml');
                    const addedAnnots = commandData.getElementsByTagName('add')[0];
                    const modifiedAnnots = commandData.getElementsByTagName('modify')[0];
                    const deletedAnnots = commandData.getElementsByTagName('delete')[0];

                    // List of added annotations
                    addedAnnots.childNodes.forEach((child) => {
                        sendAnnotationChange(child, 'add');
                    });

                    // List of modified annotations
                    modifiedAnnots.childNodes.forEach((child) => {
                        sendAnnotationChange(child, 'modify');
                    });

                    // List of deleted annotations
                    deletedAnnots.childNodes.forEach((child) => {
                        sendAnnotationChange(child, 'delete');
                    });
                });

                connection.onmessage = (message) => {
                    const annotation = JSON.parse(message.data);
                    const annotations = annotManager.importAnnotCommand(annotation.xfdfString);
                    annotManager.drawAnnotationsFromList(annotations);
                }
            });

            viewerElement.addEventListener('documentLoaded', () => {
                loadXfdfStrings(DOCUMENT_ID).then((rows) => {
                    JSON.parse(rows).forEach(row => {
                        const annotations = annotManager.importAnnotCommand(row.xfdfString);
                        annotManager.drawAnnotationsFromList(annotations);
                    });
                });
            });

            const loadXfdfStrings = (documentId) => {
                return new Promise((resolve, reject) => {
                    fetch(`../server/annotationHandler.js?documentId=${documentId}`, {
                        method: 'GET',
                    }).then((res) => {
                        if (res.status < 400) {
                            res.text().then(xfdfStrings => {
                                resolve(xfdfStrings);
                            });
                        } else {
                            reject(res);
                        }
                    });
                });
            };


// wrapper function to convert xfdf fragments to full xfdf strings
            const convertToXfdf = (changedAnnotation, action) => {
                let xfdfString = `<?xml version="1.0" encoding="UTF-8" ?><xfdf xmlns="http://ns.adobe.com/xfdf/" xml:space="preserve"><fields />`;
                if (action === 'add') {
                    xfdfString += `<add>${changedAnnotation}</add><modify /><delete />`;
                } else if (action === 'modify') {
                    xfdfString += `<add /><modify>${changedAnnotation}</modify><delete />`;
                } else if (action === 'delete') {
                    xfdfString += `<add /><modify /><delete>${changedAnnotation}</delete>`;
                }
                xfdfString += `</xfdf>`;
                return xfdfString;
            }

// helper function to send annotation changes to WebSocket server
            const sendAnnotationChange = (annotation, action) => {
                if (annotation.nodeType !== annotation.TEXT_NODE) {
                    const annotationString = serializer.serializeToString(annotation);
                    if (connection.readyState===1) {
                        connection.send(JSON.stringify({
                            documentId: DOCUMENT_ID,
                            annotationId: annotation.getAttribute('name'),
                            xfdfString: convertToXfdf(annotationString, action)
                        }));
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>