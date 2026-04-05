import os

def fix_encoding(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if 'Ã' in content or 'Å' in content or 'á' in content or 'Ä' in content or '»' in content:
            try:
                # Remove \ufeff if present before encoding back to latin1
                if content.startswith('\ufeff'):
                    content = content[1:]
                    
                # Replace unsupported characters that might have been introduced
                # but Latin1 normally maps 1:1. Let's encode safely.
                raw_bytes = content.encode('latin1', errors='ignore')
                fixed_content = raw_bytes.decode('utf-8', errors='ignore')
                
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
