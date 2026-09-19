import re

SRC = '/home/amonzo/estudio/aws-exams/pdf/Guia_Estudio_AWS_GenAI_Developer.md'
OUT = 'book_body.md'

text = open(SRC, encoding='utf-8').read()

# 1. Drop the top title/subtitle lines and the index block (we build our own cover + TOC)
# Find where "## 1. MAPA DE COMPETENCIAS" starts and cut everything before it except we keep from there on.
idx = text.find('## 1. MAPA DE COMPETENCIAS')
text = text[idx:]

# 2. Replace mermaid code blocks with figure/img tags, in order
counter = [0]
def repl_mermaid(m):
    counter[0] += 1
    n = counter[0]
    return f'\n<figure class="diagram">\n<img src="diagram_{n}.svg" alt="Diagrama {n}"/>\n</figure>\n'

text = re.sub(r'```mermaid\n.*?\n```', repl_mermaid, text, flags=re.DOTALL)

# 3. Convert GitHub-style admonitions: lines starting with "> [!TYPE]" followed by "> ..." lines
def repl_admonition(m):
    kind = m.group(1).strip().upper()
    body_lines = m.group(2).splitlines()
    cleaned = []
    for l in body_lines:
        l = re.sub(r'^>\s?', '', l)
        cleaned.append(l)
    body_md = '\n'.join(cleaned).strip()
    label = {'IMPORTANT': 'Regla de Examen', 'TIP': 'Diferencia Clave', 'NOTE': 'Nota', 'WARNING': 'Atención'}.get(kind, kind)
    # strip a leading "**<Label...>:**" that duplicates the callout title
    body_md = re.sub(r'^\*\*[^*]{0,60}:\*\*\s*', '', body_md)
    icon = {'IMPORTANT': '&#9888;', 'TIP': '&#128161;', 'NOTE': '&#8505;', 'WARNING': '&#9888;'}.get(kind, '&#8505;')
    css_kind = kind.lower()
    return f'\n<div class="callout callout-{css_kind}">\n<div class="callout-title">{icon} {label}</div>\n\n{body_md}\n\n</div>\n'

# Match a blockquote block that starts with [!TYPE] on first line, capturing following '>' lines
pattern = re.compile(r'> \[!(\w+)\]\s*\n((?:>.*\n?)*)')
text = pattern.sub(repl_admonition, text)

# 4. Replace the single LaTeX display formula with a styled HTML block
text = text.replace(
    r'$$\text{Calidad RAG} = f(\text{Context Relevance}, \text{Faithfulness}, \text{Answer Relevance})$$',
    '<div class="formula">Calidad&nbsp;RAG&nbsp;=&nbsp;f( Context&nbsp;Relevance , Faithfulness , Answer&nbsp;Relevance )</div>'
)
text = text.replace(r'$k$', '<em>k</em>')

open(OUT, 'w', encoding='utf-8').write(text)
print('Mermaid blocks replaced:', counter[0])
print('Wrote', OUT, len(text), 'chars')
