# TRi9i: vrai site (GitHub Pages + Supabase)

## 1. Supabase (b blach)
1. supabase.com > New project.
2. SQL Editor > coller kol `schema.sql` > Run.
3. Authentication > Providers > Email: **dir "Confirm email" OFF**.
4. Settings > API: nsakh **Project URL** w **anon public key**.

## 2. Config
F `index.html`, bddel l-star l-lowl dyal `/* EDIT THESE */`:
`CFG.url`, `CFG.key`, w `BANK` (RIB, Cash Plus, numro WhatsApp l-admin).

## 3. GitHub Pages
Repo jdid > upload `index.html` (w `schema.sql`, `README.md`) > Settings > Pages > Deploy from branch `main` / root.

## 4. Admin
Sajjel compte (b numro dyalek), w f SQL Editor:
`update profiles set role='admin' where id=(select id from auth.users where email='212XXXXXXXXX@tri9i.app');`
Rje3 l-site: ghadi tchouf tab Admin (t-akked t-tahwilat).

## Kifach kaykhdem
Client kaynchar tlab > chauffeurs kaysiftou 3orod > tfawad w hadra (numrawat mhjoubin) > accept > client kay-dir tahwil l TRi9i w kay-sift l-recu > admin kay-akked > numro w 3enwan kayt-fte7o > chaffeur kaywssel > client kay-akked > admin kay-sift l-flous (90%) l-chaffeur.

## Marhala 2 (settings, sowar, twtheeq, qiyyem)
Mn ba3d schema.sql, khdem **schema2.sql** f SQL Editor (nafs l-tari9a). Hada kayzid: sowar d-camion, twtheeq (CIN/carte grise), njoum, w settings l kol compte.
Ila kont deja dert admin 9bel, ma khassk t3awd.

## Marhala 3 (Darija b l-7rouf l-3arabiya)
L-site db kamel b l-3arabiya (RTL). Khdem **schema3.sql** f SQL Editor bach l-ichare3at w l-hjeb dyal n-numrawat ykounou b l-3arabiya 7ta houma.

## Marhala 4 (tarikh, kamyonat khawyin, bhath, share, ilgha2)
Khdem **schema4.sql** f SQL Editor (l-akher, ba3d schema 1, 2, 3).

## Marhala 5 (tlab b khotowat, options, sor3a)
Khdem **schema5.sql** f SQL Editor (l-akher). Hada kayzid options d-tlab (chahina m3ayna, mosa3ada f t-tahmil) w indexes bach l-site ykoun sri3.

## Marhala 6 (sowar d-sel3a, mochakil, hissab, admin)
Khdem **schema6.sql** f SQL Editor (l-akher).

## Marhala 7 (app f t-telifon + t-sjil l-awtomatiki)
- Zdt `manifest.json`, `sw.js`, `icon-192.png`, `icon-512.png`: **upload-hom kamlin m3a index.html** l GitHub (nafs l-folder). Hakka l-site kay-t-tsejjel ka "application" f t-telifon (Chrome: Install / Add to Home screen).
- `schema7.sql` (ikhtiyari): ila l-client ma akkedch l-istilam f 3 iyyam, r-rihla kat-tsali wa7dha. Khassk t-fe3el pg_cron (Database > Extensions) w t-khdem l-star l-akhir li f l-fichier.

## Checklist 9bel l-intilaq
1. schema 1 7ta 7 mkhddmin f Supabase. 2. index.html: CFG w BANK s7a7. 3. Admin mdour. 4. Jarrabt rihla kamla b 3 comptat. 5. Mohami + charika + CNDP. 6. Jarreb m3a 5 chauffeurs w 5 clients.

## Marhala 8 (l-admin kaychouf kolchi)
Khdem **schema8.sql**. Mn ba3d l-admin y-9der: ychouf kol t-tlabat, l-mohadathat (w ykteb fiha), l-mosta3mlin b numrawathom, w ybddel hala d-tlab, w ywathaq s-sewwa9a.
