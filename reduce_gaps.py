import os

directory = 'src/components'

replacements = {
    'py-28 lg:py-40': 'py-20 lg:py-24',
    'py-24 lg:py-32': 'py-16 lg:py-20',
    'py-32 bg-black-charcoal': 'py-20 bg-black-charcoal',
    'py-32 bg-black-deep': 'py-20 bg-black-deep',
    'py-16 lg:py-48': 'py-16 lg:py-24',
    'mt-32 pt-12': 'mt-20 pt-8',
    'py-32': 'py-20',
    'mb-32 lg:mb-40': 'mb-20 lg:mb-24',
    'mb-24 lg:mb-40': 'mb-16 lg:mb-24',
    'pt-20 pb-24 lg:pt-48 lg:pb-24': 'pt-16 pb-16 lg:pt-24 lg:pb-16',
    'pt-24 pb-32': 'pt-16 pb-20',
    'pb-24 lg:pb-40': 'pb-16 lg:pb-24',
    'pt-16 lg:pt-32 pb-32': 'pt-12 lg:pt-20 pb-20',
    'py-32 lg:py-48': 'py-20 lg:py-24',
    'py-20 lg:pt-16 lg:pb-32': 'py-16 lg:pt-12 lg:pb-20',
    'py-20 lg:py-28': 'py-16 lg:py-20'
}

for root, _, files in os.walk(directory):
    for file in files:
        if file.endswith('.jsx'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            for old, new in replacements.items():
                content = content.replace(old, new)
                
            if content != original_content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Updated {filepath}")
