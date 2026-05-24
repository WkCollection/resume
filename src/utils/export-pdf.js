/**
 * 导出简历为 PDF，自动缩放适配 A4 单页
 */
export function exportToPDF() {
  const el = document.querySelector('.template-preview')
  if (!el) {
    console.warn('未找到简历模板元素')
    return
  }

  // 注入打印专用样式
  const style = document.createElement('style')
  style.id = '__print_style'
  style.textContent = `
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
  `
  document.head.appendChild(style)

  // 克隆模板挂到 body 顶层
  const clone = el.cloneNode(true)
  clone.id = '__print_resume'
  document.body.appendChild(clone)

  // 计算是否需要缩放：A4 = 210mm x 297mm
  // 1mm ≈ 3.7795px (96dpi)
  const a4HeightPx = 297 * 3.7795
  const contentHeight = clone.scrollHeight
  if (contentHeight > a4HeightPx) {
    const scale = a4HeightPx / contentHeight
    clone.style.transform = `scale(${scale})`
    clone.style.height = `${contentHeight}px`
  }

  // 打印
  window.print()

  // 清理
  document.body.removeChild(clone)
  document.head.removeChild(style)
}
