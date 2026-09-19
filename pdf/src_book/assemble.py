import re

body = open('body.html', encoding='utf-8').read()

# Build TOC from h2/h3 headings
toc_items = []
for m in re.finditer(r'<h([23]) id="([^"]+)">(.*?)</h\1>', body, re.DOTALL):
    level = int(m.group(1))
    hid = m.group(2)
    title = re.sub(r'<[^>]+>', '', m.group(3)).strip()
    toc_items.append((level, hid, title))

toc_html = ['<ul>']
open_sub = False
for level, hid, title in toc_items:
    if level == 2:
        if open_sub:
            toc_html.append('</ul></li>')
            open_sub = False
        toc_html.append(f'<li><a href="#{hid}">{title}</a>')
    else:
        if not open_sub:
            toc_html.append('<ul>')
            open_sub = True
        toc_html.append(f'<li><a href="#{hid}">{title}</a></li>')
if open_sub:
    toc_html.append('</ul>')
toc_html.append('</li>')
toc_html.append('</ul>')
toc_html = '\n'.join(toc_html)

cover = '''
<div class="cover">
  <div>
    <div class="kicker">Libro de teoría &middot; Edición de estudio</div>
    <h1>AWS Certified<br/>GenAI Developer</h1>
    <div class="subtitle">Teoría completa de Amazon Bedrock, RAG, Agentes, Guardrails, Monitorización, Rendimiento y Gobernanza &mdash; construida a partir del análisis de 97 escenarios reales de examen y la documentación oficial de AWS.</div>
  </div>
  <div>
    <div class="meta-box">
      <div>&bull; 9 módulos &middot; 8 diagramas de arquitectura</div>
      <div>&bull; Casos de estudio basados en escenarios reales de examen</div>
      <div>&bull; Referencias verificadas contra docs.aws.amazon.com</div>
    </div>
    <div class="footer-line">Edición de estudio personal &middot; 2026</div>
  </div>
</div>
'''

toc_page = f'''
<div class="toc-page">
  <h2 style="break-before:auto;">Índice</h2>
  <nav id="TOC">{toc_html}</nav>
</div>
'''

html = f'''<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8"/>
<title>AWS Certified GenAI Developer</title>
<link rel="stylesheet" href="book.css"/>
</head>
<body>
{cover}
{toc_page}
{body}
</body>
</html>
'''

open('book.html', 'w', encoding='utf-8').write(html)
print('Wrote book.html', len(html), 'chars,', len(toc_items), 'toc entries')
