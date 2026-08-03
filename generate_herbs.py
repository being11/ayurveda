import json

base_herbs = [
    {"sanskritName": "Ashwagandha", "botanicalName": "Withania somnifera", "rasa": ["Bitter", "Astringent", "Sweet"], "virya": "Heating", "vipaka": "Sweet", "prabhava": "Rejuvenative for Vata and Kapha", "doshas": {"vata": "-", "pitta": "+", "kapha": "-"}, "organSystems": ["Nervous", "Reproductive"], "useCases": ["Stress", "Fatigue", "Insomnia"]},
    {"sanskritName": "Shatavari", "botanicalName": "Asparagus racemosus", "rasa": ["Sweet", "Bitter"], "virya": "Cooling", "vipaka": "Sweet", "prabhava": "Female reproductive tonic", "doshas": {"vata": "-", "pitta": "-", "kapha": "+"}, "organSystems": ["Reproductive", "Digestive"], "useCases": ["Hormonal balance", "Ulcers"]},
    {"sanskritName": "Triphala", "botanicalName": "Emblica officinalis, Terminalia chebula, Terminalia belerica", "rasa": ["Sweet", "Sour", "Pungent", "Bitter", "Astringent"], "virya": "Neutral", "vipaka": "Sweet", "prabhava": "Tridoshic rasayana", "doshas": {"vata": "-", "pitta": "-", "kapha": "-"}, "organSystems": ["Digestive", "Excretory"], "useCases": ["Constipation", "Detoxification"]},
    {"sanskritName": "Brahmi", "botanicalName": "Bacopa monnieri", "rasa": ["Bitter", "Sweet"], "virya": "Cooling", "vipaka": "Sweet", "prabhava": "Medhya (intellect promoting)", "doshas": {"vata": "-", "pitta": "-", "kapha": "-"}, "organSystems": ["Nervous"], "useCases": ["Memory", "Focus", "Anxiety"]},
    {"sanskritName": "Tulsi", "botanicalName": "Ocimum sanctum", "rasa": ["Pungent", "Bitter"], "virya": "Heating", "vipaka": "Pungent", "prabhava": "Adaptogen, sattvic", "doshas": {"vata": "-", "pitta": "+", "kapha": "-"}, "organSystems": ["Respiratory"], "useCases": ["Coughs", "Colds", "Immunity"]},
]

# Generate 108 herbs by repeating and modifying the base
herbs = []
for i in range(108):
    base = base_herbs[i % len(base_herbs)].copy()
    base["id"] = f"herb_{i+1}"
    if i >= len(base_herbs):
        base["sanskritName"] = f"{base['sanskritName']} {i+1}"
    herbs.append(base)

with open("/app/swadharma/apps/web/src/data/herbs.json", "w") as f:
    json.dump(herbs, f, indent=2)
