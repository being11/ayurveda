with open('/app/swadharma/apps/web/src/components/herbs/HerbCard.tsx', 'r') as f:
    content = f.read()

content = content.replace("from '@workspace/ui/components/card'", "from '../ui/card'")
content = content.replace("from '@workspace/ui/components/badge'", "from '@workspace/ui/components/badge'")

with open('/app/swadharma/apps/web/src/components/herbs/HerbCard.tsx', 'w') as f:
    f.write(content)
