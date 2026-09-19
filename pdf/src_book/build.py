import subprocess, re, os, shutil

DIR = os.path.dirname(os.path.abspath(__file__))
os.chdir(DIR)

CHAPTERS = [f'chapter_{i:02d}.md' for i in range(9)]  # 00..08

missing = [c for c in CHAPTERS if not os.path.exists(c)]
if missing:
    raise SystemExit(f"Missing chapters: {missing}")

combined = []
for c in CHAPTERS:
    txt = open(c, encoding='utf-8').read().strip()
    combined.append(txt)
full_md = '\n\n---\n\n'.join(combined) + '\n'
open('full_book.md', 'w', encoding='utf-8').write(full_md)
print('full_book.md chars:', len(full_md))

# Convert to HTML fragment with TOC (h2/h3 only)
subprocess.run([
    'pandoc', 'full_book.md',
    '-f', 'markdown+raw_html+pipe_tables+fenced_code_attributes',
    '-t', 'html5',
    '--toc', '--toc-depth=2',
    '-o', 'body.html',
    '--wrap=none',
], check=True)

content_html = open('body.html', encoding='utf-8').read()

# Build our own TOC by scanning the generated heading ids/text directly
heads = re.findall(r'<h([23]) id="([^"]+)">(.*?)</h\1>', content_html, re.DOTALL)
toc_parts = ['<ul>']
open_h3 = False
for level, hid, htext in heads:
    htext_clean = re.sub(r'<[^>]+>', '', htext)
    if level == '2':
        if open_h3:
            toc_parts.append('</ul></li>')
            open_h3 = False
        toc_parts.append(f'<li><a href="#{hid}">{htext_clean}</a>')
        toc_parts.append('<ul>')
        open_h3 = True
    else:
        toc_parts.append(f'<li><a href="#{hid}">{htext_clean}</a></li>')
if open_h3:
    toc_parts.append('</ul></li>')
toc_parts.append('</ul>')
toc_html = f'<nav id="TOC">{"".join(toc_parts)}</nav>'

today = "2 de septiembre de 2026"

full_html = f"""<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8"/>
<title>AWS Certified GenAI Developer — Libro de Teoría</title>
<link rel="stylesheet" href="book.css"/>
</head>
<body>

<section class="cover">
  <div>
    <div class="kicker">Preparación de Certificación &middot; AWS</div>
    <h1>AWS Certified<br/>GenAI Developer</h1>
    <div class="subtitle">Libro de Teoría Completo — Conceptos, arquitecturas y razonamiento de decisión, desarrollados a partir del análisis exhaustivo de 97 escenarios reales de examen.</div>
  </div>
  <div>
    <div class="meta-box">
      <div><strong>9 módulos</strong> — de fundamentos de IA Generativa a seguridad y gobernanza</div>
      <div><strong>Amazon Bedrock</strong> · RAG &amp; Knowledge Bases · Agentes &amp; Flows</div>
      <div><strong>Guardrails</strong> · Monitorización &amp; Evaluación · Rendimiento &amp; Coste</div>
      <div><strong>Seguridad, Gobernanza y Cumplimiento</strong></div>
    </div>
    <div class="footer-line">Edición de estudio personal &middot; {today}</div>
  </div>
</section>

<section class="toc-page">
<h2>Índice</h2>
{toc_html}
</section>

{content_html}

</body>
</html>
"""

open('full_html.html', 'w', encoding='utf-8').write(full_html)
print('full_html.html written:', len(full_html), 'chars')

pdf_output = 'AWS_GenAI_Developer_Libro_Teoria.pdf'
subprocess.run([
    'weasyprint', 'full_html.html', pdf_output,
], check=True)
print(f'PDF generated successfully: {pdf_output}')

dest = '/home/amonzo/estudio/aws-exams/pdf/AWS_GenAI_Developer_Libro_Teoria.pdf'
shutil.copy2(pdf_output, dest)
print(f'Copied PDF to destination: {dest}')
