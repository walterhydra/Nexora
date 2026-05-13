import re
with open('index.css', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

# Remove anything after the last closing brace
text = re.sub(r'\}\s*@.*$', '}\n', text, flags=re.DOTALL)

with open('index.css', 'w', encoding='utf-8') as f:
    f.write(text)
    f.write('\n@custom-variant dark (&:where(.dark, .dark *));\n')
