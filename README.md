# Apex Motors Showcase

Create a complete, premium, modern website for a luxury and sports car dealership named "Apex Motors".

Key Requirements:
1. Design & Visual Identity:
   - Ultra-premium, dark aesthetic (deep blacks, dark slate grays, clean typography, subtle red accents for CTAs and highlights).
   - High-end automotive dealership feel (spacious layout, high-res photography, smooth transitions, glassmorphism cards).
   - Fully responsive for desktop, tablet, and mobile with sleek mobile navigation.

2. Navigation & Structure:
   - Sticky header with logo "APEX MOTORS", links: Início (Home), Stock, Sobre Nós (About Us), Serviços (Services), Contactos (Contacts), Admin (quick access / demo toggle), and CTA "Ver Stock".
   - Footer with branding, social links, quick navigation, legal disclaimers, and note indicating demonstrative/PAP project context.

3. Home Page:
   - Hero section with title: "Performance. Exclusividade. Paixão."
   - Subtitle: "Descubra uma seleção exclusiva de automóveis desportivos e de luxo escolhidos para quem procura uma experiência de condução única."
   - Buttons: "Explorar Stock" and "Falar Connosco"
   - Key stats: +50 carros vendidos, +10 marcas premium, 100% veículos selecionados, Atendimento personalizado.
   - Featured Stock section with quick specs, favorites toggle, and "Ver Detalhes" buttons.

4. Stock & Catalog:
   - Include realistic luxury inventory starting with the 4 featured cars:
     * Porsche 911 Turbo S / Carrera (€149.900, 2024, 8.500 km, 3.0L Boxer, 394 cv, PDK, Traseira)
     * BMW M4 Competition xDrive (€119.900, 2025, 6.200 km, 3.0L Twin-Turbo, 530 cv, xDrive)
     * Lamborghini Huracán EVO (€249.900, 2023, 4.800 km, 5.2L V10, 640 cv, Integral)
     * Ferrari SF90 Stradale (€499.900, 2024, 2.500 km, 4.0L V8 Twin-Turbo Plug-in Hybrid, 1.000 cv, Integral)
   - Working search and robust filters: Brand, Model, Price range, Year, Mileage, Horsepower, Fuel, Transmission, Traction.
   - Sorting options: Mais recentes, Preço mais baixo, Preço mais alto.
   - Favorites system (save to wishlist in local state/storage).

5. Vehicle Details Page:
   - High-quality image gallery with thumbnail preview.
   - Detailed specification cards (engine, power, transmission, mileage, exterior/interior colors, equipment list, description).
   - Action buttons: "Tenho Interesse" and "Solicitar Test Drive" opening modal forms with validation.
   - Interactive Financing Simulator ("Simule o seu financiamento"):
     * Sliders and inputs for Entrada inicial (down payment), Prazo (months: 12 to 120), and Valor financiado.
     * Dynamic calculation of monthly installment estimate with realistic interest rate (TAN/TAEG).

6. About Us ("Sobre Nós") & Services ("Serviços"):
   - About Us section featuring values: Qualidade, Transparência, Exclusividade.
   - Services breakdown: Venda de Automóveis, Financiamento, Retoma, Importação, Test Drive, Detailing.

7. Contacts ("Contactos"):
   - Funchal, Madeira location details (Rua da Performance, 100, +351 291 000 000, geral@apexmotors.pt, opening hours).
   - Validated lead contact form with vehicle selection, name, email, phone, and message.
   - Interactive map simulation/styled map card.

8. Mock Admin Panel:
   - Dedicated management view to inspect stock, add a new vehicle with custom specs/image, edit status (Disponível / Reservado / Vendido), or remove vehicles from stock.

Ensure all text is written in natural European Portuguese and the app is completely interactive and polished for a top-grade PAP presentation.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/0559a840-e93f-44ee-b51e-e448737fded8).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
