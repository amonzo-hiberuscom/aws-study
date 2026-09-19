#!/bin/bash
set -e
cd "$(dirname "$0")"

# 1. Concatenate chapters in order, ensuring a blank line between files
: > full_book.md
for f in chapter_00.md chapter_01.md chapter_02.md chapter_03.md chapter_04.md chapter_05.md chapter_06.md chapter_07.md chapter_08.md; do
  cat "$f" >> full_book.md
  printf '\n\n' >> full_book.md
done

# 2. Convert to HTML fragment with TOC (raw HTML passthrough for our custom divs/figures)
pandoc full_book.md \
  -f markdown+raw_html+pipe_tables+grid_tables \
  -t html5 -s \
  --toc --toc-depth=3 \
  --wrap=none \
  -o content.html

# 3. Assemble final standalone HTML
python3 - <<'PYEOF'
import re
content = open('content.html', encoding='utf-8').read()

# Extract pandoc's standalone <body>...</body>, which contains nav#TOC then the content
bm = re.search(r'<body>(.*)</body>', content, re.DOTALL)
body_all = bm.group(1)
m = re.search(r'(<nav id="TOC"[^>]*>.*?</nav>)(.*)', body_all, re.DOTALL)
toc_html, body_html = m.group(1), m.group(2)

cover = '''
<div class="cover">
  <div class="kicker">Libro de Teoria &middot; Edicion de Estudio</div>
  <div>
    <h1>AWS Certified<br/>GenAI Developer</h1>
    <div class="subtitle">Teoria completa de los siete dominios del examen, con la mecanica interna de cada servicio explicada en profundidad y fundamentada en el razonamiento real de 97 escenarios de examen.</div>
  </div>
  <div>
    <div class="cover-badges">
      <span class="badge">Amazon Bedrock</span>
      <span class="badge">RAG &amp; Knowledge Bases</span>
      <span class="badge">Agents &amp; Flows</span>
      <span class="badge">Guardrails</span>
      <span class="badge">Monitoring &amp; Evaluation</span>
      <span class="badge">Performance &amp; Cost</span>
      <span class="badge">Security &amp; Governance</span>
    </div>
    <div class="cover-meta">Guia de estudio personal &middot; Generado a partir del banco de preguntas oficial y la documentacion de AWS</div>
  </div>
</div>
'''

toc_page = f'<div class="toc-page"><h2>Indice</h2>{toc_html}</div>'

html = f'''<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8"/>
<title>AWS Certified GenAI Developer — Libro de Teoria</title>
<link rel="stylesheet" href="style.css"/>
</head>
<body>
{cover}
{toc_page}
{body_html}
</body>
</html>'''

open('final.html', 'w', encoding='utf-8').write(html)
print("Wrote final.html:", len(html), "chars")
PYEOF

# 4. Render to PDF
weasyprint final.html AWS_GenAI_Developer_Libro_Teoria.pdf
echo "Done."
ls -la AWS_GenAI_Developer_Libro_Teoria.pdf
