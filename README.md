🧭 Prezentare generală

ATV Rental Manager ajută la gestionarea tuturor activităților legate de închirierea ATV-urilor:

✔ gestionarea clienților
✔ administrarea ATV-urilor
✔ generarea și urmărirea contractelor
✔ înregistrarea plăților interne (NUMAI evidență internă, fără procesare online)
✔ gestionarea incidentelor/daunelor
✔ vizualizarea disponibilității ATV-urilor
✔ generarea contractelor în format HTML (cu opțiune de export PDF)

Aplicația NU procesează plăți online, ci doar oferă posibilitatea de a înregistra manual sumele achitate de clienți (ex: cash sau POS offline).

⭐ Funcționalități
👉 Gestionarea clienților

Adăugare / editare / ștergere clienți

Istoric închirieri pentru fiecare client

👉 Gestionarea ATV-urilor

Introducerea unui ATV nou

Status în timp real

Tarife configurabile

👉 Gestionarea contractelor

Creare contract cu selectarea clientului și ATV-ului

Verificări automate pentru suprapuneri

Calcul preț estimat

Status contract: activ / încheiat / anulat

👉 Evidență plăți interne (nu plăți online)

Înregistrarea sumelor achitate în numerar / POS local

Calcul „sumă totală vs sumă achitată”

Evidență internă a restanțelor

❗ Nu există integrare cu procesatori de plăți sau tranzacții online.

👉 Incidente

Adăugare incidente (daune)

Cost estimat

Link-uri către poze

👉 Contracte HTML / PDF

Template HTML

Export PDF (prin soluții locale: Puppeteer / PDFKit)

👉 Dashboard

ATV-uri disponibile

Contracte active

Returnări astăzi

Închirieri recente

🏗️ Arhitectură
atv-rental-app/
│── backend/      → API REST (Node.js, Express, PostgreSQL)
│── frontend/     → UI React
└── README.md

🛠 Tech Stack
Backend:

Node.js + Express

PostgreSQL

pg (sau Prisma/Sequelize)

Frontend:

React

React Router

Axios

DevOps:

GitHub Actions (CI)

.env config

🚀 Instalare
1️⃣ Clonează proiectul
git clone https://github.com/<username>/atv-rental-app.git
cd atv-rental-app

⚙️ Setup Backend
cd backend
npm install

Creează .env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=parola
DB_NAME=atv_rental
PORT=4000

Creează baza de date
createdb atv_rental
psql -d atv_rental -f db/schema.sql

Rulează serverul
npm run dev

🎨 Setup Frontend
cd frontend
npm install
npm run dev


Frontend-ul rulează de obicei la:

http://localhost:5173

📁 Structură proiect
atv-rental-app/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── routes/
│   │   ├── templates/
│   │   ├── app.js
│   │   ├── db.js
│   │   └── server.js
│   ├── db/schema.sql
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
│
└── README.md

🔌 Rute API (exemple)
Clienți

GET /api/clients

POST /api/clients

ATV-uri

GET /api/atvs

POST /api/atvs

Contracte

POST /api/rentals

GET /api/rentals/:id

Contract – Generare HTML

GET /api/rentals/:id/contract-html

🖼 Capturi ecran

Poți adăuga aici imagini cu interfața aplicației:

docs/images/dashboard.png
docs/images/clients_page.png
docs/images/create_rental.png

📌 To Do / Roadmap

 Autentificare + roluri (admin / operator)

 Export PDF pentru contracte

 Rapoarte avansate

 Modul rezervări (programări viitoare)

 Modul inventar consumabile (ulei, piese etc.)

 Posibilitate atașare poze direct în aplicație

📄 Licență

Proiect licențiat sub MIT License – liber pentru utilizare și adaptare.
