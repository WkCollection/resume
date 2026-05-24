function a(){const n=document.querySelector(".template-preview");if(!n){console.warn("未找到简历模板元素");return}const o=document.createElement("style");o.id="__print_style",o.textContent=`
    @media print {
      @page { size: A4; margin: 0; }

      body {
        margin: 0 !important;
        padding: 0 !important;
        background: white !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }

      body > *:not(#__print_resume) {
        display: none !important;
      }

      #__print_resume {
        display: block !important;
        position: absolute !important;
        left: 0 !important;
        top: 0 !important;
        width: 210mm !important;
        transform-origin: top left !important;
        margin: 0 !important;
        box-shadow: none !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }

      #__print_resume * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
    }
  `,document.head.appendChild(o);const t=n.cloneNode(!0);t.id="__print_resume",document.body.appendChild(t);const i=297*3.7795,e=t.scrollHeight;if(e>i){const r=i/e;t.style.transform=`scale(${r})`,t.style.height=`${e}px`}window.print(),document.body.removeChild(t),document.head.removeChild(o)}export{a as e};
