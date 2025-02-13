> Why do I have a folder named ".vercel" in my project?
The ".vercel" folder is created when you link a directory to a Vercel project.

> What does the "project.json" file contain?
The "project.json" file contains:
- The ID of the Vercel project that you linked ("projectId")
- The ID of the user or team your Vercel project is owned by ("orgId")

> Should I commit the ".vercel" folder?
No, you should not share the ".vercel" folder with anyone.
Upon creation, it will be automatically added to your ".gitignore" file.


### Instructions for updating the font

1. Go to https://fonts.google.com/
2. Search for the font you want to use
3. Click on the font you want to use
4. Click on the "Get embed code" button
5. Copy the font link 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap'
6. Replace the existing font link in the constants/Fonts.ts file with the new font link
7. Copy the font family name 'Inter'

https://yzflfkxcaevxnwhcmluw.supabase.co/storage/v1/object/public/Instrucciones%20Proyecto//Copy%20Font%20Familiy.png

8. Replace the existing font family name in the constants/Fonts.ts file with the new font family name
