# Configuration Supabase (Youth)

## 1) Créer la table `leads`

Dans Supabase SQL Editor, exécute:

```sql
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text,
  formule text,
  message text,
  status text not null default 'nouvelle'
    check (status in ('nouvelle', 'en_cours', 'traitee'))
);
```

## 2) Ajouter les variables d'environnement

1. Copie `.env.example` vers `.env.local`
2. Renseigne:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD`

## 3) Tester en local

1. Lancer `npm run dev`
2. Envoyer un formulaire depuis la page d'accueil
3. Ouvrir `http://localhost:3000/admin` pour voir les demandes
4. Entrer les identifiants Basic Auth (`ADMIN_USERNAME` / `ADMIN_PASSWORD`)
5. Modifier le statut d'une demande directement depuis la colonne "Statut"
