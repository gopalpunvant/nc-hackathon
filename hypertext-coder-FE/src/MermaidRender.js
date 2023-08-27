import React, { memo, useEffect } from 'react';
import mermaid from 'mermaid';
import html2canvas from 'html2canvas';

const MermaidRenderComponent = ({ classJson }) => {
    useEffect(() => {
        mermaid.initialize({ startOnLoad: true });
    }, []);

    const exportDiagram = () => {
        const mermaidDiagram = document.getElementById('mermaidDiagram');
        if (mermaidDiagram) {
            html2canvas(mermaidDiagram).then((canvas) => {
                const image = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.href = image;
                link.download = 'mermaid-diagram.png';
                link.click();
            });
        }
    };

    return (
        <div>
            <button onClick={exportDiagram}>Export Diagram as PNG</button>
            <pre className="mermaid" id="mermaidDiagram">
                {classJson}
            </pre>
        </div>
    );
};

export default memo(MermaidRenderComponent);
