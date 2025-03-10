## Menu Template

This is a template that can be used to create a menu for a restaurant.

Fork This Template to start a new restaurant menu

For each new restaurant menu you create, you will need to update the following:

- Constants/Colors.ts
- Constants/Fonts.ts
- Components/menu/Logo.tsx

The App uses a Supabase database to store the menu items, storage for the logo, images and videos.

For each new restaurant menu that you create, you will need to duplicate the existing Supabase database and buckets and update the .ENV variables.

## Creating a New Project

1. [Create a New Project on Github](https://docs.google.com/document/d/17WER7XPVddQVzrMAYDHF1I9l0x4ach7hZVH687tVbYM/edit?tab=t.0)
2. [Create a New Database on Supabase](https://docs.google.com/document/d/10cgYNal4U-1wSvl0HjqPr-3leBVaRuWKWPereDf93-M/edit?tab=t.0)
3. [Deploy a New Project on Vercel](https://docs.google.com/document/d/1CEOOc96H0LPIXzumDsTFxk_sHIFSOvlVZSvNn5-jcbg/edit?tab=t.0)
4. [Personalize Menu to Restaurant](https://docs.google.com/document/d/1t4jLWV32xb6DcSVpT5PtUE1FYmCstyYZu5F8zf-JoTQ/edit?tab=t.0)

### Instructions for updating the font

1. Go to https://fonts.google.com/
2. Search for the font you want to use
3. Click on the font you want to use
4. Click on the "Get embed code" button
5. Copy the font link ( 1 )
6. Replace the existing font link in the constants/Fonts.ts file with the new font link
7. Copy the font family name ( 2 )

   ![alt text](https://yzflfkxcaevxnwhcmluw.supabase.co/storage/v1/object/public/Instrucciones%20Proyecto//Copy%20Font%20Familiy.png)

8. Replace the existing font family name in the constants/Fonts.ts file with the new font family name 'Inter'

### Instructions for updating the logo

1. Download the logo you want to use in PNG format
2. Go to Supabase Storage and click on the Global Bucket
3. Upload the logo to the Bucket
4. IMPORTANT: Make sure the name of the file is "logo.png"

### Instructions for updating the colors

1. Go to constants/Colors.ts file
2. Update the colors you want to use
3. Primary is the main color of the app
4. PrimaryLight is the color for the full menu background
5. Accent is the color for the highlights and CTAs
6. If you need to further adjust the full menu background color you can adjust the opacity.

### Tech stack

The app is built with React Native and Expo.
Deployed on [Vercel](https://vercel.com/)
Supabase for database and storage [Supabase](https://supabase.com/)

This Repo uses Yarn as the package manager
