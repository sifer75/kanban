# 🛠️ Application de Gestion de Tâches  

Une application tout-en-un combinant un système de gestion de tâches avec Kanban, un calendrier, une messagerie en temps réel, et une authentification sécurisée via GitHub.  

---

## 🌟 Fonctionnalités  

### 📌 Gestion de Tâches avec Kanban  
- **Système de drag-and-drop** pour trier les tâches selon leur statut : *To-Do*, *En cours*, *Terminé*.  
- Mise à jour en temps réel de l’état des tâches.  
- Interface intuitive et réactive.  

### 🗓️ Calendrier avec Gestion des Tâches  
- Ajout de tâches directement dans le calendrier.  
- Affichage des tâches par jour, semaine ou mois.  
- Synchronisation avec le tableau Kanban pour une gestion centralisée.  

### 💬 Messagerie en Temps Réel  
- Système de messagerie basé sur *Server-Sent Events (SSE)* pour des notifications instantanées.  
- Interface utilisateur moderne pour discuter avec les membres d’un espace de travail.  

### 🔒 Authentification via GitHub OAuth  
- Connexion sécurisée via OAuth 2.0 avec GitHub.  
- Gestion des rôles : **Admin** (créateur d’espaces de travail) et **Employé** (attribution automatique des tâches *To-Do*).  

---

## 🛠️ Technologies Utilisées  

- **Frontend** :
  - React + Vite
  - TypeScript
  - Tailwind CSS
  - `@dnd-kit` pour le drag-and-drop  
  - React Query pour la gestion des états côté client  

- **Backend** :
  - AdonisJS pour l'API REST  
  - SSE pour la messagerie en temps réel  
  - PostgreSQL pour la gestion des données  
  - OAuth GitHub pour l'authentification  

- **DevOps** :
  - Docker pour la conteneurisation  
  - Node.js pour servir l'application en production  

---

## 🚀 Installation  

- #1er **fichier bash** :
  - npm i
  - cd fun
  - npm run dev

- #2eme **fichier bash** :
  - npm i
  - cd funb
  - npm run dev


- **avec docker** :
  - docker-compose up -d 
