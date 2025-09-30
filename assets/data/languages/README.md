# Multilingual Personal Details

This directory contains the multilingual personal details for the portfolio website. Each language has its own folder with a `personal-details.json` file.

## Folder Structure

```
languages/
├── en/                    # English
│   └── personal-details.json
├── fr/                    # French
│   └── personal-details.json
├── de/                    # German
│   └── personal-details.json
├── ja/                    # Japanese
│   └── personal-details.json
├── sv/                    # Swedish
│   └── personal-details.json
└── ar/                    # Arabic
    └── personal-details.json
```

## File Structure

Each `personal-details.json` file contains:

- **personalInfo**: Basic personal information (name, title, description, contact details)
- **stats**: Statistics with translated labels (experience, projects, clients)
- **achievements**: Professional achievements with translated titles and descriptions
- **bio**: Biography information (short/long descriptions, passions, goals)
- **experience**: Work experience with translated descriptions
- **education**: Educational background with translated descriptions
- **certifications**: Professional certifications with translated descriptions

## Adding New Languages

To add a new language:

1. Create a new folder with the language code (e.g., `es` for Spanish)
2. Copy the `personal-details.json` file from the `en` folder
3. Translate all the content in the new file
4. Update the `LanguageService` to include the new language in the `languages` array

## Usage

The `PersonalDetailsService` automatically loads the appropriate language file based on the current language selection. The service includes fallback logic to use English if a language file is not found.
