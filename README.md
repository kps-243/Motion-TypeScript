# Motion-TypeScript – Documentation des routes

API REST construite avec **Express + TypeScript + MongoDB (Mongoose)**  
Elle permet de gérer des utilisateurs, salles de sport, équipements, pratiques, challenges, badges et un classement.

---

## 🔐 Authentification

### POST `/api/auth/signup`
Créer un nouvel utilisateur.

```json
{
  "name": "Doe",
  "firstName": "John",
  "email": "john@example.gans",
  "password": "123456",
  "role": "admin"
}
```

- Body : infos utilisateur (email, password, name, role, etc.)
- Public

---

### POST `/api/auth/login`
Connexion utilisateur.

- Body : email + password
- Retourne un token JWT

---

## 👤 Utilisateurs (Admin)

### GET `/api/auth`
Récupérer tous les utilisateurs.

- Auth requise
- Rôle : **ADMIN**

---

### GET `/api/auth/:id`
Récupérer un utilisateur par ID.

- Auth requise
- Rôle : **ADMIN**

---

### PUT `/api/auth/:id`
Modifier un utilisateur.

- Auth requise
- Rôle : **ADMIN**

---

### DELETE `/api/auth/:id`
Supprimer un utilisateur.

- Auth requise
- Rôle : **ADMIN**

---

## 🏢 Salles de sport (Gyms)

### GET `/api/gyms`
Lister toutes les salles.

---

### POST `/api/gyms`
Créer une salle.

```json
{
  "name": "Keep Cool Paris",
  "description": "Ambiance conviviale, machines connectées, séances de sport en petits groupes.",
  "capacity": 80,
  "address": "27 Rue du 4 Août 1789",
  "city": "Bagneux",
  "zipCode": 69100,
  "contact": "0478093341"
}
```

- Auth requise
- Rôle : OWNER / ADMIN

---

### GET `/api/gyms/:id`
Récupérer une salle par ID.

---

### PUT `/api/gyms/:id`
Modifier une salle.

- Auth requise
- Rôle : OWNER / ADMIN

---

### DELETE `/api/gyms/:id`
Supprimer une salle.

- Auth requise
- Rôle : ADMIN

---

## 🏋️ Équipements d’une salle (Gym Equipments)

### GET `/api/gyms/:gymId/equipments`
Lister les équipements d’une salle.

---

### POST `/api/gyms/:gymId/equipments`
Ajouter un équipement à une salle.

- Auth requise
- Rôle : ADMIN

---

### PUT `/api/gyms/:gymId/equipments/:id`
Modifier un équipement.

- Auth requise
- Rôle : ADMIN

---

### DELETE `/api/gyms/:gymId/equipments/:id`
Supprimer un équipement.

- Auth requise
- Rôle : ADMIN

---

## 🏋️‍♀️ Équipements (globaux)

### GET `/api/equipments`
Lister tous les équipements.

---

### GET `/api/equipments/:id`
Récupérer un équipement.

---

### POST `/api/equipments`
Créer un équipement.

```json
{
    "name": "Banc",
    "description": "Banc pour développer couché",
    "createdBy": "691519d98e439737e9809a1a"
}
```

- Auth requise
- Rôle : ADMIN

---

### PUT `/api/equipments/:id`
Modifier un équipement.

- Auth requise
- Rôle : ADMIN

---

### DELETE `/api/equipments/:id`
Supprimer un équipement.

- Auth requise
- Rôle : ADMIN

---

## 🤸 Pratiques (Exercises)

### GET `/api/practices`
Lister toutes les pratiques.

---

### GET `/api/practices?gymId=XXX`
Lister les pratiques d’une salle spécifique.

---

### POST `/api/practices`
Créer une pratique.

```json
{
  "name": "Push",
  "description": "Exercice Bras",
  "targetMuscles": ["quadriceps", "Bras"],
  "gymId": "69126811b805d40b3214261c"
}
```

- Auth requise

---

### GET `/api/practices/:id`
Récupérer une pratique.

---

### PUT `/api/practices/:id`
Modifier une pratique.

- Auth requise

---

### DELETE `/api/practices/:id`
Supprimer une pratique.

- Auth requise

---

## 🏆 Challenges

### GET `/api/challenges`
Lister tous les challenges.

- Auth requise

---

### POST `/api/challenges`
Créer un challenge.

```json
{
  "name": "Under Body Blast",
  "description": "Circuit complet bas du corps",
  "practices": ["6935866503cd8a95569c080b", "693589eb03cd8a95569c0818"],
  "gymId": "69126811b805d40b3214261c"
}
```

- Auth requise
- Vérifie que les pratiques appartiennent à la salle

---

### GET `/api/challenges/:id`
Récupérer un challenge.

---

### PUT `/api/challenges/:id`
Modifier un challenge.

- Auth requise

---

### DELETE `/api/challenges/:id`
Supprimer un challenge.

- Auth requise

---

### POST `/api/challenges/:id/complete`
Marquer un challenge comme complété par l’utilisateur.

- Auth requise

---

## 🤝 Invitations aux challenges

### POST `/api/challenge/:id/invite`
Inviter un utilisateur à un challenge.

```json
{
  "toUserId": "690a57cbd714c66bdbce0850",
  "message": "Viens participer à mon challenge !"
}
```

- Auth requise
- Seul le créateur peut inviter

---

### GET `/api/invites/me`
Récupérer mes invitations reçues.

- Auth requise

---

### POST `/api/invites/:inviteId/respond`
Répondre à une invitation (ACCEPT / DECLINE).

- Auth requise

Body :
```json
{ "action": "ACCEPT" }
```

## 🤝 Invitations aux challenges

### Annuler une invitation
**POST** `/api/invites/:inviteId/cancel`  
Annuler une invitation envoyée à un utilisateur.

- 🔐 Authentification requise

---

## 🏅 Badges

### Créer un badge
**POST** `/api/badges`  
Créer un nouveau badge.

```json
{
  "name": "Premier Challenge",
  "description": "Badge obtenu après avoir complété 1 challenge",
  "icon": "trophy.png",
  "ruleType": "TOTAL_CHALLENGES_COMPLETED",
  "ruleValue": 1,
  "points": 50,
  "isActive": true
}
```

- 🔐 Authentification requise  
- 👤 Rôle requis : **ADMIN**

---

### Lister tous les badges
**GET** `/api/badges`  
Récupérer la liste de tous les badges.

- 🔐 Authentification requise  
- 👤 Rôle requis : **ADMIN**

---

### Lister mes badges
**GET** `/api/badges/mine`  
Récupérer les badges de l’utilisateur connecté.

- 🔐 Authentification requise

---

### Récupérer un badge
**GET** `/api/badges/:id`  
Récupérer les détails d’un badge.

- 🔐 Authentification requise  
- 👤 Rôle requis : **ADMIN**

---

### Modifier un badge
**PUT** `/api/badges/:id`  
Modifier un badge existant.

- 🔐 Authentification requise  
- 👤 Rôle requis : **ADMIN**

---

### Supprimer un badge
**DELETE** `/api/badges/:id`  
Supprimer un badge.

- 🔐 Authentification requise  
- 👤 Rôle requis : **ADMIN**

---

## 🏆 Classement (Leaderboard)

### Afficher le classement
**GET** `/api/leaderboard`  
Afficher le classement des utilisateurs par score.

- 🌍 Accès public

---

## 📌 Notes techniques

- 🔐 Authentification via **JWT**
- 👥 Gestion des rôles : `ADMIN`, `OWNER`, `CUSTOMER`
- 🗄️ Base de données : **MongoDB**
- 🧩 ORM : **Mongoose**

---

## 🚀 Lancement du projet

```bash
npm install
npm run dev
```