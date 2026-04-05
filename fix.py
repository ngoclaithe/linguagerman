import os

def fix_encoding(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if mangled
        if 'Ã' in content or 'Å' in content or 'Æ' in content or 'á' in content or 'Ä' in content:
            # Revert the mangling:
            # content string -> latin-1 bytes -> utf-8 string
            try:
                fixed_content = content.encode('windows-1252').decode('utf-8')
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(fixed_content)
                print(f"Fixed {filepath}")
            except Exception as e:
                print(f"Could not fix {filepath}: {e}")
    except Exception as e:
        pass

for root, dirs, files in os.walk(r"d:\Linguagerman\frontend"):
    for file in files:
        if file.endswith(('.tsx', '.ts', '.conf')):
            path = os.path.join(root, file)
            if 'node_modules' not in path and '.next' not in path:
                fix_encoding(path)
